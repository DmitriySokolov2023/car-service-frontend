import { Link } from 'react-router'

const Layout = ({
	children,
	title,
	repeat = false,
	protect,
	repeatLink,
	sum,
	max,
}) => {
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
						{repeat && (
							<>
								<br />
								{sum && max && (
									<p className='mb-20 '>
										Набрано баллов: {sum} из {max}
									</p>
								)}
								<Link to={`/${repeatLink}`} className='repeat-link'>
									Заполнить повторно
								</Link>
							</>
						)}
					</div>
				</header>
			</div>
			{children}
		</div>
	)
}
export default Layout
