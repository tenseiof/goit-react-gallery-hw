import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit, isLoading }) => {
	const onHandleSubmit = e => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);
		const searchInput = formData.get('search');
		const queryText = searchInput.trim();

		if (queryText !== '') {
			onSubmit(queryText);
		}

		e.currentTarget.reset();
	};

	return (
		<header className={css.Searchbar}>
			<form className={css.SearchForm} onSubmit={onHandleSubmit}>
				<button
					type='submit'
					disabled={isLoading}
					className={css.SearchForm_button}
					aria-label={isLoading ? 'Searching images...' : 'Search images'}
				>
					<span className={css.SearchForm_button_label}>
						{isLoading ? 'Loading...' : 'Search'}
					</span>
				</button>

				<input
					className={css.SearchForm_input}
					type='text'
					name='search'
					autoComplete='off'
					autoFocus
					disabled={isLoading}
					placeholder='Search images and photos'
				/>
			</form>
		</header>
	);
};
