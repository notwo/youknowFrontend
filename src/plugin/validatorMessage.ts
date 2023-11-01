import { required, helpers } from "@vuelidate/validators";

// 必須
export const requiredMsg = (val) => `${val}は入力必須です`;
// 重複チェック
export const duplicateMsg = (val) => `${val}は登録済みです`;
// email
export const emailFormat = () => `正しい形式のメールアドレスではありません`;

export const registerLibraryRules = () => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('ライブラリ名'), required),
      duplicated: helpers.withMessage(duplicateMsg('ライブラリ名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        return !_target;
      })
    }
  };
};

export const editLibraryRules = (defaultVal) => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('ライブラリ名'), required),
      duplicated: helpers.withMessage(duplicateMsg('ライブラリ名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        if (!_target) { return true; }
        return _target.innerText === defaultVal.title;
      })
    }
  };
};

export const registerCategoryRules = () => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('カテゴリ名'), required),
      duplicated: helpers.withMessage(duplicateMsg('カテゴリ名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        return !_target;
      })
    }
  };
};

export const editCategoryRules = (defaultVal) => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('カテゴリ名'), required),
      duplicated: helpers.withMessage(duplicateMsg('カテゴリ名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        if (!_target) { return true; }
        return _target.innerText === defaultVal.title;
      })
    }
  };
};

export const registerKeywordRules = () => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('キーワード名'), required),
      duplicated: helpers.withMessage(duplicateMsg('キーワード名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        return !_target;
      })
    }
  };
};

export const editKeywordRules = (defaultVal) => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('キーワード名'), required),
      duplicated: helpers.withMessage(duplicateMsg('キーワード名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        if (!_target) { return true; }
        return _target.innerText === defaultVal.title;
      })
    }
  };
};

export const registerTagRules = () => {
  return {
    title: {
      required: helpers.withMessage(requiredMsg('タグ名'), required),
      duplicated: helpers.withMessage(duplicateMsg('タグ名'), function (val: String) {
        // API経由で結果を返却させるように後で修正
        const _titles = document.getElementsByClassName('title');
        if (_titles.length <= 0) { return true; }
        const _target = Array.from(_titles).find((element) => element.innerText === val);
        return !_target;
      })
    }
  };
};
