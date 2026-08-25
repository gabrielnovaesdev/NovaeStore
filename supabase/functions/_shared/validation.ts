export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // Simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
