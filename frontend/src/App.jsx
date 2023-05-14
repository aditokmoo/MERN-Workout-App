import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/// Pages
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
// Components
import { Navbar } from './components/Navbar';
// Context
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login /> } />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  )
}

export default App
