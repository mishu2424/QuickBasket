import React from 'react';
import Banner from '../Components/Banner';
import About from '../Components/About';
import Categories from '../Components/Categories';
import PopularFoods from '../Components/PopularFoods';
import ContactPage from '../Components/ContactPage';
import Review from '../Components/Review';
import useAuth from '../Hooks/useAuth';
import ShowReviews from '../Components/ShowReviews';

const Home = () => {
    const {user}=useAuth();
    return (
        <div className='mb-20'>
            <Banner></Banner>
            <About></About>
            <Categories></Categories>
            <PopularFoods></PopularFoods>
            <ContactPage></ContactPage>
            {
                user && <Review></Review>
            }
            <ShowReviews></ShowReviews>
        </div>
    );
};

export default Home;