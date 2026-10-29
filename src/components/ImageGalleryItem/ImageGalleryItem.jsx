import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
	tags,
	largeImageURL,
	webformatURL,
	onImageClick
}) => {
	return (
		<li className={css.imageGalleryItem}>
			<img
				src={webformatURL}
				alt={tags}
				className={css.imageGalleryItem_image}
				onClick={() => onImageClick(largeImageURL, tags)}
			/>
		</li>
	);
};
