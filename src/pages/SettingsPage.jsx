import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferencesChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Save profile data to backend or local storage here
    toast.success("Profile updated successfully!");
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    // Save preferences data to backend or local storage here
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-semibold mb-4">Profile Information</h3>
        <form onSubmit={handleSaveProfile}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Preferences Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-4">Preferences</h3>
        <form onSubmit={handleSavePreferences}>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="darkMode"
                checked={preferences.darkMode}
                onChange={handlePreferencesChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Enable Dark Mode</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handlePreferencesChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Enable Notifications</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
