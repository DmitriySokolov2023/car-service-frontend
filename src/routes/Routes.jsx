import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import { routes } from './routes.data'

const ProtectedRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('isAuthenticated') === 'true'
	)
	const [checkedAuth, setCheckedAuth] = useState(false)

	useEffect(() => {
		if (!isAuthenticated) {
			const password = prompt('Введите пароль для доступа к этой странице:')
			if (password === 'c[jkf800') {
				setIsAuthenticated(true)
				localStorage.setItem('isAuthenticated', 'true')
			} else {
				alert('Неверный пароль')
			}
		}
		setCheckedAuth(true)
	}, [isAuthenticated])

	if (!checkedAuth) return null // ждём проверки
	if (!isAuthenticated) return <div>Доступ запрещен</div>
	return children
}

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					// Защищаем только нужные маршруты
					const needsAuth = route.requireAdmin

					if (route.children) {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={
									needsAuth ? (
										<ProtectedRoute>
											<route.component />
										</ProtectedRoute>
									) : (
										<route.component />
									)
								}
							>
								{route.children.map(child => (
									<Route
										key={child.path}
										path={child.path}
										element={<child.component />}
									/>
								))}
							</Route>
						)
					}

					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								needsAuth ? (
									<ProtectedRoute>
										<route.component />
									</ProtectedRoute>
								) : (
									<route.component />
								)
							}
						/>
					)
				})}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
