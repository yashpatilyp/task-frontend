import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Safely parse localStorage data
  const getUserFromLocalStorage = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null; // Return null if parsing fails
    }
  };

  const [user, setUser] = useState(getUserFromLocalStorage());
 

  const updateUser = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  const logout = () => {
    // Clear user and addresses
    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Show a success toast
    toast.success("User logged out successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
