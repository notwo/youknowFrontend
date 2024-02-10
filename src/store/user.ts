import { ref, readonly } from "vue";

export function userStore() {
  const uuid: String = ref('');

  function setUserId(id: String) {
    uuid.value = id;
  }

  return { uuid: readonly(uuid), setUserId };
};
