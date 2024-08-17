import React from 'react';
import { Link } from '@inertiajs/react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-200 py-4 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center font-sans text-gray-700">
                    <p className="text-sm">&copy; {new Date().getFullYear()} JHrecipes.</p>
                    <div className="space-x-4">
                        <Link 
                            href="/legal" 
                            className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                        >
                            Legal
                        </Link>
                        <Link 
                            href="/contact" 
                            className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
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
