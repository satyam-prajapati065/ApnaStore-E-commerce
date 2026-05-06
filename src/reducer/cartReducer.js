export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exist = state.find((item) => item.id === action.payload.id);
      if (exist) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }
    case "REMOVE_FROM_CART": {
      const exist = state.find((item) => item.id === action.payload.id);

      if (exist && exist.quantity === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      }

      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    }
    default:
      return state;
  }
};
