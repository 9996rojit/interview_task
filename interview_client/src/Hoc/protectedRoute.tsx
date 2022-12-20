import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { isEmpty } from 'lodash';
import Layout from '../components/layout';

const ProtectedRoute = () => {
  const { auth, setAuth }: any = useAuth();

  const location = useLocation();

  return !isEmpty(auth?.accessToken) ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
