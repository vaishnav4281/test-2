-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Create storage policies
CREATE POLICY "Public can view media files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update media files"
ON storage.objects FOR UPDATE
WITH CHECK (
  bucket_id = 'media' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete media files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media' AND
  auth.role() = 'authenticated'
);

-- Insert sample gallery items
INSERT INTO media_files (name, file_url, file_type, file_size, category, metadata)
VALUES 
  ('Sample Gallery Image 1', 'https://example.com/image1.jpg', 'image', 1024, 'gallery', '{"description": "Sample gallery image 1", "is_active": true}'),
  ('Sample Gallery Image 2', 'https://example.com/image2.jpg', 'image', 2048, 'gallery', '{"description": "Sample gallery image 2", "is_active": true}');

-- Insert sample LIC plans
INSERT INTO policies (name, description, min_sum_assured, max_sum_assured, min_term, max_term, features, is_active)
VALUES 
  ('LIC Jeevan Anand', 'A traditional endowment plan that offers both protection and savings', 100000, 10000000, 15, 35, '{"death_benefit": true, "maturity_benefit": true, "bonus": true}', true),
  ('LIC Term Plan', 'Pure term insurance plan with high coverage at low premium', 500000, 50000000, 10, 30, '{"death_benefit": true, "premium_waiver": true}', true); 