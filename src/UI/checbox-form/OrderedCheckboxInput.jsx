import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../../UI/radio-input/RadioInput.module.scss'

const OrderedCheckboxInput = ({ control, name, data, rules, line = false }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]} // массив выбранных значений (id)
			rules={{
				...rules,
				validate: value => {
					if (!value || value.length !== data.length) {
						return 'Выберите все варианты'
					}
					return true
				},
			}}
			render={({ field, fieldState }) => {
				const [selected, setSelected] = useState(field.value || [])

				const handleChange = value => {
					let updated
					if (selected.includes(value)) {
						// снимаем выбор
						updated = selected.filter(v => v !== value)
					} else {
						// добавляем в конец
						updated = [...selected, value]
					}
					setSelected(updated)
					field.onChange(updated)
				}

				const getIndex = value => {
					const idx = selected.indexOf(value)
					return idx >= 0 ? idx + 1 : null
				}

				return (
					<>
						{data.map((el, index) => (
							<label key={index} className={styles.form__label_motivations}>
								<span
									className={
										line ? styles.form__label_line : styles.form__input
									}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: '15px',
										height: '15px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										marginRight: '8px',
										backgroundColor: selected.includes(el.value)
											? '#0c9488'
											: 'transparent',
										color: selected.includes(el.value) ? '#fff' : '#000',
										fontWeight: 'bold',
										fontSize: '12px',
									}}
								>
									{getIndex(el.value)}
								</span>
								<span>{el.label}</span>
								<input
									type='checkbox'
									name={`${name}_${index}`}
									value={el.value} // используем id
									checked={selected.includes(el.value)}
									onChange={() => handleChange(el.value)}
									style={{ display: 'none' }}
								/>
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

export default OrderedCheckboxInput
