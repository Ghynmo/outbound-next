import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Hero from '../sections/Hero';
import Activities from '../sections/Activities';
import WhyUs from '../sections/WhyUs';
import Packages from '../sections/Packages';
import Facilities from '../sections/Facilities';
import SecondHero from '../sections/SecondHero';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import BottomCta from '../sections/BottomCta';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Activities />
        <WhyUs />
        <Packages />
        <Facilities />
        <SecondHero />
        <Gallery />
        <Testimonials />
        <FAQ />
        <BottomCta />
      </main>
      <Footer />
    </>
  );
};

export default Home;
