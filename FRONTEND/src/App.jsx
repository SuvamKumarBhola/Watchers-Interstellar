import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import Features from "./sections/why-cosmic-watch";
import HeroSection from "./sections/hero-section";
import Carousul from "./sections/feature-preview";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
import AsteroidDetails from "./pages/AsteroidDetails";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function Page() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";

    return (
        <>
            {!isAuthPage && <LenisScroll />}
            {!isAuthPage && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                            <HeroSection />
                            <Carousul />
                            <Features />
                        </main>
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/asteroid/:id" element={<AsteroidDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {!isAuthPage && <Footer />}
        </>
    );
}