import React from 'react';
import Hero from '../components/Hero';
import Community from '../components/Community';

const HomePage = () => {
    return (
        <main className="relative z-10 pt-20">
            <Hero />
            <Community />
        </main>
    );
};

export default HomePage;
