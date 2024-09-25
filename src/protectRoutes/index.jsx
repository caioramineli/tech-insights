import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useContext(AuthContext);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsReady(true);
        }
    }, [loading]);

    if (loading || !isReady) {
        return <Loading />;
    }

    if (!user || !user.id) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;