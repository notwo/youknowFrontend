import { ref, reactive, readonly } from "vue";

export function useStore() {
  const items = reactive({ list: [] });
  let backupList: Array<Object> = [];
  const firstLoaded = ref(false);
  const searched = ref(false);
  const searchType = ref(0);
  const searchTitle = ref('');

  function setItem<T>(list: T[]) {
    items.list = ref(list);
    backupList = list.concat();
    firstLoaded.value = true;
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
    const _target = items.list.filter(_obj => _obj.id === item.id);
    const _updateIndex = items.list.indexOf(_target[0]);
    items.list.splice(_updateIndex, 1, item);
    backupList.splice(_updateIndex, 1, item);
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

  function search<T>(list: T[], searchTypeValue: Number = 0, searchTitleValue: String) {
    allClear();
    list.map((_obj: object) => {
      items.list.unshift(_obj);
    });
    searched.value = true;
    searchType.value = searchTypeValue;
    searchTitle.value = searchTitleValue;
  }

  function isSearched() {
    return searched.value;
  }

  function searchedType() {
    return searchType.value;
  }

  function searchedTitle() {
    return searchTitle.value;
  }

  function allClear() {
    items.list.splice(0);
  }

  function restore() {
    if (items.list.length === backupList.length) { return; }

    backupList.map((_obj: Object) => {
      items.list.push(_obj);
    });
    searched.value = false;
    searchType.value = 0;
    searchTitle.value = '';
  }

  function restoreSearched() {
    searched.value = false;
    searchType.value = 0;
    searchTitle.value = '';
  }

  function restoreFirstLoaded() {
    firstLoaded.value = false;
  }

  function confirmItems() {
    console.log(items);
  }

  return { items: readonly(items), firstLoaded: readonly(firstLoaded),
    setItem, add, concat, update, remove, removeList, search, isSearched, searchedType, searchedTitle, restore, allClear, restoreSearched, restoreFirstLoaded, confirmItems };
};

export const editStore = reactive({
  id: Number,
  title: String,
  content: String
});

export const moveStore = reactive({
  id: Number,
  title: String,
  checked: Boolean,
  list: Array<Object>
});
