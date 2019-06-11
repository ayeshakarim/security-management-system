import { Action } from '@ngrx/store';
import { types } from './issues.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    id: null,
    data: [],
    view: null,
    error: null
};

export function issuesReducer(state: any = initialState, action: any) {
    switch (action.type) {
        // LIST_ISSUES
        case types.LIST_ISSUES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: [],
                error: null,
                saved: null,
            });
        case types.LIST_ISSUES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload,
                error: null,
                saved: null,
            });
        case types.LIST_ISSUES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: [],
                error: action.error,
                saved: null,
            });
        // GET_ISSUES
        case types.GET_ISSUES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                id: action.uid,
                error: null,
            });
        case types.GET_ISSUES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: action.payload,
                error: null,
            });
        case types.GET_ISSUES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: {},
                error: action.error,
                saved: null,
            });
        // CREATE ISSUES
        case types.CREATE_ISSUES:
        case types.UPDATE_ISSUES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                saved: null,
                error: null
            });
        case types.CREATE_ISSUES_SUCCESS:
        case types.UPDATE_ISSUES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                saved: action.payload,
                error: null
            });
        case types.CREATE_ISSUES_FAILURE:
        case types.UPDATE_ISSUES_FAILURE:
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
