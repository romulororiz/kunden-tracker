import '@styles/scss/Footer.scss';

const Footer = ({ showSidebar }) => {
	return (
		<div className={`${showSidebar ? 'footer-sidebar footer' : 'footer'}`}>
			<span>&copy; Romulo Roriz 2023</span>
		</div>
	);
};

export default Footer;
