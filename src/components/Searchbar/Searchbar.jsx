import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
	const onHandleSubmit = e => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);
		const searchInput = formData.get('search');
		const queryText = searchInput.trim();

		if (queryText !== '') {
			onSubmit(queryText);
		}

		form.reset();
	};

	return (
		<header className={css.Searchbar}>
			<form className={css.SearchForm} onSubmit={onHandleSubmit}>
				<button
					type='submit'
					className={css.SearchForm_button}
					aria-label='Search images'
				>
					<span className={css.SearchForm_button_label}>Search</span>
				</button>

				<input
					className={css.SearchForm_input}
					type='text'
					name='search'
					autoComplete='off'
					autoFocus
					placeholder='Search images and photos'
				/>
			</form>
		</header>
	);
};
