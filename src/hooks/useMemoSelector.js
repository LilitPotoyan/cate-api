import { useRef } from 'react';
import isEqual from 'react-fast-compare';
import {
  useSelector as useSelectorGeneric,
} from 'react-redux';


const useSelector = useSelectorGeneric;

const useMemoSelector = (
  selector,
  comparator = isEqual,
) => {
  const resultRef = useRef(null);
  const isMemoEqualRef = useRef(true);
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
