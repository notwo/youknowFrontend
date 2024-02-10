import { ref, readonly } from "vue";

export function titles() {
  const library = ref('');
  const category = ref('');
  const keyword = ref('');

  function setLibrary(val) {
    library.value = val;
  }

  function setCategory(val) {
    category.value = val;
  }

  function setKeyword(val) {
    keyword.value = val;
  }

  return { library: readonly(library), category: readonly(category), keyword: readonly(keyword), setLibrary, setCategory, setKeyword };
};

