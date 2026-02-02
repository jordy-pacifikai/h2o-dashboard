'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Search,
  Filter,
  Plus,
  Flame,
  Mail,
  Phone,
  Building,
  Droplet,
  Route,
  Zap,
  MoreHorizontal,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react'
import { config } from '@/lib/config'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  department: string
  score: number
  status: 'new' | 'hot' | 'warm' | 'cold' | 'converted'
  source: string
  created_at: string
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Jean Tetuanui', email: 'j.tetuanui@mairie-papeete.pf', phone: '+689 40 41 00 00', company: 'Mairie de Papeete', department: 'eau', score: 92, status: 'hot', source: 'chatbot', created_at: '2026-02-01' },
  { id: '2', name: 'Marie Teriitahi', email: 'm.teriitahi@scicocotiers.pf', company: 'SCI Les Cocotiers', department: 'amenagements', score: 78, status: 'warm', source: 'website', created_at: '2026-01-30' },
  { id: '3', name: 'Pierre Maitai', email: 'p.maitai@edt.pf', phone: '+689 40 86 77 77', company: 'EDT Polynesie', department: 'energie', score: 95, status: 'hot', source: 'chatbot', created_at: '2026-01-29' },
  { id: '4', name: 'Sophie Vahine', email: 's.vahine@portpapeete.pf', company: 'Port Autonome', department: 'infrastructure', score: 85, status: 'hot', source: 'newsletter', created_at: '2026-01-28' },
  { id: '5', name: 'Marc Hinano', email: 'm.hinano@tahiti.pf', company: 'Commune de Faa\'a', department: 'eau', score: 65, status: 'warm', source: 'referral', created_at: '2026-01-27' },
  { id: '6', name: 'Anne Moana', email: 'a.moana@pacific-invest.pf', company: 'Pacific Invest', department: 'energie', score: 88, status: 'hot', source: 'chatbot', created_at: '2026-01-26' },
]

const departmentIcons: Record<string, any> = {
  eau: Droplet,
  amenagements: Building,
  infrastructure: Route,
  energie: Zap,
}

const departmentColors: Record<string, string> = {
  eau: '#0077B6',
  amenagements: '#00B4D8',
  infrastructure: '#90E0EF',
  energie: '#FFD60A',
}

const statusColors: Record<string, { bg: string; text: string }> = {
  hot: { bg: 'bg-red-500/20', text: 'text-red-400' },
  warm: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  cold: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  new: { bg: 'bg-green-500/20', text: 'text-green-400' },
  converted: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [search, setSearch] = useState('')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || lead.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const hotLeadsCount = leads.filter((l) => l.status === 'hot').length
  const avgScore = Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length)

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-h2o-primary" />
            Leads
          </h1>
          <p className="text-text-muted mt-1">
            Gestion des prospects qualifies par l'IA
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition-all">
          <Plus size={18} />
          Nouveau Lead
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-h2o-primary/20 rounded-lg">
            <Users className="text-h2o-primary" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{leads.length}</p>
            <p className="text-sm text-text-muted">Total Leads</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <Flame className="text-red-400" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{hotLeadsCount}</p>
            <p className="text-sm text-text-muted">Leads HOT</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <ArrowUpRight className="text-green-400" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{avgScore}</p>
            <p className="text-sm text-text-muted">Score Moyen</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-h2o-secondary/20 rounded-lg">
            <RefreshCw className="text-h2o-secondary" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-text-muted">Taux Conversion</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Rechercher un lead..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-h2o-primary transition-colors"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-h2o-primary"
        >
          <option value="all">Tous les departements</option>
          {config.departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-h2o-primary"
        >
          <option value="all">Tous les statuts</option>
          <option value="hot">HOT</option>
          <option value="warm">WARM</option>
          <option value="cold">COLD</option>
          <option value="new">Nouveau</option>
          <option value="converted">Converti</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Lead</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Departement</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Score</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Source</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
              const DeptIcon = departmentIcons[lead.department] || Droplet
              const deptColor = departmentColors[lead.department]
              const statusStyle = statusColors[lead.status]
              return (
                <tr key={lead.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-text-muted">{lead.company}</p>
                      <p className="text-xs text-text-muted">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DeptIcon size={16} style={{ color: deptColor }} />
                      <span className="text-sm capitalize">{lead.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${lead.score}%`,
                            backgroundColor: lead.score >= 80 ? '#22c55e' : lead.score >= 60 ? '#eab308' : '#ef4444',
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${statusStyle.bg} ${statusStyle.text}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-muted capitalize">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-muted">{lead.created_at}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Envoyer email">
                        <Mail size={16} className="text-text-muted" />
                      </button>
                      {lead.phone && (
                        <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Appeler">
                          <Phone size={16} className="text-text-muted" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <MoreHorizontal size={16} className="text-text-muted" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
