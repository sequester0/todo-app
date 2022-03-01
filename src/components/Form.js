import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/services";
import Error from "./Error";
import Loading from "./Loading";

function Form() {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && <Loading />}
      {error && <Error error={error} />}
    </form>
  );
}

export default Form;
