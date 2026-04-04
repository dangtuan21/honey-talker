#!/bin/bash

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found. Please copy .env.example to .env and configure it."
    exit 1
fi

# Configuration (now loaded from .env)
echo "🗑️  Destroying Honey Talker AWS Lightsail resources..."

# Step 1: Delete instance
echo "🖥️  Deleting instance..."
INSTANCE_EXISTS=$(aws lightsail get-instances --region $REGION --query "instances[?name=='$INSTANCE_NAME'].name" --output text)

if [ -n "$INSTANCE_EXISTS" ]; then
    aws lightsail delete-instance --instance-name $INSTANCE_NAME --region $REGION
    echo "✅ Instance deletion initiated"
else
    echo "✅ Instance does not exist"
fi

# Step 2: Release static IP
echo "🌐 Releasing static IP..."
STATIC_IP_NAME="${INSTANCE_NAME}-static-ip"
STATIC_IP_EXISTS=$(aws lightsail get-static-ips --region $REGION --query "staticIps[?name=='$STATIC_IP_NAME'].name" --output text)

if [ -n "$STATIC_IP_EXISTS" ]; then
    aws lightsail release-static-ip --static-ip-name $STATIC_IP_NAME --region $REGION
    echo "✅ Static IP released"
else
    echo "✅ Static IP does not exist"
fi

# Step 3: Delete key pair
echo "🔑 Deleting key pair..."
KEY_EXISTS=$(aws lightsail get-key-pairs --region $REGION --query "keyPairs[?name=='$KEY_PAIR_NAME'].name" --output text)

if [ -n "$KEY_EXISTS" ]; then
    aws lightsail delete-key-pair --key-pair-name $KEY_PAIR_NAME --region $REGION
    echo "✅ Key pair deleted"
else
    echo "✅ Key pair does not exist"
fi

# Step 4: Remove local SSH key
if [ -f "$SSH_KEY_PATH" ]; then
    rm "$SSH_KEY_PATH"
    echo "✅ Local SSH key removed"
else
    echo "✅ Local SSH key does not exist"
fi

echo ""
echo "🎉 All Honey Talker resources have been destroyed!"
echo "💡 You will no longer be billed for these resources"
