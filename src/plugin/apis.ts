export function userCreateUrl() {
  return `${import.meta.env.VITE_API_URL}/api/users/`;
};

export function userDetailUrl(user_id: String) {
  return `${import.meta.env.VITE_API_URL}/api/users/?sub=${user_id}`;
};

export function libraryListUrl(user_id: String, content_num: Number, page: Number = 0) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/?limit=${content_num}&offset=${page}`;
};

export function libraryCreateUrl(user_id: String) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/`;
};

export function libraryEditUrl(user_id: String, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${id}/`;
};

export function libraryDeleteUrl(user_id: String, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${id}`;
};

export function librarySearchUrl(user_id: String, word: String) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/?title=${word}`;
};

export function categoryListUrl(user_id: String, library_id: Number, content_num: Number, page: Number = 0) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/?limit=${content_num}&offset=${page}`;
};

export function categoryCreateUrl(user_id: String, library_id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/`;
};

export function categoryEditUrl(user_id: String, library_id: Number, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${id}/`;
};

export function categoryDeleteUrl(user_id: String, library_id: Number, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${id}`;
};

export function categorySearchUrl(user_id: String, library_id: Number, word: String) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/?title=${word}`;
};

export function keywordListUrl(user_id: String, library_id: Number, category_id: Number, content_num: Number, page: Number = 0) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/?limit=${content_num}&offset=${page}`;
};

export function keywordCreateUrl(user_id: String, library_id: Number, category_id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/`;
};

export function keywordEditUrl(user_id: String, library_id: Number, category_id: Number, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/${id}/`;
};

export function keywordDeleteUrl(user_id: String, library_id: Number, category_id: Number, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords/${id}`;
};

export function keywordSearchUrl(user_id: String, library_id: Number, category_id: Number, word: String) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${category_id}/keywords?title=${word}`;
};
