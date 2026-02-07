import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import Features from "./sections/why-cosmic-watch";
import HeroSection from "./sections/hero-section";
import Carousul from "./sections/feature-preview";

import About from "./pages/about";
import { Routes, Route } from "react-router-dom";

export default function Page() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                <HeroSection />
                <Carousul />
                <Features />
            </main>
            <Routes>
                <Route path="/about" element={<About />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
            <Footer />
        </>
    );
}