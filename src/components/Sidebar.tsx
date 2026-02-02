'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  FileText,
  Mail,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Building,
  Route,
  Zap,
  HelpCircle
} from 'lucide-react'
import { config } from '@/lib/config'

const mainNavItems = [
  { id: 'overview', name: 'Vue d\'ensemble', icon: LayoutDashboard, href: '/' },
  { id: 'conversations', name: 'Conversations', icon: MessageCircle, href: '/conversations' },
  { id: 'leads', name: 'Leads', icon: Users, href: '/leads' },
  { id: 'content', name: 'Contenu', icon: FileText, href: '/content' },
  { id: 'newsletter', name: 'Newsletter', icon: Mail, href: '/newsletter' },
  { id: 'analytics', name: 'Analytics', icon: BarChart2, href: '/analytics' },
]

const departmentIcons: Record<string, any> = {
  droplet: Droplet,
  building: Building,
  road: Route,
  zap: Zap,
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-surface border-r border-border transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      data-intro="sidebar"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3">
            <img
              src={config.client.logo}
              alt={config.client.name}
              className="h-8 w-auto"
            />
            <span className="font-semibold text-sm truncate">{config.client.name}</span>
          </Link>
        )}
        {collapsed && (
          <img
            src={config.client.logo}
            alt={config.client.name}
            className="h-8 w-auto mx-auto"
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="p-4 space-y-1" data-intro="main-nav">
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-h2o-primary/20 text-h2o-primary'
                  : 'text-text-muted hover:bg-surface-hover hover:text-text'
              }`}
              data-intro={`nav-${item.id}`}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Departments */}
      {!collapsed && (
        <div className="px-4 mt-6" data-intro="departments">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-3">
            Departements
          </p>
          <div className="space-y-1">
            {config.departments.map((dept) => {
              const Icon = departmentIcons[dept.icon] || Droplet
              return (
                <Link
                  key={dept.id}
                  href={`/department/${dept.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text transition-all"
                >
                  <Icon size={18} style={{ color: dept.color }} />
                  <span className="text-sm">{dept.name}</span>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                  >
                    {dept.automationScore}%
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text transition-all ${
            pathname === '/settings' ? 'bg-h2o-primary/20 text-h2o-primary' : ''
          }`}
        >
          <Settings size={20} />
          {!collapsed && <span className="text-sm font-medium">Parametres</span>}
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text transition-all mt-1"
          data-intro="guide-button"
        >
          <HelpCircle size={20} />
          {!collapsed && <span className="text-sm font-medium">Guide interactif</span>}
        </button>
      </div>
    </aside>
  )
}
