import React from 'react';
import { motion } from 'framer-motion';

const FoundersPage = () => {
    return (
        <div className="relative z-10 pt-48 pb-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
            {/* Hero Section */}
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight text-white">
                        The <span className="text-shimmer brand-font">Prisma Founders</span>
                    </h1>
                </motion.div>
            </div>
        </div>
    );
};

export default FoundersPage;
