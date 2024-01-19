import React from 'react';

export const useDebounce = (delay = 750, delayInFirstTime = true) => {
  const debouncing = React.useRef<NodeJS.Timeout>();
  const isFirstTime = React.useRef(delayInFirstTime);

  const debounce = React.useCallback(
    (func: () => void) => {
      if (debouncing.current) clearTimeout(debouncing.current);
      if (isFirstTime.current) {
        isFirstTime.current = false;
        return func();
      }
      debouncing.current = setTimeout(() => {
        func();
      }, delay);
    },
    [delay]
  );

  return { debounce };
};
