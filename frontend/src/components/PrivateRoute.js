import { Navigate } from 'react-router-dom';
import { checkTokenExpiration } from '../utils/auth';

const PrivateRoute = ({ children }) => {
    const isTokenExpired = checkTokenExpiration();
    
    if (isTokenExpired) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
