const initialState = {
  product: null,
  errorText: null,
  loadingStatus: false,
  count: 1,
  size: null,
  repeatAction: true,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'PRODUCT_REQUEST': {
      return {
        ...state, errorText: null, loadingStatus: true, count: 1, size: null,
      };
    }
    case 'PRODUCT_REQUEST_SUCCESS': {
      const { product } = action.payload;
      return {
        ...state, product, errorText: null, loadingStatus: false,
      };
    }
    case 'PRODUCT_REQUEST_FAILURE': {
      const { errorText, repeatAction } = action.payload;
      return {
        ...state, product: null, errorText, repeatAction, loadingStatus: false,
      };
    }
    case 'PRODUCT_COUNT': {
      const { count } = action.payload;
      return { ...state, count };
    }
    case 'PRODUCT_SIZE': {
      const { size } = action.payload;
      return { ...state, size };
    }
    default: return state;
  }
}
