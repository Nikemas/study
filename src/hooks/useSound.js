import { useCallback, useState } from 'react';
import { getSoundEnabled, saveSoundEnabled } from '../services/storageService';

const createBeep = (frequency = 440, duration = 0.1, type = 'sine') => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.warn('Audio play failed', error);
    }
};

export const useSound = () => {
    const [enabled, setEnabled] = useState(() => getSoundEnabled());

    const toggleSound = useCallback(() => {
        setEnabled(prev => {
            const newValue = !prev;
            saveSoundEnabled(newValue);
            return newValue;
        });
    }, []);

    const playSound = useCallback((type) => {
        if (!enabled) return;

        switch (type) {
            case 'message':
                createBeep(800, 0.1, 'sine');
                break;
            case 'receive':
                createBeep(600, 0.15, 'sine');
                break;
            case 'unlock':
                setTimeout(() => createBeep(523.25, 0.1), 0);
                setTimeout(() => createBeep(659.25, 0.1), 100);
                setTimeout(() => createBeep(783.99, 0.3), 200);
                break;
            case 'success':
                createBeep(1000, 0.2, 'sine');
                break;
            case 'error':
                createBeep(200, 0.3, 'sawtooth');
                break;
            default:
                createBeep(440, 0.1);
        }
    }, [enabled]);

    return { enabled, toggleSound, playSound };
};
