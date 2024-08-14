import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3001/categories");
    const data = await response.json();
    setCategories(data);
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

    if (isEditing) {
      await fetch(`http://localhost:3001/products/${editProductId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setIsEditing(false);
      setEditProductId(null);
    } else {
      await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }

    setFormData({ title: "", category: "", price: "", description: "", images: "" });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditProductId(null);
    setFormData({ title: "", category: "", price: "", description: "", images: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
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

        <div className="flex justify-between mt-4">
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
              className="ml-2 px-6 py-3 bg-gray-500 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Product List</h3>

      <div className="bg-white p-6 shadow-lg rounded-md">
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
                <td className="py-6 px-6 flex space-x-4 items-center justify-center">
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
  );
};

export default AddProduct;
