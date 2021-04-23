export const cartLocalStorageClear = () => ({ type: 'CART_LOCALSTORAGE_CLEAR' });
export const cartAddPosition = (cartProduct) => ({ type: 'CART_ADD_POSITION', payload: { cartProduct } });
export const cartDeletePosition = (id, size) => ({ type: 'CART_DELETE_POSITION', payload: { id, size } });
