import { createStore } from 'redux'

const initialState = {
  categoryId: 1,
  catsData: [],
}

function dataReducer(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY': return {
      ...state,
      categoryId: action.categoryId,
    };
    case 'CHANGE_CATS_DATA':
      return {
        ...state,
        catsData: action.catsData,
      };
    case 'ADD_CATS_DATA':
      return {
        ...state,
        catsData: [
          ...state.catsData,
          ...action.catsData,
        ],
      };
    default:
      return state
  }
}

const store = createStore(dataReducer, initialState)

export default store;
