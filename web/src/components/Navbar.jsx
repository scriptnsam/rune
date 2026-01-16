import React from 'react';
import Button from './ui/Button';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-slate/80 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-signal-orange rounded-sm"></div>
                    <span className="text-xl font-bold text-white tracking-tight">Rune</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium">
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#" className="hover:text-white transition-colors">Docs</a>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium hidden sm:block">Log in</a>
                    <Button variant="primary" className="!px-4 !py-2 text-sm">
                        Start Free
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
