import { useForm } from 'react-hook-form'
import FormInputText from '../../UI/input/FormInputText'
import Select from '../../UI/select/Select'
import styles from './EmployeesPage.module.scss'

const EmployeesForm = ({ role }) => {
	const onSubmit = async () => {}

	const onError = errors => {
		const firstKey = Object.keys(errors)[0]
		const err = errors[firstKey]?.message
	}
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm()

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Роль</p>
				<Select
					name='role_id'
					control={control}
					options={role}
					rules={{ required: 'Выберите роль' }}
					placeholder='Роль'
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Фио</p>
				<FormInputText
					control={control}
					name={'full_name'}
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
					name={'login'}
					rules={{ required: 'Введите email!' }}
					placeholder={'Email'}
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button>
		</form>
	)
}
export default EmployeesForm
