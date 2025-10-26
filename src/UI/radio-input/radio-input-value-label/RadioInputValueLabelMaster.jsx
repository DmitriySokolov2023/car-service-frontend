import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../RadioInput.module.scss'

const RadioInputValueLabelMaster = ({
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
									name={name} // одно имя для группы
									value={index} // уникальное для браузера
									checked={selectedIndex === index} // управляем локальным стейтом
									onChange={() => {
										setSelectedIndex(index)
										field.onChange(el.value) // всегда используем el.value
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

export default RadioInputValueLabelMaster
