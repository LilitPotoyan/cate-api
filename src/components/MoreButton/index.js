import './index.scss';
import {useCallback, useState} from "react";
import useMemoSelector from "../../hooks/useMemoSelector";
import {useDispatch} from "react-redux";

const MoreButton = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const categoryId = useMemoSelector(state => state.categoryId);

  const handleMore = useCallback(() => {
    setPage(prevState => prevState+1)
      fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${categoryId}`)
      .then(res => res.json())
      .then(data => dispatch({
        type: 'ADD_CATS_DATA',
        catsData: data,
      }));
  }, [categoryId, dispatch, page])

  return (
    <div
      className="more-button"
      onClick={handleMore}
    >
      More Photos
    </div>
  )
}

export default MoreButton;
