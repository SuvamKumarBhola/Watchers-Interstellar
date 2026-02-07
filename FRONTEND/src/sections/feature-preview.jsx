import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";

export default function Carousul() {
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [className, setClassName] = useState("");

    const sectionData = [
        {
            title: "Bennu",
            description: "101955 Bennu is a small, carbon-rich, near-Earth rubble-pile asteroid",
            image: "https://newscenter.lbl.gov/wp-content/uploads/2025/01/Newscenter_Featured_1025x685px_53141331019_49ae905cb2_o.jpg",
            align: "object-center",
        },
        {
            title: "2020 VT4",
            description: "2020 VT4 is a tiny near-Earth asteroid that passed 370 km (230 mi) above Earth's surface on 13 November 2020 at 17:20 UTC",
            image: "https://www.pennlive.com/resizer/v2/67MQIM53DZFORCIRNELK7E46E4.jpg?auth=930f75ae622a1bec6adc5743bb244d1a22e1d1d263e293df1e8e99a40d61b690&width=1280&smart=true&quality=90",
            align: "object-right",
        },
        {
            title: "3I/ATLAS",
            description: "3I/ATLAS, also known as C/2025 N1 (ATLAS) and previously as A11pl3Z, is an interstellar comet",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/3I-ATLAS_noirlab2532b.jpg/330px-3I-ATLAS_noirlab2532b.jpg",
            align: "object-center",
        },
    ];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sectionData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered, sectionData.length]);

    return (
        <section className="flex flex-col items-center" id="creations">
            <SectionTitle
                title="Our latest Data"
                description="Explore live asteroid data, analyze risks, and track Near-Earth Objects through an interactive dashboard built for researchers and enthusiasts."
            />

            <div className="flex items-center gap-4 h-100 w-full max-w-5xl mt-18 mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                {sectionData.map((data, index) => (
                    <motion.div key={data.title} className={`relative group flex-grow h-[400px] rounded-xl overflow-hidden ${isHovered && className ? "hover:w-full w-56" : index === activeIndex ? "w-full" : "w-56"} ${className} ${!className ? "pointer-events-none" : ""}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        onAnimationComplete={() => setClassName("transition-all duration-500")}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <img className={`h-full w-full object-cover ${data.align}`} src={data.image} alt={data.title} />
                        <div className={`absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 transition-all duration-300 ${isHovered && className ? "opacity-0 group-hover:opacity-100" : index === activeIndex ? "opacity-100" : "opacity-0"}`}>
                            <h1 className="text-3xl font-semibold">{data.title}</h1>
                            <p className="text-sm mt-2">{data.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
