
export const initialState = {
    id : '',
    pw : '',
    name : '',
    email: ''
};

export interface AuthState{
    name:string;
    id:string;
    pw:string;
    email:string;
};

export type AuthAction =  {type:'id', value:string}
                        | {type:'pw', value:string}
                        | {type:'name', value:string}
                        | {type:'email', value:string}

export function authReducer(
    state: AuthState,
    action: AuthAction
): AuthState {
    switch(action.type){
        case 'id' :{
            return {
                ...state, id:action.value
            }
        }
        case 'pw' :{
            return {
                ...state, pw:action.value
            }
        }
        case 'name' :{
            return {
                ...state, name:action.value
            }
        }
        case 'email' :{
            return {
                ...state, email:action.value
            }
        }
        default :{
            return state;
        }
    }
};

export default {authReducer,initialState};