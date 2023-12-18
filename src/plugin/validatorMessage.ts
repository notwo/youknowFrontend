import { required, helpers } from "@vuelidate/validators";
import axios, { AxiosResponse, AxiosError } from "axios";
import { userApi } from '@/plugin/apis';

// 必須
export const requiredMsg = (val) => `${val}は入力必須です`;
// 重複チェック
export const duplicateMsg = (val) => `${val}は登録済みです`;
// email
export const emailFormat = () => `正しい形式のメールアドレスではありません`;

export const registerRules = (contentName) => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg(contentName), required),
      duplicated: helpers.withMessage(duplicateMsg(contentName), function (val: String) {
        // TODO: API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        return !_target;
      })
    }
  };
};

export const editRules = (contentName, defaultVal) => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg(contentName), required),
      duplicated: helpers.withMessage(duplicateMsg(contentName), function (val: String) {
        // TODO: API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        if (!_target) { return true; }
        return _target.innerText === defaultVal.title;
      })
    },
  };
};

export const editUserRules = (defaultVal, userAttr) => {
  const api = userApi();
  interface UserResponse {
    data: []
  };

  return {
    username: {
      required: helpers.withMessage(requiredMsg('ユーザ名'), required),
      duplicated: helpers.withMessage(duplicateMsg('ユーザ名'), function (val: String) {
        if (val.length === 0) { return true; }
        if (val === defaultVal.username) { return true; }
        return userAttr.username;
      })
    },
    email: {
      required: helpers.withMessage(requiredMsg('メールアドレス'), required),
      duplicated: helpers.withMessage(duplicateMsg('メールアドレス'), function (val: String) {
        if (val.length === 0) { return true; }
        if (val === defaultVal.email) { return true; }
        return false;
      })
    }
  }
};
