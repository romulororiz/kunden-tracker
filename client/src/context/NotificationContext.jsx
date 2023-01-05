import { useState } from 'react';
import { createContext } from 'react';

export const NotificationContext = createContext({
	message: '',
	hasError: false,
});

export const NotificationProvider = ({ children }) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [hasError, setHasError] = useState(false);

	const updateMessage = newErrorMessage => {
		setErrorMessage(newErrorMessage);

		setTimeout(() => {
			setErrorMessage('');
		}, 2000);
	};

	const updateHasError = newHasError => {
		setHasError(newHasError);

		setTimeout(() => {
			setHasError(false);
		}, 2000);
	};

	return (
		<NotificationContext.Provider
			value={{ errorMessage, hasError, updateMessage, updateHasError }}
		>
			{children}
		</NotificationContext.Provider>
	);
};
