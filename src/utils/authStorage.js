// src/utils/authStorage.js
export const isAuthed = () => localStorage.getItem('auth') === '1'

export const saveSession = user => {
	// не храним пароль!
	const safeUser = user ? { id: user.id, login: user.login } : null
	localStorage.setItem('auth', '1')
	if (safeUser) localStorage.setItem('user', JSON.stringify(safeUser))
}

export const clearSession = () => {
	localStorage.removeItem('auth')
	localStorage.removeItem('user')
}
