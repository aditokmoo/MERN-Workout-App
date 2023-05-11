import { FaTimes } from 'react-icons/fa'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// Date FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    const deleteWorkout = async () => {
      const res = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE'
      })
      const data = await res.json();

      if(res.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: data})
      }
    }

    return (
        <div className="workout-details">
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Number of reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <span className='delete' onClick={deleteWorkout}><FaTimes /></span>
        </div>
      )
}