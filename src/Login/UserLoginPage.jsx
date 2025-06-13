import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

function UserLogin() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // Minimum 6 chars, at least 1 letter & 1 number
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'email':
        if (!regex.email.test(value)) {
          setErrors((prev) => ({ ...prev, email: 'Enter a valid email address' }));
        } else {
          setErrors((prev) => ({ ...prev, email: '' }));
        }
        break;
      case 'password':
        if (!regex.password.test(value)) {
          setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters and include a number' }));
        } else {
          setErrors((prev) => ({ ...prev, password: '' }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((msg) => msg !== '');
    if (hasErrors) {
      toast.error('Please fix the errors.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      toast.success('Login successful!');
      localStorage.setItem("user-token",response.data.token)
      navigate("/")
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#001040] mb-6">User Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-[#001040]`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-[#001040]`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#001040] text-white py-2 rounded font-semibold hover:bg-[#001060] transition duration-300"
        >
          Login
        </button>
        <p className='text-end mt-2'><a href='/forgot-password'>Forgot Password?</a></p>
        <p className='text-center'>Don't have an account <a href='/register' ><span className='text-decoration-none'>Register</span></a></p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
