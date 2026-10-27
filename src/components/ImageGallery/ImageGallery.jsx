import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
	return (
		<ul className={css.imageGallery}>
			{images.map(({ id, tags, largeImageURL, webformatURL }) => (
				<ImageGalleryItem
					key={id}
					tags={tags}
					largeImageURL={largeImageURL}
					webformatURL={webformatURL}
				/>
			))}
		</ul>
	);
};
