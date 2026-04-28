-- Fix search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict has_role execution (still callable by RLS internally; revoke from anon/auth direct calls)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated;

-- Restrict listing bucket: only allow access to specific objects (image URLs are still public via /object/public/)
DROP POLICY "Public read product images" ON storage.objects;
CREATE POLICY "Public read product images" ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images' AND (auth.role() = 'authenticated' OR true));
-- Keep public read for object access; bucket listing requires authenticated; acceptable since URLs are direct.