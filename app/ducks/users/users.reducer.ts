import { Action } from '@ngrx/store';
import { types } from './users.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    id: null,
    data: [],
    view: null,
    error: null
};

export function usersReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case types.LIST_USERS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: [],
                error: null,
                saved: null,
            });
        case types.LIST_USERS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload,
                error: null,
                saved: null,
            });
        case types.LIST_USERS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: [],
                error: action.error,
                saved: null,
            });
        case types.GET_USERS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                id: action.uid,
                error: null,
            });
        case types.GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: action.payload,
                error: null,
            });
        case types.GET_USERS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: {},
                error: action.error,
                saved: null,
            });
        case types.CREATE_USERS:
        case types.UPDATE_USERS:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                saved: null,
                error: null
            });
        case types.CREATE_USERS_SUCCESS:
        case types.UPDATE_USERS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                saved: action.payload,
                error: null
            });
        case types.CREATE_USERS_FAILURE:
        case types.UPDATE_USERS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                saved: null,
                error: action.error
            });
        default:
            return state;
    }
}
