import { AlertCircle, ImageOff, Search } from 'lucide-react';

import css from './StatusMessage.module.css';

const STATUS_CONFIG = {
	idle: {
		Icon: Search,
		title: 'Discover something beautiful',
		className: 'idle',
		role: 'status'
	},
	empty: {
		Icon: ImageOff,
		title: 'No images found',
		className: 'empty',
		role: 'status'
	},
	error: {
		Icon: AlertCircle,
		title: 'Something went wrong',
		className: 'error',
		role: 'alert'
	}
};

export const StatusMessage = ({ type = 'empty', message }) => {
	const config = STATUS_CONFIG[type] || STATUS_CONFIG.empty;
	const { Icon, title, className, role } = config;

	return (
		<div className={`${css.statusMessage} ${css[className]}`} role={role}>
			<div className={css.illustration}>
				<div className={css.iconGlow} />
				<Icon
					className={css.icon}
					size={38}
					strokeWidth={1.5}
					aria-hidden='true'
				/>
			</div>

			<h2 className={css.title}>{title}</h2>

			<p className={css.message}>{message}</p>
		</div>
	);
};
