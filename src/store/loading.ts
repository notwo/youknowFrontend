import { ref, readonly } from "vue";

export function loadingStore() {
  const element = ref({});
  const show: Object = ref({});
  const hide: Object = ref({});

  function setElement(_elem: HTMLElement) {
    element.value = _elem;
  }

  function setShowFunc(_func: Object) {
    show.value = _func;
  }

  function setHideFunc(_func: Object) {
    hide.value = _func;
  }

  return {
    element: readonly(element),
    show: readonly(show),
    hide: readonly(hide),
    setElement, setShowFunc, setHideFunc
  };
};
