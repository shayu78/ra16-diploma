const initialState = {
  phone: '',
  address: '',
  agreement: false,
  loadingStatus: false,
  errorText: null,
  operationResult: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_INIT': {
      return {
        ...state, errorText: null, loadingStatus: false, operationResult: false,
      };
    }
    case 'ORDER_REQUEST': {
      return {
        ...state, errorText: null, loadingStatus: true, operationResult: false,
      };
    }
    case 'ORDER_REQUEST_SUCCESS': {
      return {
        ...state, errorText: null, loadingStatus: false, operationResult: true,
      };
    }
    case 'ORDER_REQUEST_FAILURE': {
      const { errorText } = action.payload;
      return {
        ...state, errorText, loadingStatus: false, operationResult: false,
      };
    }
    case 'ORDER_PHONE': {
      const { phone } = action.payload;
      return { ...state, phone };
    }
    case 'ORDER_ADDRESS': {
      const { address } = action.payload;
      return { ...state, address };
    }
    case 'ORDER_AGREEMENT': {
      const { agreement } = action.payload;
      return { ...state, agreement };
    }
    default: return state;
  }
}
