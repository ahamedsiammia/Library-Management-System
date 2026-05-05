import React from 'react';
import Hero from './Hero';
import BooksCategory from './BooksCategory';
import PopularBooks from './popularBooks';
import LiveStatistics from './LiveStatistics';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BooksCategory></BooksCategory>
            <PopularBooks></PopularBooks>
            <LiveStatistics></LiveStatistics>
            <Testimonials></Testimonials>
        </div> 
    );
};

export default Home;