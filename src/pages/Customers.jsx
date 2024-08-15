import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
    toast.success("User deleted successfully!");
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    toast.info("You are now editing the user!");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/users/${editingUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingUser),
    });
    setEditingUser(null);
    fetchUsers();
    toast.success("User updated successfully!");
  };

  const handleAdminToggle = async (user) => {
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        role: user.role === "admin" ? "customer" : "admin",
      }),
    });
    fetchUsers();
    toast.success("User role updated successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers</h1>

      {/* Display Users */}
      <div className="bg-white p-6 shadow-lg rounded-md">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6 flex space-x-4">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleAdminToggle(user)}
                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                      >
                        {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-lg font-semibold">Name</label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                >
                  <option value="user">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="ml-4 px-4 py-2 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
