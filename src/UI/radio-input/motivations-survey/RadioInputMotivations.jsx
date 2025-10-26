import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../RadioInput.module.scss'

const RadioInputMotivations = ({
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
			defaultValue=''
			rules={rules}
			render={({ field, fieldState }) => {
				const [selectedIndex, setSelectedIndex] = useState(null)

				return (
					<>
						{data.map((el, index) => (
							<label key={index} className={styles.form__label_motivations}>
								<input
									type='radio'
									name={name} // для HTML важно одно имя группы
									value={index} // уникальное для браузера
									checked={selectedIndex === index} // управляем выбором через локальный стейт
									onChange={() => {
										setSelectedIndex(index) // обновляем локальный стейт
										field.onChange(el.score) // в форму сохраняем только score
									}}
									className={
										line ? styles.form__label_line : styles.form__input
									}
								/>
								{el.title}
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

export default RadioInputMotivations
