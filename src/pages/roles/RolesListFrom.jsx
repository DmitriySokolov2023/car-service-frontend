import { useForm } from 'react-hook-form'
import { deleteRole, updateRole } from '../../api/role/roleService'
import FormInputText from '../../UI/input/FormInputText'
import styles from './RolesPage.module.scss'

const RolesListFrom = ({ element, index, fetchData }) => {
	const handleDelete = async () => {
		try {
			const res = await deleteRole(element.id)
			if (res) {
				alert('Роль удалена!')
				fetchData()
			}
		} catch (err) {
			console.error('Ошибка при удалении сотрудника:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}
	const onSubmit = async data => {
		try {
			if (data['active'] === '') {
				data['active'] = false
			}
			const res = await updateRole(element.id, data)
			if (res) {
				alert('Роль обновлена!')
			}
		} catch (err) {
			console.error('Ошибка при обновлении сотрудника:', err)

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
		formState: { errors },
	} = useForm()
	return (
		<form
			onSubmit={handleSubmit(onSubmit, onError)}
			className={styles.list__items}
		>
			<div className={styles.list__id}>{index + 1}</div>
			<FormInputText
				control={control}
				name={'name'}
				rules={{ required: 'Введите роль!' }}
				placeholder={'Роль'}
				defaultValue={element.name}
			/>
			<FormInputText
				control={control}
				name={'description'}
				// rules={{ required: 'Введите описание!' }}
				placeholder={'Описание'}
				defaultValue={element.description}
			/>
			<button className='btn-edit'>edit</button>
			<button type='button' className='btn-del' onClick={() => handleDelete()}>
				del
			</button>
		</form>
	)
}
export default RolesListFrom
