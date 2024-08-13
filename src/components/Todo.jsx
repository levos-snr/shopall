import PropTypes from "prop-types";
import { Button } from "./ui/button";

const Todo = ({ todo, onEdit, onDelete }) => {
  const { title, description, isComplete } = todo;

  const handleEdit = () => {
    onEdit(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div id="todoitem" className="mb-4 p-4 bg-white shadow-md rounded">
      <p className="text-lg font-semibold">Title: {title}</p>
      <p className="mb-2">Description: {description}</p>
      {isComplete ? (
        <p className="text-green-600">
          <s>Task is complete</s>
        </p>
      ) : (
        <p className="text-red-600">Task is Incomplete</p>
      )}
      <div className="flex space-x-2 mt-2">
        <Button onClick={handleEdit} variant="secondary">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
