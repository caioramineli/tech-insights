import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    if (!user || !user.id) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;