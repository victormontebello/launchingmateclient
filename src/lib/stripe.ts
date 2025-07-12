// Função para criar sessão de checkout via backend
export async function createCheckoutSession({
  priceId,
  customerEmail
}: {
  priceId: string;
  customerEmail?: string;
}) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      userId: 'user-id',
      email: customerEmail,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao criar sessão de checkout');
  }

  const { sessionId } = await response.json();
  return { id: sessionId };
} 