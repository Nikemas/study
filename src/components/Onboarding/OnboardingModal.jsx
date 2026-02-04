import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Sparkles, MessageSquare, Trophy, Book, X, ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ONBOARDING_STEPS = [
    {
        id: 'welcome',
        title: 'Welcome to AI Study Platform',
        description: 'Your personal AI-powered learning assistant. Let\'s take a quick tour!',
        icon: <Sparkles className="w-8 h-8 text-indigo-500" />
    },
    {
        id: 'chat',
        title: 'Chat with AI Tutor',
        description: 'Ask questions, get explanations, and practice conversational skills in the Chat tab.',
        icon: <MessageSquare className="w-8 h-8 text-blue-500" />
    },
    {
        id: 'knowledge',
        title: 'Study Modules',
        description: 'Explore structured learning materials and take quizzes in the Knowledge Base.',
        icon: <Book className="w-8 h-8 text-purple-500" />
    },
    {
        id: 'progress',
        title: 'Track Your Progress',
        description: 'Earn XP, unlock achievements, and level up as you learn!',
        icon: <Trophy className="w-8 h-8 text-yellow-500" />
    }
];

export const OnboardingModal = ({ onComplete }) => {
    const { theme } = useTheme();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('onboarding_completed');
        if (!hasSeenOnboarding) {
            setIsOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        localStorage.setItem('onboarding_completed', 'true');
        setIsOpen(false);
        if (onComplete) onComplete();
    };

    if (!isOpen) return null;

    const currentStep = ONBOARDING_STEPS[currentStepIndex];
    const isDark = theme === 'dark';
    const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 ${isDark ? 'bg-black/90' : 'bg-black/80'
                    } backdrop-blur-md transition-opacity duration-500`}
            />

            {/* Modal Cards */}
            <div className="relative w-full max-w-md perspective-1000">
                <div
                    className={`relative p-8 rounded-3xl shadow-2xl transition-all duration-500 ${isDark ? 'glass-card border border-white/10' : 'bg-white border border-gray-100'
                        }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleComplete}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-50'
                        }`}>
                        {currentStep.icon}
                    </div>

                    {/* Content */}
                    <div className="text-center mb-8">
                        <h2 className={`text-2xl font-bold mb-3 font-display ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            {currentStep.title}
                        </h2>
                        <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            {currentStep.description}
                        </p>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mb-8">
                        {ONBOARDING_STEPS.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentStepIndex
                                        ? 'w-8 bg-indigo-500'
                                        : `w-2 ${isDark ? 'bg-white/20' : 'bg-gray-200'}`
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleNext}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 ${isLastStep
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30'
                                : isDark
                                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                            }`}
                    >
                        {isLastStep ? (
                            <>
                                Get Started <Check size={20} />
                            </>
                        ) : (
                            <>
                                Next <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

OnboardingModal.propTypes = {
    onComplete: PropTypes.func
};
