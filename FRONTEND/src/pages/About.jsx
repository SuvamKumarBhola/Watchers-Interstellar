export default function About() {
    return (
        <article className="min-h-screen">
            {/* 1. Hero — mission statement */}
            <header className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-16 lg:px-24 xl:px-32 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-4xl mx-auto leading-tight">
                    Making near-Earth space understandable for everyone
                </h1>
                <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Cosmic Watch turns NASA’s live asteroid data into clear risk assessments—so researchers, educators, and the public can see what’s out there and what it means for Earth.
                </p>
            </header>

            {/* 2. The problem */}
            <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                    Why asteroid tracking matters
                </h2>
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                    Thousands of asteroids cross Earth’s orbit every year. Raw orbital data exists, but it’s scattered across technical feeds and hard to interpret. Without clear context on size, speed, and miss distance, it’s difficult to separate routine passes from objects that warrant closer attention. Cosmic Watch exists to bridge that gap—giving everyone access to the same kind of situational awareness that used to live only in research labs.
                </p>
            </section>

            {/* 3. What Cosmic Watch does */}
            <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 bg-slate-900/30">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
                    What Cosmic Watch does
                </h2>
                <ul className="space-y-4 max-w-3xl" role="list">
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 mt-1 shrink-0" aria-hidden="true">•</span>
                        <span><strong className="text-slate-200">Live NEO feed</strong> — Near-Earth Objects from NASA’s NeoWs API, updated as new data is released.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 mt-1 shrink-0" aria-hidden="true">•</span>
                        <span><strong className="text-slate-200">Risk scoring</strong> — Size, velocity, and closest approach combined into an understandable threat level.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 mt-1 shrink-0" aria-hidden="true">•</span>
                        <span><strong className="text-slate-200">Trajectory and orbit context</strong> — Where an object is going and how close it gets to Earth, in plain language.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 mt-1 shrink-0" aria-hidden="true">•</span>
                        <span><strong className="text-slate-200">Watchlists</strong> — Track specific objects and follow close approaches over time.</span>
                    </li>
                </ul>
            </section>

            {/* 4. How it works */}
            <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                    How it works
                </h2>
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                    Cosmic Watch pulls orbital and physical data from NASA’s public APIs. Our system interprets that data—size, speed, and minimum distance from Earth—and runs it through a risk model that outputs a simple, consistent score. You see the same numbers that drive scientific monitoring, but presented in a way that answers the one question that matters: how much attention does this object deserve? No astrophysics degree required.
                </p>
            </section>

            {/* 5. Why it’s different */}
            <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 bg-slate-900/30">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                    Why it’s different
                </h2>
                <p className="text-slate-300 leading-relaxed max-w-3xl mb-6">
                    Many tools assume you already know how to read orbital elements or magnitude. Cosmic Watch is built for accessibility first:
                </p>
                <ul className="space-y-3 max-w-3xl" role="list">
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 shrink-0" aria-hidden="true">—</span>
                        <span><strong className="text-slate-200">One place for data and risk</strong> — Feed and risk analysis live together, so you don’t have to cross-reference multiple sources.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 shrink-0" aria-hidden="true">—</span>
                        <span><strong className="text-slate-200">Visualization that clarifies</strong> — Orbits and close approaches shown in a way that supports understanding, not just raw numbers.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 shrink-0" aria-hidden="true">—</span>
                        <span><strong className="text-slate-200">Transparent risk scoring</strong> — Our method is explainable: you can see how size, speed, and distance combine into the score you see.</span>
                    </li>
                </ul>
            </section>

            {/* 6. Vision / future scope */}
            <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                    What’s next
                </h2>
                <p className="text-slate-300 leading-relaxed max-w-3xl mb-6">
                    We’re building toward a platform that keeps people informed and engaged with near-Earth space:
                </p>
                <ul className="space-y-3 max-w-3xl" role="list">
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 shrink-0" aria-hidden="true">—</span>
                        <span><strong className="text-slate-200">Alerts</strong> — Notifications for close approaches that meet your chosen size and distance thresholds.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 shrink-0" aria-hidden="true">—</span>
                        <span><strong className="text-slate-200">3D visualization</strong> — Orbits and flybys in 3D so you can explore trajectories in space.</span>
                    </li>
                    <li className="flex gap-3 text-slate-300">
                        <span className="text-indigo-400 shrink-0" aria-hidden="true">—</span>
                        <span><strong className="text-slate-200">Community</strong> — Shared watchlists, discussions, and resources for educators and enthusiasts.</span>
                    </li>
                </ul>
            </section>

            {/* 7. Footer tagline */}
            <footer className="py-16 md:py-20 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 text-center">
                <p className="text-lg md:text-xl font-medium text-slate-200 max-w-2xl mx-auto">
                    Cosmic Watch: clarity on what’s out there, so we can all look up with a little more confidence.
                </p>
            </footer>
        </article>
    );
}
