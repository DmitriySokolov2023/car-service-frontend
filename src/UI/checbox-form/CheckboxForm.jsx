import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../../UI/radio-input/RadioInput.module.scss'

const CheckboxInputValueLabel = ({
	control,
	name,
	data,
	rules,
	line = false,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]} // по умолчанию массив
			rules={rules}
			render={({ field, fieldState }) => {
				const [selected, setSelected] = useState(field.value || [])

				const handleChange = value => {
					let updated
					if (selected.includes(value)) {
						// убираем
						updated = selected.filter(v => v !== value)
					} else {
						// добавляем
						updated = [...selected, value]
					}
					setSelected(updated)
					field.onChange(updated) // в форму передаём массив
				}

				return (
					<>
						{data.map((el, index) => (
							<label key={index} className={styles.form__label_motivations}>
								<input
									type='checkbox'
									name={`${name}_${index}`} // уникальные имена для html
									value={el.short_name} // используем short_name
									checked={selected.includes(el.short_name)}
									onChange={() => handleChange(el.short_name)}
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

export default CheckboxInputValueLabel
