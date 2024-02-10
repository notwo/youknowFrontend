import { ref, readonly } from "vue";

export function dialogStore() {
  const func: Object = ref({});

  function setFunc(_func: Object) {
    func.value = _func;
  }

  return { func: readonly(func), setFunc };
};
