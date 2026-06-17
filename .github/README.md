# GitHub Actions Deployment

This project includes GitHub Actions workflows for deploying the backend and frontend to AWS EC2 instances.

## Workflows

### Backend Deployment (`.github/workflows/backend.yml`)
- **Trigger**: Push to `main` branch when backend files change
- **Build**: Runs `pnpm build --filter=@dtc/backend`
- **Deploy**: Copies built files to EC2 and runs `pnpm medusa start`

### Frontend Deployment (`.github/workflows/frontend.yml`)
- **Trigger**: Push to `main` branch when frontend files change
- **Build**: Runs `pnpm build --filter=@dtc/storefront`
- **Deploy**: Copies built files to EC2 and runs `pnpm start`

## Required GitHub Secrets

Add the following secrets to your GitHub repository:

| Secret | Description | Example |
|--------|-------------|---------|
| `EC2_SSH_KEY` | Private SSH key for EC2 instance | `-----BEGIN RSA PRIVATE KEY-----...` |
| `EC2_HOST` | EC2 instance IP or hostname | `54.123.45.67` |
| `EC2_USER` | SSH username for EC2 instance | `ubuntu` or `ec2-user` |

## EC2 Setup Instructions

### 1. Create EC2 Instance
```bash
# Using AWS CLI
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.medium \
  --key-name your-key-pair \
  --security-group-ids sg-xxxxxxxx \
  --subnet-id subnet-xxxxxxxx
```

### 2. Configure SSH Access
```bash
# Create necessary directories
mkdir -p /home/ubuntu/backend /home/ubuntu/storefront
chmod 755 /home/ubuntu/backend /home/ubuntu/storefront

# Set up PM2 for process management (recommended)
npm install -g pm2
```

### 3. Prepare Project on EC2
```bash
# Clone the repository
cd /home/ubuntu
# Add your git remote and clone here

# Install dependencies and start services
pnpm install
pnpm medusa db:migrate
pnpm medusa user -e admin@yourdomain.com -p yourpassword
```

### 4. Update Environment Variables
Set up `.env` files for both backend and frontend on EC2:

**Backend (`apps/backend/.env`):**
```bash
DATABASE_URL=postgres://postgres:@localhost:5432/medusa-dtc-starter
# Add other required environment variables
```

**Frontend (`apps/storefront/.env.local`):**
```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_6c3...
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_DEFAULT_REGION=dk
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

### 5. Configure Firewall
```bash
# Allow SSH access
sudo ufw allow 22

# Allow web traffic (if needed)
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

## Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Check the Actions tab for deployment status

## Troubleshooting

### SSH Connection Issues
```bash
# Test SSH connection
ssh -i /tmp/ec2_key.pem ubuntu@your-ec2-host

# Check if SSH service is running
sudo systemctl status ssh
```

### Build Errors
- Ensure `pnpm` is installed on EC2: `curl -fsSL https://pnpm.io/install.sh | sh`
- Check disk space: `df -h`
- Verify Node.js version: `node --version`

### Permission Issues
```bash
# Fix SSH key permissions
chmod 400 /tmp/ec2_key.pem

# Check file ownership
ls -la /home/ubuntu/backend /home/ubuntu/storefront
```

## Alternative: Using AWS CLI for Deployment

If you prefer not to use SSH, you can modify the workflows to use AWS CLI for deployment:

```yaml
deploy-to-ec2:
  runs-on: ubuntu-latest
  steps:
    - name: Deploy to EC2
      run: |
        aws s3 sync dist/ s3://your-bucket-name/
        aws lambda invoke --function-name your-function-name --payload file://payload.json response.json
```

## Notes

- The workflows use `pnpm install --frozen-lockfile` to ensure consistent dependency versions
- Built artifacts are copied to EC2 and deployed using PM2 (if configured)
- Consider using AWS Systems Manager Session Manager instead of SSH for better security
- For production deployments, use GitHub Environments to protect secrets and add approval gates