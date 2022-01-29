import { atom, AtomOptions, useRecoilState } from "recoil";

function generateUseState<T>(options: AtomOptions<T>) {
  const state = atom<T>(options);

  function useState() {
    return useRecoilState(state);
  }
  useState.atom = state;

  return useState;
}

export { generateUseState };
