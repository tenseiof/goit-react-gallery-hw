import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGellery = ({ images }) => {
	return (
		<ul className={css.imageGallery}>
			{images.map(({ id, name, largeImageURL, webformatURL }) => (
				<ImageGalleryItem
					key={id}
					name={name}
					largeImageURL={largeImageURL}
					webformatURL={webformatURL}
				/>
			))}
		</ul>
	);
};
