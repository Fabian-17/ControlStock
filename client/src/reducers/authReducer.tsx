import { type } from "../types/type";
import { Action } from "../interfaces/reducerInterface";
import { UserState } from "../interfaces/userState";

const initialState: UserState = {
    token: undefined,
    isLogged: false,
};

export const authReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case type.LOGIN:
            return {
                ...state,
                token: action.payload?.token,
                user: action.payload,
                isLogged: true,
            };
        case type.LOGOUT:
            return {
                ...state,
                token: undefined,
                user: null,
                isLogged: false,
            };
        default:
            return state;
    };
};