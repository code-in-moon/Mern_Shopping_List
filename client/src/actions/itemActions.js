import * as types from "./types";

export const addItem = (item) => {
  return {
    type: types.ADD_ITEM,
    payload: {
      item: item,
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: types.DELETE_ITEM,
    payload: {
      id: id,
    },
  };
};

export const getItem = (id) => {
  return {
    type: types.GET_ITEM,
    payload: {
      id: id,
    },
  };
};

export const getItems = () => {
  return {
    type: types.GET_ITEMS,
  };
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
