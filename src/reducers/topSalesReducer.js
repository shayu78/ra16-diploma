const initialState = {
  topSalesData: [],
  errorText: null,
  loadingStatus: false,
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOPSALES_REQUEST': {
      return {
        ...state, topSalesData: [], errorText: null, loadingStatus: true,
      };
    }
    case 'TOPSALES_REQUEST_SUCCESS': {
      const { topSalesData } = action.payload;
      return {
        ...state, topSalesData, errorText: null, loadingStatus: false,
      };
    }
    case 'TOPSALES_REQUEST_FAILURE': {
      const { errorText } = action.payload;
      return {
        ...state, topSalesData: [], errorText, loadingStatus: false,
      };
    }
    default: return state;
  }
}
