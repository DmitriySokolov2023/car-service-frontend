import { useForm } from 'react-hook-form'
import { createClient } from '../../api/clients/clients'
import FormInputText from '../../UI/input/FormInputText'
import Select from '../../UI/select/Select'
import styles from './ClientsPage.module.scss'

const PartsForm = ({ fetchData }) => {
	const onSubmit = async data => {
		try {
			data['is_company'] = data.is_company === 1 ? false : true

			const res = await createClient(data)
			if (res) {
				alert('Клиент добавлен!')
			}
			fetchData()
			reset()
		} catch (err) {
			console.error('Ошибка при создании детали:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}

	const onError = errors => {
		const firstKey = Object.keys(errors)[0]
		const err = errors[firstKey]?.message
	}
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm()

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Тип</p>
				<Select
					name='is_company'
					control={control}
					options={[
						{ value: 1, label: 'Физ.лицо' },
						{ value: 2, label: 'Компания' },
					]}
					rules={{ required: 'Укажите тип' }}
					placeholder='Тип'
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>ФИО</p>
				<FormInputText
					control={control}
					name={'name'}
					rules={{ required: 'Введите ФИО!' }}
					placeholder={'ФИО'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Телефон</p>
				<FormInputText
					control={control}
					name={'phone'}
					rules={{ required: 'Введите телефон!' }}
					placeholder='+7 (___) ___-__-__'
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Email</p>
				<FormInputText
					control={control}
					name={'email'}
					rules={{ required: 'Введите email!' }}
					placeholder={'Email'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Комментарий</p>
				<FormInputText
					control={control}
					name={'comment'}
					placeholder={'Комментарий'}
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button>
		</form>
	)
}
export default PartsForm
