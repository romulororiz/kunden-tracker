export const convertMinutesToHours = (hours, minutes) => {
	const totalMinutes = minutes + hours * 60;
	const totalHours = Math.floor(totalMinutes / 60);
	const remainingMinutes = totalMinutes % 60;
	const formatted = remainingMinutes < 10 ? '0' : '';
	const noMinutes = remainingMinutes + formatted;

	return `${totalHours}${
		noMinutes === '00' ? '' : `:${formatted}${remainingMinutes}`
	}`;

	// ${formatted}${remainingMinutes}
};
