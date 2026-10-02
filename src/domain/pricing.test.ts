import { describe, expect, it } from 'vitest';
import { calculateBill } from './pricing';

describe('calculateBill', () => {
  it('returns zero for an empty basket', () => {
    expect(calculateBill({})).toMatchObject({ subtotal: 0, totalSavings: 0, total: 0 });
  });

  it('matches the sample: 1 soup, 3 bread, 1 butter', () => {
    const bill = calculateBill({ soup: 1, bread: 3, butter: 1 });
    expect(bill.subtotal).toBe(510);
    expect(bill.totalSavings).toBe(95);
    expect(bill.total).toBe(415);
  });

  it('gives every second cheese free', () => {
    expect(calculateBill({ cheese: 3 }).totalSavings).toBe(90);
    expect(calculateBill({ cheese: 4 }).totalSavings).toBe(180);
  });

  it('discounts only as many breads as there are soups', () => {
    expect(calculateBill({ soup: 2, bread: 1 }).totalSavings).toBe(55);
    expect(calculateBill({ soup: 1, bread: 2 }).totalSavings).toBe(55);
  });

  it('takes a third off each butter', () => {
    expect(calculateBill({ butter: 2 }).totalSavings).toBe(80);
  });
});
