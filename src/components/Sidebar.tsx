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
  Droplet,
  Building,
  Route,
  Zap,
  HelpCircle,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react'
import { config } from '@/lib/config'

const mainNavItems = [
  { id: 'overview', name: 'Dashboard', icon: LayoutDashboard, href: '/' },
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
  const pathname = usePathname()
  const [showDepartments, setShowDepartments] = useState(true)

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-border flex flex-col z-50"
      style={{ boxShadow: '4px 0 24px rgba(0, 0, 0, 0.03)' }}
      data-intro="sidebar"
    >
      {/* Logo Header */}
      <div className="h-20 flex items-center px-6 border-b border-border-light">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Droplet size={22} className="text-text-primary" />
          </div>
          <div>
            <span className="font-bold text-lg text-text-primary">H2O</span>
            <span className="text-xs block text-text-muted -mt-0.5">Ingenierie</span>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2.5 bg-background rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto" data-intro="main-nav">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-3">
          Menu principal
        </p>
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-text-primary font-semibold'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                }`}
                style={isActive ? { boxShadow: '0 4px 12px rgba(198, 244, 50, 0.4)' } : {}}
                data-intro={`nav-${item.id}`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.name}</span>
                {item.id === 'conversations' && (
                  <span className="ml-auto bg-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    3
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Departments */}
        <div className="mt-6" data-intro="departments">
          <button
            onClick={() => setShowDepartments(!showDepartments)}
            className="w-full flex items-center justify-between px-3 mb-3"
          >
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Departements
            </p>
            <ChevronDown
              size={16}
              className={`text-text-muted transition-transform ${showDepartments ? 'rotate-180' : ''}`}
            />
          </button>
          {showDepartments && (
            <div className="space-y-1">
              {config.departments.map((dept) => {
                const Icon = departmentIcons[dept.icon] || Droplet
                return (
                  <Link
                    key={dept.id}
                    href={`/?dept=${dept.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${dept.color}15` }}
                    >
                      <Icon size={16} style={{ color: dept.color }} />
                    </div>
                    <span className="text-sm flex-1">{dept.name}</span>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-8 h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${dept.color}20` }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${dept.automationScore}%`,
                            backgroundColor: dept.color,
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-muted">{dept.automationScore}%</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-border-light">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 mb-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent rounded-xl text-text-primary font-medium text-sm hover:bg-accent-hover transition-all shadow-sm hover:shadow-accent" data-intro="guide-button">
            <HelpCircle size={18} />
            Guide
          </button>
          <button className="w-11 h-11 flex items-center justify-center bg-surface-hover rounded-xl text-text-secondary hover:text-text-primary transition-all">
            <Bell size={18} />
          </button>
        </div>

        {/* Settings Link */}
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            pathname === '/settings'
              ? 'bg-accent text-text-primary font-semibold'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <Settings size={20} />
          <span className="text-sm">Parametres</span>
        </Link>

        {/* User Profile */}
        <div className="mt-4 flex items-center gap-3 p-3 bg-surface-hover rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-h2o-primary to-h2o-secondary flex items-center justify-center text-white font-semibold text-sm">
            H2O
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">H2O Ingenierie</p>
            <p className="text-xs text-text-muted truncate">admin@h2oingenierie.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
