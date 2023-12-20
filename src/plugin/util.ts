import { item } from "@/../config.json";

export const timeFormat = (timeStr) => {
  const date = new Date(timeStr);
  return `${date.getFullYear().toString()}` +
    `/${(date.getMonth() + 1).toString().padStart(2, '0')}` +
    `/${date.getDate().toString().padStart(2, '0')}`;
};

export const titleForView = (title, contentType): void => {
  let maxLength = 0;
  switch(contentType) {
    case 'library':
      maxLength = item.library.titleMaxLength;
      break;
    case 'category':
      maxLength = item.category.titleMaxLength;
      break;
    case 'keyword':
      maxLength = item.keyword.titleMaxLength;
      break;
    default:
      maxLength = item.tag.titleMaxLength;
      break;
  }
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};
export const contentForView = (content, contentType): void => {
  let maxLength = 0;
  switch(contentType) {
    case 'library':
      maxLength = item.library.contentMaxLength;
      break;
    case 'category':
      maxLength = item.category.contentMaxLength;
      break;
    case 'keyword':
      maxLength = item.keyword.contentMaxLength;
      break;
    default:
      break;
  }
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
};
