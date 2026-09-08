export function formatTZS(amount: number) {
  return `TZS ${amount.toLocaleString("en-US")}`;
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
