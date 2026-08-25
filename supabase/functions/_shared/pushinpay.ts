export async function createPixCharge(valueCents: number, webhookUrl: string) {
  const pushinPayUrl = Deno.env.get('PUSHINPAY_API_URL') || 'https://api.pushinpay.com.br/api';
  const token = Deno.env.get('PUSHINPAY_TOKEN');

  if (!token) {
    throw new Error('PUSHINPAY_TOKEN is not configured');
  }

  const response = await fetch(`${pushinPayUrl}/pix/cashIn`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: valueCents,
      webhook_url: webhookUrl,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`PushinPay API error (${response.status}):`, text);
    throw new Error('Failed to create PIX charge with PushinPay');
  }

  return await response.json();
}
