import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../routes/routes.data.js'

const HomeLink = () => {
	// берём детей первого (root) маршрута
	const children = routes[0]?.children || []

	// сгруппируем детей по block
	const groupedRoutes = children.reduce((acc, route) => {
		if (!route.block || !route.name) return acc

		if (!acc[route.block]) {
			acc[route.block] = []
		}
		acc[route.block].push(route)

		return acc
	}, {})

	return (
		<>
			{Object.entries(groupedRoutes).map(([blockName, blockRoutes], index) => (
				<React.Fragment key={`${blockName}_${index}`}>
					<h2>{blockName}</h2>
					{blockRoutes.map(route => (
						<NavLink
							to={`/${route.path}`.replace('//', '/')}
							key={route.name}
							className={({ isActive }) =>
								isActive ? 'route-link active-link' : 'route-link'
							}
						>
							{route.name}
						</NavLink>
					))}
				</React.Fragment>
			))}
		</>
	)
}

export default HomeLink
