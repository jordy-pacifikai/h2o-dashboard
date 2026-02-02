'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
  change?: number
  changeLabel?: string
}

const colorClasses = {
  primary: 'bg-h2o-primary/20 text-h2o-primary',
  secondary: 'bg-h2o-secondary/20 text-h2o-secondary',
  accent: 'bg-h2o-accent/20 text-h2o-accent',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
}

const iconBgClasses = {
  primary: 'bg-h2o-primary/10',
  secondary: 'bg-h2o-secondary/10',
  accent: 'bg-h2o-accent/10',
  success: 'bg-green-500/10',
  warning: 'bg-yellow-500/10',
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = 'primary',
  change,
  changeLabel,
}: StatCardProps) {
  return (
    <div className="bg-surface rounded-xl p-6 border border-border card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-muted text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}%
              {changeLabel && <span className="text-text-muted ml-1">{changeLabel}</span>}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBgClasses[color]}`}>
          <Icon className={colorClasses[color].split(' ')[1]} size={24} />
        </div>
      </div>
    </div>
  )
}
