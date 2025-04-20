const { createClient } = require('@supabase/supabase-js');

// Public anon key - safe for client-side use
const supabaseUrl = 'https://nwcpakuckcurlftpogwx.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Y3Bha3Vja2N1cmxmdHBvZ3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMjM2NTAsImV4cCI6MjA2MDY5OTY1MH0.v-M8g0tAJovDenHT3y1O7WnttF4z0JviB7Ezae15pSQ';

// Service role key - for admin operations
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Y3Bha3Vja2N1cmxmdHBvZ3d4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTEyMzY1MCwiZXhwIjoyMDYwNjk5NjUwfQ.VnS8gDRhxJ-fRbD58-f_nA7VGRXsvESsc3igmSUuyrU';

console.log('Connecting to Supabase at:', supabaseUrl);

// Create clients for both keys
const supabaseAnon = createClient(supabaseUrl, anonKey);
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function testConnection() {
    try {
        console.log('Testing Supabase connection...');

        // Test inserting website content
        console.log('\nInserting test website content...');
        const { data: insertData, error: insertError } = await supabaseAdmin
            .from('website_content')
            .insert([
                {
                    section: 'test_section',
                    content: {
                        title: 'Test Title',
                        description: 'Test Description'
                    }
                }
            ])
            .select();

        if (insertError) {
            console.log('Insert error:', insertError.message);
        } else {
            console.log('Insert successful:', insertData);
        }

        // Test retrieving website content
        console.log('\nRetrieving website content...');
        const { data: selectData, error: selectError } = await supabaseAdmin
            .from('website_content')
            .select('*');

        if (selectError) {
            console.log('Select error:', selectError.message);
        } else {
            console.log('Retrieved data:', selectData);
        }

        // Test public access (using anon key)
        console.log('\nTesting public access...');
        const { data: publicData, error: publicError } = await supabaseAnon
            .from('website_content')
            .select('*');

        if (publicError) {
            console.log('Public access error:', publicError.message);
        } else {
            console.log('Public access successful:', publicData);
        }

    } catch (error) {
        console.error('Error during connection test:', error.message);
    }
}

testConnection(); 