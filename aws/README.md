# AWS Lightsail Deployment

## Quick Start

1. **Install AWS CLI** (if not already installed):
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

2. **Configure AWS credentials**:
```bash
aws configure
```

3. **Setup environment**:
```bash
# Copy the example environment file
cp .env.example .env

# Edit with your configuration
nano .env
```

4. **Run deployment**:
```bash
chmod +x deploy-lightsail.sh
./deploy-lightsail.sh
```

## Environment Configuration

Edit `.env` file with your values:

```bash
# AWS Configuration
INSTANCE_NAME=honey-talker-prod
REGION=us-east-1
KEY_PAIR_NAME=honey-talker-key

# Domain (optional)
DOMAIN_NAME=your-domain.com
SSL_EMAIL=admin@your-domain.com

# Application
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://localhost:27017/honey-talker
```

## What the Script Does

- ✅ Creates SSH key pair
- ✅ Creates Lightsail instance (2GB RAM, 2 vCPUs)
- ✅ Allocates static IP
- ✅ Configures firewall (ports 22, 80, 443)
- ✅ Installs Docker & Docker Compose
- ✅ Clones and deploys your application
- ✅ Sets up SSL certificate (if domain provided)
- ✅ Performs health checks

## Files

- `deploy-lightsail.sh` - Main deployment script
- `README.md` - This documentation

## Post-Deployment

**Access your application:**
- HTTP: `http://your-static-ip`
- HTTPS: `https://your-domain.com` (if SSL configured)

**Login credentials:**
- Admin: `admin/admin`
- User: `user/user`

**Management commands:**
```bash
# SSH into server
ssh -i ~/.ssh/honey-talker-key.pem ubuntu@your-static-ip

# Check container status
cd honey-talker && sudo docker-compose -f docker-compose.prod.yml ps

# View logs
cd honey-talker && sudo docker-compose -f docker-compose.prod.yml logs -f

# Update application
cd honey-talker && git pull && sudo docker-compose -f docker-compose.prod.yml up -d --build
```

## Cost

- Lightsail instance: $10/month
- Static IP: Free (included)
- SSL certificate: Free (Let's Encrypt)
- **Total**: ~$10/month

## Troubleshooting

**If deployment fails:**
1. Check AWS credentials: `aws configure list`
2. Verify region: `aws configure get region`
3. Check instance status: `aws lightsail get-instances --region us-east-1`

**If application doesn't work:**
1. SSH into server
2. Check container logs: `sudo docker-compose -f docker-compose.prod.yml logs`
3. Restart services: `sudo docker-compose -f docker-compose.prod.yml restart`

**Cleanup:**
```bash
# Delete all resources
aws lightsail delete-instance --instance-name honey-talker-prod --region us-east-1
aws lightsail release-static-ip --static-ip-name honey-talker-prod-static-ip --region us-east-1
aws lightsail delete-key-pair --key-pair-name honey-talker-key --region us-east-1
```
