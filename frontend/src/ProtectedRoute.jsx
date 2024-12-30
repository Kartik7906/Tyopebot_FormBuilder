import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn') === 'true';
    console.log('Is Logged In:', isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}


export default ProtectedRoute;
