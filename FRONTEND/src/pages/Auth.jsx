import { useState } from "react";

export default function Auth() {
    const [theme, setTheme] = useState("dark");
    const [activeTab, setActiveTab] = useState("login");
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDark = theme === "dark";

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 800);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 800);
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
                isDark
                    ? "bg-gradient-to-br from-black via-slate-950 to-indigo-950/80"
                    : "bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50"
            }`}
        >
            {/* Theme toggle */}
            <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className={`fixed top-6 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isDark
                        ? "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/20 backdrop-blur-sm"
                        : "bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 border border-slate-600/50 backdrop-blur-sm"
                }`}
                aria-label="Toggle theme"
            >
                {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Card */}
            <div
                className={`w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ${
                    isDark
                        ? "bg-white/5 border border-white/10 shadow-indigo-950/20 backdrop-blur-xl"
                        : "bg-white/70 border border-slate-200/80 shadow-slate-900/10 backdrop-blur-xl"
                }`}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Illustration — left or top on mobile */}
                    <div
                        className={`flex items-center justify-center p-8 md:p-10 md:w-44 md:min-h-[420px] ${
                            isDark ? "bg-indigo-500/5" : "bg-indigo-100/50"
                        }`}
                        aria-hidden
                    >
                        <svg
                            className="w-24 h-24 md:w-28 md:h-28 opacity-70"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="38"
                                stroke={isDark ? "#818cf8" : "#6366f1"}
                                strokeWidth="2"
                                className="transition-colors duration-300"
                            />
                            <ellipse
                                cx="50"
                                cy="50"
                                rx="48"
                                ry="18"
                                stroke={isDark ? "#a5b4fc" : "#818cf8"}
                                strokeWidth="1.5"
                                opacity="0.6"
                                transform="rotate(-25 50 50)"
                                className="transition-colors duration-300"
                            />
                            <circle
                                cx="50"
                                cy="32"
                                r="8"
                                fill={isDark ? "#6366f1" : "#4f46e5"}
                                opacity="0.9"
                                className="transition-colors duration-300"
                            />
                            <circle cx="72" cy="58" r="3" fill={isDark ? "#818cf8" : "#6366f1"} opacity="0.5" />
                            <circle cx="28" cy="62" r="2" fill={isDark ? "#818cf8" : "#6366f1"} opacity="0.4" />
                        </svg>
                    </div>

                    {/* Form */}
                    <div className="flex-1 p-6 md:p-8">
                        <div className="flex rounded-lg p-1 mb-6 transition-colors duration-300">
                            <button
                                type="button"
                                onClick={() => setActiveTab("login")}
                                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                                    activeTab === "login"
                                        ? isDark
                                            ? "bg-indigo-500/30 text-indigo-300 shadow-sm"
                                            : "bg-indigo-500/20 text-indigo-700 shadow-sm"
                                        : isDark
                                          ? "text-slate-400 hover:text-slate-300"
                                          : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("register")}
                                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                                    activeTab === "register"
                                        ? isDark
                                            ? "bg-indigo-500/30 text-indigo-300 shadow-sm"
                                            : "bg-indigo-500/20 text-indigo-700 shadow-sm"
                                        : isDark
                                          ? "text-slate-400 hover:text-slate-300"
                                          : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                Register
                            </button>
                        </div>

                        <div className="min-h-[280px] relative">
                            {/* Login form */}
                            <div
                                className={`transition-all duration-300 ease-out ${
                                    activeTab === "login"
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 absolute inset-0 pointer-events-none translate-y-2"
                                }`}
                            >
                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="login-email"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="login-email"
                                            name="email"
                                            type="email"
                                            value={loginForm.email}
                                            onChange={handleLoginChange}
                                            autoComplete="email"
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 ${
                                                isDark
                                                    ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-indigo-400/50 focus:border-indigo-400/50"
                                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-400/40 focus:border-indigo-400"
                                            }`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="login-password"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="login-password"
                                            name="password"
                                            type="password"
                                            value={loginForm.password}
                                            onChange={handleLoginChange}
                                            autoComplete="current-password"
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 ${
                                                isDark
                                                    ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-indigo-400/50 focus:border-indigo-400/50"
                                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-400/40 focus:border-indigo-400"
                                            }`}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            isDark
                                                ? "bg-indigo-500 text-white hover:bg-indigo-400 active:scale-[0.99]"
                                                : "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.99]"
                                        }`}
                                    >
                                        {isSubmitting ? "Signing in…" : "Login"}
                                    </button>
                                </form>
                            </div>

                            {/* Register form */}
                            <div
                                className={`transition-all duration-300 ease-out ${
                                    activeTab === "register"
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 absolute inset-0 pointer-events-none translate-y-2"
                                }`}
                            >
                                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="register-name"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            Full name
                                        </label>
                                        <input
                                            id="register-name"
                                            name="fullName"
                                            type="text"
                                            value={registerForm.fullName}
                                            onChange={handleRegisterChange}
                                            autoComplete="name"
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 ${
                                                isDark
                                                    ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-indigo-400/50 focus:border-indigo-400/50"
                                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-400/40 focus:border-indigo-400"
                                            }`}
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="register-email"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="register-email"
                                            name="email"
                                            type="email"
                                            value={registerForm.email}
                                            onChange={handleRegisterChange}
                                            autoComplete="email"
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 ${
                                                isDark
                                                    ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-indigo-400/50 focus:border-indigo-400/50"
                                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-400/40 focus:border-indigo-400"
                                            }`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="register-password"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="register-password"
                                            name="password"
                                            type="password"
                                            value={registerForm.password}
                                            onChange={handleRegisterChange}
                                            autoComplete="new-password"
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 ${
                                                isDark
                                                    ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-indigo-400/50 focus:border-indigo-400/50"
                                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-400/40 focus:border-indigo-400"
                                            }`}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            isDark
                                                ? "bg-indigo-500 text-white hover:bg-indigo-400 active:scale-[0.99]"
                                                : "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.99]"
                                        }`}
                                    >
                                        {isSubmitting ? "Creating account…" : "Create account"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
