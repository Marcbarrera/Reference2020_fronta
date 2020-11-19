import React from 'react'
import Posts from '../post/Posts'
import Categories from '../pages/Categories';
import ReferenceInit from '../pages/ReferenceInit';


const Home = () => (
    <div>
        <ReferenceInit/>
        <Categories/>
        <Posts/>
    </div>
)

export default Home;