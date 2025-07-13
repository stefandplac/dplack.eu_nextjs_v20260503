# Email Setup Guide for D-PLACK CONSTRUCT

This guide will help you set up the contact form email functionality to send emails to `stefandplac@gmail.com`.

## Prerequisites

1. A Gmail account (recommended for simplicity)
2. 2-Step Verification enabled on your Gmail account
3. Node.js and npm installed

## Step 1: Enable 2-Step Verification

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

## Step 2: Generate App Password

1. In your Google Account settings, go to **Security**
2. Find **App passwords** (under 2-Step Verification)
3. Click **Generate** for a new app password
4. Select **Mail** as the app type
5. Copy the generated 16-character password

## Step 3: Create Environment File

1. Create a file named `.env.local` in the root directory of your project
2. Add the following content:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Example:**
```env
EMAIL_USER=mycompany@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

## Step 4: Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test the API endpoint:
   ```bash
   curl http://localhost:3000/api/test
   ```

3. Fill out the contact form on your website and submit it

## Step 5: Verify Email Delivery

1. Check `stefandplac@gmail.com` for the contact form submission
2. Check the sender's email for the confirmation message

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Ensure 2-Step Verification is enabled

2. **"Less secure app access" error**
   - Gmail no longer supports less secure apps
   - Use App Passwords instead

3. **"Connection timeout" error**
   - Check your internet connection
   - Verify the Gmail SMTP settings

### Alternative Email Services

If Gmail doesn't work for you, you can use other email services:

#### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
  }
});
```

#### Custom SMTP Server
```javascript
const transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@domain.com',
    pass: 'your-password'
  }
});
```

## Production Deployment

### Vercel
1. Add environment variables in your Vercel dashboard
2. Go to Project Settings > Environment Variables
3. Add `EMAIL_USER` and `EMAIL_PASS`

### Other Platforms
- Add the environment variables to your hosting platform's configuration
- Ensure the platform supports Node.js and npm

## Security Notes

1. **Never commit `.env.local` to version control**
2. **Use App Passwords instead of regular passwords**
3. **Keep your App Password secure**
4. **Consider using environment-specific configurations**

## Email Templates

The system sends two types of emails:

1. **Notification Email** (to stefandplac@gmail.com)
   - Contains all form submission details
   - Formatted with company branding
   - Includes timestamp and contact information

2. **Confirmation Email** (to the sender)
   - Thank you message
   - Service information
   - Contact details
   - Professional branding

## Customization

You can customize the email templates by editing the HTML content in `app/api/contact/route.ts`.

### Changing Email Recipient
Update the `to` field in the `mailOptions` object:
```javascript
to: 'stefandplac@gmail.com', // Change this to your desired email
```

### Modifying Email Content
Edit the HTML templates in the `mailOptions` and `confirmationMailOptions` objects.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your environment variables
3. Test the API endpoint directly
4. Check your email spam folder

## Next Steps

Once the email setup is working:
1. Test the contact form thoroughly
2. Customize email templates if needed
3. Set up email monitoring/analytics
4. Consider adding email validation and spam protection 