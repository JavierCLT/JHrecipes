import React from 'react';
import { Link } from '@inertiajs/react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 py-2">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center font-sans text-gray-700">
                    <p style={{ fontSize: '14px' }}>&copy; {new Date().getFullYear()} JHrecipes.</p>
                    <div className="space-x-4">
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
