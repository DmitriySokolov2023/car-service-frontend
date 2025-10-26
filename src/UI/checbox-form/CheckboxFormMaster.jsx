import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../../UI/radio-input/RadioInput.module.scss'

const CheckboxFormMaster = ({ control, name, data, rules, line = false }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]} // по умолчанию массив
			rules={rules}
			render={({ field, fieldState }) => {
				const [selected, setSelected] = useState(field.value || [])

				const handleChange = value => {
					let updated = [...selected]
					const noneOption = data.find(
						el =>
							el.label.toLowerCase().includes('нет замечаний') ||
							el.value === 'none'
					)

					// если выбрали "Нет замечаний"
					if (noneOption && value === noneOption.value) {
						// выбираем только его, сбрасываем остальные
						updated = selected.includes(value) ? [] : [noneOption.value]
					} else {
						// если выбрали другой пункт, убираем "Нет замечаний" из выбранных
						updated = selected.includes(value)
							? selected.filter(v => v !== value)
							: [...selected.filter(v => v !== noneOption?.value), value]
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

						{fieldState.error && (
							<span className='err'>{fieldState.error.message}</span>
						)}
					</>
				)
			}}
		/>
	)
}

export default CheckboxFormMaster
