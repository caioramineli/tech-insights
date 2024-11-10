import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    if (!user || !user.id) {
        return <Navigate to="/login" />;
    }

    if (user.role !== 'adm') {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
