import { useEffect,useState } from "react";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List";
import AddShoe from "./pages/AddShoes";
import ListShoes from "./pages/ListShoes";

export const backenUrl=import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");

  useEffect(()=>{
    localStorage.setItem("token",token);
  },[token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token == "" ? <Login setToken={setToken}/> :
      <>
          <Nav setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
            <Sidebar/>
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/addshoes" element={<AddShoe token={token}/>} />
                <Route path="/list-shoes" element={<ListShoes token={token}/>} />
              </Routes>
                          </div>
          </div>
          </>
      }
    </div>
  )
}

export default App