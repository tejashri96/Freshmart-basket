import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductId } from '../domain/catalog';
import { Quantities } from '../domain/pricing';

interface BasketState {
  quantities: Quantities;
}

const initialState: BasketState = { quantities: {} };

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    increment(state, { payload }: PayloadAction<ProductId>) {
      state.quantities[payload] = (state.quantities[payload] ?? 0) + 1;
    },
    decrement(state, { payload }: PayloadAction<ProductId>) {
      const next = (state.quantities[payload] ?? 0) - 1;
      if (next > 0) state.quantities[payload] = next;
      else delete state.quantities[payload];
    },
    clear: () => initialState,
  },
});

export const { increment, decrement, clear } = basketSlice.actions;
export default basketSlice.reducer;
