#!/bin/bash

set -e

# Load environment variables
if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo "❌ .env file not found. Please copy .env.example to .env and configure it."
    exit 1
fi

# Configuration (now loaded from .env)
echo "🚀 Starting Honey Talker deployment to AWS Lightsail..."
echo "📍 Region: $REGION"
echo "🖥️  Instance: $INSTANCE_NAME"

# Step 1: Create SSH key pair
echo "📝 Creating SSH key pair..."
if [ ! -f "$SSH_KEY_PATH" ]; then
    aws lightsail create-key-pair --key-pair-name $KEY_PAIR_NAME --region $REGION
    
    # Extract private key from response and save to file
    PRIVATE_KEY=$(aws lightsail get-key-pair --key-pair-name $KEY_PAIR_NAME --region $REGION --query "privateKeyBase64" --output text | base64 -d)
    echo "$PRIVATE_KEY" > "$SSH_KEY_PATH"
    chmod 400 "$SSH_KEY_PATH"
    echo "✅ SSH key created and saved to $SSH_KEY_PATH"
else
    echo "✅ SSH key already exists"
fi

# Step 2: Create Lightsail instance
echo "🖥️  Creating Lightsail instance..."
INSTANCE_EXISTS=$(aws lightsail get-instances --region $REGION --query "instances[?name=='$INSTANCE_NAME'].name" --output text)

if [ -z "$INSTANCE_EXISTS" ]; then
    aws lightsail create-instances \
        --instance-names $INSTANCE_NAME \
        --availability-zone us-east-1a \
        --blueprint-id ubuntu_22_04 \
        --bundle-id medium_2_0 \
        --key-pair-name $KEY_PAIR_NAME \
        --region $REGION
    
    echo "⏳ Waiting for instance to be running..."
    aws lightsail wait instance-running --region $REGION --instance-names $INSTANCE_NAME
    
    # Get instance IP
    INSTANCE_IP=$(aws lightsail get-instance --region $REGION --instance-name $INSTANCE_NAME --query "instance.publicIpAddress" --output text)
    echo "✅ Instance created with IP: $INSTANCE_IP"
else
    INSTANCE_IP=$(aws lightsail get-instance --region $REGION --instance-name $INSTANCE_NAME --query "instance.publicIpAddress" --output text)
    echo "✅ Instance already exists with IP: $INSTANCE_IP"
fi

# Step 3: Create static IP
echo "🌐 Creating static IP..."
STATIC_IP_NAME="${INSTANCE_NAME}-static-ip"
STATIC_IP_EXISTS=$(aws lightsail get-static-ips --region $REGION --query "staticIps[?name=='$STATIC_IP_NAME'].name" --output text)

if [ -z "$STATIC_IP_EXISTS" ]; then
    STATIC_IP=$(aws lightsail allocate-static-ip --static-ip-name $STATIC_IP_NAME --region $REGION --query "staticIp.publicIpAddress" --output text)
    aws lightsail attach-static-ip --static-ip-name $STATIC_IP_NAME --instance-name $INSTANCE_NAME --region $REGION
    echo "✅ Static IP allocated: $STATIC_IP"
else
    STATIC_IP=$(aws lightsail get-static-ip --region $REGION --static-ip-name $STATIC_IP_NAME --query "staticIp.publicIpAddress" --output text)
    echo "✅ Static IP already exists: $STATIC_IP"
fi

# Step 4: Configure firewall
echo "🔥 Configuring firewall..."
aws lightsail open-instance-public-ports --region $REGION --instance-name $INSTANCE_NAME --port-info fromPort=22,protocol=TCP,toPort=22
aws lightsail open-instance-public-ports --region $REGION --instance-name $INSTANCE_NAME --port-info fromPort=80,protocol=TCP,toPort=80
aws lightsail open-instance-public-ports --region $REGION --instance-name $INSTANCE_NAME --port-info fromPort=443,protocol=TCP,toPort=443
echo "✅ Firewall configured"

# Step 5: Setup server and deploy application
echo "🔧 Setting up server and deploying application..."
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no ubuntu@$STATIC_IP << 'EOF'
    set -e
    
    echo "📦 Updating system..."
    sudo apt update && sudo apt upgrade -y
    
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ubuntu
    
    echo "🔧 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    echo "📥 Cloning repository..."
    if [ ! -d "honey-talker" ]; then
        git clone https://github.com/dangtuan21/honey-talker.git
    fi
    cd honey-talker
    git pull origin main
    
    echo "⚙️  Setting up environment files..."
    cp ht-ai/.env.example ht-ai/.env
    cp ht-backend/.env.example ht-backend/.env
    
    echo "🏗️  Building and starting containers..."
    sudo docker-compose -f docker-compose.prod.yml down
    sudo docker-compose -f docker-compose.prod.yml build
    sudo docker-compose -f docker-compose.prod.yml up -d
    
    echo "⏳ Waiting for services to be healthy..."
    sleep 30
    
    echo "📊 Checking container status..."
    sudo docker-compose -f docker-compose.prod.yml ps
EOF

echo "✅ Server setup completed!"

# Step 6: Setup SSL (if domain provided)
if [ "$DOMAIN_NAME" != "your-domain.com" ] && [ -n "$DOMAIN_NAME" ]; then
    echo "🔒 Setting up SSL for $DOMAIN_NAME..."
    
    ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no ubuntu@$STATIC_IP << EOF
        set -e
        
        echo "📝 Installing certbot..."
        sudo apt install -y certbot python3-certbot-nginx
        
        echo "🔐 Getting SSL certificate..."
        sudo certbot --nginx -d $DOMAIN_NAME --non-interactive --agree-tos --email $SSL_EMAIL
        
        echo "🔄 Setting up auto-renewal..."
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
        
        echo "✅ SSL setup completed!"
EOF
    
    echo "🌐 Your application is now available at: https://$DOMAIN_NAME"
else
    echo "🌐 Your application is available at: http://$STATIC_IP"
    echo "💡 To setup SSL, update DOMAIN_NAME in .env and run again"
fi

# Step 7: Final verification
echo "🔍 Verifying deployment..."
sleep 10

# Test health endpoint
if curl -f -s "http://$STATIC_IP/health" > /dev/null; then
    echo "✅ Health check passed!"
else
    echo "❌ Health check failed"
fi

# Test API
if curl -f -s "http://$STATIC_IP/api/health" > /dev/null; then
    echo "✅ API health check passed!"
else
    echo "❌ API health check failed"
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "📊 Instance IP: $STATIC_IP"
echo "🔑 SSH key: $SSH_KEY_PATH"
echo "🌐 Application URL: http://$STATIC_IP"
if [ "$DOMAIN_NAME" != "your-domain.com" ] && [ -n "$DOMAIN_NAME" ]; then
    echo "🔒 Secure URL: https://$DOMAIN_NAME"
fi
echo ""
echo "📝 Next steps:"
echo "1. Visit your application URL"
echo "2. Login with admin/admin or user/user"
echo "3. Test the chat functionality"
echo ""
echo "🔧 Management commands:"
echo "SSH: ssh -i $SSH_KEY_PATH ubuntu@$STATIC_IP"
echo "Check status: ssh -i $SSH_KEY_PATH ubuntu@$STATIC_IP 'cd honey-talker && sudo docker-compose -f docker-compose.prod.yml ps'"
echo "View logs: ssh -i $SSH_KEY_PATH ubuntu@$STATIC_IP 'cd honey-talker && sudo docker-compose -f docker-compose.prod.yml logs -f'"
