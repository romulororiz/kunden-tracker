import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import '@styles/scss/index.scss';
import { NotificationProvider } from '@context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<NotificationProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</NotificationProvider>
	</React.StrictMode>
);
