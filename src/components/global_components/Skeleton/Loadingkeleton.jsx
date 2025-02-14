// components/global_components/LoadingSkeleton.jsx
import React from 'react';

const LoadingSpinner = ({ text = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-greenVE-600 border-t-transparent rounded-full animate-spin mb-2"></div>
        <span className="text-gray-500 text-sm font-medium">{text}</span>
    </div>
);

export const BannerSkeleton = () => {
    return (
        <div className="animate-pulse bg-gray-100 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="relative h-64 bg-gray-200 rounded-lg w-full flex items-center justify-center">
                    <LoadingSpinner text="Loading banner..." />
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
};

export const NavbarSkeleton = () => {
    return (
        <div className="animate-pulse bg-white shadow p-4">
            <div className="flex items-center justify-between">
                <div className="w-32 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Loading...</span>
                </div>
                <div className="flex space-x-4">
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export const SearchBarSkeleton = () => {
    return (
        <div className="animate-pulse bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                    <div className="h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <LoadingSpinner text="Loading search..." />
                    </div>
                </div>
                <div className="w-32">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export const ContentSkeleton = () => {
    return (
        <div className="animate-pulse bg-gray-100 rounded-lg p-4 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
                        <LoadingSpinner />
                        <div className="h-32 w-full bg-gray-300 rounded-lg mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const OffersBannerSkeleton = () => {
    return (
        <div className="animate-pulse bg-gray-100 rounded-lg p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Loading offers...</span>
            </div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                        <div className="relative">
                            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                <LoadingSpinner />
                            </div>
                            <div className="absolute top-2 right-2">
                                <div className="h-8 w-16 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
