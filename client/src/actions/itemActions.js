import * as types from "./types";
import axios from "axios";

// before connect to backend
// export const getItems = () => {
//   return {
//     type: types.GET_ITEMS,
//   };
// };

// after connect to backend
// thunk here allow us to make more than one asynchoronous request
// we have this in pakage .jason  "proxy": "http://localhost:5000" we dont need to write this in request
export const getItems = () => (dispatch) => {
  dispatch(setItemLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: types.GET_ITEMS,
      //in rout/api/items we recieve a jason

      //  res.status(200).json({
      //   succes: { success: true },
      //   items: items,
      // }

      //that jason here is data wich we want items of it
      payload: { items: res.data.items },
    })
  );
};

//before connecting to backend
// export const addItem = (item) => {
//   return {
//     type: types.ADD_ITEM,
//     payload: {
//       item: item,
//     },
//   };
// };

//after connecting to backend
export const addItem = (item) => (dispatch) => {
  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: types.ADD_ITEM,
      payload: { item: res.data.items },
    })
  );
};

// export const deleteItem = (id) =>{
//   return {
//     type: types.DELETE_ITEM,
//     payload: {
//       id: id,
//     },
//   };
// };

export const deleteItem = (id) => (dispatch) => {
  axios.delete("/api/items/" + id).then((res) =>
    dispatch({
      type: types.DELETE_ITEM,
      payload: { id: id, success: res.data.success },
    })
  );
};

export const getItem = (id) => {
  return {
    type: types.GET_ITEM,
    payload: {
      id: id,
    },
  };
};

export const setItemLoading = () => {
  return { type: types.ITEMS_LOADING };
};

export const updateItem = (id, item) => {
  return {
    type: types.UPDATE_ITEM,
    payload: {
      id: id,
      item: item,
    },
  };
};
