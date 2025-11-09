// src/components/RequireAuth.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthed } from '../utils/authStorage'

const RequireAuth = ({ children }) => {
	const location = useLocation()
	if (!isAuthed()) {
		return <Navigate to='/login' replace state={{ from: location }} />
	}
	return children || <Outlet />
}

export default RequireAuth
