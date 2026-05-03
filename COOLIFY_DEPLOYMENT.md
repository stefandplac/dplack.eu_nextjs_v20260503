# Coolify Deployment Guide

This guide will help you deploy your Next.js application to Coolify using Nickpacks.

## Prerequisites

- Coolify instance set up and running
- Git repository with your code
- Domain name (optional but recommended)

## Deployment Steps

### 1. Repository Setup

Make sure your repository contains:
- `Dockerfile` ✅
- `docker-compose.yml` ✅
- `package.json` ✅
- `next.config.mjs` ✅ (OpenNext / Cloudflare: run `npm run build:cloudflare` or `npx opennextjs-cloudflare build` after `npm ci`)
- `.dockerignore` ✅

### 2. Coolify Configuration

#### In Coolify Dashboard:

1. **Create New Application**
   - Go to your Coolify dashboard
   - Click "New Application"
   - Select "Application"

2. **Source Configuration**
   - **Source**: Git Repository
   - **Repository**: Your GitHub/GitLab repository URL
   - **Branch**: `main` or your preferred branch
   - **Build Pack**: `Dockerfile`

3. **Build Configuration**
   - **Build Pack**: `Dockerfile`
   - **Dockerfile Path**: `./Dockerfile` (or `./Dockerfile.prod` for production)
   - **Port**: `3000`

4. **Environment Variables**
   Add these environment variables in Coolify:
   ```
   NODE_ENV=production
   PORT=3000
   EMAIL_USER=stefandplac@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

### 3. Domain Configuration (Optional)

1. **Add Domain**
   - Go to your application settings
   - Add your domain (e.g., `dplack.eu`)
   - Configure SSL certificate

2. **DNS Configuration**
   - Point your domain to Coolify's IP address
   - Add A record: `@` → Coolify IP
   - Add CNAME record: `www` → `@`

### 4. Deployment

1. **Deploy**
   - Click "Deploy" in Coolify
   - Monitor the build logs
   - Wait for deployment to complete

2. **Verify Deployment**
   - Check the health endpoint: `https://yourdomain.com/api/health`
   - Test the main site functionality
   - Verify contact form works

## Troubleshooting

### Common Issues:

1. **Build Fails with "Cannot find module 'tailwindcss'"**
   - **Solution**: The Dockerfile now installs ALL dependencies (including dev dependencies)
   - **Cause**: Build tools like TailwindCSS are in devDependencies but needed for build
   - **Fixed**: Updated Dockerfile to use `npm ci` instead of `npm ci --only=production`

2. **Docker ENV Format Warnings**
   - **Solution**: Updated all ENV statements to use `ENV key=value` format
   - **Fixed**: All environment variables now use proper Docker syntax

3. **Build Fails**
   - Check Dockerfile syntax
   - Verify all dependencies are in package.json
   - Check build logs in Coolify

4. **Application Won't Start**
   - Verify PORT environment variable is set
   - Check application logs in Coolify
   - Ensure all required environment variables are set

5. **Contact Form Not Working**
   - Verify EMAIL_USER and EMAIL_PASS are set
   - Check Gmail App Password is correct
   - Test email configuration

### Health Check

The application includes a health check endpoint at `/api/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "dplack-nextjs"
}
```

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Node environment | Yes | `production` |
| `PORT` | Application port | Yes | `3000` |
| `EMAIL_USER` | Gmail address | Yes | `stefandplac@gmail.com` |
| `EMAIL_PASS` | Gmail App Password | Yes | `abcd efgh ijkl mnop` |

## Security Notes

- Never commit `.env` files to your repository
- Use Gmail App Passwords, not regular passwords
- Enable 2FA on your Gmail account
- Regularly rotate App Passwords

## Performance Optimization

The Dockerfile is optimized for:
- Multi-stage builds for smaller images
- Production-ready Node.js configuration
- Standalone output for better performance
- Security with non-root user

## Support

If you encounter issues:
1. Check Coolify logs
2. Verify environment variables
3. Test locally with Docker
4. Check the health endpoint 