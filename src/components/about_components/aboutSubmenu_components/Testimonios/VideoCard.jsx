import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoCard = ({ video }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const getYouTubeVideoId = (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0] ||
            url.split('youtu.be/')[1]?.split('?')[0] || '';
        return videoId;
    };

    const getYouTubeThumbnail = (url) => {
        const videoId = getYouTubeVideoId(url);
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    };

    const RatingStars = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleOpenModal}
            >
                <div className="relative">
                    <img
                        src={video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)}
                        alt={`Testimonio de ${video.nombre}`}
                        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out"
                        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                    />
                    <div className={`absolute inset-0 bg-black ${isHovered ? 'bg-opacity-60' : 'bg-opacity-40 '} flex items-center justify-center transition-opacity duration-300`}>
                        <div className={`bg-red-400 rounded-full p-3 ${isHovered ? 'scale-110' : 'scale-100'} transition-all duration-300 hover:bg-gray-200`}>
                            <Play size={12} color="white" fill="white" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                        <p className="text-white font-medium truncate">{video.nombre} - {video.hotelNombre}</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-black font-medium">{video.ciudad}</p>
                        <RatingStars rating={video.rating} />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">{video.nombre} - {video.hotelNombre}</h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="relative pb-9/16 w-full h-0" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.youtubeUrl)}?autoplay=1`}
                                title={`Testimonio de ${video.nombre}`}
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoCard;
