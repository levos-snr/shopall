import { Button } from "./ui/button";
import PropTypes from "prop-types";

const AddTodoForm = ({
  onSubmit,
  title,
  description,
  handleTitleChange,
  handleDescriptionChange,
  isEditing,
}) => {
  const handleAddTodo = (e) => {
    e.preventDefault();

    const formData = {
      id: Math.floor(Math.random() * 100),
      title,
      description,
      isComplete: false,
    };
    onSubmit(formData);
  };

  return (
    <div className="mb-6 w-full max-w-md">
      <form onSubmit={handleAddTodo} className="bg-white p-4 shadow-md rounded">
        <input
          type="text"
          name="title"
          placeholder="Enter new todo"
          value={title}
          onChange={handleTitleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <Button type="submit">{isEditing ? "Update Todo" : "Add Todo"}</Button>
      </form>
    </div>
  );
};

AddTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddTodoForm;
