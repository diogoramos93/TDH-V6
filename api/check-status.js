import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zfgyflrzddjlnqmryxuy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3lmbHJ6ZGRqbG5xbXJ5eHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDYwMTYsImV4cCI6MjA4MDEyMjAxNn0.IwUGkuqNndfAfxP3MP_4bReUHYOPTu0QIwmeKFmhLK8'
);

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) return res.status(400).json({ error: 'Missing ID' });

  const { data, error } = await supabase
    .from('sales')
    .select('status')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ status: data.status });
}