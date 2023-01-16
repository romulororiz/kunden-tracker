import { TiHomeOutline as HomeIcon } from 'react-icons/ti';
import { HiOutlineUsers as ClientsIcon } from 'react-icons/hi';
import { RiMarkupLine as ThemeIcon } from 'react-icons/ri';

export const sidebarLinks = [
	{
		linkTitle: 'Analytics',
		link: '/dashboard',
		linkText: 'Dashboard',
		Icon: HomeIcon,
	},
	{
		linkTitle: 'Content',
		link: '/clients',
		linkText: 'Clients',
		Icon: ClientsIcon,
	},
];
