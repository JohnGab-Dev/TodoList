import './App.css'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from "@/pages/landing"
import LoginPage from '@/pages/login'
import SignupPage from '@/pages/signup'
import TodoPage from '@/pages/todoPage';

//protection utils
import AuthRoutes from "@/utils/AuthRoutes"
import ProtectedRoutes from "@/utils/ProtectedRoutes"

function App() {

  return (
    <>
     <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
          <Route path="/login" element={<AuthRoutes><LoginPage /></AuthRoutes>}/>
          <Route path="/signup" element={<AuthRoutes><SignupPage /></AuthRoutes>}/>

          <Route path="/user-homepage" element={<ProtectedRoutes><TodoPage /></ProtectedRoutes>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
