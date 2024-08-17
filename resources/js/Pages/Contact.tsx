// resources/js/Pages/Contact.tsx
import React from 'react';
import Layout from '../Layouts/Layout';

const Contact: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
                <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>
                {/* Add your contact form or contact information here */}
            </div>
        </Layout>
    );
};

export default Contact;
