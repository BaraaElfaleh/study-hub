// apps/admin-app/src/shared/utils/formatCurrency.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'ILS',
  }).format(amount);
}   