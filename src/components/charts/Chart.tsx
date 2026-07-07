'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import { Card } from '@/components/common/Card'
import { COLORS } from '@/utils/designTokens'

export interface ChartDataPoint {
  name: string
  [key: string]: string | number
}

interface ChartProps {
  title: string
  data: ChartDataPoint[]
  type: 'line' | 'bar' | 'area' | 'radar'
  dataKeys: string[]
  colors?: string[]
  height?: number
  tooltip?: boolean
  animation?: boolean
}

export const Chart: React.FC<ChartProps> = ({
  title,
  data,
  type,
  dataKeys,
  colors = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.ACCENT],
  height = 300,
  tooltip = true,
  animation = true,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  const renderChart = () => {
    const commonProps = {
      data,
      height,
      margin: { top: 5, right: 30, left: 0, bottom: 5 },
    }

    const gridProps = {
      strokeDasharray: '3 3',
      stroke: 'rgba(255, 255, 255, 0.1)',
    }

    const axisProps = {
      stroke: 'rgba(79, 108, 116, 0.5)',
      style: { fontSize: '12px' },
    }

    const tooltipProps = tooltip
      ? {
          contentStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: COLORS.TEXT,
          },
        }
      : {}

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...commonProps}>
              <CartesianGrid {...gridProps} />
              <XAxis {...axisProps} />
              <YAxis {...axisProps} />
              {tooltip && <Tooltip {...tooltipProps} />}
              {dataKeys.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[idx] || colors[0]}
                  isAnimationActive={animation}
                  dot={false}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...commonProps}>
              <CartesianGrid {...gridProps} />
              <XAxis {...axisProps} />
              <YAxis {...axisProps} />
              {tooltip && <Tooltip {...tooltipProps} />}
              {dataKeys.map((key, idx) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[idx] || colors[0]}
                  isAnimationActive={animation}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart {...commonProps}>
              <defs>
                {dataKeys.map((key, idx) => (
                  <linearGradient
                    key={`gradient-${key}`}
                    id={`color-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={colors[idx] || colors[0]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[idx] || colors[0]} stopOpacity={0.2} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis {...axisProps} />
              <YAxis {...axisProps} />
              {tooltip && <Tooltip {...tooltipProps} />}
              {dataKeys.map((key, idx) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[idx] || colors[0]}
                  fill={`url(#color-${key})`}
                  isAnimationActive={animation}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" {...commonProps}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
              <PolarAngleAxis dataKey="name" tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              {tooltip && <Tooltip {...tooltipProps} />}
              {dataKeys.map((key, idx) => (
                <Radar
                  key={key}
                  name={key}
                  dataKey={key}
                  stroke={colors[idx] || colors[0]}
                  fill={colors[idx] || colors[0]}
                  fillOpacity={0.4}
                  isAnimationActive={animation}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg text-ink mb-4">{title}</h2>
        <div className="w-full overflow-x-auto">{renderChart()}</div>
      </Card>
    </motion.div>
  )
}
