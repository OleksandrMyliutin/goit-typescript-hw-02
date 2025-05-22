import React from 'react'
import s from '../ImageGallery/ImageGallery.module.css'
import ImageCard from './ImageCard/ImageCard';
import { ImageGalleryProps } from './ImageGallery.types';

const ImageGallery = ({results, onImageClick, children}: ImageGalleryProps) => {
  return (
    <div>
      <ul className={s.wrapper}>
        {results.map(item => (
          <li key={item.id} onClick={() => onImageClick(item.urls.full!)}>
            <ImageCard item={item}/>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default ImageGallery
