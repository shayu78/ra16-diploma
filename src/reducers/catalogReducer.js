const initialState = {
  catalogData: [],
  errorText: null,
  loadingStatus: false,
  hasNextData: false,
};

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case 'CATALOG_FIRSTPAGE_REQUEST':
      return {
        ...state, catalogData: [], errorText: null, loadingStatus: true,
      };
    case 'CATALOG_FIRSTPAGE_REQUEST_SUCCESS': {
      const { catalogData } = action.payload;
      return {
        ...state,
        catalogData,
        errorText: null,
        loadingStatus: false,
        hasNextData: catalogData.length === 6,
      };
    }
    case 'CATALOG_REQUEST_FAILURE': {
      const { errorText } = action.payload;
      return { ...state, errorText, loadingStatus: false };
    }
    case 'CATALOG_NEXTPAGE_REQUEST': {
      return { ...state, errorText: null, loadingStatus: true };
    }
    case 'CATALOG_NEXTPAGE_REQUEST_SUCCESS': {
      const { catalogData } = action.payload;
      return {
        ...state,
        catalogData: [...state.catalogData, ...catalogData],
        errorText: null,
        loadingStatus: false,
        hasNextData: catalogData.length === 6,
      };
    }
    default: return state;
  }
}
