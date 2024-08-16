import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { toast } from "react-toastify";

const Categories = () => {
   const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  
  
  useEffect(() => {
    fetchCategories();
  }, []);
  

  useEffect(() => {
      const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  
  
  const isAdmin = user && user.role === "admin";

  const fetchCategories = async () => {
    const response = await fetch("https://json-server-vercel-8mwp.vercel.app/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    // Add the new category to db.json via API
    await fetch("https://json-server-vercel-8mwp.vercel.app/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategory }),
    });
    toast.success("Category added successfully!");
    setNewCategory("");
    fetchCategories();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Categories</h3>
      
      {/* Accordion showing list of categories */}
      <Accordion type="single" collapsible>
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.name}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent>List of {category.name} categories...</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Show the Add Category form only to admins */}
      {isAdmin && (
        <div className="mt-6 ">
          <h4 className="text-md font-semibold mb-2">Add New Category</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="border p-2 rounded"
            />
            
          </div>
            <button
              onClick={handleAddCategory}
              className="flex justify-center items-center  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-6 mt-2"
            >
              Add Category
            </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
