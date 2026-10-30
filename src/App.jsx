import { Component } from 'react';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { StatusMessage } from './components/StatusMessage/StatusMessage';

import './App.css';

class App extends Component {
	state = {
		images: [],
		pageIndex: 1,
		query: '',
		error: null,
		status: 'idle', // 'pending' | 'resolved' | 'rejected'
		totalHits: 0,
		modalImage: null,
		tags: null
	};

	static API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

	handleSearch = query => {
		if (this.state.status === 'pending') return;
		this.setState({
			images: [],
			pageIndex: 1,
			query: query,
			error: null,
			status: 'idle',
			totalHits: 0,
			modalImage: null,
			tags: null
		});

		this.fetchImages(query, 1);
	};

	handleLoadMore = () => {
		if (this.state.status === 'pending') return;
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
					totalHits: data.totalHits,
					status: 'resolved'
				}))
			)
			.catch(error => this.setState({ error, status: 'rejected' }));
	};

	handleImageClick = (largeImageURL, tags) => {
		this.setState({ modalImage: largeImageURL, tags: tags });
	};

	handleModalClose = () => {
		this.setState({ modalImage: null, tags: null });
	};

	render() {
		const { images, status, totalHits, modalImage, tags } = this.state;

		return (
			<div className='App'>
				<Searchbar
					onSubmit={this.handleSearch}
					isLoading={status === 'pending'}
				/>

				{images.length > 0 && (
					<ImageGallery onImageClick={this.handleImageClick} images={images} />
				)}

				{status === 'idle' && (
					<StatusMessage
						type='idle'
						message='Your next favorite image is just a search away. Enter a keyword to get started.'
					/>
				)}

				{status === 'rejected' && (
					<StatusMessage
						type='error'
						message="We couldn't load the images. Check your connection and try again."
					/>
				)}

				{status === 'resolved' && totalHits === 0 && (
					<StatusMessage
						type='empty'
						message="We couldn't find anything matching your search. Try different keywords."
					/>
				)}

				{status === 'pending' && <Loader />}

				{status === 'resolved' && images.length < totalHits && (
					<Button onClick={this.handleLoadMore} />
				)}
				{modalImage && (
					<Modal
						largeImageURL={modalImage}
						tags={tags}
						onClose={this.handleModalClose}
					/>
				)}
			</div>
		);
	}
}

export default App;
