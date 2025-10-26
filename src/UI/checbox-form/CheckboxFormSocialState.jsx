import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../../UI/radio-input/RadioInput.module.scss'

const CheckboxFormSocialState = ({
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
				const [errorLimit, setErrorLimit] = useState('')

				const handleChange = value => {
					let updated = [...selected]
					const noneOption = data.find(
						el =>
							el.label.toLowerCase().includes('нет замечаний') ||
							el.value === 'none'
					)

					// если выбрали "Нет замечаний"
					if (noneOption && value === noneOption.value) {
						updated = selected.includes(value) ? [] : [noneOption.value]
					} else {
						// если выбрали другой пункт, убираем "Нет замечаний"
						updated = selected.includes(value)
							? selected.filter(v => v !== value)
							: [...selected.filter(v => v !== noneOption?.value), value]

						// проверка лимита
						if (updated.length > 3) {
							setErrorLimit('Можно выбрать не более 3 вариантов')
							return // не добавляем лишний
						} else {
							setErrorLimit('')
						}
					}

					setSelected(updated)
					field.onChange(updated)
				}

				return (
					<>
						{data.map((el, index) => {
							const noneOption = data.find(
								item =>
									item.label.toLowerCase().includes('нет замечаний') ||
									item.value === 'none'
							)

							const isNoneSelected = selected.includes(noneOption?.value)
							const isDisabled =
								isNoneSelected && el.value !== noneOption?.value

							return (
								<label
									key={index}
									className={`${styles.form__label_motivations} ${
										isDisabled ? styles.disabled : ''
									}`}
								>
									<input
										type='checkbox'
										name={`${name}_${index}`}
										value={el.value}
										checked={selected.includes(el.value)}
										onChange={() => handleChange(el.value)}
										className={
											line ? styles.form__label_line : styles.form__input
										}
										disabled={isDisabled}
									/>
									{el.label}
								</label>
							)
						})}

						{/* Ошибка валидации react-hook-form */}
						{fieldState.error && (
							<span className='err'>{fieldState.error.message}</span>
						)}

						{/* Ошибка лимита */}
						{errorLimit && <span className='err'>{errorLimit}</span>}
					</>
				)
			}}
		/>
	)
}

export default CheckboxFormSocialState
