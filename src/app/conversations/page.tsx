'use client'

import { useState } from 'react'
import {
  MessageCircle,
  Search,
  Filter,
  Clock,
  User,
  Bot,
  Droplet,
  Building,
  Route,
  Zap,
  ChevronRight,
  Calendar
} from 'lucide-react'
import { config } from '@/lib/config'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  session_id: string
  department: string
  messages: Message[]
  created_at: string
  user_info?: {
    name?: string
    email?: string
  }
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    session_id: 'conv-001',
    department: 'eau',
    created_at: '2026-02-01 14:30',
    user_info: { name: 'Jean Tetuanui', email: 'j.tetuanui@mairie-papeete.pf' },
    messages: [
      { id: '1', role: 'user', content: 'Bonjour, j\'ai besoin d\'informations sur vos services d\'AEP', timestamp: '14:30' },
      { id: '2', role: 'assistant', content: 'Bonjour ! Je suis ravi de vous aider. H2O Ingenierie propose des services complets d\'Alimentation en Eau Potable (AEP) incluant les etudes, la conception et le suivi de travaux. Quel est votre projet specifique ?', timestamp: '14:30' },
      { id: '3', role: 'user', content: 'Nous devons refaire le reseau d\'eau de notre commune', timestamp: '14:31' },
      { id: '4', role: 'assistant', content: 'Excellent projet ! Pour une rehabilitation de reseau AEP, nous procedons par etapes : 1) Diagnostic de l\'existant, 2) Etude hydraulique, 3) Conception du nouveau reseau, 4) DCE pour travaux. Quelle est la taille approximative de votre commune ?', timestamp: '14:31' },
    ],
  },
  {
    id: '2',
    session_id: 'conv-002',
    department: 'energie',
    created_at: '2026-02-01 11:15',
    user_info: { name: 'Pierre Maitai', email: 'p.maitai@edt.pf' },
    messages: [
      { id: '1', role: 'user', content: 'Je cherche un bureau d\'etudes pour un projet photovoltaique', timestamp: '11:15' },
      { id: '2', role: 'assistant', content: 'Bienvenue ! H2O Ingenierie est specialise dans les projets d\'energies renouvelables en Polynesie. Nous avons realise plusieurs centrales photovoltaiques. Pouvez-vous me donner plus de details sur votre projet ?', timestamp: '11:15' },
    ],
  },
  {
    id: '3',
    session_id: 'conv-003',
    department: 'infrastructure',
    created_at: '2026-01-31 16:45',
    messages: [
      { id: '1', role: 'user', content: 'Faites-vous des etudes de trafic ?', timestamp: '16:45' },
      { id: '2', role: 'assistant', content: 'Oui, les etudes de trafic font partie de nos competences en Infrastructure & Mobilite. Nous realisons des comptages, analyses de flux, et proposons des amenagements adaptes. Sur quel type de projet travaillez-vous ?', timestamp: '16:45' },
    ],
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

export default function ConversationsPage() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(conversations[0])
  const [search, setSearch] = useState('')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.user_info?.name?.toLowerCase().includes(search.toLowerCase()) ||
      conv.user_info?.email?.toLowerCase().includes(search.toLowerCase()) ||
      conv.messages.some((m) => m.content.toLowerCase().includes(search.toLowerCase()))
    const matchesDepartment = filterDepartment === 'all' || conv.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="animate-fade-in h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MessageCircle className="text-h2o-primary" />
            Conversations
          </h1>
          <p className="text-text-muted mt-1">
            Historique des interactions chatbot
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Calendar size={16} />
          <span>Aujourd'hui: {new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100%-5rem)]">
        {/* Conversations List */}
        <div className="w-96 bg-surface rounded-xl border border-border flex flex-col">
          {/* Search & Filter */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-h2o-primary text-sm"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-h2o-primary text-sm"
            >
              <option value="all">Tous les departements</option>
              {config.departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => {
              const DeptIcon = departmentIcons[conv.department] || Droplet
              const deptColor = departmentColors[conv.department]
              const lastMessage = conv.messages[conv.messages.length - 1]
              const isSelected = selectedConv?.id === conv.id

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full p-4 text-left border-b border-border hover:bg-surface-hover transition-colors ${
                    isSelected ? 'bg-h2o-primary/10 border-l-2 border-l-h2o-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <DeptIcon size={14} style={{ color: deptColor }} />
                        <span className="font-medium text-sm truncate">
                          {conv.user_info?.name || 'Visiteur anonyme'}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted truncate">{lastMessage.content}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-text-muted">{conv.created_at.split(' ')[1]}</p>
                      <p className="text-xs text-text-muted">{conv.messages.length} msg</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Conversation Detail */}
        <div className="flex-1 bg-surface rounded-xl border border-border flex flex-col">
          {selectedConv ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-h2o-primary/20 flex items-center justify-center">
                    <User className="text-h2o-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedConv.user_info?.name || 'Visiteur anonyme'}</p>
                    <p className="text-sm text-text-muted">{selectedConv.user_info?.email || selectedConv.session_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Clock size={14} />
                  <span>{selectedConv.created_at}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[70%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          message.role === 'user' ? 'bg-h2o-primary/20' : 'bg-h2o-secondary/20'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User size={16} className="text-h2o-primary" />
                        ) : (
                          <Bot size={16} className="text-h2o-secondary" />
                        )}
                      </div>
                      <div>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm ${
                            message.role === 'user'
                              ? 'bg-h2o-primary text-white rounded-br-md'
                              : 'bg-background text-text rounded-bl-md'
                          }`}
                        >
                          {message.content}
                        </div>
                        <p className="text-xs text-text-muted mt-1 px-2">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(() => {
                    const DeptIcon = departmentIcons[selectedConv.department] || Droplet
                    const deptColor = departmentColors[selectedConv.department]
                    return (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: `${deptColor}20`, color: deptColor }}>
                        <DeptIcon size={12} />
                        {selectedConv.department}
                      </span>
                    )
                  })()}
                  <span className="text-sm text-text-muted">
                    {selectedConv.messages.length} messages
                  </span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-h2o-primary/20 text-h2o-primary rounded-lg hover:bg-h2o-primary/30 transition-colors text-sm">
                  Convertir en lead
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-muted">
              <p>Selectionnez une conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
