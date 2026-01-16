import React from 'react';

const FeatureCard = ({ title, description, icon, delay }) => {
    return (
        <div className={`p-8 rounded-2xl bg-gray-800/20 border border-gray-800 hover:border-signal-orange transition-all duration-300 hover:bg-gray-800/40 hover:-translate-y-1 group`}>
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 text-signal-orange group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-sans">{title}</h3>
            <p className="text-gray-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

const FeatureGrid = () => {
    const features = [
        {
            title: "Zero-Latency Impact",
            description: "Logs shouldn't kill your load times. Rune's async buffering ensures your API responds instantly, improving SEO and conversion rates.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "Crash-Proof Reliability",
            description: "Traffic spike? No problem. Rune handles massive throughput without bottling up your server. Keep your storefront online during Black Friday.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Fix Bugs, Retain Users",
            description: "Get real-time alerts via Discord/Slack the second an error occurs. Fix issues before your customers even notice.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-24 bg-dark-slate relative">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
