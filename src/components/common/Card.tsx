import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'highlighted' | 'minimal'
  padding?: 'sm' | 'md' | 'lg'
  borderRadius?: 'lg' | 'xl' | '2xl' | '3xl'
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

const radiusClasses = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
}

const variantClasses = {
  default: 'glass',
  highlighted: 'glass bg-gradient-to-br from-white/10 to-white/5 border-gold/30',
  minimal: 'border border-white/20 rounded-2xl',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      variant = 'default',
      padding = 'md',
      borderRadius = '2xl',
      children,
      ...props
    },
    ref
  ) => {
    const combinedClasses = `${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[borderRadius]} ${className}`

    return (
      <div ref={ref} className={combinedClasses} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
