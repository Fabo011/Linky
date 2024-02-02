/*Give users access to own folder*/
bucket_id = 'linky' AND auth.uid()::text = (storage.foldername(name))[1]

CREATE POLICY "Give users access to own folder 1pb5xb_0" ON storage.objects FOR SELECT TO public USING (bucket_id = 'linky' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Give users access to own folder 1pb5xb_1" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'linky' AND auth.uid()::text = (storage.foldername(name))[1]);

/*Gives users authenticated access to their folder*/
bucket_id = 'linky' AND (storage.foldername(name))[1] = 'private' AND auth.role() = 'authenticated'

CREATE POLICY "Give users authenticated access to folder 1pb5xb_0" ON storage.objects FOR SELECT TO public USING (bucket_id = 'linky' AND (storage.foldername(name))[1] = 'private' AND auth.role() = 'authenticated');

CREATE POLICY "Give users authenticated access to folder 1pb5xb_1" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'linky' AND (storage.foldername(name))[1] = 'private' AND auth.role() = 'authenticated');
