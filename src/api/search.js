import { api } from './client'
export const searchVisitor = query =>
	api
		.get(`/visitor/search?q=${encodeURIComponent(query)}`)
		.then(res => res.data)

export const searchTeacher = query =>
	api
		.get(`/teacher/search?q=${encodeURIComponent(query)}`)
		.then(res => res.data)

export const searchTeacherTutor = query =>
	api
		.get(`/teacher/search/tutor?q=${encodeURIComponent(query)}`)
		.then(res => res.data)
export const searchStudent = query =>
	api
		.get(`/student/search?q=${encodeURIComponent(query)}`)
		.then(res => res.data)
export const searchStudentAll = query =>
	api
		.get(`/student/all/search?q=${encodeURIComponent(query)}`)
		.then(res => res.data)
export const searchClasses = query =>
	api
		.get(`/classes/search?q=${encodeURIComponent(query)}`)
		.then(res => res.data)
export const searchSubjects = query =>
	api
		.get(`/subjects/search?q=${encodeURIComponent(query)}`)
		.then(res => res.data)
