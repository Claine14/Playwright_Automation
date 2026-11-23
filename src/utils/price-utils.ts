export function parseGbpPrice(rawPrice: string): number {
  const cleaned = rawPrice.replace(/[^0-9.]/g, '');
  const value = parseFloat(cleaned);
  if (Number.isNaN(value)) {
    throw new Error(`Unable to parse price from text: "${rawPrice}"`);
  }
  return Number(value.toFixed(2));
}

export function formatGbpPrice(amount: number): string {
  return `£${amount.toFixed(2)}`;
}
