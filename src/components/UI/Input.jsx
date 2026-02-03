import PropTypes from 'prop-types';

export const Input = ({ className = '', error, ...props }) => {
    return (
        <div className="w-full">
            <input
                className={`flex h-10 w-full rounded-lg border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all
          ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-primary dark:focus:ring-primary dark:text-white'
                    } ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

Input.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
};