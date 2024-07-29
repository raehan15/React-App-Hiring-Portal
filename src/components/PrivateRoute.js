// import React from "react";
// import { Route, Redirect, Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/admin/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
