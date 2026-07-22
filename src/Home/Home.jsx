import React from 'react';
import Hero from './Hero';
import BooksCategory from './BooksCategory';
import PopularBooks from './popularBooks';
import LiveStatistics from './LiveStatistics';
import Testimonials from './Testimonials';
import FAQSection from './FAQSection';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BooksCategory></BooksCategory>
            <PopularBooks></PopularBooks>
            <LiveStatistics></LiveStatistics>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <FAQSection></FAQSection>
        </div> 
    );
};

export default Home;