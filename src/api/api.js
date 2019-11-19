import axios from "./axios";

/**
 * @desc 获取事项列表
 */
export const getItemList = () => {
  return axios.get("/items");
};

/**
 * @desc 添加事项
 * @param item 事项
 */
export const addItem = item => {
  return axios.post("/item", item);
};

/**
 * @desc 根据id获取一个事项
 * @param id 事项id
 */
export const getItem = id => {
  return axios.get("/item", {
    params: {
      id
    }
  });
};

/**
 * @desc 修改一个事项
 * @param item 事项（带有id）
 */
export const upldateItem = item => {
  return axios.put("/item", item);
};

/**
 * @desc 根据id删除一个事项
 * @param id 事项id
 */
export const delItem = id => {
  return axios.delete("/item", {
    params: {
      id
    }
  });
};

/**
 * @desc 根据多个事项
 * @param ids 事项ids
 */
export const delItems = ids => {
  return axios.delete("/items", {
    params: {
      ids: ids.toString()
    }
  });
};