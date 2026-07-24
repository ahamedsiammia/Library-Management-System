import React from "react";
import Hero from "./_components/Hero";
import BooksCategory from "./_components/BooksCategory";
import PopularBooks from "./_components/PopularBooks";
import LiveStatistics from "./_components/LiveStatistics";
import Testimonials from "./_components/Testimonials";
import FAQSection from "./_components/FAQSection";
import WhyChooseUs from "./_components/WhyChooseUs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <BooksCategory />
      <PopularBooks />
      <LiveStatistics />
      <Testimonials />
      <WhyChooseUs />
      <FAQSection />
    </div>
  );
}
