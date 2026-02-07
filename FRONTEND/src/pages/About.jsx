// export default function About() {
//     return (
//         <article className="min-h-screen overflow-hidden">
//             {/* 1. Hero — mission statement with full-bleed asteroid image */}
//             <header className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-center pt-24 pb-20">
//                 {/* Background image + overlay */}
//                 <div className="absolute inset-0 z-0">
//                     <img
//                         src="/Images/99942%20Apophis.jpg"
//                         alt="Asteroid 99942 Apophis — a notable near-Earth object"
//                         className="w-full h-full object-cover opacity-40 scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(67,56,202,0.25),transparent)]" />
//                 </div>
//                 <div className="relative z-10">
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-4xl mx-auto leading-tight drop-shadow-lg">
//                         Making near-Earth space understandable for everyone
//                     </h1>
//                     <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
//                         Cosmic Watch turns NASA’s live asteroid data into clear risk assessments—so researchers, educators, and the public can see what’s out there and what it means for Earth.
//                     </p>
//                 </div>
//             </header>

//             {/* Asteroid gallery strip */}
//             <section className="relative py-12 border-y border-slate-800 bg-slate-950/80" aria-label="Near-Earth objects we track">
//                 <div className="px-6 md:px-16 lg:px-24 xl:px-32">
//                     <p className="text-center text-slate-400 text-sm uppercase tracking-widest mb-8">Objects we keep an eye on</p>
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
//                         <figure className="group">
//                             <div className="aspect-square rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/50 ring-2 ring-slate-700/30 group-hover:ring-indigo-500/50 transition-all duration-300">
//                                 <img
//                                     src="/Images/99942%20Apophis.jpg"
//                                     alt="99942 Apophis"
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
//                             </div>
//                             <figcaption className="mt-3 text-center text-slate-300 text-sm font-medium">99942 Apophis</figcaption>
//                         </figure>
//                         <figure className="group">
//                             <div className="aspect-square rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/50 ring-2 ring-slate-700/30 group-hover:ring-indigo-500/50 transition-all duration-300">
//                                 <img
//                                     src="/Images/Bennu.png"
//                                     alt="101955 Bennu"
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
//                             </div>
//                             <figcaption className="mt-3 text-center text-slate-300 text-sm font-medium">101955 Bennu</figcaption>
//                         </figure>
//                         <figure className="group">
//                             <div className="aspect-square rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/50 ring-2 ring-slate-700/30 group-hover:ring-indigo-500/50 transition-all duration-300">
//                                 <img
//                                     src="/Images/2020%20VT4.avif"
//                                     alt="2020 VT4"
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
//                             </div>
//                             <figcaption className="mt-3 text-center text-slate-300 text-sm font-medium">2020 VT4</figcaption>
//                         </figure>
//                     </div>
//                 </div>
//             </section>

//             {/* 2. The problem — text + image */}
//             <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800">
//                 <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//                     <div>
//                         <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
//                             Why asteroid tracking matters
//                         </h2>
//                         <p className="text-slate-300 leading-relaxed">
//                             Thousands of asteroids cross Earth’s orbit every year. Raw orbital data exists, but it’s scattered across technical feeds and hard to interpret. Without clear context on size, speed, and miss distance, it’s difficult to separate routine passes from objects that warrant closer attention. Cosmic Watch exists to bridge that gap—giving everyone access to the same kind of situational awareness that used to live only in research labs.
//                         </p>
//                     </div>
//                     <div className="relative">
//                         <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-indigo-950/30">
//                             <img
//                                 src="/Images/Bennu.png"
//                                 alt="Asteroid Bennu — target of NASA’s OSIRIS-REx mission"
//                                 className="w-full h-auto object-cover"
//                             />
//                         </div>
//                         <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full bg-indigo-600/20 blur-2xl -z-10" />
//                     </div>
//                 </div>
//             </section>

//             {/* 3. What Cosmic Watch does */}
//             <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 bg-slate-900/30 relative">
//                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_80%_20%,rgba(67,56,202,0.08),transparent)] pointer-events-none" />
//                 <div className="relative max-w-3xl">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
//                         What Cosmic Watch does
//                     </h2>
//                     <ul className="space-y-5" role="list">
//                         <li className="flex gap-4 text-slate-300 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/30 transition-colors">
//                             <span className="text-indigo-400 text-xl shrink-0" aria-hidden="true">◆</span>
//                             <span><strong className="text-slate-200">Live NEO feed</strong> — Near-Earth Objects from NASA’s NeoWs API, updated as new data is released.</span>
//                         </li>
//                         <li className="flex gap-4 text-slate-300 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/30 transition-colors">
//                             <span className="text-indigo-400 text-xl shrink-0" aria-hidden="true">◆</span>
//                             <span><strong className="text-slate-200">Risk scoring</strong> — Size, velocity, and closest approach combined into an understandable threat level.</span>
//                         </li>
//                         <li className="flex gap-4 text-slate-300 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/30 transition-colors">
//                             <span className="text-indigo-400 text-xl shrink-0" aria-hidden="true">◆</span>
//                             <span><strong className="text-slate-200">Trajectory and orbit context</strong> — Where an object is going and how close it gets to Earth, in plain language.</span>
//                         </li>
//                         <li className="flex gap-4 text-slate-300 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/30 transition-colors">
//                             <span className="text-indigo-400 text-xl shrink-0" aria-hidden="true">◆</span>
//                             <span><strong className="text-slate-200">Watchlists</strong> — Track specific objects and follow close approaches over time.</span>
//                         </li>
//                     </ul>
//                 </div>
//             </section>

//             {/* 4. How it works — image + text */}
//             <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800">
//                 <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//                     <div className="order-2 lg:order-1 relative">
//                         <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-indigo-950/20">
//                             <img
//                                 src="/Images/2020%20VT4.avif"
//                                 alt="2020 VT4 — a near-Earth asteroid"
//                                 className="w-full h-auto object-cover"
//                             />
//                         </div>
//                         <div className="absolute -top-2 -left-2 w-32 h-32 rounded-full bg-indigo-500/15 blur-3xl -z-10" />
//                     </div>
//                     <div className="order-1 lg:order-2">
//                         <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
//                             How it works
//                         </h2>
//                         <p className="text-slate-300 leading-relaxed">
//                             Cosmic Watch pulls orbital and physical data from NASA’s public APIs. Our system interprets that data—size, speed, and minimum distance from Earth—and runs it through a risk model that outputs a simple, consistent score. You see the same numbers that drive scientific monitoring, but presented in a way that answers the one question that matters: how much attention does this object deserve? No astrophysics degree required.
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             {/* 5. Why it’s different */}
//             <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 bg-slate-900/30">
//                 <div className="max-w-3xl">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
//                         Why it’s different
//                     </h2>
//                     <p className="text-slate-300 leading-relaxed mb-8">
//                         Many tools assume you already know how to read orbital elements or magnitude. Cosmic Watch is built for accessibility first:
//                     </p>
//                     <ul className="space-y-4" role="list">
//                         <li className="flex gap-3 text-slate-300 pl-4 border-l-2 border-indigo-500/50">
//                             <span><strong className="text-slate-200">One place for data and risk</strong> — Feed and risk analysis live together, so you don’t have to cross-reference multiple sources.</span>
//                         </li>
//                         <li className="flex gap-3 text-slate-300 pl-4 border-l-2 border-indigo-500/50">
//                             <span><strong className="text-slate-200">Visualization that clarifies</strong> — Orbits and close approaches shown in a way that supports understanding, not just raw numbers.</span>
//                         </li>
//                         <li className="flex gap-3 text-slate-300 pl-4 border-l-2 border-indigo-500/50">
//                             <span><strong className="text-slate-200">Transparent risk scoring</strong> — Our method is explainable: you can see how size, speed, and distance combine into the score you see.</span>
//                         </li>
//                     </ul>
//                 </div>
//             </section>

//             {/* 6. Vision / future scope */}
//             <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 relative">
//                 <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
//                 <div className="max-w-3xl">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
//                         What’s next
//                     </h2>
//                     <p className="text-slate-300 leading-relaxed mb-8">
//                         We’re building toward a platform that keeps people informed and engaged with near-Earth space:
//                     </p>
//                     <ul className="space-y-4" role="list">
//                         <li className="flex gap-3 text-slate-300">
//                             <span className="text-indigo-400 shrink-0 font-bold" aria-hidden="true">→</span>
//                             <span><strong className="text-slate-200">Alerts</strong> — Notifications for close approaches that meet your chosen size and distance thresholds.</span>
//                         </li>
//                         <li className="flex gap-3 text-slate-300">
//                             <span className="text-indigo-400 shrink-0 font-bold" aria-hidden="true">→</span>
//                             <span><strong className="text-slate-200">3D visualization</strong> — Orbits and flybys in 3D so you can explore trajectories in space.</span>
//                         </li>
//                         <li className="flex gap-3 text-slate-300">
//                             <span className="text-indigo-400 shrink-0 font-bold" aria-hidden="true">→</span>
//                             <span><strong className="text-slate-200">Community</strong> — Shared watchlists, discussions, and resources for educators and enthusiasts.</span>
//                         </li>
//                     </ul>
//                 </div>
//             </section>

//             {/* 7. Footer tagline with subtle space vibe */}
//             <footer className="relative py-20 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 text-center overflow-hidden">
//                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(67,56,202,0.12),transparent)] pointer-events-none" />
//                 <p className="relative text-lg md:text-xl font-medium text-slate-200 max-w-2xl mx-auto leading-relaxed">
//                     Cosmic Watch: clarity on what’s out there, so we can all look up with a little more confidence.
//                 </p>
//             </footer>
//         </article>
//     );
// }




import React from 'react';
import { motion } from 'framer-motion';
import EarthCanvas from '../components/EarthCanvas';
import { Shield, Globe, Activity, Code } from 'lucide-react';

const About = () => {
    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Reuse Earth Background for consistency */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <EarthCanvas />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', margin: '4rem 0' }}
                >
                    <h1 style={{
                        fontSize: '3.5rem',
                        background: 'linear-gradient(to right, #00d4ff, #fff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        Protecting Our Planet
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '700px', margin: '0 auto' }}>
                        Leveraging NASA's NeoWs API and advanced backend algorithms to provide real-time surveillance of Near-Earth Objects.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ padding: '2rem' }}
                    >
                        <Globe size={40} color="#00d4ff" style={{ marginBottom: '1rem' }} />
                        <h3>Global Surveillance</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem' }}>
                            We track thousands of asteroids daily, monitoring their velocity, diameter, and proximity to Earth. safely.
                        </p>
                    </motion.div>

                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ padding: '2rem' }}
                    >
                        <Activity size={40} color="#ffaa00" style={{ marginBottom: '1rem' }} />
                        <h3>Risk Analysis Engine</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem' }}>
                            Our custom algorithms calculate risk scores based on miss distance and kinetic energy potential, categorizing threats instantly.
                        </p>
                    </motion.div>

                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        style={{ padding: '2rem' }}
                    >
                        <Shield size={40} color="#ff4d4d" style={{ marginBottom: '1rem' }} />
                        <h3>Planetary Defense</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem' }}>
                            By democratizing access to this data, we raise awareness and contribute to the global conversation on space safety.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '5rem', textAlign: 'center' }}
                >
                    <h2 style={{ marginBottom: '2rem' }}>Our Tech Stack</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        {['React', 'Three.js', 'Node.js', 'MongoDB', 'NASA API'].map((tech, i) => (
                            <span key={i} className="glass-panel" style={{ padding: '10px 20px', fontSize: '1rem' }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
