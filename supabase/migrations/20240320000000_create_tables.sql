-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL DEFAULT 'all',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create policies table
CREATE TABLE IF NOT EXISTS policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    min_sum_assured DECIMAL(12,2) NOT NULL,
    max_sum_assured DECIMAL(12,2) NOT NULL,
    min_term INTEGER NOT NULL,
    max_term INTEGER NOT NULL,
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create media_files table
CREATE TABLE IF NOT EXISTS media_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    category TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create website_content table
CREATE TABLE IF NOT EXISTS website_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_name TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_description TEXT,
    meta_keywords TEXT,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin can manage testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage policies" ON policies
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage media files" ON media_files
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage website content" ON website_content
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage inquiries" ON inquiries
    FOR ALL USING (auth.role() = 'authenticated');

-- Create public access policies
CREATE POLICY "Public can view testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view policies" ON policies
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view media files" ON media_files
    FOR SELECT USING (true);

CREATE POLICY "Public can view website content" ON website_content
    FOR SELECT USING (true);

CREATE POLICY "Public can create inquiries" ON inquiries
    FOR INSERT WITH CHECK (true); 