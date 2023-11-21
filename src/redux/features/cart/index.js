import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];
export const addItem = createAction("ADD_ITEM");
export const removeAllItems = createAction("REMOVE_ALL_ITEMS");
export const removeItem = createAction("REMOVE_ITEM");
export const increaseItem = createAction("INCREASE_ITEM");
export const decreaseItem = createAction("DECREASE_ITEM");

export default createReducer(INITIAL_STATE, {
  [addItem.type]: (state, action) => {
    // Verifica se o elemento já existe no array
    const elementoExistente = state.some(
      (item) => item._id === action.payload._id
    );

    // Se o elemento não existir, adiciona ao array
    if (!elementoExistente) {
      return [...state, action.payload];
    } else {
      return [...state];
    }
  },
  [removeItem.type]: (state, action) =>
    state.filter((item) => item._id !== action.payload),
  [removeAllItems.type]: (state, action) => [],

  [increaseItem.type]: (state, action) => {
    const cartIndex = state.findIndex((item) => item._id === action.payload);

    if (cartIndex !== -1) {
      let newState = [...state];
      newState[cartIndex] = {
        ...newState[cartIndex],
        qtd: newState[cartIndex].qtd + 1,
      };

      return newState;
    }
  },
  [decreaseItem.type]: (state, action) => {
    const cartIndex = state.findIndex((item) => item._id === action.payload);

    if (cartIndex !== -1) {
      let newState = [...state];
      newState[cartIndex] = {
        ...newState[cartIndex],
        qtd: newState[cartIndex].qtd - 1,
      };
      if (newState[cartIndex].qtd < 0) {
        newState[cartIndex] = { ...newState[cartIndex], qtd: 1 };
      }

      return newState;
    }
  },
});
