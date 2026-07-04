'use client'

import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'gold' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  isOutline?: boolean
}

const variantClasses = {
  primary: {
    solid: 'bg-primary/20 text-primary border border-primary/30',
    outline: 'bg-transparent text-primary border border-primary',
  },
  secondary: {
    solid: 'bg-secondary/20 text-secondary border border-secondary/30',
    outline: 'bg-transparent text-secondary border border-secondary',
  },
  gold: {
    solid: 'bg-gold/20 text-gold border border-gold/30',
    outline: 'bg-transparent text-gold border border-gold',
  },
  success: {
    solid: 'bg-green-500/20 text-green-700 border border-green-500/30',
    outline: 'bg-transparent text-green-700 border border-green-500',
  },
  warning: {
    solid: 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30',
    outline: 'bg-transparent text-yellow-700 border border-yellow-500',
  },
  danger: {
    solid: 'bg-red-500/20 text-red-700 border border-red-500/30',
    outline: 'bg-transparent text-red-700 border border-red-500',
  },
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs font-body font-medium rounded-md',
  md: 'px-3 py-1.5 text-sm font-body font-medium rounded-lg',
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'sm',
      isOutline = false,
      children,
      ...props
    },
    ref
  ) => {
    const styleType = isOutline ? 'outline' : 'solid'
    const combinedClasses = `${sizeClasses[size]} ${variantClasses[variant][styleType]} inline-flex items-center gap-2 transition-all duration-200 ${className}`

    return (
      <div ref={ref} className={combinedClasses} {...props}>
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'
