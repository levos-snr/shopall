import React, { useState } from "react";

const SearchBar = ({ categories, users, products, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(query)
    );

    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    onSearch(filteredCategories, filteredUsers, filteredProducts);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search categories, users, products..."
        className="border p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
