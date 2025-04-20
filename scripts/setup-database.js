require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nwcpakuckcurlftpogwx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Y3Bha3Vja2N1cmxmdHBvZ3d4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTEyMzY1MCwiZXhwIjoyMDYwNjk5NjUwfQ.VnS8gDRhxJ-fRbD58-f_nA7VGRXsvESsc3igmSUuyrU';

console.log('Connecting to Supabase:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  try {
    console.log('Starting initial data setup...');

    // Test database connection
    const { data: test, error: testError } = await supabase
      .from('website_content')
      .select('count(*)', { count: 'exact' });

    if (testError) {
      console.error('Database connection test failed:', testError);
      process.exit(1);
    }

    console.log('Database connection successful');
    await insertInitialData();
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error.message || error);
    if (error.details) console.error('Error details:', error.details);
    process.exit(1);
  }
}

async function insertInitialData() {
  try {
    // Insert initial website content
    console.log('Checking existing website content...');
    const { data: existingContent, error: contentCheckError } = await supabase
      .from('website_content')
      .select('id')
      .eq('page_name', 'home')
      .single();

    if (contentCheckError && contentCheckError.code !== 'PGRST116') {
      console.error('Error checking website content:', contentCheckError);
      throw contentCheckError;
    }

    if (!existingContent) {
      console.log('Creating initial website content...');
      const { error: contentError } = await supabase
        .from('website_content')
        .insert([
          {
            page_name: 'home',
            title: 'Financial Advisor - Home',
            meta_description: 'Professional financial advisory services',
            meta_keywords: 'financial advisor, investment, insurance',
            content: {
              hero_title: 'Welcome to Financial Advisor',
              hero_description: 'Professional financial advisory services for your future',
              about_title: 'About Us',
              about_content: 'We provide expert financial advice and services...'
            }
          }
        ]);

      if (contentError) {
        console.error('Error creating website content:', contentError);
        throw contentError;
      }
      console.log('Initial website content created successfully');
    } else {
      console.log('Website content already exists, skipping.');
    }

    // Insert sample testimonial
    console.log('Checking existing testimonials...');
    const { data: existingTestimonial, error: testimonialCheckError } = await supabase
      .from('testimonials')
      .select('id')
      .limit(1)
      .single();

    if (testimonialCheckError && testimonialCheckError.code !== 'PGRST116') {
      console.error('Error checking testimonials:', testimonialCheckError);
      throw testimonialCheckError;
    }

    if (!existingTestimonial) {
      console.log('Creating sample testimonial...');
      const { error: testimonialError } = await supabase
        .from('testimonials')
        .insert([
          {
            name: 'John Doe',
            role: 'Business Owner',
            location: 'New York',
            rating: 5,
            content: 'Great financial advice!',
            is_active: true
          }
        ]);

      if (testimonialError) {
        console.error('Error creating testimonial:', testimonialError);
        throw testimonialError;
      }
      console.log('Sample testimonial created successfully');
    } else {
      console.log('Testimonials exist, skipping sample data.');
    }

    // Insert sample policy
    console.log('Checking existing policies...');
    const { data: existingPolicy, error: policyCheckError } = await supabase
      .from('policies')
      .select('id')
      .limit(1)
      .single();

    if (policyCheckError && policyCheckError.code !== 'PGRST116') {
      console.error('Error checking policies:', policyCheckError);
      throw policyCheckError;
    }

    if (!existingPolicy) {
      console.log('Creating sample policy...');
      const { error: policyError } = await supabase
        .from('policies')
        .insert([
          {
            name: 'Basic Life Insurance',
            description: 'Essential life insurance coverage',
            min_sum_assured: 10000,
            max_sum_assured: 1000000,
            min_term: 5,
            max_term: 30,
            features: { coverage: ['Death', 'Terminal Illness'] },
            is_active: true
          }
        ]);

      if (policyError) {
        console.error('Error creating policy:', policyError);
        throw policyError;
      }
      console.log('Sample policy created successfully');
    } else {
      console.log('Policies exist, skipping sample data.');
    }

    console.log('Initial data setup completed successfully!');
  } catch (error) {
    console.error('Error inserting initial data:', error.message || error);
    if (error.details) console.error('Error details:', error.details);
    throw error;
  }
}

setupDatabase(); 