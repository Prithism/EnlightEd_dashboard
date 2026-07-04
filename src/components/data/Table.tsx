'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'

export interface TableColumn {
  key: string
  label: string
  width?: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

export interface TableRow {
  id: string | number
  [key: string]: any
}

interface TableProps {
  columns: TableColumn[]
  data: TableRow[]
  pageSize?: number
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void
  loading?: boolean
  title?: string
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageSize = 10,
  onSort,
  loading = false,
  title,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIdx = (currentPage - 1) * pageSize
  const paginatedData = data.slice(startIdx, startIdx + pageSize)

  const handleSort = (columnKey: string) => {
    const newDirection =
      sortBy?.key === columnKey && sortBy?.direction === 'asc' ? 'desc' : 'asc'
    setSortBy({ key: columnKey, direction: newDirection })
    if (onSort) onSort(columnKey, newDirection)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <Card padding="lg" className="overflow-hidden">
      {title && <h2 className="font-display font-bold text-xl text-ink mb-4">{title}</h2>}

      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="bg-primary/10 border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-body font-semibold text-ink"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      {column.label}
                      {sortBy?.key === column.key && (
                        <span className="text-xs">
                          {sortBy.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-primary border-r-transparent rounded-full" />
                    <span className="text-muted font-body">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  <p className="text-muted font-body">No data available</p>
                </td>
              </tr>
            ) : (
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="block md:table-row-group"
              >
                {paginatedData.map((row) => (
                  <motion.tr
                    key={row.id}
                    variants={rowVariants}
                    className="border-b border-white/10 hover:bg-primary/5 transition-colors h-12 md:h-auto flex md:table-row flex-col md:flex-row"
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row.id}-${column.key}`}
                        className="px-4 py-3 text-sm text-ink font-body flex md:table-cell items-center before:content-[attr(data-label)] before:font-semibold before:mr-2 before:text-primary md:before:content-none md:before:mr-0"
                        data-label={column.label}
                      >
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </motion.tbody>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-muted font-body">
            Showing {startIdx + 1}–{Math.min(startIdx + pageSize, data.length)} of {data.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm text-ink font-body px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
