import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../routes/routes.data.js'

const HomeLink = () => {
	// ищем корневой маршрут, а не routes[0]
	const root =
		routes.find(r => r.path === '/') ||
		routes.find(r => Array.isArray(r.children))
	const children = root?.children || []

	// сгруппируем детей по block (только те, у кого есть block и name)
	const groupedRoutes = children.reduce((acc, route) => {
		if (!route.block || !route.name) return acc
		if (!acc[route.block]) acc[route.block] = []
		acc[route.block].push(route)
		return acc
	}, {})

	// helper для корректного пути ('' -> '/', 'order' -> '/order')
	const toPath = p => (p ? `/${p}`.replace(/\/{2,}/g, '/') : '/')

	return (
		<>
			{Object.entries(groupedRoutes).map(([blockName, blockRoutes]) => (
				<React.Fragment key={blockName}>
					<h2>{blockName}</h2>
					{blockRoutes.map(route => (
						<NavLink
							to={toPath(route.path)}
							key={route.path || route.name}
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
