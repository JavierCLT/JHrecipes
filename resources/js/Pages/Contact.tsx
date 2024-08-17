import React from 'react';
import Layout from '../Layouts/Layout';

const Contact: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
                <p className="mb-6">If you have any questions or concerns, please don't hesitate to reach out.</p>
                
                <div className="space-y-4">
                    <p><strong>Email:</strong> <a href="mailto:javierss.usa@gmail.com" className="text-blue-600 hover:underline">javierss.usa@gmail.com</a></p>
                    
                </div>

            </div>
        </Layout>
    );
};

export default Contact;
