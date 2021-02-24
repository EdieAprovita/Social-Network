import backend from '../utils/backendApi'

//CONSTANTS

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
}

//TYPES

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const USER_LOADED = 'USER_LOADED'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED'

//REDUCERS

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case ACCOUNT_DELETED:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			}
		case AUTH_ERROR:
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			}
		default:
			return state
	}
}

//ACTIONS
