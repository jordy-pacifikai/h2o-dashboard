'use client'

import { useEffect, useState } from 'react'
import introJs from 'intro.js'
import 'intro.js/introjs.css'

interface GuideStep {
  element?: string
  intro: string
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
}

const guideSteps: GuideStep[] = [
  {
    intro: `
      <div class="text-center">
        <h3 class="text-xl font-bold mb-2">Bienvenue sur votre Dashboard H2O</h3>
        <p class="text-text-muted">Ce guide vous presente les fonctionnalites principales de votre tableau de bord IA.</p>
        <div class="mt-4 p-3 bg-h2o-primary/20 rounded-lg">
          <p class="text-sm"><strong>ROI estime:</strong> 386% / mois</p>
          <p class="text-sm"><strong>Temps economise:</strong> 200h / mois</p>
        </div>
      </div>
    `,
  },
  {
    element: '[data-intro="sidebar"]',
    intro: `
      <div>
        <h4 class="font-semibold mb-2">Barre de Navigation</h4>
        <p class="text-sm text-text-muted">Acces rapide a toutes les sections du dashboard.</p>
        <ul class="mt-2 text-sm space-y-1">
          <li>Vue d'ensemble</li>
          <li>Conversations IA</li>
          <li>Gestion des Leads</li>
          <li>Contenu genere</li>
          <li>Analytics</li>
        </ul>
      </div>
    `,
    position: 'right',
  },
  {
    element: '[data-intro="departments"]',
    intro: `
      <div>
        <h4 class="font-semibold mb-2">Departements H2O</h4>
        <p class="text-sm text-text-muted">Filtrez les donnees par departement:</p>
        <ul class="mt-2 text-sm space-y-1">
          <li><span class="text-[#0077B6]">Eau</span> - Score 85%</li>
          <li><span class="text-[#00B4D8]">Amenagements</span> - Score 70%</li>
          <li><span class="text-[#90E0EF]">Infrastructure</span> - Score 75%</li>
          <li><span class="text-[#FFD60A]">Energie</span> - Score 90%</li>
        </ul>
      </div>
    `,
    position: 'right',
  },
  {
    element: '[data-intro="stat-cards"]',
    intro: `
      <div>
        <h4 class="font-semibold mb-2">KPIs en Temps Reel</h4>
        <p class="text-sm text-text-muted">Vos metriques principales actualisees automatiquement:</p>
        <ul class="mt-2 text-sm space-y-1">
          <li><strong>Conversations:</strong> Interactions chatbot</li>
          <li><strong>Leads HOT:</strong> Prospects qualifies score > 80</li>
          <li><strong>Contenu:</strong> Articles generes</li>
          <li><strong>Abonnes:</strong> Newsletter active</li>
        </ul>
        <div class="mt-3 p-2 bg-green-500/20 rounded text-green-400 text-xs">
          Economie estimee: 530 000 XPF/mois
        </div>
      </div>
    `,
    position: 'bottom',
  },
  {
    element: '[data-intro="chatbot-button"]',
    intro: `
      <div>
        <h4 class="font-semibold mb-2">Chatbot IA H2O</h4>
        <p class="text-sm text-text-muted">Votre assistant virtuel disponible 24/7:</p>
        <ul class="mt-2 text-sm space-y-1">
          <li>Repond aux questions frequentes</li>
          <li>Qualifie les prospects automatiquement</li>
          <li>Memorise le contexte de conversation</li>
          <li>Oriente vers le bon departement</li>
        </ul>
        <div class="mt-3 p-2 bg-h2o-primary/20 rounded text-h2o-primary text-xs">
          ROI: 150 000 XPF/mois economises
        </div>
      </div>
    `,
    position: 'left',
  },
  {
    element: '[data-intro="guide-button"]',
    intro: `
      <div>
        <h4 class="font-semibold mb-2">Besoin d'aide?</h4>
        <p class="text-sm text-text-muted">Vous pouvez relancer ce guide a tout moment depuis ce bouton.</p>
        <div class="mt-3 text-sm">
          <p><strong>Support:</strong> jordy@pacifikai.com</p>
          <p><strong>Tel:</strong> +689 89 55 81 89</p>
        </div>
      </div>
    `,
    position: 'right',
  },
  {
    intro: `
      <div class="text-center">
        <h3 class="text-xl font-bold mb-2">Vous etes pret!</h3>
        <p class="text-text-muted">Explorez votre dashboard et decouvrez comment l'IA peut transformer H2O Ingenierie.</p>
        <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div class="p-2 bg-surface rounded-lg">
            <p class="text-h2o-primary font-semibold">5</p>
            <p class="text-text-muted">Workflows actifs</p>
          </div>
          <div class="p-2 bg-surface rounded-lg">
            <p class="text-green-400 font-semibold">200h</p>
            <p class="text-text-muted">Economisees/mois</p>
          </div>
        </div>
      </div>
    `,
  },
]

export default function InteractiveGuide() {
  const [hasSeenGuide, setHasSeenGuide] = useState(true)

  useEffect(() => {
    const seen = localStorage.getItem('h2o_guide_seen')
    if (!seen) {
      setHasSeenGuide(false)
      startGuide()
    }
  }, [])

  const startGuide = () => {
    const intro = introJs()

    intro.setOptions({
      steps: guideSteps.map((step) => ({
        element: step.element,
        intro: step.intro,
        title: step.title,
        position: step.position || 'auto',
      })),
      showProgress: true,
      showBullets: true,
      exitOnOverlayClick: false,
      doneLabel: 'Terminer',
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      skipLabel: 'Passer',
    })

    intro.oncomplete(() => {
      localStorage.setItem('h2o_guide_seen', 'true')
      setHasSeenGuide(true)
    })

    intro.onexit(() => {
      localStorage.setItem('h2o_guide_seen', 'true')
      setHasSeenGuide(true)
    })

    intro.start()
  }

  return null
}

export { InteractiveGuide, guideSteps }
