import h from '../SearchBar/SearchBar.module.css'
import l from '../LoadMoreBtn/LoadMoreBtn.module.css'
import c from '../Loader/Loader.module.css'
import { useEffect, useState } from "react"
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchResults } from "../../services/api";
import Loader from '../Loader/Loader'
import toast, { Toaster } from 'react-hot-toast';
import  ErrorMessage  from "../ErrorMessage/ErrorMessage";
import { useRef } from 'react';
import Modal from 'react-modal';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import { Result } from './App.types'; 

const App = () => {
  Modal.setAppElement('#root');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const openModal = (imageUrl:string) => {
    console.log(imageUrl)
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };
  
  const [results, setResults] = useState<Result[]>([]);
  const [query, setQuery] = useState<string>('random');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const galleryRef = useRef<HTMLDivElement  | null>(null);
  const handleLoadMore = () =>{
    setPage(prev => prev + 1);
    setQuery(prev => prev);
    setTimeout(() => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 300);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const handleChangeQuery = (newQuery:string) => {
    setQuery(newQuery);
    setResults([]);
    setPage(1);
  }
  useEffect(() =>{
    const abortController = new AbortController();
    const getData = async() => {
      const signal = abortController.signal;
      try {
        setLoading(true);
        const data = await fetchResults(query, page, signal);
        setResults(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages)
      } catch (error) {
        if (error instanceof Error && error.name !== 'CanceledError') {
          console.error(error);
        }
      } finally{
        setLoading(false);
      }
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const bannedWords = ["russia", "russian", "moscow"];

  const containsBannedWord = (text: string | null | undefined): boolean => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return bannedWords.some(word => lowerText.includes(word));
  };
  const filteredResults = results.filter(item =>
  !(
    containsBannedWord(item.alt_description) ||
    containsBannedWord(item.description) ||
    containsBannedWord(item.slug) ||
    containsBannedWord(item.location) ||
    containsBannedWord(item.user?.location) ||
    containsBannedWord(item.user?.name)
  )
);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}/>
      <div className={h.wrapper}>
        <SearchBar handleChangeQuery={handleChangeQuery} toast={toast}/>
      </div>
      {!loading && results.length === 0 && <ErrorMessage query={query}/>}
      <div ref={galleryRef}><ImageGallery  results={filteredResults} onImageClick={openModal} children/></div>
      <ImageModal isOpen={modalIsOpen} imageUrl={selectedImage} onClose={closeModal}/>
      {loading && <div className={c.wrapper}><Loader loading={loading}/></div>}
      {results.length > 0 && page < totalPages &&  <div className={l.wrapper}><LoadMoreBtn onClick={handleLoadMore}/></div>}
    </>
  )
}

export default App
