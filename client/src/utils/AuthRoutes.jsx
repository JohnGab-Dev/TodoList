import React from 'react'
import { Navigate } from "react-router-dom";

function AuthRoutes({ children }) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user) return <Navigate to="/user-homepage" replace />;

    return children;
}
export default AuthRoutes