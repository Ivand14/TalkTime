import { Actions } from "@/lib/definitions";

const initialState = {}

const rootReducer = (state = initialState, action:Actions) => { 
    switch (action.type) {
        
        default:
            return state;
    }
}

export default rootReducer