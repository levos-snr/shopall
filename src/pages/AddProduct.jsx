import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    images: "",
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://json-server-vercel-8mwp.vercel.app/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error fetching products!");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://json-server-vercel-8mwp.vercel.app/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error fetching categories!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await fetch(`https://json-server-vercel-8mwp.vercel.app/products/${editProductId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        toast.success("Product updated successfully!");
        setIsEditing(false);
        setEditProductId(null);
      } else {
        await fetch("https://json-server-vercel-8mwp.vercel.app/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        toast.success("Product added successfully!");
      }

      setFormData({ title: "", category: "", price: "", description: "", images: "" });
      fetchProducts();
    } catch (error) {
      toast.error("Error submitting the product!");
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://json-server-vercel-8mwp.vercel.app/products/${id}`, {
        method: "DELETE",
      });
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Error deleting the product!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditProductId(null);
    setFormData({ title: "", category: "", price: "", description: "", images: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Products</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-md space-y-6"
      >
        <div>
          <label className="block text-lg font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Price (Ksh)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="ml-0 sm:ml-2 px-6 py-3 bg-gray-500 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Product List</h3>

      <div className="bg-white p-6 shadow-lg rounded-md">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left">
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price (Ksh)</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-4 px-6">
                    <img
                      src={product.images}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-4 px-6">{product.title}</td>
                  <td className="py-4 px-6">{product.category}</td>
                  <td className="py-4 px-6">{product.price}</td>
                  <td className="py-4 px-6 flex space-x-2 sm:space-x-4 items-center justify-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AddProduct;
