import { useEffect } from 'react';
// Components
import { WorkoutDetails } from '../components/WorkoutDetails';
import { WorkoutForm } from '../components/WorkoutForm';
// Context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

export const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	useEffect(() => {
		if(user) {
			getAllWorkouts();
		}
	}, [dispatch, user]);

	const getAllWorkouts = async () => {
		const res = await fetch('/api/workouts', {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		});
		const data = await res.json();

		dispatch({ type: 'SET_WORKOUTS', payload: data });
	};

	return (
		<div className="home">
			<div className="container">
				<div className="home-section">
					<div className="workouts">
						{workouts && workouts.map((workout) => <WorkoutDetails workout={workout} key={workout._id} />)}
					</div>
					<WorkoutForm />
				</div>
			</div>
		</div>
	);
};
