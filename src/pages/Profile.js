import React from 'react';
import { useUser } from '../userContext';

const Profile = () => {
  const { user } = useUser();

  // If no user object in context, retrieve it from localStorage
  const storedUser = localStorage.getItem('user');
  const userInfo = user || (storedUser ? JSON.parse(storedUser) : null);

  if (!userInfo) {
    return <p></p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ width: '24rem', margin: 'auto' }}>
        <div className="card-body text-center">
          <h5 className="card-title">Profile Information</h5>
          <hr />
          <div className="mt-3">
            <p><strong>Name:</strong> {userInfo.name || 'N/A'}</p>
            <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
            <p><strong>Username:</strong> {userInfo.username || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
