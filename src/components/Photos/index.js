import { useDispatch } from "react-redux";

import useMount from "../../hooks/useMount";
import useMemoSelector from "../../hooks/useMemoSelector";

import './index.scss';

const SEARCH_API = 'https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=1';

const Photos = () => {
  const dispatch = useDispatch();
  const { catsData } = useMemoSelector(state => ({
    catsData: state.catsData,
  }));

  useMount(() => {
    fetch(SEARCH_API)
      .then(res => res.json())
      .then(data => dispatch({
        type: 'CHANGE_CATS_DATA',
        catsData: data,
      }));
  });

  return (
    <div className="photos-wrapper">
      {catsData.map((item) => {
        const { id, url } = item;

        return (
          <img
            alt='img'
            key={id}
            src={url}
            className="cat-image"
          />)
      })}
    </div>
  )
}

export default Photos;
