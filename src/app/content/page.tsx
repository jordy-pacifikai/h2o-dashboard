'use client'

import { useState } from 'react'
import {
  FileText,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Tag,
  Droplet,
  Building,
  Route,
  Zap,
  Send,
  MoreHorizontal
} from 'lucide-react'
import { config } from '@/lib/config'

interface Content {
  id: string
  title: string
  excerpt: string
  department: string
  status: 'draft' | 'published' | 'archived'
  keywords: string[]
  created_at: string
  published_at?: string
  views?: number
}

const mockContent: Content[] = [
  {
    id: '1',
    title: 'Guide complet de l\'AEP en Polynesie francaise',
    excerpt: 'Decouvrez les enjeux et solutions pour l\'alimentation en eau potable dans nos iles...',
    department: 'eau',
    status: 'published',
    keywords: ['AEP', 'eau potable', 'reseau', 'Polynesie'],
    created_at: '2026-01-28',
    published_at: '2026-01-29',
    views: 245,
  },
  {
    id: '2',
    title: 'Les avantages du photovoltaique en milieu insulaire',
    excerpt: 'L\'energie solaire represente une opportunite unique pour les iles de Polynesie...',
    department: 'energie',
    status: 'published',
    keywords: ['photovoltaique', 'solaire', 'ENR', 'autonomie'],
    created_at: '2026-01-25',
    published_at: '2026-01-26',
    views: 189,
  },
  {
    id: '3',
    title: 'Viabilisation de lotissements : les etapes cles',
    excerpt: 'La viabilisation est une etape cruciale dans tout projet de lotissement...',
    department: 'amenagements',
    status: 'draft',
    keywords: ['lotissement', 'viabilisation', 'VRD', 'amenagement'],
    created_at: '2026-01-30',
  },
  {
    id: '4',
    title: 'Infrastructure routiere : normes et reglementations',
    excerpt: 'Les normes de construction routiere en Polynesie presentent des specificites...',
    department: 'infrastructure',
    status: 'draft',
    keywords: ['routes', 'normes', 'infrastructure', 'mobilite'],
    created_at: '2026-02-01',
  },
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

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Brouillon' },
  published: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Publie' },
  archived: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Archive' },
}

export default function ContentPage() {
  const [content] = useState<Content[]>(mockContent)
  const [search, setSearch] = useState('')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isGenerating, setIsGenerating] = useState(false)

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || item.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const generateContent = async () => {
    setIsGenerating(true)
    try {
      await fetch(config.workflows.contentGenerator.webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'manual' }),
      })
      alert('Generation de contenu lancee !')
    } catch (error) {
      console.error('Error:', error)
      alert('Erreur lors de la generation')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-h2o-primary" />
            Contenu
          </h1>
          <p className="text-text-muted mt-1">
            Articles et contenus generes par l'IA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={generateContent}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-h2o-secondary/20 text-h2o-secondary rounded-lg hover:bg-h2o-secondary/30 transition-colors disabled:opacity-50"
          >
            <Send size={18} className={isGenerating ? 'animate-pulse' : ''} />
            {isGenerating ? 'Generation...' : 'Generer maintenant'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition-all">
            <Plus size={18} />
            Nouvel article
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-sm text-text-muted">Total Articles</p>
          <p className="text-2xl font-bold mt-1">{content.length}</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-sm text-text-muted">Publies</p>
          <p className="text-2xl font-bold mt-1 text-green-400">{content.filter(c => c.status === 'published').length}</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-sm text-text-muted">Brouillons</p>
          <p className="text-2xl font-bold mt-1 text-yellow-400">{content.filter(c => c.status === 'draft').length}</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-sm text-text-muted">Vues totales</p>
          <p className="text-2xl font-bold mt-1 text-h2o-primary">{content.reduce((acc, c) => acc + (c.views || 0), 0)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Rechercher un article..."
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
          <option value="draft">Brouillons</option>
          <option value="published">Publies</option>
          <option value="archived">Archives</option>
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContent.map((item) => {
          const DeptIcon = departmentIcons[item.department] || Droplet
          const deptColor = departmentColors[item.department]
          const statusStyle = statusColors[item.status]

          return (
            <div key={item.id} className="bg-surface rounded-xl border border-border p-6 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DeptIcon size={16} style={{ color: deptColor }} />
                  <span className="text-sm text-text-muted capitalize">{item.department}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                  {statusStyle.label}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-text-muted mb-4 line-clamp-2">{item.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.keywords.slice(0, 3).map((keyword, i) => (
                  <span key={i} className="flex items-center gap-1 px-2 py-1 bg-background rounded-md text-xs text-text-muted">
                    <Tag size={10} />
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {item.created_at}
                  </span>
                  {item.views !== undefined && (
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {item.views}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Editer">
                    <Edit3 size={16} className="text-text-muted" />
                  </button>
                  <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Voir">
                    <Eye size={16} className="text-text-muted" />
                  </button>
                  <button className="p-2 hover:bg-background rounded-lg transition-colors">
                    <MoreHorizontal size={16} className="text-text-muted" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
