-- ============================================================
-- AMBEDKAR SIKHYA — Supabase Database & Storage Setup
-- Run this script in your Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Create MCQ Questions table
create table if not exists public.questions (
    id uuid default gen_random_uuid() primary key,
    class_level text not null,        -- e.g. 'Government & Competitive Exams', 'Odisha General Studies', 'Teaching Exams', 'Class 10'
    subject text not null,            -- e.g. 'Ancient Indian History', 'Odisha History', 'Indian Polity', 'Mathematics'
    topic text not null,              -- e.g. 'Real Numbers', 'Child Development', 'Optics'
    question_text text not null,
    option_a text not null,
    option_b text not null,
    option_c text not null,
    option_d text not null,
    correct_option text not null check (correct_option in ('A', 'B', 'C', 'D')),
    explanation text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Study Materials (PDFs & Question Papers) table
create table if not exists public.materials (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    class_level text not null,
    subject text not null,
    topic text,
    category text default 'PDFs & Notes' check (category in ('PDFs & Notes', 'Questions')),
    file_url text not null,
    file_name text not null,
    file_size text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.questions enable row level security;
alter table public.materials enable row level security;

-- 4. Policies for Questions:
-- Anyone (visitors/students) can view questions without logging in
create policy "Public can view questions"
on public.questions for select
using (true);

-- Only authenticated admin can add/edit/delete questions
create policy "Admin can insert questions"
on public.questions for insert
to authenticated
with check (true);

create policy "Admin can update questions"
on public.questions for update
to authenticated
using (true);

create policy "Admin can delete questions"
on public.questions for delete
to authenticated
using (true);

-- 5. Policies for Materials (PDFs):
-- Anyone (visitors/students) can view and download materials without logging in
create policy "Public can view materials"
on public.materials for select
using (true);

-- Only authenticated admin can add/edit/delete materials
create policy "Admin can insert materials"
on public.materials for insert
to authenticated
with check (true);

create policy "Admin can update materials"
on public.materials for update
to authenticated
using (true);

create policy "Admin can delete materials"
on public.materials for delete
to authenticated
using (true);

-- 6. Storage Bucket setup for PDF uploads
insert into storage.buckets (id, name, public)
values ('study-materials', 'study-materials', true)
on conflict (id) do update set public = true;

-- Storage Bucket Policies
create policy "Public can view and download study-materials"
on storage.objects for select
using (bucket_id = 'study-materials');

create policy "Admin can upload files to study-materials"
on storage.objects for insert
to authenticated
with check (bucket_id = 'study-materials');

create policy "Admin can delete files in study-materials"
on storage.objects for delete
to authenticated
using (bucket_id = 'study-materials');

