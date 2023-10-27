const apiBaseUrl = import.meta.env.VITE_API_URL;

export function userApi() {
  function createUrl() {
    return `${apiBaseUrl}/api/users/`;
  }
  function detailUrl(user_id: String) {
    return `${apiBaseUrl}/api/users/?sub=${user_id}`;
  }

  return {
    createUrl,
    detailUrl
  }
};

export function libraryApi() {
  function listUrl(user_id: String, content_num: Number, page: Number = 0) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/?limit=${content_num}&offset=${page}`;
  }
  function createUrl(user_id: String) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/`;
  }
  function editUrl(user_id: String, id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${id}/`;
  }
  function deleteUrl(user_id: String, id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${id}`;
  }
  function searchUrl(user_id: String, word: String) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/?title=${word}`;
  }

  return {
    listUrl,
    createUrl,
    editUrl,
    deleteUrl,
    searchUrl
  }
};

export function categoryApi() {
  function listUrl(user_id: String, library_id: Number, content_num: Number, page: Number = 0) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/?limit=${content_num}&offset=${page}`;
  }
  function createUrl(user_id: String, library_id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/`;
  }
  function searchUrl(user_id: String, library_id: Number, word: String) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/?title=${word}`;
  }
  function editUrl(user_id: String, library_id: Number, id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${id}/`;
  }
  function deleteUrl(user_id: String, library_id: Number, id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${id}`;
  }

  return {
    listUrl,
    createUrl,
    editUrl,
    deleteUrl,
    searchUrl
  }
};

export function keywordApi() {
  function listUrl(user_id: String, library_id: Number, category_id: Number, content_num: Number, page: Number = 0) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/?limit=${content_num}&offset=${page}`;
  }
  function createUrl(user_id: String, library_id: Number, category_id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/`;
  }
  function editUrl(user_id: String, library_id: Number, category_id: Number, id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/${id}/`;
  }
  function deleteUrl(user_id: String, library_id: Number, category_id: Number, id: Number) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/${id}`;
  }
  function searchUrl(user_id: String, library_id: Number, category_id: Number, word: String) {
    return `${apiBaseUrl}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords?title=${word}`;
  }

  return {
    listUrl,
    createUrl,
    editUrl,
    deleteUrl,
    searchUrl
  }
};
