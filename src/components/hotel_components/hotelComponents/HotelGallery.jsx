import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { ChevronLeft, ChevronRight, X, Maximize2, ZoomIn } from 'lucide-react';

const HotelGallery = (props) => {
    const { Galeria } = props;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageTransition, setImageTransition] = useState(false);

    const images = Galeria.map(item => ({
        itemImageSrc: item["Valor"],
        thumbnailImageSrc: item["Valor"],
        alt: 'Gallery Image',
        title: 'Gallery Image'
    }));

    // Prevenir scroll cuando está en fullscreen
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFullscreen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isFullscreen) return;
            
            if (e.key === 'Escape') {
                setIsFullscreen(false);
            } else if (e.key === 'ArrowLeft') {
                handleNavigation('prev');
            } else if (e.key === 'ArrowRight') {
                handleNavigation('next');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, activeIndex]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsFullscreen(false);
        }
    };

    const handleNavigation = (direction) => {
        setImageTransition(true);
        setTimeout(() => {
            if (direction === 'prev') {
                setActiveIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
            } else {
                setActiveIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
            }
            setImageTransition(false);
        }, 200);
    };

    const openFullscreen = (index) => {
        setActiveIndex(index);
        setIsFullscreen(true);
        setIsImageLoaded(false);
    };

    const itemTemplate = (item, index) => {
        return (
            <div className="relative w-full h-[500px] overflow-hidden rounded-lg group">
                <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={item.itemImageSrc}
                    alt={item.alt}
                />
                {/* Overlay con efecto hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" >
                        <button
                            onClick={() => openFullscreen(index)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                            style={{cursor: "pointer"}}
                        >
                            <Maximize2 size={18} />
                            <span className="text-sm">Ver galería completa</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const thumbnailTemplate = (item) => {
        return (
            <div className="mt-2 w-36 h-20 overflow-hidden rounded-md transition-all duration-300 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 cursor-pointer">
                <img
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    src={item.thumbnailImageSrc}
                    alt={item.alt}
                />
            </div>
        );
    };

    const fullscreenItemTemplate = () => {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen px-4 py-0">
                {/* Header bar */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                        <div className="text-white/90 font-light tracking-wide">
                            <span className="text-2xl font-semibold">{activeIndex + 1}</span>
                            <span className="text-lg mx-2">/</span>
                            <span className="text-lg text-white/60">{images.length}</span>
                        </div>
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="group flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full"
                            aria-label="Close"
                        >
                            <span className="text-sm font-medium hidden sm:inline">Cerrar</span>
                            <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
                        </button>
                    </div>
                </div>

                {/* Main image container */}
                <div className="relative flex-1 flex items-center justify-center w-full max-w-7xl">
                    {/* Navigation buttons */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation('prev');
                        }}
                        className="absolute left-2 sm:left-6 z-40 group p-3 sm:p-4 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={28} className="transition-transform duration-300 group-hover:-translate-x-1" />
                    </button>

                    {/* Image with loading state */}
                    <div className="relative max-h-[75vh] max-w-full">
                        {!isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
                                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={images[activeIndex].itemImageSrc}
                            alt={images[activeIndex].alt}
                            onLoad={() => setIsImageLoaded(true)}
                            className={`max-h-[75vh] max-w-full rounded-lg shadow-2xl object-contain transition-all duration-300 ${
                                imageTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                            } ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation('next');
                        }}
                        className="absolute right-2 sm:right-6 z-40 group p-3 sm:p-4 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label="Next"
                    >
                        <ChevronRight size={28} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Thumbnail strip */}
                <div 
                    className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm pt-8 pb-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 justify-center">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setImageTransition(true);
                                        setTimeout(() => {
                                            setActiveIndex(idx);
                                            setImageTransition(false);
                                            setIsImageLoaded(false);
                                        }, 200);
                                    }}
                                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                                        activeIndex === idx 
                                            ? 'ring-3 ring-white scale-105 shadow-lg' 
                                            : 'ring-1 ring-white/20 hover:ring-white/50 opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={img.thumbnailImageSrc}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {activeIndex === idx && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .fade-in-scale {
                    animation: fadeInScale 0.4s ease-out;
                }
            `}</style>

            <Galleria
                value={images}
                numVisible={5}
                item={(item) => itemTemplate(item, images.indexOf(item))}
                thumbnailsPosition="bottom"
                thumbnail={thumbnailTemplate}
                circular
                autoPlay={!isFullscreen}
                transitionInterval={3000}
                activeIndex={activeIndex}
                onItemChange={(e) => !isFullscreen && setActiveIndex(e.index)}
                className="w-full"
                style={{ maxWidth: '100%' }}
            />

            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl fade-in-scale"
                    onClick={handleBackgroundClick}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        {fullscreenItemTemplate()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelGallery;