import { atom, AtomEffect, AtomOptions, useRecoilState } from "recoil";

function generateUseState<T>(options: AtomOptions<T>) {
  const state = atom<T>(options);

  function useState() {
    return useRecoilState(state);
  }
  useState.atom = state;

  return useState;
}

function localStorageEffect<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}

export { generateUseState, localStorageEffect };
