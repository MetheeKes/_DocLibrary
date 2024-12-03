import { Navigate } from 'react-router-dom';

function Loginadmin({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children
}

export default Loginadmin;
