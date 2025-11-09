// src/pages/login/LoginPage.jsx
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

import { useForm } from 'react-hook-form'
import { auth } from '../../api/auth/authService'
import FormInputText from '../../UI/input/FormInputText'
import { saveSession } from '../../utils/authStorage'

const LoginPage = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [err, setErr] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm()

	const onSubmit = async ({ login, password }) => {
		setErr('')
		setLoading(true)
		try {
			const res = await auth(login, password)
			if (res.auth) {
				// сохраняем только то, что нужно
				saveSession(res.user || { id: null, login })
				const redirectTo = location.state?.from?.pathname || '/'
				navigate(redirectTo, { replace: true })
			} else {
				setErr('Неверный логин или пароль')
			}
		} catch (e) {
			setErr('Ошибка авторизации. Попробуйте ещё раз.')
		} finally {
			setLoading(false)
		}
	}

	const onError = errors => {
		const firstKey = Object.keys(errors)[0]
		const err = errors[firstKey]?.message
	}
	return (
		<form onSubmit={handleSubmit(onSubmit, onError)} className={styles.auth}>
			<div className={styles.auth__body}>
				<h3>Авторизация</h3>
				<FormInputText
					control={control}
					name={'login'}
					rules={{ required: 'Введите логин!' }}
					placeholder={'Логин'}
				/>
				<FormInputText
					control={control}
					name={'password'}
					rules={{ required: 'Введите пароль!' }}
					placeholder={'Пароль'}
					typeInput='password'
				/>
				<button disabled={loading} type='submit' className='btn-submit'>
					{loading ? 'Входим...' : 'Войти'}
				</button>
				{err && <div style={{ color: 'crimson', fontSize: '12px' }}>{err}</div>}
			</div>
		</form>
	)
}

export default LoginPage
