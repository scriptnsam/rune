import React from 'react';

const ROI = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-signal-orange/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-6">
                        Built for Production, <br /> Not Just Debugging.
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Scenario 1: Without Rune */}
                    <div className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="absolute top-4 right-4 text-xs font-mono text-gray-500">LEGACY_STACK</div>
                        <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-mono text-gray-400">
                            <div className="flex-1 text-center p-4 bg-gray-950 rounded border border-gray-800 w-full">
                                User reports error
                            </div>
                            <div className="hidden md:block">→</div>
                            <div className="block md:hidden">↓</div>
                            <div className="flex-1 text-center p-4 bg-gray-950 rounded border border-gray-800 w-full text-red-400 border-red-900/30">
                                4 hours debugging
                            </div>
                            <div className="hidden md:block">→</div>
                            <div className="block md:hidden">↓</div>
                            <div className="flex-1 text-center p-4 bg-gray-950 rounded border border-gray-800 w-full text-red-500">
                                Lost Revenue
                            </div>
                        </div>
                    </div>

                    {/* Scenario 2: With Rune */}
                    <div className="relative p-8 rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl ring-1 ring-signal-orange/20">
                        <div className="absolute top-4 right-4 text-xs font-mono text-signal-orange">RUNE_ENABLED</div>
                        <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-mono text-white">
                            <div className="flex-1 text-center p-4 bg-gray-800 rounded border border-gray-700 w-full">
                                Alert received <span className="text-green-400">(2ms)</span>
                            </div>
                            <div className="hidden md:block text-signal-orange">→</div>
                            <div className="block md:hidden text-signal-orange">↓</div>
                            <div className="flex-1 text-center p-4 bg-gray-800 rounded border border-gray-700 w-full">
                                Fix deployed <span className="text-blue-400">(5 mins)</span>
                            </div>
                            <div className="hidden md:block text-signal-orange">→</div>
                            <div className="block md:hidden text-signal-orange">↓</div>
                            <div className="flex-1 text-center p-4 bg-gray-800 rounded border border-gray-700 w-full text-green-400 border-green-900/30 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                                Happy Users
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROI;
