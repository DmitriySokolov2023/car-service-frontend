import { useForm } from 'react-hook-form'
import { createRole } from '../../api/role/roleService'
import FormInputText from '../../UI/input/FormInputText'
import styles from './RolesPage.module.scss'

const RolesFrom = ({ role, fetchData }) => {
	const onSubmit = async data => {
		try {
			const res = await createRole(data)
			if (res) {
				alert('Роль добавлена!')
			}
			fetchData()
			reset()
		} catch (err) {
			console.error('Ошибка при создании сотрудника:', err)

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
				<p className={styles.form__label}>Роль</p>
				<FormInputText
					control={control}
					name={'name'}
					rules={{ required: 'Введите роль!' }}
					placeholder={'Роль'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Описание</p>
				<FormInputText
					control={control}
					name={'description'}
					rules={{ required: 'Введите описание!' }}
					placeholder='Описание'
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button>
		</form>
	)
}
export default RolesFrom
