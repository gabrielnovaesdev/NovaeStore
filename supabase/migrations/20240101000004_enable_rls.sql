-- Migration: 004_enable_rls
-- Description: Enables RLS and configures restrictive policies

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read active products, but no one can modify them via API directly.
-- (Modifications should be done via Edge Functions or Supabase Dashboard)
CREATE POLICY "Allow public read access to active products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (active = true);

-- Orders: No direct public access. Only service_role (Edge Functions) can read/write.
-- Users cannot query or mutate orders from the frontend directly.
-- (All interactions go through Edge Functions which use service_role)
CREATE POLICY "Deny all public access to orders"
ON public.orders
FOR ALL
TO anon, authenticated
USING (false);

-- Payment Events: No direct public access. Only service_role.
CREATE POLICY "Deny all public access to payment_events"
ON public.payment_events
FOR ALL
TO anon, authenticated
USING (false);
