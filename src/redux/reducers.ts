import { Actions } from "@/lib/definitions";

const initialState = {}

const RootState = (state = initialState, action:Actions) => { 
    switch (action.type) {
        
        default:
            return state;
    }
}

export default RootState