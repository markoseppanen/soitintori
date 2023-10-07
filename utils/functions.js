const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
    return json;
  } catch (error) {
    throw new Error('doFetch failed: ' + error.message);
  }
};

const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const fetchCategoryArray = (mediaArray) => {
  const categoryArray = mediaArray
    .map((item) => {
      try {
        const description = JSON.parse(item.description.replace(/\\/g, ''));
        return {
          ...item,
          description,
        };
      } catch (error) {
        console.error('Categories parsing error:', error);
        return item;
      }
    })
    .filter(
      (item) =>
        item.description && item.description.categoryTitle !== undefined,
    );

  const sortedCategoryArray = categoryArray.sort(
    (a, b) => a.description.categoryId - b.description.categoryId,
  );

  return sortedCategoryArray;
};

const createInstrumentArray = (mediaArray) => {
  const instrumentArray = mediaArray
    .map((item) => {
      try {
        const description = JSON.parse(item.description.replace(/\\/g, ''));
        return {
          ...item,
          description,
        };
      } catch (error) {
        console.error('Parsing error:', error);
        return item;
      }
    })
    .filter(
      (item) => item.description && item.description.category !== undefined,
    );

  return instrumentArray;
};

const formatDateFromISO = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export {
  doFetch,
  formatDate,
  fetchCategoryArray,
  createInstrumentArray,
  formatDateFromISO,
};
