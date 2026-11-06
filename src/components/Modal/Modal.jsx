import { useEffect } from 'react';

import css from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, onClose }) => {
	useEffect(() => {
		const previousBodyOverflow = document.body.style.overflow;
		const previousHtmlOverflow = document.documentElement.style.overflow;

		const handleKeyDown = e => {
			if (e.code === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);

			document.body.style.overflow = previousBodyOverflow;
			document.documentElement.style.overflow = previousHtmlOverflow;
		};
	}, [onClose]);

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className={css.overlay} onClick={handleBackdropClick}>
			<div className={css.modal}>
				<img src={largeImageURL} alt={tags} />
			</div>
		</div>
	);
};

// export class oldModal extends Component {
// 	componentDidMount() {
// 		window.addEventListener('keydown', this.handleKeyDown);

// 		this.previousBodyOverflow = document.body.style.overflow;
// 		this.previousHtmlOverflow = document.documentElement.style.overflow;

// 		document.body.style.overflow = 'hidden';
// 		document.documentElement.style.overflow = 'hidden';
// 	}

// 	componentWillUnmount() {
// 		window.removeEventListener('keydown', this.handleKeyDown);

// 		document.body.style.overflow = this.previousBodyOverflow;
// 		document.documentElement.style.overflow = this.previousHtmlOverflow;
// 	}

// 	handleKeyDown = e => {
// 		if (e.code === 'Escape') {
// 			this.props.onClose();
// 		}
// 	};

// 	handleBackdropClick = e => {
// 		if (e.target === e.currentTarget) {
// 			this.props.onClose();
// 		}
// 	};

// 	render() {
// 		const { largeImageURL, tags } = this.props;

// 		return (
// 			<div className={css.overlay} onClick={this.handleBackdropClick}>
// 				<div className={css.modal}>
// 					<img src={largeImageURL} alt={tags} />
// 				</div>
// 			</div>
// 		);
// 	}
// }
