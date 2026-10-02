import { describe, expect, it } from 'vitest';
import reducer, { clear, decrement, increment } from './basketSlice';

const emptyBasket = reducer(undefined, { type: 'start' });

describe('basketSlice', () => {
  it('adds a product', () => {
    const state = reducer(emptyBasket, increment('milk'));
    expect(state.quantities.milk).toBe(1);
  });

  it('removes the product when the quantity reaches zero', () => {
    const state = reducer(reducer(emptyBasket, increment('milk')), decrement('milk'));
    expect(state.quantities.milk).toBeUndefined();
  });

  it('clears the basket', () => {
    const state = reducer(reducer(emptyBasket, increment('soup')), clear());
    expect(state.quantities).toEqual({});
  });
});
