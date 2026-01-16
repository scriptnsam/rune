import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-slate pt-20 pb-32">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-left space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-signal-orange text-sm font-mono mb-4">
                        <span className="w-2 h-2 rounded-full bg-signal-orange animate-pulse"></span>
                        v1.0.0 Release
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-sans font-bold text-white leading-tight tracking-tight">
                        Stop Guessing Why <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            Your App Crashed.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        The zero-latency logging engine that protects your revenue. Catch critical errors instantly without slowing down your user experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button variant="primary">
                            Start Monitoring Free
                        </Button>
                        <Button variant="outline" className="animate-[pulse_3s_ease-in-out_infinite]">
                            Live Demo
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center gap-6 text-gray-500 text-sm font-mono">
                        <span>// 2ms Latency</span>
                        <span>// 99.99% Uptime</span>
                        <span>// SOC2 Certified</span>
                    </div>
                </motion.div>

                {/* Right Visual - Comparison Diagram */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-signal-orange to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
                    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Others (Bad) */}
                            <div className="space-y-4 p-4 rounded-xl bg-gray-950/50 border border-red-900/30">
                                <div className="text-red-400 font-mono text-xs mb-2">OTHERS</div>
                                <div className="flex flex-col items-center justify-center h-32 space-y-3">
                                    <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                                    <div className="h-2 w-20 bg-gray-800 rounded animate-pulse"></div>
                                    <div className="h-2 w-16 bg-gray-800 rounded animate-pulse delay-75"></div>
                                </div>
                                <div className="text-center text-xs text-red-400 font-mono">Blocking IO...</div>
                            </div>

                            {/* Rune (Good) */}
                            <div className="space-y-4 p-4 rounded-xl bg-gray-950/50 border border-green-900/30">
                                <div className="text-signal-orange font-mono text-xs mb-2">RUNE_ENGINE</div>
                                <div className="flex flex-col items-center justify-center h-32 space-y-3 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-signal-orange/5 animate-[ping_3s_ease-in-out_infinite]"></div>
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1 w-full px-4">
                                        <div className="h-1 w-full bg-green-900/30 rounded overflow-hidden">
                                            <div className="h-full bg-green-500 w-full animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-xs text-green-400 font-mono">0ms Lock-wait</div>
                            </div>
                        </div>

                        {/* Terminal Window Effect */}
                        <div className="mt-6 font-mono text-xs p-4 bg-black rounded-lg border border-gray-800 overflow-hidden">
                            <div className="text-gray-500 mb-2 border-b border-gray-800 pb-2 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-green-400">$ rune check --latency</div>
                                <div className="text-gray-300">Analysis complete: 1.2ms avg</div>
                                <div className="text-gray-300">Throughput: 45k req/s</div>
                                <div className="text-signal-orange animate-pulse">_</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
