export const findResultsTitle = (results) => {
  if (typeof results !== "object") return "";

  const keys = Object.keys(results);
  if (keys.length === 0) return "";

  const searchRegex = /query=([^&]*)/;
  const queryInput = results[keys[0]].href;
  const searchField = queryInput.match(searchRegex)[1];
  const capitalizedTitle = keys[0][0].toUpperCase() + keys[0].slice(1);

  return `Showing ${capitalizedTitle} for '${searchField}'`;
};

export const determineNextAndPreviousSetSearchParams = (results) => {
  const nextSearchParams = {
    isAvailable: false,
  };
  const queryRegex = /query=([^&]*)/;
  const typeQuery = /type=([^&]*)/;
  const offsetQuery = /offset=([^&]*)/;
  const limitQuery = /limit=([^&]*)/;

  if (results === null) return nextSearchParams;

  if (
    results.match(queryRegex) &&
    results.match(typeQuery) &&
    results.match(offsetQuery) &&
    results.match(limitQuery)
  ) {
    nextSearchParams.query = results.match(queryRegex)[1];
    nextSearchParams.type = results.match(typeQuery)[1];
    nextSearchParams.offset = parseInt(results.match(offsetQuery)[1]);
    nextSearchParams.limit = parseInt(results.match(limitQuery)[1]);
    nextSearchParams.isAvailable = true;
  }

  return nextSearchParams;
};

export const gatherResultItemsArray = (results) => {
  const itemArray = [];
  const keys = Object.keys(results);

  if (keys.length === 0) return itemArray;

  results[keys[0]].items.forEach((resultItem) => {
    itemArray.push({ ...resultItem });
  });

  return itemArray;
};
