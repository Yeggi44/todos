import axios from "axios";
import { url, setHeaders } from "../../api";
import { toast } from "react-toastify";

export const getTodos = () => {
  return (dispatch) => {
    axios
      .get(`${url}/tasks`, setHeaders())
      .then((todos) => {
        dispatch({
          type: "GET_TODOS",
          todos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTodo = (newTodo) => {
  return (dispatch, getState) => {
    const author = getState().auth.name;
    const uid = getState().auth._id;
    axios
      .post(`${url}/tasks`,{ ...newTodo, author, uid }, setHeaders())
      .then((todo) => {
        dispatch({
          type: "ADD_TODO",
          todo,
        });
      })
      .catch((error) => {
        console.log(error.response);

        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const updateTodo = (updatedTodo, id) => {
  return (dispatch) => {
    axios
      .put(`${url}/tasks/${id}`, updatedTodo, setHeaders())
      .then((todo) => {
        dispatch({
          type: "UPDATE_TODO",
          todo,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/tasks/${id}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE_TODO",
          id,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

