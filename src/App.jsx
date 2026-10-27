import { Component } from 'react';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGellery } from './components/ImageGallery/ImageGallery';

import './App.css';

class App extends Component {
	state = {
		images: [],
		isLoading: false,
		pageIndex: 1,
		query: '',
		error: null,
		status: 'idle'
	};

	static API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

	handleSearch = query => {
		this.setState({
			query: query,
			images: [],
			pageIndex: 1,
			error: null,
			status: 'idle'
		});

		this.fetchImages(query);
	};

	fetchImages = query => {
		const BASE_URL = 'https://pixabay.com/api/';

		const searchParams = new URLSearchParams({
			key: App.API_KEY,
			q: query,
			page: this.state.pageIndex,
			image_type: 'photo',
			orientation: 'horizontal',
			per_page: '12'
		});

		const url = `${BASE_URL}?${searchParams.toString()}`;

		return fetch(url)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(new Error('Smth went wrong :('));
			})
			.then(data => this.setState({ images: data.hits, status: 'pending' }))
			.catch(error => this.setState({ error, status: 'rejected' }))
			.finally(() => this.setState({ status: 'resolved' }));
	};

	render() {
		return (
			<>
				<Searchbar onSubmit={this.handleSearch} />
				<ImageGellery images={this.state.images} />
			</>
		);
	}
}

export default App;
