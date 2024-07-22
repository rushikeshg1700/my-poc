// pages/index.tsx
"use client";

import { useState } from "react";
import userDetails from "../data/user_details.json";
import UserForm from "./UserForm";
import { User } from "../types/user";


export default function UserTable() {
  const [users, setUsers] = useState<User[]>(userDetails.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "add" | "">("");

  const handleSave = (user: User):void => {
    if (mode === "edit" && selectedUser) {
      setUsers(users.map(u => (u.id === selectedUser.id ? user : u)));
    } else if (mode === "add") {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setSelectedUser(null);
    setMode("");
  };

  const handleDelete = (userId: number):void => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleCancel = ():void => {
    setMode(""); 
    setSelectedUser(null); 
  }
  

  return (
    <>
      <div className="btn-add-user flex justify-end">
        <button
          type="button"
          className="text-white mt-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => { setMode("add"); setSelectedUser(null); }}
        >
          Add User
        </button>
      </div>
      <div className="user-table">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">First Name</th>
                <th scope="col" className="px-6 py-3">Last Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.firstName}</td>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-2" onClick={() => { setMode("edit"); setSelectedUser(user); }}>Edit</button>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-2" onClick={() => { setMode("view"); setSelectedUser(user); }}>View</button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {mode && <UserForm mode={mode} user={selectedUser} onSave={handleSave} onCancel={ handleCancel } />}
    </>
  );
}
