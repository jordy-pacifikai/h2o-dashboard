'use client'

import { useState, useEffect } from 'react'
import {
  MessageCircle,
  Users,
  FileText,
  Mail,
  Flame,
  TrendingUp,
  Clock,
  Droplet,
  Building,
  Route,
  Zap,
  RefreshCw
} from 'lucide-react'
import StatCard from '@/components/StatCard'
import { config } from '@/lib/config'

interface DashboardStats {
  conversations: number
  totalLeads: number
  hotLeads: number
  content: number
  subscribers: number
}

const departmentIcons: Record<string, any> = {
  droplet: Droplet,
  building: Building,
  road: Route,
  zap: Zap,
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    conversations: 0,
    totalLeads: 0,
    hotLeads: 0,
    content: 0,
    subscribers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      // Simulated data - in production, fetch from Supabase
      setStats({
        conversations: Math.floor(Math.random() * 50) + 100,
        totalLeads: Math.floor(Math.random() * 20) + 30,
        hotLeads: Math.floor(Math.random() * 5) + 5,
        content: Math.floor(Math.random() * 10) + 15,
        subscribers: Math.floor(Math.random() * 50) + 80,
      })
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vue d'ensemble</h1>
          <p className="text-text-muted mt-1">
            Bienvenue sur votre tableau de bord IA, H2O Ingenierie
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Clock size={16} />
            <span>Mis a jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-h2o-primary/20 text-h2o-primary rounded-lg hover:bg-h2o-primary/30 transition-colors"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-intro="stat-cards">
        <StatCard
          title="Conversations"
          value={stats.conversations}
          icon={MessageCircle}
          color="primary"
          change={12}
          changeLabel="vs mois dernier"
        />
        <StatCard
          title="Leads HOT"
          value={stats.hotLeads}
          icon={Flame}
          color="warning"
          change={25}
          changeLabel="cette semaine"
        />
        <StatCard
          title="Articles generes"
          value={stats.content}
          icon={FileText}
          color="secondary"
          change={8}
          changeLabel="ce mois"
        />
        <StatCard
          title="Abonnes Newsletter"
          value={stats.subscribers}
          icon={Mail}
          color="success"
          change={15}
          changeLabel="nouveaux"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Departments Performance */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-h2o-primary" />
            Performance par Departement
          </h2>
          <div className="space-y-4">
            {config.departments.map((dept) => {
              const Icon = departmentIcons[dept.icon] || Droplet
              return (
                <div key={dept.id} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${dept.color}20` }}
                  >
                    <Icon size={20} style={{ color: dept.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-sm text-text-muted">{dept.automationScore}%</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${dept.automationScore}%`,
                          backgroundColor: dept.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users size={20} className="text-h2o-primary" />
            Derniers Leads
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Mairie de Papeete', dept: 'eau', score: 92 },
              { name: 'SCI Les Cocotiers', dept: 'amenagements', score: 78 },
              { name: 'EDT Polynesie', dept: 'energie', score: 95 },
              { name: 'Port Autonome', dept: 'infrastructure', score: 85 },
            ].map((lead, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-text-muted capitalize">{lead.dept}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    lead.score >= 80
                      ? 'bg-green-500/20 text-green-400'
                      : lead.score >= 60
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {lead.score}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-h2o-primary hover:bg-h2o-primary/10 rounded-lg transition-colors">
            Voir tous les leads
          </button>
        </div>
      </div>

      {/* Workflows Status */}
      <div className="mt-6 bg-surface rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Workflows Actifs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: 'Chatbot', status: 'active', webhook: 'h2o-chat' },
            { name: 'Lead Scoring', status: 'active', webhook: 'h2o-new-lead' },
            { name: 'Content Gen', status: 'active', schedule: 'Lundi 6h' },
            { name: 'Newsletter', status: 'active', schedule: 'Lundi 9h' },
            { name: 'Auto Reports', status: 'active', schedule: 'Vendredi 17h' },
          ].map((workflow, i) => (
            <div key={i} className="p-4 bg-background rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{workflow.name}</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <p className="text-xs text-text-muted">
                {workflow.schedule || `Webhook actif`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
