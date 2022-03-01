import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodosAsync,
  toggleTodoAsync,
  deleteTodoAsync,
} from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice";

import Error from "./Error";
import Loading from "./Loading";

function TodoList() {
  const dispatch = useDispatch();
  const filteredItems = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(deleteTodoAsync(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <ul className="todo-list">
      {filteredItems.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id, !item.completed)}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
