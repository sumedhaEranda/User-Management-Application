import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";


import Dashboard from "../pages/user/Dashboard";
import Userlist from "../pages/user/Userlist";

const authRoutes = [
  { path: "/auth/signin", component: Signin },
  { path: "/auth/signup", component: Signup },
  
];

const adminRoutes = [
  { path: "/user/dashboard", component: Dashboard },
  { path: "/user/users", component: Userlist },

];
export { authRoutes, adminRoutes };
