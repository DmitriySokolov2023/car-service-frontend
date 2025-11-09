import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import {
	searchClasses,
	searchStudent,
	searchStudentAll,
	searchSubjects,
	searchTeacher,
	searchTeacherTutor,
	searchVisitor,
} from '../../api/search.js'
import styles from './InputSearch.module.scss'

const InputSearch = ({ value, placeholder, onSelect, onClear, type }) => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		setQuery(value || '')
	}, [value])

	// 🧠 при фокусе показать все предметы, если type === 'subjects'
	const handleFocus = async () => {
		setIsFocused(true)

		if (type === 'subjects') {
			try {
				const data = await searchSubjects('') // пустая строка => показать все
				setResults(data.subjects || [])
			} catch (err) {
				console.error('Ошибка загрузки предметов:', err)
			}
		}
		if (type === 'violations') {
			try {
				const data = await searchSubjects('') // пустая строка => показать все
				setResults(data.subjects || [])
			} catch (err) {
				console.error('Ошибка загрузки предметов:', err)
			}
		}
	}

	// 🔚 при потере фокуса закрыть список (с задержкой)
	const handleBlur = () => {
		setTimeout(() => setIsFocused(false), 150)
	}

	// 🔍 при изменении запроса искать по ILIKE
	const handleChange = async e => {
		const value = e.target.value
		setQuery(value)

		if (!value) {
			setResults([])
			onClear?.()
			return
		}

		try {
			if (type === 'subjects') {
				const data = await searchSubjects(value)
				setResults(data.subjects || [])
			}
			if (type === 'visitor') {
				const data = await searchVisitor(value)
				setResults(data.employees || [])
			}
			if (type === 'teacher') {
				const data = await searchTeacher(value)
				setResults(data.teacher || [])
			}
			if (type === 'teacher-tutor') {
				const data = await searchTeacherTutor(value)
				setResults(data.teacher || [])
			}
			if (type === 'student') {
				const data = await searchStudent(value)
				setResults(data.student || [])
			}
			if (type === 'student-all') {
				const data = await searchStudentAll(value)
				setResults(data.student || [])
			}
			if (type === 'classes') {
				const data = await searchClasses(value)
				setResults(data.classes || [])
			}
		} catch (err) {
			console.error('Ошибка поиска:', err)
		}
	}

	return (
		<div className={styles.inputWrapper}>
			<input
				type='text'
				value={query}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
				className={styles.input}
			/>

			{/* показываем список при фокусе */}
			{isFocused && results.length > 0 && (
				<ul className={styles.suggestions}>
					{results.map((emp, index) => (
						<li
							key={`li_${
								emp.id_staff_post ||
								emp.id_student_class ||
								emp.id_staff ||
								emp.id_class ||
								emp.id_subject
							}_${index}`}
							onClick={() => {
								setQuery(emp.fio || emp.class || emp.subject_name)
								setResults([])
								onSelect(emp)
							}}
						>
							{type === 'subjects' && emp.subject_name}
							{type !== 'classes' && type !== 'subjects' && `${emp.fio} - `}
							{type !== 'classes' && type !== 'subjects'
								? emp.post ||
								  `${emp.class} — ${emp.faculty || 'Без факультета'}`
								: emp.class}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default function FormInputSearch({
	name,
	control,
	rules,
	placeholder,
	type,
	onSelectExtra,
	setData,
}) {
	const [selectedItem, setSelectedItem] = useState(null)

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue=''
			render={({ field, fieldState }) => (
				<div className={styles.wrapper}>
					<InputSearch
						placeholder={placeholder}
						type={type}
						value={
							selectedItem
								? selectedItem.fio ||
								  selectedItem.class ||
								  selectedItem.subject_name
								: ''
						}
						onSelect={item => {
							setSelectedItem(item)
							field.onChange(
								item.id_staff_post ||
									item.id_student_class ||
									item.id_staff ||
									item.id_class ||
									item.id_subject
							)
							onSelectExtra?.(item)
							setData && setData(item)
						}}
						onClear={() => {
							setSelectedItem(null)
							field.onChange('')
						}}
					/>
					{fieldState.error && (
						<span className={styles.error}>{fieldState.error.message}</span>
					)}
				</div>
			)}
		/>
	)
}
