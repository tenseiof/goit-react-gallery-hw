import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
	name,
	// largeImageURL,
	webformatURL
}) => {
	return (
		<li className={css.imageGalleryItem}>
			<img src={webformatURL} alt={name} className='imageGalleryItem_image' />
		</li>
	);
};
