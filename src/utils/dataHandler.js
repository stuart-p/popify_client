import stockImg from "../images/popifyLogo.png";

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

export const findResultsType = (results) => {
  if (typeof results !== "object") return "";

  const keys = Object.keys(results);
  if (keys.length === 0) return "";

  return keys[0];
};

export const determineNextAndPreviousSetSearchParams = (results) => {
  const nextSearchParams = {
    isPrevAvailable: false,
    isNextAvailable: false,
    prev: {},
    next: {},
  };
  const queryRegex = /query=([^&]*)/;
  const typeQuery = /type=([^&]*)/;
  const offsetQuery = /offset=([^&]*)/;
  const limitQuery = /limit=([^&]*)/;

  if (results === null) return nextSearchParams;

  const keys = Object.keys(results);
  if (keys.length === 0) return nextSearchParams;

  if (results[keys[0]].previous) {
    if (
      results[keys[0]].previous.match(queryRegex) &&
      results[keys[0]].previous.match(typeQuery) &&
      results[keys[0]].previous.match(offsetQuery) &&
      results[keys[0]].previous.match(limitQuery)
    ) {
      nextSearchParams.prev.query = results[keys[0]].previous.match(
        queryRegex
      )[1];
      nextSearchParams.prev.type = results[keys[0]].previous.match(
        typeQuery
      )[1];
      nextSearchParams.prev.offset = parseInt(
        results[keys[0]].previous.match(offsetQuery)[1]
      );
      nextSearchParams.prev.limit = parseInt(
        results[keys[0]].previous.match(limitQuery)[1]
      );
      nextSearchParams.isPrevAvailable = true;
    }
  }
  if (results[keys[0]].next) {
    if (
      results[keys[0]].next.match(queryRegex) &&
      results[keys[0]].next.match(typeQuery) &&
      results[keys[0]].next.match(offsetQuery) &&
      results[keys[0]].next.match(limitQuery)
    ) {
      nextSearchParams.next.query = results[keys[0]].next.match(queryRegex)[1];
      nextSearchParams.next.type = results[keys[0]].next.match(typeQuery)[1];
      nextSearchParams.next.offset = parseInt(
        results[keys[0]].next.match(offsetQuery)[1]
      );
      nextSearchParams.next.limit = parseInt(
        results[keys[0]].next.match(limitQuery)[1]
      );
      nextSearchParams.isNextAvailable = true;
    }
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

export const fetchThumbnailImgUrl = (imageArray) => {
  let imageURL = stockImg;

  if (imageArray.length > 1) {
    imageURL = imageArray[1].url;
  }
  return imageURL;
};
