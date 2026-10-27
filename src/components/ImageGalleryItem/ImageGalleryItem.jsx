import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
	tags,
	// largeImageURL,
	webformatURL
}) => {
	return (
		<li className={css.imageGalleryItem}>
			<img
				src={webformatURL}
				alt={tags}
				className={css.imageGalleryItem_image}
			/>
		</li>
	);
};
