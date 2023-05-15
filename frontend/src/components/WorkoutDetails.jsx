// Context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext';
// Date FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// React Icons
import { FaTimes } from 'react-icons/fa'

export const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const deleteWorkout = async () => {
      if(!user) return

      const res = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
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