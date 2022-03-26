import { useRef } from 'react';
import isEqual from 'react-fast-compare';
import {
  TypedUseSelectorHook,
  useSelector as useSelectorGeneric,
} from 'react-redux';

import { IReduxState } from 'types';

const useSelector: TypedUseSelectorHook<IReduxState> = useSelectorGeneric;

const useMemoSelector: TypedUseSelectorHook<IReduxState> = (
  selector,
  comparator = isEqual,
) => {
  const resultRef = useRef<any>(null);
  const isMemoEqualRef = useRef<boolean>(true);
  const result = useSelector(selector, (prev, next) => {
    const equality = comparator(prev, next);
    isMemoEqualRef.current = equality;
    return equality;
  });
  if (!isMemoEqualRef.current || !comparator(result, resultRef.current)) {
    resultRef.current = result;
    isMemoEqualRef.current = true;
  }

  return resultRef.current;
};

export default useMemoSelector;
