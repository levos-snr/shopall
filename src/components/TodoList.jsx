import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = ({ todos, onEditTodo, onDeleteTodo }) => {
  const todoItemsFilteredAndMapped = (filterCondition) =>
    todos
      .filter((todo) => todo.isComplete === filterCondition)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onEdit={onEditTodo}
          onDelete={onDeleteTodo}
        />
      ));

  return (
    <div id="todolist" className="w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Todo List Container</h2>
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Completed Tasks</h3>
        {todoItemsFilteredAndMapped(true)}
      </div>
      <div>
        <h3 className="text-xl font-medium mb-2">Incomplete Tasks</h3>
        {todoItemsFilteredAndMapped(false)}
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
