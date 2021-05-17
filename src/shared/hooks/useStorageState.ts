import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type UseStorageStateOptions<T> = {
  storage?: Storage;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

function useStorageState<T>(
  key: string,
  defaultValue: (() => T) | T,
  {
    storage = global.localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseStorageStateOptions<T> = {}
) {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = storage?.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      storage?.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    storage?.setItem(key, serialize(state));
  }, [key, state, serialize, storage]);

  return [state, setState] as [T, Dispatch<SetStateAction<T>>];
}

export default useStorageState;
