export function libraryListUrl(user_id: String, content_num: Number, page: Number = 0) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/?limit=${content_num}&offset=${page}`;
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

export function categoryDeleteUrl(user_id: String, library_id: Number, id: Number) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/${id}`;
};

export function categorySearchUrl(user_id: String, library_id: Number, word: String) {
  return `${import.meta.env.VITE_API_URL}/api/users/${user_id}/libraries/${library_id}/categories/?title=${word}`;
};