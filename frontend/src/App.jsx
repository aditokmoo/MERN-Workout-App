import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/// Pages
import { Home } from './pages/Home';
// Components
import { Navbar } from './components/Navbar';
import { WorkoutsContextProvider } from './context/WorkoutsContext';

const App = () => {
  return (
    <>
      <WorkoutsContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </WorkoutsContextProvider>
    </>
  )
}

export default App
