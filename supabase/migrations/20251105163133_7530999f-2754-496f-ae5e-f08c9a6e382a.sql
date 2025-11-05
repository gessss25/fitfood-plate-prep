-- Add nutritionist and courier roles to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'nutritionist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'courier';