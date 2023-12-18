const apiBaseUrl = import.meta.env.VITE_API_URL;

export function userApi() {
  function createUrl() {
    return `${apiBaseUrl}/api/users/`;
  }
  function detailBySubUrl(sub) {
    return `${apiBaseUrl}/api/users/?sub=${sub}`;
  }
  function detailUrl(uuid: String) {
    return `${apiBaseUrl}/api/users/${uuid}/`;
  }
  function checkDuplicateUserNameUrl(username: String) {
    return `${apiBaseUrl}/api/users/username_duplicated/?username=${username}`;
  }

  return {
    createUrl,
    detailBySubUrl,
    detailUrl,
    checkDuplicateUserNameUrl
  }
};

export function libraryApi() {
  function listUrl(sub: String, content_num: Number, page: Number = 0) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/?limit=${content_num}&offset=${page}`;
  }
  function detailUrl(sub: String, id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${id}/`;
  }
  function createUrl(sub: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/`;
  }
  function searchUrl(sub: String, word: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/?title=${word}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl
  }
};

export function categoryApi() {
  function listUrl(sub: String, library_id: Number, content_num: Number, page: Number = 0) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/?limit=${content_num}&offset=${page}`;
  }
  function detailUrl(sub: String, library_id: Number, id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${id}/`;
  }
  function createUrl(sub: String, library_id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/`;
  }
  function searchUrl(sub: String, library_id: Number, word: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/?title=${word}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl
  }
};

export function keywordApi() {
  function listUrl(sub: String, library_id: Number, category_id: Number, content_num: Number, page: Number = 0) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords/?limit=${content_num}&offset=${page}`;
  }
  function detailUrl(sub: String, library_id: Number, category_id: Number, id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords/${id}/`;
  }
  function createUrl(sub: String, library_id: Number, category_id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords/`;
  }
  function searchUrl(sub: String, library_id: Number, category_id: Number, word: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords?title=${word}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl
  }
};

export function tagApi() {
  function listUrl(sub: String, keyword_id: Number, content_num: Number, page: Number = 0) {
    if (keyword_id > 1) {
      return `${apiBaseUrl}/api/users/${sub}/tags?limit=${content_num}&offset=${page}&keyword_id=${keyword_id}`;
    }
    return `${apiBaseUrl}/api/users/${sub}/tags?limit=${content_num}&offset=${page}`;
  }
  function createUrl(sub: String) {
    return `${apiBaseUrl}/api/users/${sub}/tags/`;
  }
  function detailUrl(sub: String, id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/tags/${id}/`;
  }
  function searchUrl(sub: String, word: String) {
    return `${apiBaseUrl}/api/users/${sub}/tags?title=${word}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl
  }
};
