import { Component } from 'react';

import { Searchbar } from './components/Searchbar/Searchbar';

import './App.css';

class App extends Component {
	state = {
		images: [],
		isLoading: false,
		pageIndex: 1,
		query: ''
	};

	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevState.query !== this.state.query) {
	// 		// Здесь позже запустим поиск изображений
	// 	}
	// }

	handleSearch = query => {
		this.setState({
			query: query,
			images: [],
			pageIndex: 1
		});
	};

	// fetchImages = query => {};

	render() {
		return (
			<>
				<Searchbar onSubmit={this.handleSearch} />
			</>
		);
	}
}

export default App;
