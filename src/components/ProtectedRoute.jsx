import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
  const { currentUser, userType: authUserType, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-t-blood-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated or wrong user type
  if (!currentUser || authUserType !== userType) {
    return <Navigate to={`/${userType}/login`} replace />;
  }

  // Render children if authenticated and correct user type
  return children;
};

export default ProtectedRoute;