const getLocalStorageData = () => {
  try {
    const data = JSON.parse(localStorage.getItem('cartData'));
    return data;
  } catch (error) {
    return [];
  }
};

const initialState = {
  cartData: localStorage.getItem('cartData') ? getLocalStorageData() : [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'CART_ADD_POSITION': {
      const { cartProduct } = action.payload;
      return {
        ...state,
        cartData:
          (state.cartData.find(
            (value) => (value.id === cartProduct.id && value.size === cartProduct.size),
          ))
            ? [...state.cartData.map(
              (value) => (value.id === cartProduct.id && value.size === cartProduct.size
                ? {
                  ...value,
                  count: value.count + cartProduct.count,
                  price: (cartProduct.price < value.price) ? cartProduct.price : value.price,
                }
                : value),
            )]
            : [...state.cartData, cartProduct],
      };
    }
    case 'CART_DELETE_POSITION': {
      const { id, size } = action.payload;
      return {
        ...state,
        cartData: [...state.cartData.filter((value) => !(value.id === id && value.size === size))],
      };
    }
    case 'CART_LOCALSTORAGE_CLEAR': {
      localStorage.removeItem('cartData');
      return { ...state, cartData: [] };
    }
    default: return state;
  }
}
