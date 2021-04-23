import fetchData, { fetchCompositeData } from './fetch';

const urlCatalog = `${process.env.REACT_APP_SERVER_URL}items`;

export const createTopSales = async () => {
  const urlTopSales = `${process.env.REACT_APP_SERVER_URL}top-sales`;
  const opts = { method: 'GET' };
  return fetchData(urlTopSales, opts);
};

export const createProduct = async (id) => {
  const opts = { method: 'GET' };
  return fetchData(`${urlCatalog}/${id}`, opts);
};

export const createOrder = async (phone, address, cartData) => {
  const urlOrder = `${process.env.REACT_APP_SERVER_URL}order`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      owner: {
        phone,
        address,
      },
      items: cartData.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.count,
      })),
    }),
  };
  return fetchData(urlOrder, opts);
};

export const createCatalog = async (searchText, categoryId, offset) => {
  const opts = { method: 'GET' };
  return fetchData(`${urlCatalog}?q=${searchText}&categoryId=${categoryId}&offset=${offset}`, opts);
};

export const createCatalogAndCategories = async (searchText, categoryId, offset) => {
  const urlCategories = `${process.env.REACT_APP_SERVER_URL}categories`;
  const opts = { method: 'GET' };
  return fetchCompositeData([urlCategories, `${urlCatalog}?q=${searchText}&categoryId=${categoryId}&offset=${offset}`], opts);
};
