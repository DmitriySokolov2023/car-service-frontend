import { useForm } from 'react-hook-form'
import FormInputText from '../../UI/input/FormInputText'
import Select from '../../UI/select/Select'
import styles from './EmployeesPage.module.scss'

const EmployeesListForm = ({ element, role }) => {
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
		<form
			onSubmit={handleSubmit(onSubmit, onError)}
			className={styles.list__items}
		>
			<div className={styles.list__id}>{element.id}</div>
			<Select
				name='role_id'
				control={control}
				options={role}
				rules={{ required: 'Выберите роль' }}
				placeholder='Роль'
				defaultValue={element.role_id}
			/>
			<FormInputText
				control={control}
				name={'full_name'}
				rules={{ required: 'Введите логин!' }}
				placeholder={'ФИО'}
				defaultValue={element.full_name}
			/>
			<FormInputText
				control={control}
				name={'phone'}
				rules={{ required: 'Введите логин!' }}
				placeholder='+7 (___) ___-__-__'
				defaultValue={element.phone}
			/>
			<FormInputText
				control={control}
				name={'email'}
				rules={{ required: 'Введите логин!' }}
				placeholder={'Email'}
				defaultValue={element.email}
			/>
			<Select
				name='active'
				control={control}
				options={[
					{ value: true, label: 'Активен' },
					{ value: false, label: 'Не активен' },
				]}
				rules={{ required: 'Выберите роль' }}
				placeholder='Не активен'
				defaultValue={element.active}
			/>
			<button className='btn-edit'>edit</button>
			<button className='btn-del'>del</button>
		</form>
	)
}
export default EmployeesListForm
