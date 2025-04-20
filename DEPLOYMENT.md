# Deployment Guide

## Deploying to Vercel

1. **Create a Vercel Account**
   - Go to [Vercel](https://vercel.com) and sign up or log in
   - Connect your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**
   - Add the following environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
     RESEND_API_KEY=your_resend_api_key
     ADMIN_EMAIL=your_admin_email
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

## Manual GitHub Push

If you're having issues with Git, you can manually upload your files to GitHub:

1. Go to your GitHub repository
2. Click "Add file" > "Upload files"
3. Drag and drop your project files
4. Add a commit message
5. Click "Commit changes"

## Local Testing

Before deploying, test your application locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Troubleshooting

- **Email API Issues**: Make sure your Resend API key is valid
- **Supabase Connection**: Verify your Supabase credentials
- **Build Errors**: Check the build logs in Vercel for specific errors 