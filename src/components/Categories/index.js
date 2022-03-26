import { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';

import useMount from "../../hooks/useMount";
import './index.scss';
import useMemoSelector from "../../hooks/useMemoSelector";

const CATEGORIES_API = 'https://api.thecatapi.com/v1/categories';
const SEARCH_API = 'https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=';

const Categories = () => {
  const dispatch = useDispatch();
  const categoryId = useMemoSelector(state => state.categoryId);
  const [categories, setCategories] = useState([]);

  useMount(() => {
    fetch(CATEGORIES_API)
      .then(res => res.json())
      .then(data => setCategories(data));
  })

  const changeCategory = useCallback(categoryId => {
    const url = `${SEARCH_API}${categoryId}`;

    fetch(url)
      .then(res => res.json())
      .then(catsData => dispatch({
        type: 'CHANGE_CATS_DATA',
        catsData,
      }));

    dispatch({
      type: 'CHANGE_CATEGORY',
      categoryId,
    })
  }, [dispatch])

  return (
    <div className="categories-wrapper">
      <div className="categories-title">Categories</div>
      <div>
        {categories.map(item => {
          const {id, name} = item;

          return <div
            key={id}
            onClick={() => changeCategory(id)}
            className= {`categories-item ${id === categoryId && 'active'}`}
          >
            {name}
          </div>
        })}
      </div>
    </div>
  )
}

export default Categories;
