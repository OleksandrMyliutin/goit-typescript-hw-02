import { Result } from '../App/App.types'; 

export interface ImageGalleryProps {
    results: Result[];
    onImageClick: (imageUrl: string) => void;
    children: React.ReactNode;
}