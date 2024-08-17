// resources/js/Components/Footer.tsx
import React from 'react';
import { Link } from '@inertiajs/react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-200 py-4 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} JHrecipes </p>
                    <div>
                        <Link href="/legal" className="text-blue-600 hover:text-blue-800 mr-4">
                            Legal
                        </Link>
                        <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
