import { useState, useEffect } from "react";
import { User } from "../types/user";

interface UserFormProps {
  mode: "view" | "edit" | "add";
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

export default function UserForm({ mode, user, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({ id: 0, firstName: "", lastName: "", email: "", phone: 0 });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "phone" ? Number(value) : value });
  };

  const validateNameField = (field: "firstName" | "lastName", value: string): string | null => {
    if (!value.trim()) {
      return `${field === "firstName" ? "First" : "Last"} name is required`;
    } else if (value.length < 2) {
      return `${field === "firstName" ? "First" : "Last"} name must be at least 2 characters`;
    } else if (value.length > 50) {
      return `${field === "firstName" ? "First" : "Last"} name cannot exceed 50 characters`;
    } else if (!/^[a-zA-Z-' ]+$/.test(value)) {
      return `${field === "firstName" ? "First" : "Last"} name can only contain letters, hyphens, and apostrophes`;
    }
    return null;
  };

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};

    const firstNameError = validateNameField("firstName", formData.firstName);
    if (firstNameError) {
      errors.firstName = firstNameError;
    }

    const lastNameError = validateNameField("lastName", formData.lastName);
    if (lastNameError) {
      errors.lastName = lastNameError;
    }

   

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is not valid";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.toString())) {
      errors.phone = "Phone number must be 10 digits";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent):void => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl mb-4 text-black">{mode === "edit" ? "Edit User" : mode === "view" ? "View User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={mode === "view"}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={mode === "view"}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={mode === "view"}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              id="phone"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={mode === "view"}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>
          {mode !== "view" && (
            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md">
              Save
            </button>
          )}
          <button type="button" onClick={onCancel} className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md ml-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
