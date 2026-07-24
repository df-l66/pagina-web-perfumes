export type QualityType = 'Original' | '1.1' | 'Preparada';

export const QUALITIES: QualityType[] = ['Original', '1.1', 'Preparada'];

/**
 * Calculates the price for a given quality level based on original base price.
 * - Original: 100% of base price
 * - 1.1: ~45% of base price (Premium replica)
 * - Preparada: ~25% of base price (Essential oil formulation)
 */
export function getPriceForQuality(basePrice: number, quality: string): number {
  switch (quality) {
    case '1.1':
      return Math.max(15, Math.round(basePrice * 0.45));
    case 'Preparada':
      return Math.max(10, Math.round(basePrice * 0.25));
    case 'Original':
    default:
      return basePrice;
  }
}

export function getQualityBadgeStyles(quality: string): string {
  switch (quality) {
    case '1.1':
      return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    case 'Preparada':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    case 'Original':
    default:
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  }
}
