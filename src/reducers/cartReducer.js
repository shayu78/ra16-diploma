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
      const updateState = (currState, product) => (
        (currState.cartData.find(
          (value) => (value.id === product.id && value.size === product.size),
        ))
          ? [...currState.cartData.map(
            (value) => (value.id === product.id && value.size === product.size
              ? {
                ...value,
                count: value.count + product.count,
                price: (product.price < value.price) ? product.price : value.price,
              }
              : value),
          )]
          : [...currState.cartData, product]
      );
      const newState = updateState(state, cartProduct);
      localStorage.setItem('cartData', JSON.stringify(newState));
      return { ...state, cartData: newState };
    }
    case 'CART_DELETE_POSITION': {
      const { id, size } = action.payload;
      const updateState = () => (
        [...state.cartData.filter((value) => !(value.id === id && value.size === size))]
      );
      const newState = updateState();
      localStorage.setItem('cartData', JSON.stringify(newState));
      return { ...state, cartData: newState };
    }
    case 'CART_LOCALSTORAGE_CLEAR': {
      localStorage.removeItem('cartData');
      return { ...state, cartData: [] };
    }
    default: return state;
  }
}
