import { useSelector } from "react-redux";


const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  if (isLoggedIn && token !== null && token !== 'undefined') {
    return children;
  } else {
    return null;
  }
};
export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  if (!isLoggedIn || token === null || token === 'undefined') {
    return children;
  } else {
    return null;
  }
};

export default ShowOnLogin;
