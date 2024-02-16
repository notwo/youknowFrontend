const apiBaseUrl = import.meta.env.VITE_API_URL;
const auth0ApiBaseUrl = import.meta.env.VITE_AUTH0_API_URL;

export function userApi() {
  function createUrl() {
    return `${apiBaseUrl}/api/users/`;
  }
  function detailBySubUrl(sub: String) {
    return `${apiBaseUrl}/api/users/?sub=${sub}`;
  }
  function detailUrl(uuid: String) {
    return `${apiBaseUrl}/api/users/${uuid}/`;
  }
  function auth0UserUrl(sub: String) {
    return `${auth0ApiBaseUrl}/users/${sub}`;
  }
  function checkDuplicateUserNameUrl(username: String) {
    return `${apiBaseUrl}/api/users/username_duplicated/?username=${username}`;
  }
  function checkDuplicateEmailUrl(email: String) {
    return `${apiBaseUrl}/api/users/email_duplicated/?email=${email}`;
  }

  return {
    createUrl,
    detailBySubUrl,
    detailUrl,
    auth0UserUrl,
    checkDuplicateUserNameUrl,
    checkDuplicateEmailUrl
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
  function searchUrl(sub: String, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/?title=${title}`;
  }
  function searchByTagUrl(sub: String, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/search_by_tag/?title=${title}`;
  }
  function searchByContentUrl(sub: String, content: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/search_by_content/?content=${content}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl,
    searchByTagUrl,
    searchByContentUrl
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
  function searchUrl(sub: String, library_id: Number, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/?title=${title}`;
  }
  function searchByTagUrl(sub: String, library_id: Number, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/search_by_tag/?title=${title}`;
  }
  function searchByContentUrl(sub: String, library_id: Number, content: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/search_by_content/?content=${content}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl,
    searchByTagUrl,
    searchByContentUrl
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
  function searchUrl(sub: String, library_id: Number, category_id: Number, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords?title=${title}`;
  }
  function searchByTagUrl(sub: String, library_id: Number, category_id: Number, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords/search_by_tag/?title=${title}`;
  }
  function searchByContentUrl(sub: String, library_id: Number, category_id: Number, content: String) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords/search_by_content/?content=${content}`;
  }
  function moveUrl(sub: String, library_id: Number, category_id: Number, id: Number, move_category_id: Number) {
    return `${apiBaseUrl}/api/users/${sub}/libraries/${library_id}/categories/${category_id}/keywords/${id}/move/?move_category_id=${move_category_id}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl,
    searchByTagUrl,
    searchByContentUrl,
    moveUrl
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
  function searchUrl(sub: String, title: String) {
    return `${apiBaseUrl}/api/users/${sub}/tags?title=${title}`;
  }

  return {
    listUrl,
    detailUrl,
    createUrl,
    searchUrl
  }
};
