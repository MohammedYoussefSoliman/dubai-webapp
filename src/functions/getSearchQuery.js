/**
 * this function takes a search query param key and returns its value
 *
 * @param {string} queryParam
 * @returns string
 */

export default function getSearchQuery(queryParam) {
  var paramsString = window.location.search;
  var searchParams = new URLSearchParams(paramsString);
  let query = searchParams.get(queryParam);
  return query;
}
