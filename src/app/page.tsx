'use client'

import { useState, useEffect } from 'react'
import introJs from 'intro.js'
import { guideSteps } from '@/components/InteractiveGuide'
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
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Activity,
  Target,
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts'
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

// Mock chart data
const analyticsData = [
  { name: 'Jan', value: 65 },
  { name: 'Fev', value: 78 },
  { name: 'Mar', value: 92, highlight: true },
  { name: 'Avr', value: 85 },
  { name: 'Mai', value: 102 },
  { name: 'Juin', value: 95 },
  { name: 'Jul', value: 110 },
]

const activityData = [
  { time: '06:00', conversations: 12, leads: 3 },
  { time: '09:00', conversations: 45, leads: 8 },
  { time: '12:00', conversations: 32, leads: 5 },
  { time: '15:00', conversations: 58, leads: 12 },
  { time: '18:00', conversations: 28, leads: 4 },
  { time: '21:00', conversations: 15, leads: 2 },
]

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
  const [activeTab, setActiveTab] = useState('tracker')

  const startGuide = () => {
    const intro = introJs()
    intro.setOptions({
      steps: guideSteps.map((step) => ({
        element: step.element,
        intro: step.intro,
        title: step.title,
        position: step.position,
      })),
      showProgress: true,
      showBullets: true,
      exitOnOverlayClick: false,
      doneLabel: 'Terminer',
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      skipLabel: 'Passer',
    })
    intro.start()
  }

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      setStats({
        conversations: 156,
        totalLeads: 42,
        hotLeads: 8,
        content: 24,
        subscribers: 128,
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
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <div className="flex items-center gap-1 px-3 py-1 bg-accent rounded-full">
              <Sparkles size={14} className="text-text-primary" />
              <span className="text-xs font-semibold text-text-primary">IA Active</span>
            </div>
          </div>
          <p className="text-text-muted">
            Bienvenue, H2O Ingenierie. Voici vos performances du jour.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-border">
            <Calendar size={16} className="text-text-muted" />
            <span className="text-sm text-text-secondary">Fev 01 - Fev 07</span>
          </div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-accent rounded-xl text-text-primary font-medium hover:bg-accent-hover transition-all"
            style={{ boxShadow: '0 4px 12px rgba(198, 244, 50, 0.3)' }}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Stats Grid - Style moderne comme l'image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 stagger-children" data-intro="stat-cards">
        {/* Wellness Card - Large */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-sm font-medium text-text-secondary">Conversations</span>
            </div>
            <span className="text-xs px-2 py-1 bg-success-light text-success rounded-full font-medium">
              +16%
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-text-primary">{stats.conversations}</span>
            <span className="text-sm text-text-muted mb-1">ce mois</span>
          </div>
          <div className="mt-4 flex items-center gap-4 pt-4 border-t border-border-light">
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.hotLeads}</p>
              <p className="text-xs text-text-muted">Leads HOT</p>
            </div>
            <div className="w-px h-8 bg-border-light"></div>
            <div>
              <p className="text-2xl font-bold text-text-primary">85%</p>
              <p className="text-xs text-text-muted">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-text-primary">Analytics</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Tracker</span>
              <span className="text-2xl font-bold text-text-primary">09.45</span>
              <span className="text-xs text-text-muted">AM</span>
            </div>
          </div>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: '#1A1A1A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {analyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.highlight ? '#C6F432' : '#E5E5E7'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mt-4">
            {['Tracker', 'Leads', 'Content', 'Newsletter', 'ROI'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-text-primary text-white'
                    : 'text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Progress</span>
            <button className="text-text-muted hover:text-text-primary">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-surface-hover flex items-center justify-center">
              <Activity size={28} className="text-accent-dark" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Objectif</p>
              <p className="text-2xl font-bold text-text-primary">139</p>
              <p className="text-xs text-text-muted">leads/mois</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Automatisation</span>
              <span className="font-medium text-text-primary">78%</span>
            </div>
            <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Feature Card - Dark */}
        <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="80" cy="20" r="40" fill="#C6F432" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Automatisez vos relances</h3>
          <p className="text-sm text-gray-400 mb-6">
            Gagnez du temps avec notre IA qui qualifie et relance automatiquement vos prospects.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={startGuide}
              className="flex items-center gap-2 px-4 py-2 bg-accent rounded-xl text-text-primary font-medium text-sm hover:bg-accent-hover transition-all"
            >
              <Play size={16} />
              Demarrer
            </button>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              En savoir plus
            </button>
          </div>
        </div>

        {/* Activity Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-text-primary">Activite en temps reel</span>
            <span className="text-xs px-2 py-1 bg-success-light text-success rounded-full font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6F432" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C6F432" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: '#1A1A1A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="conversations" stroke="#C6F432" strokeWidth={2} fillOpacity={1} fill="url(#colorConv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <MessageCircle size={14} className="text-text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">89 bpm</p>
                <p className="text-xs text-text-muted">messages/h</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">97.5%</p>
              <p className="text-xs text-text-muted">uptime</p>
            </div>
          </div>
        </div>

        {/* Checklist Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-text-primary">Workflows</span>
            <span className="text-xs px-2 py-1 bg-accent-light text-accent-dark rounded-full font-medium">
              5 actifs
            </span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Chatbot HYDRO', status: 'active', time: 'Webhook' },
              { name: 'Lead Scoring', status: 'active', time: 'Webhook' },
              { name: 'Content Gen', status: 'active', time: 'Lun 6h' },
              { name: 'Newsletter', status: 'active', time: 'Lun 9h' },
              { name: 'Auto Reports', status: 'active', time: 'Ven 17h' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                  item.status === 'active' ? 'bg-accent border-accent' : 'border-border'
                }`}>
                  {item.status === 'active' && (
                    <svg className="w-3 h-3 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="flex-1 text-sm text-text-secondary">{item.name}</span>
                <span className="text-xs text-text-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target size={20} className="text-h2o-primary" />
              <span className="text-lg font-semibold text-text-primary">Performance par Departement</span>
            </div>
            <button className="text-sm text-h2o-primary hover:underline flex items-center gap-1">
              Voir tout <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {config.departments.map((dept) => {
              const Icon = departmentIcons[dept.icon] || Droplet
              return (
                <div key={dept.id} className="flex items-center gap-4 p-3 bg-surface-hover rounded-xl hover:bg-background transition-all">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${dept.color}15` }}
                  >
                    <Icon size={22} style={{ color: dept.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{dept.name}</span>
                      <span className="text-sm font-semibold" style={{ color: dept.color }}>{dept.automationScore}%</span>
                    </div>
                    <div className="h-2 bg-border-light rounded-full overflow-hidden">
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
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-h2o-primary" />
              <span className="text-lg font-semibold text-text-primary">Derniers Leads</span>
            </div>
            <span className="text-xs px-2 py-1 bg-error-light text-error rounded-full font-medium">
              +{stats.hotLeads} HOT
            </span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Mairie de Papeete', dept: 'eau', score: 92, color: '#0077B6' },
              { name: 'SCI Les Cocotiers', dept: 'amenagements', score: 78, color: '#00B4D8' },
              { name: 'EDT Polynesie', dept: 'energie', score: 95, color: '#FFD60A' },
              { name: 'Port Autonome', dept: 'infrastructure', score: 85, color: '#90E0EF' },
            ].map((lead, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-surface-hover rounded-xl hover:bg-background transition-all cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: lead.color }}
                >
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-text-primary truncate">{lead.name}</p>
                  <p className="text-xs text-text-muted capitalize">{lead.dept}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      lead.score >= 80
                        ? 'bg-success-light text-success'
                        : lead.score >= 60
                        ? 'bg-warning-light text-warning'
                        : 'bg-error-light text-error'
                    }`}
                  >
                    {lead.score}
                  </span>
                  <ChevronRight size={16} className="text-text-muted" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-sm font-medium text-h2o-primary hover:bg-h2o-primary/5 rounded-xl transition-colors flex items-center justify-center gap-2">
            Voir tous les leads
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
