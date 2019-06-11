import { Action } from '@ngrx/store';
import { types } from './penalties.types';

// Initial State values
export const initialState: any = {
    isLoading: false,
    lastUpdated: Date.now(),
    id: null,
    data: [],
    view: null,
    error: null
};

export function penaltiesReducer(state: any = initialState, action: any) {
    switch (action.type) {
        // LIST_PENALTIES
        case types.LIST_PENALTIES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: [],
                error: null,
                saved: null,
            });
        case types.LIST_PENALTIES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: action.payload,
                error: null,
                saved: null,
            });
        case types.LIST_PENALTIES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: [],
                error: action.error,
                saved: null,
            });
        // GET_PENALTIES
        case types.GET_PENALTIES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                id: action.uid,
                error: null,
            });
        case types.GET_PENALTIES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: action.payload,
                error: null,
            });
        case types.GET_PENALTIES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                view: {},
                error: action.error,
                saved: null,
            });
        // CREATE_PENALTIES
        case types.CREATE_PENALTIES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_PENALTIES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.CREATE_PENALTIES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        // UPDATE_PENALTIES
        case types.UPDATE_PENALTIES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_PENALTIES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        case types.UPDATE_PENALTIES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                lastUpdated: Date.now(),
                data: {}
            });
        default:
            return state;
    }
}
