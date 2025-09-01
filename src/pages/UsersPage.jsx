import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("auth/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-blue to-green-600 p-10
    bg-">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-900 text-white p-6 rounded-2xl shadow-md mb-12">
        <h2 className="text-3xl font-bold text-center">Devs DB Users</h2>
        <p className="text-center text-sm opacity-80 mt-1">
          Explore all registered developers in the database
        </p>
      </div>

      {/* Users Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {users.map((user) => (
          <Link
            key={user._id}
            to={`/users/${user._id}`}
            className="bg-green-900 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center"
          >
            <img
              src={
                user.profilePicture ||
                user.fileUrl ||
                "https://example.com/default-profile-picture.png"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-indigo-100"
            />
            <h3 className="text-lg font-semibold text-white">
              {user.username}
            </h3>
            <p className="text-sm text-white">{user.email}</p>
            <p className="text-xs text-white mt-2">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
