'use client'

import { useState } from 'react'
import {
  Settings,
  Key,
  Bell,
  Palette,
  Globe,
  Shield,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'
import { config } from '@/lib/config'

interface WorkflowStatus {
  id: string
  name: string
  enabled: boolean
  lastRun?: string
  status: 'active' | 'error' | 'inactive'
}

const workflowStatuses: WorkflowStatus[] = [
  { id: 'chatbot', name: 'Chatbot IA', enabled: true, lastRun: 'Il y a 5 min', status: 'active' },
  { id: 'lead-scoring', name: 'Lead Scoring', enabled: true, lastRun: 'Il y a 2h', status: 'active' },
  { id: 'content-gen', name: 'Content Generator', enabled: true, lastRun: 'Lundi 6h', status: 'active' },
  { id: 'newsletter', name: 'Newsletter Engine', enabled: true, lastRun: 'Lundi 9h', status: 'active' },
  { id: 'auto-reports', name: 'Auto Reports', enabled: true, lastRun: 'Vendredi 17h', status: 'active' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('workflows')
  const [workflows, setWorkflows] = useState(workflowStatuses)
  const [isSaving, setIsSaving] = useState(false)
  const [notifications, setNotifications] = useState({
    leadAlerts: true,
    weeklyReports: true,
    errorAlerts: true,
  })

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    )
  }

  const saveSettings = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Parametres sauvegardes !')
  }

  const tabs = [
    { id: 'workflows', name: 'Workflows', icon: Zap },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'api', name: 'API & Integrations', icon: Key },
    { id: 'branding', name: 'Apparence', icon: Palette },
  ]

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="text-h2o-primary" />
            Parametres
          </h1>
          <p className="text-text-muted mt-1">
            Configuration de votre dashboard H2O
          </p>
        </div>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-h2o-primary/20 text-h2o-primary'
                      : 'text-text-muted hover:bg-surface hover:text-text'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-surface rounded-xl border border-border p-6">
          {/* Workflows Tab */}
          {activeTab === 'workflows' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Gestion des Workflows</h2>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          workflow.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      />
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-text-muted">
                          Derniere execution: {workflow.lastRun}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          workflow.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {workflow.status === 'active' ? 'Actif' : 'Erreur'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={workflow.enabled}
                          onChange={() => toggleWorkflow(workflow.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-h2o-primary"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Preferences de Notification</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">Alertes Leads HOT</p>
                    <p className="text-sm text-text-muted">
                      Recevoir un email quand un lead HOT est detecte
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.leadAlerts}
                      onChange={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          leadAlerts: !prev.leadAlerts,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-h2o-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">Rapports Hebdomadaires</p>
                    <p className="text-sm text-text-muted">
                      Rapport automatique chaque vendredi
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReports}
                      onChange={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          weeklyReports: !prev.weeklyReports,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-h2o-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">Alertes Erreur</p>
                    <p className="text-sm text-text-muted">
                      Notification si un workflow echoue
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.errorAlerts}
                      onChange={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          errorAlerts: !prev.errorAlerts,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-h2o-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">API & Integrations</h2>
              <div className="space-y-6">
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={18} />
                      <span className="font-medium">Supabase</span>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      Connecte
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">
                    Project ID: ogsimsfqwibcmotaeevb
                  </p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={18} />
                      <span className="font-medium">n8n Workflows</span>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      5 actifs
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">
                    Instance: n8n.srv1140766.hstgr.cloud
                  </p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={18} />
                      <span className="font-medium">Brevo (Email)</span>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      Connecte
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">
                    Sender: h2oingenierie@mail.pf
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Apparence</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Logo</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={config.client.logo}
                      alt="Logo"
                      className="h-12 bg-white rounded-lg p-2"
                    />
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface-hover transition-colors">
                      Modifier
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Couleurs</label>
                  <div className="flex gap-3">
                    {Object.entries(config.branding.colors).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div
                          className="w-12 h-12 rounded-lg border border-border cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs text-text-muted mt-1 capitalize">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom affiche</label>
                  <input
                    type="text"
                    defaultValue={config.client.name}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-h2o-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
