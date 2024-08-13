import { useState } from "react";

const useTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  return {
    title,
    description,
    handleTitleChange,
    handleDescriptionChange,
    resetForm,
  };
};

export default useTodoForm;
