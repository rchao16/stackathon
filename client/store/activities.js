import axios from 'axios'
import history from '../history'

//ACTION TYPES

const CREATE_ACTIVITY = 'PUT_ACTIVITY'

//INITIAL STATE

const initialState = {
    activity: []
}

//ACTION CREATORS

const createActivity = activity => ({type: CREATE_ACTIVITY, activity})

//THUNK CREATORS

export const postActivity = (activity) => async dispatch => {
    let res
    try{
        console.log('poo', activity)
        res = await axios.post('/api/activities/', activity)
        dispatch(createActivity(res.data))
    } catch (err) {
        return dispatch(createActivity({error: err.message}))
    }
}

//REDUCER

export default function(state = initialState, action) {
    switch(action.type){
        case CREATE_ACTIVITY:
            return {...state, activity: [...state.activity, action.activity]}

        default:
            return state
    }
}