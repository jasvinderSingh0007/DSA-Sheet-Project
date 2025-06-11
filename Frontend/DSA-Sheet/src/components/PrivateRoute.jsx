import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute({ children }) {
  const token = Cookies.get('accessToken');
  return token ? children : <Navigate to="/" replace />;
}
