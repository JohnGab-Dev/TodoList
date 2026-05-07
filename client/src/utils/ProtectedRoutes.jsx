import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    let user = null;

    try {
        const stored = localStorage.getItem('user');
        user = stored ? JSON.parse(stored) : null;
    } catch (e) {
        user = null;
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes;