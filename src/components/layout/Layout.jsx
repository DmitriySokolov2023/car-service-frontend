import { Link, useNavigate } from 'react-router'
import { clearSession } from '../../utils/authStorage'

const Layout = ({ children, title, protect }) => {
	const navigate = useNavigate()
	const onLogout = () => {
		clearSession()
		navigate('/login', { replace: true })
	}
	return (
		<div className='wrapper'>
			<div className='wrapper__item'>
				<header className='header'>
					{protect ? (
						<div className='header__logo'>ШКОЛА 800</div>
					) : (
						<Link className='header__logo' to={'/'}>
							БД | Авто-сервис
						</Link>
					)}

					<div className='header__title'>
						<p>{title}</p>
					</div>
					<div className='header__logout' onClick={() => onLogout()}>
						<p>{'Выйти ->'}</p>
					</div>
				</header>
			</div>
			{children}
		</div>
	)
}
export default Layout
