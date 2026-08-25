export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  platform: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: 'Mais vendido' | 'Lançamento' | 'Oferta' | 'Destaque' | string;
  discount?: number;
  featured?: boolean;
  developer?: string;
  rating?: number;
};

export type CheckoutState = 
  | 'idle' 
  | 'creating_payment' 
  | 'payment_pending' 
  | 'payment_paid' 
  | 'payment_error';

export type CreatePaymentResponse = {
  charge_id: string;
  qr_code_image: string;
  pix_copy_paste: string;
  product_id: string;
};

export type PaymentStatusResponse = {
  status: 'pending' | 'paid' | 'failed';
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  game: string;
  comment: string;
  rating: number;
  avatar: string;
};
