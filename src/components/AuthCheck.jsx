import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const AuthChecker = ({ children }) => {
  let token = localStorage.getItem('token_');
  try {
    jwtDecode(token);
    // console.log('ini hasil decode', jwtDecode(token));
  } catch (error) {
    if (error) {
      return <Navigate to="/login" replace="true" />;
    }
    return children;
  }
  return children
};

export default AuthChecker;
