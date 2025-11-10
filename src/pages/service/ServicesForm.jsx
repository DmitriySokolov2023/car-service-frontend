import { useForm } from 'react-hook-form'
import { createService } from '../../api/services/services'
import FormInputText from '../../UI/input/FormInputText'
import styles from './ServicesPage.module.scss'

const ServicesForm = ({ role, fetchData }) => {
	const onSubmit = async data => {
		try {
			const res = await createService(data)
			if (res) {
				alert('Услуга добавлена!')
			}
			fetchData()
			reset()
		} catch (err) {
			console.error('Ошибка при создании услуги:', err)

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
				<p className={styles.form__label}>Услуга</p>
				<FormInputText
					control={control}
					name={'name'}
					rules={{ required: 'Введите услугу!' }}
					placeholder={'Услуга'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>ед.изм</p>
				<FormInputText
					control={control}
					name={'unit'}
					rules={{ required: 'Введите ед.изм!' }}
					placeholder={'ед.изм'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Цена</p>
				<FormInputText
					control={control}
					name={'base_price'}
					rules={{ required: 'Введите цену!' }}
					placeholder='Цена'
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Описание</p>
				<FormInputText
					control={control}
					name={'description'}
					rules={{ required: 'Введите описание!' }}
					placeholder={'Описание'}
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button>
		</form>
	)
}
export default ServicesForm
