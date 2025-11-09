// src/router/Router.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import RequireAuth from './RequireAuth'
import { routes } from './routes.data'

const withGuard = (needAuth, Element) =>
	needAuth ? (
		<RequireAuth>
			<Element />
		</RequireAuth>
	) : (
		<Element />
	)

const Router = () => (
	<BrowserRouter>
		<Routes>
			{routes.map(route => {
				const ParentEl = withGuard(route.auth, route.component)

				if (route.children) {
					return (
						<Route key={route.path} path={route.path} element={ParentEl}>
							{route.children.map(child => {
								const ChildEl = withGuard(child.auth, child.component)
								return (
									<Route
										key={child.path || 'index'}
										index={!!child.index}
										path={child.path}
										element={ChildEl}
									/>
								)
							})}
						</Route>
					)
				}

				return <Route key={route.path} path={route.path} element={ParentEl} />
			})}
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	</BrowserRouter>
)

export default Router
