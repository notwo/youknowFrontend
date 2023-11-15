import { ref, reactive, readonly } from "vue";

export function useStore() {
  const items = reactive({ list: [] });
  let backupList: Array<Object> = [];
  let searched = ref(false);

  function setItem<T>(list: T[]) {
    items.list = ref(list);
    backupList = list.concat();
  }

  function add<T>(item: T) {
    items.list.unshift(item);
    backupList.unshift(item);
  }

  function concat<T>(list: T[]) {
    // items.listには純粋にArray.concatしても反映されないので1つずつケツに追加する
    list.map((_obj: object) => {
      items.list.push(_obj)
      backupList.push(_obj)
    });
    backupList.concat(list);
  }

  function update<T>(item: T) {
    let _target = items.list.filter(_obj => _obj.id === item.id);
    let _updateIndex = items.list.indexOf(_target[0]);
    items.list.splice(_updateIndex, 1, item);
  }

  function remove(id: Number) {
    let _target = items.list.filter(_obj => _obj.id === id);
    let _removeIndex = items.list.indexOf(_target[0]);
    items.list.splice(_removeIndex, 1);

    _target = backupList.filter(_obj => _obj.id === id);
    _removeIndex = backupList.indexOf(_target[0]);
    backupList.splice(_removeIndex, 1);
  }

  function removeList<T>(ids: T[]) {
    ids.map((_id: object) => {
      remove(_id);
    });
  }

  function search<T>(list: T[]) {
    allClear();
    list.map((_obj: object) => {
      items.list.unshift(_obj);
    });
    searched.value = true;
  }

  function restore() {
    if (items.list.length === backupList.length) { return; }

    allClear();
    backupList.map((_obj: Object) => {
      items.list.push(_obj);
    });
    searched.value = false;
  }

  function isSearched() {
    return searched.value;
  }

  function allClear() {
    items.list.length = 0;
  }

  function confirmItems() {
    console.log(items);
  }

  return { items: readonly(items), setItem, add, concat, update, remove, removeList, search, restore, isSearched, allClear, confirmItems };
};

export const editStore = reactive({
  id: Number,
  title: String,
  content: String
});

export function titles() {
  let library = ref('');
  let category = ref('');
  let keyword = ref('');

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
