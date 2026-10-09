import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const threshold = 100; // Distance from bottom within which to hide

            // Hide if close to the bottom (footer area)
            if (documentHeight - scrollPosition < threshold) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-12 right-12 z-20 hidden md:flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Rotating Text */}
                <div className="absolute inset-0 animate-spin-slow">
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                        <defs>
                            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text fontSize="11" fill="white" letterSpacing="4">
                            <textPath xlinkHref="#circle">
                                SCROLL DOWN - SCROLL DOWN -
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* Center Button */}
                <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-black">
                    <ArrowDown size={20} />
                </div>
            </div>
        </div>
    );
};

export default ScrollIndicator;
