import { useEffect } from 'react';
// Components
import { WorkoutDetails } from '../components/WorkoutDetails';
import { WorkoutForm } from '../components/WorkoutForm';
// Context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

export const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(
		() => {
			getAllWorkouts();
		},
		[ dispatch ]
	);

	const getAllWorkouts = async () => {
		const res = await fetch('/api/workouts');
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
