import { Component } from 'react';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';

import './App.css';

class App extends Component {
	state = {
		images: [],
		pageIndex: 1,
		query: '',
		error: null,
		status: 'idle' // 'idle' | 'pending' | 'resolved' | 'rejected'
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

		this.fetchImages(query, 1);
	};

	handleLoadMore = () => {
		this.setState(
			prevState => ({
				pageIndex: prevState.pageIndex + 1
			}),
			() => {
				this.fetchImages(this.state.query, this.state.pageIndex);
			}
		);
	};

	fetchImages = (query, page) => {
		const BASE_URL = 'https://pixabay.com/api/';
		const searchParams = new URLSearchParams({
			key: App.API_KEY,
			q: query,
			page: page,
			image_type: 'photo',
			orientation: 'horizontal',
			per_page: '12'
		});

		const url = `${BASE_URL}?${searchParams.toString()}`;

		this.setState({ status: 'pending' });

		return fetch(url)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(new Error('Smth went wrong :('));
			})
			.then(data =>
				this.setState(prevState => ({
					images: [...prevState.images, ...data.hits],
					status: 'resolved'
				}))
			)
			.catch(error => this.setState({ error, status: 'rejected' }));
	};

	render() {
		const { images, status } = this.state;

		return (
			<div className='App'>
				<Searchbar onSubmit={this.handleSearch} />

				{images.length > 0 && <ImageGallery images={images} />}

				{status === 'pending' && <Loader />}

				{status === 'resolved' && images.length > 0 && (
					<Button onClick={this.handleLoadMore} />
				)}
			</div>
		);
	}
}

export default App;
