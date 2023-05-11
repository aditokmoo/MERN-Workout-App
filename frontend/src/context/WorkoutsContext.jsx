import { createContext, useReducer } from "react";
import { WorkoutReducer } from "../reducer/WorkoutReducer";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}