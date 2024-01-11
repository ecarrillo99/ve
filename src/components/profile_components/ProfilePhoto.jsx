import React, { useState, useCallback } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ImageCropper from './ImageCropper';

const ProfilePhoto = ({ closeModal, updateProfilePhoto }) => {


    return (   
        <div
            className="relative z-10"
            aria-labelledby="crop-image-dialog"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-all backdrop-blur-sm"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center items-center px-2 py-12 text-center ">
                    <div className="relative w-[50%] sm:w-[50%] min-h-[60vh] max-h-[60vh] rounded-2xl bg-white text-slate-100 text-left shadow-xl transition-all">
                        <div className="px-5 py-4">
                            <button
                                type="button"
                                className="rounded-full px-3 py-1 text-xs mt-2 mr-2 inline-flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:outline-none absolute top-2 right-2" 
                                onClick={closeModal} 
                            >Cerrar</button>
                            {
                                <ImageCropper
                                    updateProfilePhoto={updateProfilePhoto}
                                    closeModal={closeModal}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhoto;

