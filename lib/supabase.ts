import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zfgyflrzddjlnqmryxuy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3lmbHJ6ZGRqbG5xbXJ5eHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDYwMTYsImV4cCI6MjA4MDEyMjAxNn0.IwUGkuqNndfAfxP3MP_4bReUHYOPTu0QIwmeKFmhLK8';

export const supabase = createClient(supabaseUrl, supabaseKey);