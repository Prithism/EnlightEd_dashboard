'use client'

import React from 'react'
import { motion } from 'framer-motion'

export type FilterChipType = string

interface FilterChip {
  id: string
  label: string
}

interface FilterChipsProps {
  chips: FilterChip[]
  activeChip: string
  onChipChange: (chipId: string) => void
}

export const FilterChips: React.FC<FilterChipsProps> = ({ chips, activeChip, onChipChange }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-wrap gap-2"
    >
      {chips.map((chip) => {
        const isActive = activeChip === chip.id
        return (
          <motion.button
            key={chip.id}
            variants={chipVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChipChange(chip.id)}
            className={`px-4 py-2 rounded-full font-body font-medium text-sm transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white/10 text-muted border border-white/20 hover:bg-white/20 hover:text-ink'
            }`}
          >
            {chip.label}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
