// resources/js/Pages/LegalInformation.tsx
import React from 'react';
import Layout from '../Layouts/Layout';

const LegalInformation: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Legal Information</h1>
                
                {/* Terms and Conditions */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
                    {/* Add your Terms and Conditions content here */}
                </section>

                {/* Privacy Policy */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                    {/* Add your Privacy Policy content here */}
                </section>

                {/* Cookie Policy */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
                    {/* Add your Cookie Policy content here */}
                </section>
            </div>
        </Layout>
    );
};

export default LegalInformation;
