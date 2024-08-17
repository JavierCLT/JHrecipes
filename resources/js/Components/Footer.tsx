import React from 'react';
import { Link } from '@inertiajs/react';

const Footer: React.FC = () => {
    const linkStyle = {
        fontSize: '14px',
        color: '#374151', // Dark gray color
        transition: 'color 0.2s ease-in-out'
    };

    return (
        <footer className="bg-gray-100 py-2"> {/* Changed bg-gray-200 to bg-gray-100, removed mt-8, reduced padding */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center font-sans">
                    <p style={{ fontSize: '14px' }}>&copy; {new Date().getFullYear()} JHrecipes.</p>
                    <div>
                        <Link 
                            href="/legal" 
                            style={linkStyle}
                            className="mr-4 hover:text-gray-900"
                        >
                            Legal
                        </Link>
                        <Link 
                            href="/contact" 
                            style={linkStyle}
                            className="hover:text-gray-900"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
