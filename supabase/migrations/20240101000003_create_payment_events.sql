-- Migration: 003_create_payment_events
-- Description: Creates the payment_events table for webhook auditing and idempotency

CREATE TABLE public.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    charge_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    received_at TIMESTAMPTZ DEFAULT now(),
    processed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_payment_events_charge_id ON public.payment_events(charge_id);
