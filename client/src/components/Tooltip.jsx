import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import '@/styles/scss/Tooltip.scss';

const Tooltip = ({ name, children }) => {
	return (
		<Tippy
			animation='scale'
			placement='right'
			theme='default'
			className='tooltip'
			content={name}
			arrow={false}
		>
			{children}
		</Tippy>
	);
};

export default Tooltip;
