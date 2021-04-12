export default async function fetchData(url, opts) {
  let response = null;
  let detailedError = null;
  try {
    response = await fetch(url, opts);
    if (!response.ok) {
      detailedError = JSON.stringify({ code: response.status, text: 'Ошибка загрузки данных' });
      throw new Error(detailedError);
    }
    if (response.status === 204) return [];
  } catch (e) {
    if (!response) detailedError = JSON.stringify({ code: 500, text: 'Ошибка загрузки данных' });
    throw new Error(detailedError);
  }
  const data = await response.json();
  return data;
}

export async function fetchCompositeData(urls, opts) {
  const results = await Promise.all(urls.map((url) => fetch(url, opts)
    .then((response) => response.json())
    // eslint-disable-next-line no-unused-vars
    .catch((e) => {
      const detailedError = JSON.stringify({ code: 500, text: 'Ошибка загрузки данных' });
      throw new Error(detailedError);
    })));
  return results;
}
