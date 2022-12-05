import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import io from "socket.io-client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Notification from './pages/notification/Notification'
import NewsPage from './pages/NewsPage/NewsPage'
import "./style.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Chat from "./pages/chat/chat";
import FollowingList from "./components/followinglist/FollowingList";
import OtpLogin from "./components/otplogin/OtpLogin";
function App() {
  useEffect(()=>{
 const   socket = io("http://localhost:8800");
    console.log(socket);
  },[])


  
  const {currentUser} =useContext(AuthContext)

  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient()
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{ display: "flex" }}>
          <LeftBar/>
          <div style={{ flex: 6 }}>
            <Outlet/>
          </div>
          <RightBar/>
        </div>
      </div>
      </QueryClientProvider>
    );
  };

  const withoutRightBar = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{ display: "flex" }}>
          <LeftBar/>
          <div style={{ flex: 9 }}>
            <Outlet/>
          </div>
          
        </div>
      </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/notification",
          element: <Notification/> ,
        }, {
          path: "/news",
          element: <NewsPage/>,
        }, {
          path: "/following",
          element: <FollowingList/>,
        }
      ],
    },
    {
      path: "/login",
      element:currentUser?<Navigate to="/" />:<Login />,
    },
    {
      path: "/otp",
      element:currentUser?<Navigate to="/" />:<OtpLogin/>,
    }, 
    {
      path: "/register",
      element: currentUser?<Navigate to="/" />:<Register />,
    },
    {
      path: "/chat",
      element: currentUser?<Chat/>:<Navigate to="/login" />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
