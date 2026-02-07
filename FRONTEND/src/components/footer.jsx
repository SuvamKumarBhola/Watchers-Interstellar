import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-400 mt-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <p className="py-4 text-center border-t mt-6 border-slate-700">
                Copyright 2025 © Watchers All Right Reserved.
            </p>
        </motion.footer>
    );
};