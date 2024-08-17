import React from 'react';
import Layout from '../Layouts/Layout';

const LegalInformation: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Legal Information for JHrecipes</h1>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
                    <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
                    <p className="mb-4">By accessing and using JHrecipes (the "Website"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our Website.</p>
                    
                    <h3 className="text-xl font-semibold mb-2">2. Use of Content</h3>
                    <p className="mb-4">The content on this Website, including recipes, images, and text, is for personal, non-commercial use only. You may not reproduce, distribute, or modify any content without our express written permission.</p>
                    
                    <h3 className="text-xl font-semibold mb-2">3. User Contributions</h3>
                    <p className="mb-4">If you submit content to our Website, you grant us a non-exclusive, royalty-free license to use, modify, and distribute that content.</p>
                    
                    <h3 className="text-xl font-semibold mb-2">4. Disclaimer</h3>
                    <p className="mb-4">Any recipes and information publicly published on this Website are provided "as is" without any representations or warranties. We do not guarantee the accuracy, completeness, or usefulness of this information.</p>
                    
                    <h3 className="text-xl font-semibold mb-2">5. Limitation of Liability</h3>
                    <p className="mb-4">JHrecipes shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the Website.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                    
                    <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
                    <p className="mb-4">We collect personal information that you voluntarily provide to us, including:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>This is the minimum we need to provide you with the ability to create your own recipe repository</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
                    <p className="mb-4">We use the information we collect to:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Provide and maintain our Website</li>
                        <li>Notify you about changes to our Website</li>
                        <li>Allow you to participate in interactive features when you choose to do so</li>
                        <li>Provide customer support</li>
                        <li>Send you marketing communications about products, services, offers, and promotions related to JHrecipes</li>
                    </ul>
                    
                    {/* Add the rest of the Privacy Policy sections here */}
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
                    
                    <h3 className="text-xl font-semibold mb-2">1. What Are Cookies</h3>
                    <p className="mb-4">Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
                    
                    <h3 className="text-xl font-semibold mb-2">2. How We Use Cookies</h3>
                    <p className="mb-4">We use cookies to:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Understand how you use our website</li>
                        <li>Remember your preferences</li>
                        <li>Improve your browsing experience</li>
                        <li>Enable certain functions of the website</li>
                    </ul>
                    
                    {/* Add the rest of the Cookie Policy sections here */}
                </section>

                <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
        </Layout>
    );
};

export default LegalInformation;
