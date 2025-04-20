# Vercel Deployment Guide

## Step 1: Create a Vercel Account

1. Go to [Vercel](https://vercel.com) and sign up or log in
2. Connect your GitHub account

## Step 2: Import Your Repository

1. Click "New Project"
2. Select your GitHub repository
3. Vercel will automatically detect it's a Next.js project

## Step 3: Configure Environment Variables

This is the most important step! You must add these environment variables:

1. Click on "Environment Variables" in the project settings
2. Add each of the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://nwcpakuckcurlftpogwx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Y3Bha3Vja2N1cmxmdHBvZ3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMjM2NTAsImV4cCI6MjA2MDY5OTY1MH0.v-M8g0tAJovDenHT3y1O7WnttF4z0JviB7Ezae15pSQ
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Y3Bha3Vja2N1cmxmdHBvZ3d4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTEyMzY1MCwiZXhwIjoyMDYwNjk5NjUwfQ.VnS8gDRhxJ-fRbD58-f_nA7VGRXsvESsc3igmSUuyrU
RESEND_API_KEY=re_JqZJmoJr_QAJHHzwmmrTPt68J5M2xieeL
ADMIN_EMAIL=satheeshk8188@gmail.com
```

3. Make sure to select all environments (Production, Preview, and Development)
4. Click "Save"

## Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application

## Step 5: Verify Deployment

1. Once deployed, click on the provided URL
2. Test the following pages to ensure they work:
   - Home page
   - Testimonials page
   - Contact form
   - Admin panel

## Troubleshooting

If you encounter build errors:

1. Check the build logs in Vercel
2. Verify that all environment variables are set correctly
3. Make sure your Supabase project is accessible from Vercel's IP addresses
4. If you see "Missing env.NEXT_PUBLIC_SUPABASE_URL" error, double-check that you've added all environment variables

## Updating Your Deployment

When you make changes to your code:

1. Push your changes to GitHub
2. Vercel will automatically deploy the updates
3. You can also manually trigger a redeploy from the Vercel dashboard 