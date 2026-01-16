import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold font-sans text-white mb-2">Rune</h3>
                        <p className="text-gray-500 text-sm">
                            Reliable infrastructure for modern teams.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-6 text-sm text-gray-400 font-mono">
                            <a href="#" className="hover:text-signal-orange transition-colors">Docs</a>
                            <a href="#" className="hover:text-signal-orange transition-colors">Status</a>
                            <a href="#" className="hover:text-signal-orange transition-colors">Twitter</a>
                        </div>

                        <a
                            href="https://github.com/scriptnsam/rune"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-full border border-gray-800 hover:border-signal-orange/50 transition-all duration-300 group"
                        >
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-signal-orange transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="w-0 overflow-hidden whitespace-nowrap group-hover:w-auto group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out text-xs font-mono text-gray-300 group-hover:text-white">
                                Star on GitHub
                            </span>
                        </a>
                    </div>

                    <div className="text-gray-600 text-xs text-center md:text-right">
                        &copy; {new Date().getFullYear()} Rune Inc.<br />
                        All systems normal.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
