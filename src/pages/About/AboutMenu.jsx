import React, { useState } from 'react';
import { menuStructure, sectionGroups } from './AboutHooks';

const AboutMenu = ({ activeSection, openSubmenus, setOpenSubmenus, scrollToSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleSubmenu = (menuKey) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const isActive = (section) => activeSection === section;

    const isActiveGroup = (group) => {
        const activeGroup = activeSection ? sectionGroups[activeSection]?.group : null;
        return activeGroup === group;
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${open ? "rotate-180" : ""} h-4 w-4 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    return (
        <>
            <div className="md:hidden mb-4">
                <button
                    onClick={toggleMobileMenu}
                    className="flex items-center justify-between w-full bg-gray-200 px-4 py-2 rounded-md"
                >
                    <span className="font-medium">Menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>

            <div className={`sticky top-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                <div className="max-w-xs">
                    {menuStructure.map((menuItem) => (
                        <div key={menuItem.key} className="mb-1">
                            {menuItem.hasSubmenu ? (
                                <div>
                                    <div
                                        className={`text-sm text-white px-2 py-1 h-6 flex justify-between items-center cursor-pointer transition-all duration-300 ${isActiveGroup(menuItem.key) ? 'border-l-4 border-white' : ''}`}
                                        onClick={() => handleToggleSubmenu(menuItem.key)}
                                        style={{ backgroundColor: menuItem.color, width: '100%' }}
                                    >
                                        <p className="font-normal">{menuItem.title}</p>
                                        <Icon id={menuItem.key} open={openSubmenus[menuItem.key]} />
                                    </div>
                                    {openSubmenus[menuItem.key] && (
                                        <div style={{ width: '100%' }}>
                                            {menuItem.submenuItems.map((subItem) => (
                                                <div
                                                    key={subItem.key}
                                                    className={`py-1 px-3 text-xs border-b transition-all duration-300 ${isActive(subItem.section) ? 'bg-opacity-70 transform translate-x-1 font-bold' : 'bg-opacity-40'}`}
                                                    onClick={() => {
                                                        scrollToSection(subItem.section);
                                                        setIsMenuOpen(false);
                                                    }}
                                                    style={{ backgroundColor: menuItem.color, cursor: 'pointer', width: '100%' }}
                                                >
                                                    <div className="text-white">
                                                        {subItem.title}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className={`py-1 px-2 text-sm text-white font-normal cursor-pointer h-6 flex items-center transition-all duration-300 ${isActiveGroup(menuItem.key) ? 'border-l-4 border-white transform translate-x-1' : ''}`}
                                    onClick={() => {
                                        scrollToSection(menuItem.section);
                                        setIsMenuOpen(false); // Close mobile menu after click
                                    }}
                                    style={{ backgroundColor: menuItem.color, width: '100%' }}
                                >
                                    {menuItem.title}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AboutMenu;
