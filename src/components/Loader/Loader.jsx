import css from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={css.loaderOverlay}>
			<div className={css.loaderSpinner}></div>
		</div>
	);
};
