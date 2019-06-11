import { Action } from '@ngrx/store';
import { types } from './offenses.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    id: null,
    data: [],
    view: null,
    error: null
};

export function offensesReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case types.LIST_OFFENSES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: [],
                error: null,
                saved: null,
            });
        case types.LIST_OFFENSES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload,
                error: null,
                saved: null,
            });
        case types.LIST_OFFENSES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: [],
                error: action.error,
                saved: null,
            });
        case types.GET_OFFENSES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                id: action.uid,
                error: null,
            });
        case types.GET_OFFENSES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: action.payload,
                error: null,
            });
        case types.GET_OFFENSES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: {},
                error: action.error,
                saved: null,
            });
        case types.CREATE_OFFENSES:
        case types.UPDATE_OFFENSES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                saved: null,
                error: null
            });
        case types.CREATE_OFFENSES_SUCCESS:
        case types.UPDATE_OFFENSES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                saved: action.payload,
                error: null
            });
        case types.CREATE_OFFENSES_FAILURE:
        case types.UPDATE_OFFENSES_FAILURE:
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
