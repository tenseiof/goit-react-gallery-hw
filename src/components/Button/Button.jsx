import css from './Button.module.css';

export const Button = ({ onClick }) => {
	return (
		<div className={css.buttonContainer}>
			<button className={css.button} type='button' onClick={onClick}>
				Load More
			</button>
		</div>
	);
};
