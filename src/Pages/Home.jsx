import React from 'react';
import Banner from '../Components/Banner';
import About from '../Components/About';
import Categories from '../Components/Categories';
import PopularFoods from '../Components/PopularFoods';

const Home = () => {
    return (
        <div className='mb-20'>
            <Banner></Banner>
            <About></About>
            <Categories></Categories>
            <PopularFoods></PopularFoods>
        </div>
    );
};

export default Home;