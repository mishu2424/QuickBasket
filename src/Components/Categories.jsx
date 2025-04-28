import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FoodCard from "./FoodCard";

const Categories = () => {
  const [tablistName, setTablistName]=useState('Fruits');
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/foods`);
    // console.log(data);
    setFoods(data);
  };
  return (
    <div className="container mx-auto">
      <Tabs>
        <div className="flex items-center justify-center">
          <TabList>
            <Tab onClick={()=>setTablistName('Fruits')}> <span className={tablistName==='Fruits' ? 'font-bold': ''}>Fruits</span></Tab>
            <Tab onClick={()=>setTablistName('Vegetables')}><span className={tablistName==='Vegetables' ? 'font-bold' : ''}>Vegetables</span></Tab>
            <Tab onClick={()=>setTablistName('Dairy')}><span className={tablistName==='Dairy' ? 'font-bold':''}>Dairy</span></Tab>
            <Tab onClick={()=>setTablistName('Others')}><span className={tablistName==='Others' ? 'font-bold': ''}>Others</span></Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-3 my-5">
            {foods.filter(food=>food.food_category==='Fruits').map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-3 my-5">
            {foods.filter(food=>food.food_category==='Vegetables').map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-3 my-5">
            {foods.filter(food=>food.food_category.includes('Dairy')).map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-3 my-5">
            {foods.filter(food=>(food.food_category!=='Fruits' && food.food_category!=='Vegetables' && !food.food_category.includes('Dairy'))).map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Categories;
