import { v4 as uuid } from "uuid";
import * as types from "../actions/types";
// import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ITEMS:
      return { ...state, items: action.payload.items, loading: false };
    //you can add spiner above too

    case types.GET_ITEM:
      return state.filter((i) => i.id === action.payload.id);

    case types.ADD_ITEM:
      return { ...state, items: [action.payload.item, ...state.items] };

    case types.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case types.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((i) =>
          i.id !== action.payload.id ? i : { ...i, name: action.payload.item }
        ),
      };
    case types.ITEMS_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
