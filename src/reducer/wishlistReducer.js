export const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE": {
      const exist = state.find((item) => item.id === action.payload.id);
      if (exist) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        return [...state, action.payload];
      }
    }
    default:
      return state;
  }
};
