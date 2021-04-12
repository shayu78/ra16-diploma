const initialState = {
  categoriesData: [],
  activeCategory: 0,
  errorText: null,
  loadingStatus: false,
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORIES_REQUEST': {
      return {
        ...state, categoriesData: [], errorText: null, loadingStatus: true,
      };
    }
    case 'CATEGORIES_REQUEST_SUCCESS': {
      const { categoriesData } = action.payload;
      return {
        ...state, categoriesData: [{ id: 0, title: 'Все' }, ...categoriesData], errorText: null, loadingStatus: false,
      };
    }
    case 'CATEGORIES_REQUEST_FAILURE': {
      const { errorText } = action.payload;
      return {
        ...state, categoriesData: [], errorText, loadingStatus: false,
      };
    }
    case 'ACTIVE_CATEGORY': {
      const { activeCategory } = action.payload;
      return { ...state, activeCategory };
    }
    default: return state;
  }
}
