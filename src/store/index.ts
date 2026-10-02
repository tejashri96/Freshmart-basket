import { configureStore, createSelector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import basketReducer from './basketSlice';
import { calculateBill } from '../domain/pricing';

export const store = configureStore({ reducer: { basket: basketReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectQuantities = (s: RootState) => s.basket.quantities;
export const selectBill = createSelector(selectQuantities, calculateBill);
