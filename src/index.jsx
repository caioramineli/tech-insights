import ReactDOM from 'react-dom/client';
import React from 'react';
import MinhasRotas from './minhasRotas';
import "./globalStyle.css";

import { AuthProvider } from './contexts/AuthContext';

// API's
// http://localhost:5000/
// https://backend-tech-insights.onrender.com/
// https://backend-tech-insights.vercel.app/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthProvider>
            <MinhasRotas />
        </AuthProvider>
    </>
);
