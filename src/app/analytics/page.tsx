'use client'

import { useState } from 'react'
import {
  BarChart2,
  TrendingUp,
  Users,
  MessageCircle,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { config } from '@/lib/config'

const conversationsData = [
  { name: 'Sem 1', value: 45 },
  { name: 'Sem 2', value: 52 },
  { name: 'Sem 3', value: 38 },
  { name: 'Sem 4', value: 65 },
  { name: 'Sem 5', value: 48 },
  { name: 'Sem 6', value: 72 },
]

const leadsData = [
  { name: 'Lun', hot: 3, warm: 5, cold: 2 },
  { name: 'Mar', hot: 2, warm: 4, cold: 1 },
  { name: 'Mer', hot: 4, warm: 3, cold: 3 },
  { name: 'Jeu', hot: 1, warm: 6, cold: 2 },
  { name: 'Ven', hot: 5, warm: 4, cold: 1 },
  { name: 'Sam', hot: 2, warm: 2, cold: 0 },
  { name: 'Dim', hot: 1, warm: 1, cold: 0 },
]

const departmentData = [
  { name: 'Eau', value: 35, color: '#0077B6' },
  { name: 'Energie', value: 30, color: '#FFD60A' },
  { name: 'Infrastructure', value: 20, color: '#90E0EF' },
  { name: 'Amenagements', value: 15, color: '#00B4D8' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart2 className="text-h2o-primary" />
            Analytics
          </h1>
          <p className="text-text-muted mt-1">
            Metriques et performances de vos workflows IA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-h2o-primary"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 px-4 py-2 bg-h2o-primary/20 text-h2o-primary rounded-lg hover:bg-h2o-primary/30 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            Actualiser
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageCircle className="text-h2o-primary" size={24} />
            <span className="flex items-center gap-1 text-sm text-green-400">
              <ArrowUpRight size={14} />
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold">320</p>
          <p className="text-sm text-text-muted mt-1">Conversations totales</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-red-400" size={24} />
            <span className="flex items-center gap-1 text-sm text-green-400">
              <ArrowUpRight size={14} />
              +25%
            </span>
          </div>
          <p className="text-3xl font-bold">48</p>
          <p className="text-sm text-text-muted mt-1">Leads qualifies</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="text-h2o-secondary" size={24} />
            <span className="flex items-center gap-1 text-sm text-green-400">
              <ArrowUpRight size={14} />
              +8%
            </span>
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-text-muted mt-1">Articles generes</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-green-400" size={24} />
            <span className="flex items-center gap-1 text-sm text-green-400">
              <ArrowUpRight size={14} />
              +15%
            </span>
          </div>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-sm text-text-muted mt-1">Taux conversion</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Conversations Trend */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MessageCircle size={20} className="text-h2o-primary" />
            Evolution des conversations
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} />
                <YAxis stroke="#a0a0a0" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0077B6"
                  strokeWidth={3}
                  dot={{ fill: '#0077B6', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads by Status */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Users size={20} className="text-h2o-primary" />
            Leads par statut (7 jours)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} />
                <YAxis stroke="#a0a0a0" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hot" fill="#ef4444" name="HOT" radius={[4, 4, 0, 0]} />
                <Bar dataKey="warm" fill="#eab308" name="WARM" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cold" fill="#3b82f6" name="COLD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-6">Repartition par departement</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                <span className="text-sm text-text-muted">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Summary */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-400" />
            Retour sur Investissement
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-muted">Temps economise</p>
                <p className="text-2xl font-bold text-h2o-primary">200h</p>
                <p className="text-xs text-text-muted">par mois</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-muted">Valeur economisee</p>
                <p className="text-2xl font-bold text-green-400">1,6M XPF</p>
                <p className="text-xs text-text-muted">par mois</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-muted">ROI</p>
                <p className="text-2xl font-bold text-yellow-400">386%</p>
                <p className="text-xs text-text-muted">retour mensuel</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-muted">Payback</p>
                <p className="text-2xl font-bold">0.6</p>
                <p className="text-xs text-text-muted">mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
