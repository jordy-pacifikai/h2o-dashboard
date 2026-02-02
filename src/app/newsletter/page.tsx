'use client'

import { useState } from 'react'
import {
  Mail,
  Users,
  Send,
  Plus,
  BarChart2,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MousePointer,
  ArrowUpRight
} from 'lucide-react'
import { config } from '@/lib/config'

interface Campaign {
  id: string
  subject: string
  status: 'draft' | 'sent' | 'scheduled'
  sent_at?: string
  scheduled_at?: string
  recipients: number
  opens: number
  clicks: number
  bounces: number
}

interface Subscriber {
  id: string
  email: string
  name?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  subscribed_at: string
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    subject: 'Newsletter H2O - Janvier 2026',
    status: 'sent',
    sent_at: '2026-01-27 09:00',
    recipients: 156,
    opens: 89,
    clicks: 34,
    bounces: 2,
  },
  {
    id: '2',
    subject: 'Actualites Energie Renouvelable',
    status: 'sent',
    sent_at: '2026-01-20 09:00',
    recipients: 142,
    opens: 78,
    clicks: 28,
    bounces: 1,
  },
  {
    id: '3',
    subject: 'Newsletter H2O - Fevrier 2026',
    status: 'scheduled',
    scheduled_at: '2026-02-03 09:00',
    recipients: 165,
    opens: 0,
    clicks: 0,
    bounces: 0,
  },
]

const mockSubscribers: Subscriber[] = [
  { id: '1', email: 'j.tetuanui@mairie-papeete.pf', name: 'Jean Tetuanui', status: 'active', subscribed_at: '2025-06-15' },
  { id: '2', email: 'contact@edt.pf', name: 'EDT Polynesie', status: 'active', subscribed_at: '2025-08-22' },
  { id: '3', email: 'm.vahine@portpapeete.pf', name: 'Marie Vahine', status: 'active', subscribed_at: '2025-10-10' },
  { id: '4', email: 'info@commune-faaa.pf', name: 'Commune de Faa\'a', status: 'active', subscribed_at: '2025-11-05' },
  { id: '5', email: 'ancien@exemple.pf', status: 'unsubscribed', subscribed_at: '2025-03-01' },
]

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Brouillon' },
  sent: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Envoye' },
  scheduled: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Programme' },
}

export default function NewsletterPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns)
  const [subscribers] = useState<Subscriber[]>(mockSubscribers)
  const [activeTab, setActiveTab] = useState<'campaigns' | 'subscribers'>('campaigns')
  const [isSending, setIsSending] = useState(false)

  const activeSubscribers = subscribers.filter((s) => s.status === 'active').length
  const totalOpens = campaigns.reduce((acc, c) => acc + c.opens, 0)
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0)
  const avgOpenRate = campaigns.length > 0
    ? Math.round((totalOpens / campaigns.reduce((acc, c) => acc + c.recipients, 0)) * 100)
    : 0

  const sendNewsletter = async () => {
    setIsSending(true)
    try {
      await fetch(config.workflows.newsletter.webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'manual' }),
      })
      alert('Newsletter en cours d\'envoi !')
    } catch (error) {
      console.error('Error:', error)
      alert('Erreur lors de l\'envoi')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="text-h2o-primary" />
            Newsletter
          </h1>
          <p className="text-text-muted mt-1">
            Campagnes email et gestion des abonnes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={sendNewsletter}
            disabled={isSending}
            className="flex items-center gap-2 px-4 py-2 bg-h2o-secondary/20 text-h2o-secondary rounded-lg hover:bg-h2o-secondary/30 transition-colors disabled:opacity-50"
          >
            <Send size={18} className={isSending ? 'animate-pulse' : ''} />
            {isSending ? 'Envoi...' : 'Envoyer maintenant'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition-all">
            <Plus size={18} />
            Nouvelle campagne
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-h2o-primary/20 rounded-lg">
            <Users className="text-h2o-primary" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{activeSubscribers}</p>
            <p className="text-sm text-text-muted">Abonnes actifs</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Eye className="text-green-400" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{avgOpenRate}%</p>
            <p className="text-sm text-text-muted">Taux d'ouverture</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <MousePointer className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalClicks}</p>
            <p className="text-sm text-text-muted">Clics totaux</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="p-3 bg-h2o-secondary/20 rounded-lg">
            <Send className="text-h2o-secondary" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'sent').length}</p>
            <p className="text-sm text-text-muted">Campagnes envoyees</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === 'campaigns' ? 'text-h2o-primary' : 'text-text-muted hover:text-text'
          }`}
        >
          Campagnes
          {activeTab === 'campaigns' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-h2o-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === 'subscribers' ? 'text-h2o-primary' : 'text-text-muted hover:text-text'
          }`}
        >
          Abonnes ({activeSubscribers})
          {activeTab === 'subscribers' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-h2o-primary" />
          )}
        </button>
      </div>

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.map((campaign) => {
            const statusStyle = statusColors[campaign.status]
            const openRate = campaign.recipients > 0 ? Math.round((campaign.opens / campaign.recipients) * 100) : 0
            const clickRate = campaign.opens > 0 ? Math.round((campaign.clicks / campaign.opens) * 100) : 0

            return (
              <div key={campaign.id} className="bg-surface rounded-xl border border-border p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{campaign.subject}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {campaign.sent_at || campaign.scheduled_at}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {campaign.recipients} destinataires
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.label}
                  </span>
                </div>

                {campaign.status === 'sent' && (
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-green-400">{openRate}%</p>
                      <p className="text-xs text-text-muted">Taux ouverture</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{clickRate}%</p>
                      <p className="text-xs text-text-muted">Taux clic</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.opens}</p>
                      <p className="text-xs text-text-muted">Ouvertures</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.clicks}</p>
                      <p className="text-xs text-text-muted">Clics</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Nom</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted">Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium">{subscriber.email}</span>
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {subscriber.name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-sm ${
                      subscriber.status === 'active' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {subscriber.status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {subscriber.status === 'active' ? 'Actif' : 'Desinscrit'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {subscriber.subscribed_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
