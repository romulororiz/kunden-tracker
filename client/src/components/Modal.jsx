import '@styles/scss/Modal.scss';

const Modal = ({ isOpen, onClose, onSubmit }) => {
	const [formData, setFormData] = {
		firstName: '',
		lastName: '',
		address: {
			city: '',
			street: '',
			houseNumber: '',
			postalCode: '',
		},
		workingHours: {
			day: '',
			startTime: '',
			endTime: '',
		},
	};

	const {
		firstName,
		lastName,
		city,
		street,
		houseNumber,
		day,
		startTime,
		endTime,
	} = formData;

	return <div>Modal</div>;
};

export default Modal;
