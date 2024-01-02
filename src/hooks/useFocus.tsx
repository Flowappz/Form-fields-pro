import { useEffect, useRef } from "react";

export function useFocus<T>() {
  const focusRef = useRef<T>(null);

  useEffect(() => {
    (focusRef?.current as HTMLElement).focus();
  }, []);

  return {
    focusRef,
  };
}
