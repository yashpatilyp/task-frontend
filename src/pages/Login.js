import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useUser } from '../userContext';
import { toast } from 'react-toastify';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5001/api/v1/user/login', {
          username: values.username,
          password: values.password,
        });

        toast.success('Login successful!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        updateUser(response.data.result.user);
        localStorage.setItem('token', response.data.result.token);
        navigate('/add-product');
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

 

  return (
    <div className="container login-container">
      <div className="card shadow">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        
          <p className='text-end'>New User..? <Link to="/register">Sign Up</Link></p>
          <button className='mb-3' type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default Login;
