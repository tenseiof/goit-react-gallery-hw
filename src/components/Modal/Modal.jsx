import { Component } from 'react';

import css from './Modal.module.css';

export class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);

		this.previousBodyOverflow = document.body.style.overflow;
		this.previousHtmlOverflow = document.documentElement.style.overflow;

		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);

		document.body.style.overflow = this.previousBodyOverflow;
		document.documentElement.style.overflow = this.previousHtmlOverflow;
	}

	handleKeyDown = e => {
		if (e.code === 'Escape') {
			this.props.onClose();
		}
	};

	handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			this.props.onClose();
		}
	};

	render() {
		const { largeImageURL, tags } = this.props;

		return (
			<div className={css.overlay} onClick={this.handleBackdropClick}>
				<div className={css.modal}>
					<img src={largeImageURL} alt={tags} />
				</div>
			</div>
		);
	}
}
