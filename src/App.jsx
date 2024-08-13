import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import StateDemo from "./hooks/StateDemo";
import useTodoForm from "./hooks/useTodoForm";

const initialTodos = [
  {
    id: 1,
    title: "todo one",
    description: "lorem ipsum lorem",
    isComplete: false,
  },
  {
    id: 2,
    title: "todo two",
    description: "lorem ipsum lorem",
    isComplete: true,
  },
  {
    id: 3,
    title: "todo three",
    description: "lorem ipsum lorem",
    isComplete: false,
  },
  {
    id: 4,
    title: "todo four",
    description: "lorem ipsum lorem",
    isComplete: true,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [editTodoId, setEditTodoId] = useState(null);
  const {
    title,
    description,
    handleTitleChange,
    handleDescriptionChange,
    resetForm,
  } = useTodoForm();

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    handleTitleChange({ target: { value: todo.title } });
    handleDescriptionChange({ target: { value: todo.description } });
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
    setEditTodoId(null);
    resetForm();
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (formData) => {
    if (editTodoId) {
      handleUpdateTodo({
        ...formData,
        id: editTodoId,
      });
    } else {
      handleAddTodo(formData);
    }
    resetForm();
  };

  return (
    <div className="flex flex-col items-center  p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      <StateDemo />
      <AddTodoForm
        onSubmit={handleSubmit}
        title={title}
        description={description}
        handleTitleChange={handleTitleChange}
        handleDescriptionChange={handleDescriptionChange}
        isEditing={Boolean(editTodoId)}
      />
      <TodoList
        todos={todos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default App;
