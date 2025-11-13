# Flowxtra Next.js Deployment Guide

## Overview

This document describes the deployment of the Next.js application (`flowxtra-next`) on `https://flowxtra.com` while maintaining the functionality of `https://my.flowxtra.com`.

---

## 🚀 Deployment Steps

# 1. ارفع الملفات المحدثة
# 2. على السيرفر:

cd /home/flowxtra/public_html

npm install --production
npm run build
pm2 restart flowxtra-next


pm2 save
pm2 startup



### 1. Start Next.js Application with PM2

Run the Next.js application on port 3100 using PM2:

```bash
pm2 start npm --name flowxtra-next -- start
pm2 save
pm2 startup
```

**Commands Explanation:**
- `pm2 start npm --name flowxtra-next -- start`: Starts the Next.js app with PM2
- `pm2 save`: Saves the current PM2 process list
- `pm2 startup`: Generates startup script for auto-restart on server reboot

---

### 2. Disable Temporary NGINX Configuration

Disable the temporary NGINX configuration file for Next.js:

```bash
mv /etc/nginx/conf.d/custom/flowxtra-next.conf /etc/nginx/conf.d/custom/flowxtra-next.conf.disabled
```

**Note:** This file can be re-enabled if needed by reversing the command.

---

### 3. Modify Main NGINX Configuration

Edit the main NGINX configuration file for `flowxtra.com` to proxy requests to the Next.js application.

**File Path:**
```
/etc/nginx/conf.d/users/flowxtra.conf
```

**Configuration Block:**
```
server_name flowxtra.com www.flowxtra.com;
```

**Replace:**
```nginx
location / {
    include conf.d/includes-optional/cpanel-proxy.conf;
    proxy_pass $CPANEL_APACHE_PROXY_PASS;
}
```

**With:**
```nginx
location / {
    proxy_pass http://127.0.0.1:3100;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

**Configuration Explanation:**
- `proxy_pass http://127.0.0.1:3100`: Forwards all requests to Next.js on port 3100
- `proxy_http_version 1.1`: Uses HTTP/1.1 protocol
- `proxy_set_header Upgrade $http_upgrade`: Handles WebSocket upgrades
- `proxy_set_header Connection 'upgrade'`: Maintains connection for WebSockets
- `proxy_set_header Host $host`: Preserves the original host header
- `proxy_cache_bypass $http_upgrade`: Bypasses cache for WebSocket connections

---

### 4. Reload NGINX

After making changes, test and reload NGINX:

```bash
# Test NGINX configuration
nginx -t

# Reload NGINX if test passes
systemctl reload nginx
```

---

## 📁 Important File Paths

| File | Path | Description |
|------|------|-------------|
| Main flowxtra config | `/etc/nginx/conf.d/users/flowxtra.conf` | Main NGINX configuration for flowxtra.com |
| my.flowxtra.com config | `/etc/nginx/conf.d/my.flowxtra.com.conf` | NGINX configuration for my.flowxtra.com subdomain |
| Disabled Next.js config | `/etc/nginx/conf.d/custom/flowxtra-next.conf.disabled` | Temporary Next.js config (disabled) |
| Backup config | `/etc/nginx/conf.d/users/flowxtra.conf.bak` | Backup of original configuration |

---

## 🧪 Verification Commands

### Check PM2 Status

```bash
# List all PM2 processes
pm2 list

# View logs
pm2 logs flowxtra-next

# Check process details
pm2 describe flowxtra-next
```

### Check NGINX Configuration

```bash
# Test NGINX configuration syntax
nginx -t

# Check NGINX status
systemctl status nginx

# View NGINX error logs
tail -f /var/log/nginx/error.log
```

### Test Application

```bash
# Test local connection
curl http://localhost:3100

# Test static files
curl http://localhost:3100/_next/static/chunks/runtime-*.js

# Check if port is listening
netstat -tulpn | grep 3100
```

---

## 🔄 Common Operations

### Restart Application

```bash
# Restart Next.js app
pm2 restart flowxtra-next

# Restart NGINX
systemctl restart nginx
```

### Update Application

```bash
# Navigate to project directory
cd /home/flowxtra/public_html

# Pull latest changes (if using Git)
git pull

# Install dependencies
npm install --production

# Build application
npm run build

# Restart PM2 process
pm2 restart flowxtra-next
```

### View Logs

```bash
# PM2 logs
pm2 logs flowxtra-next --lines 100

# NGINX access logs
tail -f /var/log/nginx/access.log

# NGINX error logs
tail -f /var/log/nginx/error.log
```

---

## ⚠️ Troubleshooting

### Application Not Starting

1. Check PM2 status: `pm2 list`
2. Check logs: `pm2 logs flowxtra-next`
3. Verify port availability: `netstat -tulpn | grep 3100`
4. Check environment variables in `package.json` and `.env.production`

### NGINX Errors

1. Test configuration: `nginx -t`
2. Check error logs: `tail -f /var/log/nginx/error.log`
3. Verify proxy settings in `/etc/nginx/conf.d/users/flowxtra.conf`
4. Ensure Next.js is running on port 3100

### Static Files Not Loading (400 Errors)

1. Verify `.next/static` folder exists: `ls -la .next/static/`
2. Check file permissions: `chmod -R 755 .next`
3. Rebuild application: `npm run build`
4. Restart PM2: `pm2 restart flowxtra-next`

---

## 📝 Notes

- The Next.js application runs on port **3100** (configured in `server.js` and `package.json`)
- PM2 ensures the application restarts automatically if it crashes
- NGINX handles SSL termination and proxies requests to Next.js
- The `my.flowxtra.com` subdomain continues to work independently
- All static files are served through Next.js from the `.next/static` directory

---

## 🔐 Security Considerations

- Ensure proper file permissions on `.next` directory
- Keep NGINX and PM2 updated
- Monitor logs regularly for suspicious activity
- Use environment variables for sensitive configuration
- Enable firewall rules to restrict access to port 3100 (localhost only)

---

**Last Updated:** 2025-01-XX  
**Maintained By:** Flowxtra DevOps Team
