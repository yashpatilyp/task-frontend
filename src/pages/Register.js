import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../userContext';


const Register = () => {
          const [loading, setLoading] = useState(false);
          const { updateUser } = useUser();
        const navigate=useNavigate();
          const formik = useFormik({
            initialValues: {
              name: '',
              
              email: '',
              username: '',
              password: '',
              
            },
            onSubmit: async (values) => {
              setLoading(true);  
              try {
                const response = await axios.post('http://localhost:5001/api/v1/user/signup', {
                  name: values.name,
                  
                  email: values.email,
                  username: values.username,
                  password: values.password,
                  
                });
        
                console.log(response.data.message); 
                updateUser(response.data.result.user);
               
                localStorage.setItem('token', response.data.result.token);
                toast.success(response.data.message,{
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                navigate("/add-product")
                formik.resetForm(); 
              } catch (error) {
                if (error.response && error.response.data) {
                  console.log(error.response.data.message);
                  toast.error(error.response.data.message,{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  alert("An unexpected error occurred. Please try again later.");
                  console.log('An unexpected error occurred. Please try again later.');
                }
              } finally {
                setLoading(false); 
              }
            },
          });
  return (
   <>
   
   <div className="container login-container">
        <div className="card shadow">
          <h2>SignUp</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              placeholder=' Name'
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              id="username"
              name="username"
              type="text"
              placeholder='Username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className='text-end'>
              Already Have An Account..? <Link to="/">Login</Link>
            </p>
            <button className='mb-3' type="submit" disabled={loading}>
              {loading ? "Loading..." : "SignUp"}
            </button>
          </form>
        </div>
      </div>
   </>
  )
}

export default Register