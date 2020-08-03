
export const initialState = {
    id : '',
    pw : '',
    name : '',
};

export interface AuthState{
    name:string;
    id:string;
    pw:string;
};

export type AuthAction =  {type:'id', value:string}
                        | {type:'pw', value:string}
                        | {type:'name', value:string}

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
        default :{
            return state;
        }
    }
};

export default {authReducer,initialState};