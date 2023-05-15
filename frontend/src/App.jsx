import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
/// Pages
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
// Components
import { Navbar } from './components/Navbar';
// Context
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
	const { user } = useAuthContext();

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
				<Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
				<Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
