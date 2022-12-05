import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  return (
    <div className="home">
      {/* <Stories/> */}
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
      <Share toast={toast}/>
      <Posts/>
    </div>
  )
}

export default Home