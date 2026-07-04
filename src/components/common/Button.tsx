import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  isLoading?: boolean
}

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-teal-700 active:scale-95',
  secondary: 'bg-secondary/20 text-primary hover:bg-secondary/30 border border-secondary/30',
  ghost: 'text-primary hover:bg-primary/10',
  gold: 'bg-gold text-white hover:bg-gold/90 active:scale-95',
}

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm min-h-[40px]',
  md: 'px-4 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
  xl: 'px-8 py-4 text-lg min-h-[52px]',
  icon: 'p-2 w-10 h-10',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = '', variant = 'primary', size = 'md', children, isLoading, disabled, ...props },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-body font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return (
      <button className={combinedClasses} disabled={disabled || isLoading} ref={ref} {...props}>
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
