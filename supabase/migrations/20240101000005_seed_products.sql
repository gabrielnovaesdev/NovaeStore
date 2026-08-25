-- Migration: 005_seed_products
-- Description: Seeds the products table with demonstration data

INSERT INTO public.products (id, name, slug, description, platform, category, image_url, price_cents, original_price_cents, badge, discount_percentage, delivery_url, active, featured)
VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Grand Theft Auto IV',
    'gta-iv',
    'Grand Theft Auto IV é um jogo de ação e aventura em mundo aberto.',
    'PC',
    'Ação',
    'https://placeholder.com/gta4.png',
    4990,
    9990,
    '50% OFF',
    50,
    NULL,
    true,
    true
),
(
    '22222222-2222-2222-2222-222222222222',
    'EA SPORTS FC 24',
    'ea-sports-fc-24',
    'O jogo de todo mundo.',
    'PS5',
    'Esportes',
    'https://placeholder.com/fc24.png',
    29990,
    35990,
    'Lançamento',
    16,
    NULL,
    true,
    true
),
(
    '33333333-3333-3333-3333-333333333333',
    'Red Dead Redemption 2',
    'rdr2',
    'Uma história épica de honra e lealdade.',
    'PC',
    'Ação/Aventura',
    'https://placeholder.com/rdr2.png',
    9990,
    29990,
    '-66%',
    66,
    NULL,
    true,
    true
);
