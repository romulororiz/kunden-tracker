import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '@hooks/useAuthStatus';

export function PrivateRoute() {
	const auth = useAuthStatus();

	return auth.user ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
