import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
	const onHandleSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const searchInput = formData.get('search');
		const queryText = searchInput.trim();

		if (queryText !== '') {
			onSubmit(queryText);
		} else {
			alert('Try to search something...');
		}

		e.currentTarget.reset();
	};

	return (
		<header className={css.Searchbar}>
			<form className={css.SearchForm} onSubmit={onHandleSubmit}>
				<button type='submit' className={css.SearchForm_button}>
					<span className={css.SearchForm_button_label}>Search</span>
				</button>

				<input
					className={css.SearchForm_input}
					type='text'
					name='search'
					autoComplete='off'
					autoFocus
					required
					placeholder='Search images and photos'
				/>
			</form>
		</header>
	);
};
