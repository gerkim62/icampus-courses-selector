import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center fullHeight bg-gray-100 text-center">
            <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
            <p className="text-gray-600 mb-8">I'd love to hear from you!</p>
            <div className="">
                <div className="space-y-4">
                    <div>
                        <p className="block text-gray-700 font-medium mb-2">
                            If you find a bug, have a suggestion, or want some work done, please reach out to me:
                        </p>
                        <p className="text-blue-500 font-medium">Email: gerkim62@gmail.com</p>
                        <p className="text-blue-500 font-medium">WhatsApp: +254715870654</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
