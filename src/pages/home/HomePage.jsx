import { Outlet } from 'react-router'
import Layout from '../../components/layout/Layout'
import HomeLink from './HomeLink'
import styles from './HomePage.module.scss'

const HomePage = () => {
	return (
		<Layout>
			<div className={styles.home}>
				<div className='wrapper__item'>
					<div className={styles.home__nav}>
						<HomeLink />
					</div>
				</div>
				<div className='wrapper__item'>
					<div className={styles.home__content}>
						<Outlet />
					</div>
				</div>
			</div>
		</Layout>
	)
}
export default HomePage
