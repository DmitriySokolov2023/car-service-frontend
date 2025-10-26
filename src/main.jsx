import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.scss'
import Router from './routes/Routes.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router />
	</StrictMode>
)
