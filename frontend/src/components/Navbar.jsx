import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<header>
		  <div className="container">
			<Link to="/">
			  <h1>Workout Buddy</h1>
			</Link>
			<nav>
			  {user && (
				<div>
					<button onClick={logout}>Log out</button>
				</div>
			  )}
			  {!user && (
				<div>
					<Link to="/login">Login</Link>
					<Link to="/register">Signup</Link>
				</div>
			  )}
			</nav>
		  </div>
		</header>
	  )
};
