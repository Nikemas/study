// src/components/Knowledge/Quiz.jsx

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { X, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { saveQuizResult } from '../../services/progressService';

export const Quiz = ({ quiz, onClose, onComplete }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const passThreshold = 70;

  const handleSelectAnswer = useCallback((index) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  }, [isAnswered]);

  const handleCheckAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    setIsAnswered(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  }, [selectedAnswer, question]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const finalScore = score + (isCorrect ? 1 : 0);
      saveQuizResult(quiz.id, finalScore, quiz.questions.length);
      setShowResults(true);
      if (onComplete) {
        onComplete(finalScore, quiz.questions.length);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isLastQuestion, score, isCorrect, quiz, onComplete]);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  }, []);

  const finalScore = showResults ? score : score + (isAnswered && isCorrect ? 1 : 0);
  const percentage = Math.round((finalScore / quiz.questions.length) * 100);
  const passed = percentage >= passThreshold;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`w-full max-w-md rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {passed ? <CheckCircle size={40} /> : <XCircle size={40} />}
            </div>

            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('quiz.results')}
            </h2>

            <p className={`text-3xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </p>

            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('quiz.score')}: {finalScore} {t('quiz.of')} {quiz.questions.length}
            </p>

            <p className={`text-lg font-medium mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? t('quiz.passed') : t('quiz.failed')}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className={`flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <RotateCcw size={18} />
                {t('quiz.tryAgain')}
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {t('quiz.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-lg rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div>
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {quiz.title}
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {quiz.questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            aria-label={t('common.close')}
          >
            <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>

        {/* Progress bar */}
        <div className={`h-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;

              let optionClasses = `w-full p-4 rounded-lg border-2 text-left transition ${
                isDark ? 'border-gray-600' : 'border-gray-200'
              }`;

              if (isAnswered) {
                if (isCorrectOption) {
                  optionClasses = `w-full p-4 rounded-lg border-2 text-left transition border-green-500 ${
                    isDark ? 'bg-green-900/30' : 'bg-green-50'
                  }`;
                } else if (isSelected && !isCorrectOption) {
                  optionClasses = `w-full p-4 rounded-lg border-2 text-left transition border-red-500 ${
                    isDark ? 'bg-red-900/30' : 'bg-red-50'
                  }`;
                }
              } else if (isSelected) {
                optionClasses = `w-full p-4 rounded-lg border-2 text-left transition border-indigo-500 ${
                  isDark ? 'bg-indigo-900/30' : 'bg-indigo-50'
                }`;
              } else {
                optionClasses += ` ${isDark ? 'hover:border-gray-500' : 'hover:border-gray-300'} cursor-pointer`;
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  className={optionClasses}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      isAnswered && isCorrectOption
                        ? 'border-green-500 bg-green-500 text-white'
                        : isAnswered && isSelected && !isCorrectOption
                        ? 'border-red-500 bg-red-500 text-white'
                        : isSelected
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : isDark ? 'border-gray-500 text-gray-400' : 'border-gray-300 text-gray-500'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                      {option}
                    </span>
                    {isAnswered && isCorrectOption && (
                      <CheckCircle size={20} className="ml-auto text-green-500" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <XCircle size={20} className="ml-auto text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`mt-4 p-3 rounded-lg ${
              isCorrect
                ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
                : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'
            }`}>
              {isCorrect ? t('quiz.correct') : `${t('quiz.incorrect')}. ${t('quiz.correctAnswer')}: ${question.options[question.correctAnswer]}`}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className={`w-full py-3 rounded-lg font-medium transition ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {t('quiz.checkAnswer')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              {isLastQuestion ? t('quiz.finish') : t('quiz.next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func
};
