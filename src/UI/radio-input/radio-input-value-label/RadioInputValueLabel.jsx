import { Controller } from 'react-hook-form'
import styles from '../RadioInput.module.scss'

const RadioInputValueLabel = ({
	control,
	name,
	data,
	rules,
	line = false,
	simple_test = true,
	value, // <- выбранный элемент из родителя
	onSelectChange, // <- колбек для родителя
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue=''
			rules={rules}
			render={({ field, fieldState }) => {
				return (
					<>
						{data.map((el, index) => (
							<label key={index} className={styles.form__label_motivations}>
								<input
									type='radio'
									name={name}
									value={index}
									checked={value?.value === el.value} // синхронизация с внешним value
									onChange={() => {
										field.onChange(simple_test ? el.value : el.short_name)
										onSelectChange?.(el) // обновляем родителя
									}}
									className={
										line ? styles.form__label_line : styles.form__input
									}
								/>
								{el.label}
							</label>
						))}
						{fieldState.error && (
							<span className='err'>{fieldState.error.message}</span>
						)}
					</>
				)
			}}
		/>
	)
}

export default RadioInputValueLabel
