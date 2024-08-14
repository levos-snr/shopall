import React from "react";
import Categories from "../components/Categories";
import NewArrivals from "../components/NewArrivals";
import Trending from "../components/Trending";
import TopRated from "../components/TopRated";
import BestSellers from "../components/BestSellers";
import SpecialOffers from "../components/SpecialOffers";
import NewProducts from "../components/NewProducts";

const CategoryPage = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 gap-6">
      <aside className="col-span-3">
        <Categories />
        <BestSellers />
      </aside>
      <main className="col-span-9 space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <NewArrivals />
          <Trending />
          <TopRated />
        </div>
        <SpecialOffers />
        <NewProducts />
      </main>
    </div>
  );
};

export default CategoryPage;
