-- Create website_content table
CREATE TABLE IF NOT EXISTS public.website_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create policies table
CREATE TABLE IF NOT EXISTS public.policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.website_content
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.testimonials
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for active policies" ON public.policies
    FOR SELECT USING (is_active = true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Enable full access for authenticated users" ON public.website_content
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON public.testimonials
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON public.policies
    FOR ALL USING (auth.role() = 'authenticated'); 