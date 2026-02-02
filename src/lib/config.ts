export const config = {
  client: {
    name: "H2O Ingénierie",
    slug: "h2o",
    sector: "Bureau d'études techniques",
    location: "Papeete, Tahiti, Polynésie française",
    website: "https://www.h2oingenierie.com",
    logo: "https://www.h2oingenierie.com/wp-content/uploads/2023/12/Logo-H2O-Ingenierie-V1.svg",
    contact: {
      phone: "+689 40 81 26 61",
      email: "h2oingenierie@mail.pf",
      address: "BP 4670, 98713 Papeete, Tahiti"
    }
  },
  branding: {
    colors: {
      primary: "#0077B6",
      secondary: "#00B4D8",
      accent: "#90E0EF",
      dark: "#03045E",
      light: "#CAF0F8",
    }
  },
  workflows: {
    chatbot: {
      webhook: "https://n8n.srv1140766.hstgr.cloud/webhook/h2o-chat",
      enabled: true
    },
    leadScoring: {
      webhook: "https://n8n.srv1140766.hstgr.cloud/webhook/h2o-new-lead",
      enabled: true
    },
    contentGenerator: {
      webhook: "https://n8n.srv1140766.hstgr.cloud/webhook/h2o-content-generate",
      enabled: true
    },
    newsletter: {
      webhook: "https://n8n.srv1140766.hstgr.cloud/webhook/h2o-newsletter-send",
      enabled: true
    },
    autoReports: {
      webhook: "https://n8n.srv1140766.hstgr.cloud/webhook/h2o-report-generate",
      enabled: true
    }
  },
  departments: [
    {
      id: "eau",
      name: "Eau",
      icon: "droplet",
      color: "#0077B6",
      services: [
        "Hydraulique urbaine (AEP, réseaux EU/EP)",
        "Hydraulique fluviale (bassins, recalibrage)",
        "Génie maritime (ports, digues)"
      ],
      automationScore: 85
    },
    {
      id: "amenagements",
      name: "Aménagements Urbains",
      icon: "building",
      color: "#00B4D8",
      services: [
        "Lotissements et viabilisation",
        "Parcs et jardins paysagers",
        "Terrassements généraux"
      ],
      automationScore: 70
    },
    {
      id: "infrastructure",
      name: "Infrastructure & Mobilité",
      icon: "road",
      color: "#90E0EF",
      services: [
        "Voies routières et carrefours",
        "Ouvrages d'art",
        "Pistes aéroportuaires"
      ],
      automationScore: 75
    },
    {
      id: "energie",
      name: "Énergie",
      icon: "zap",
      color: "#FFD60A",
      services: [
        "Photovoltaïque",
        "Hydroélectricité",
        "Biomasse et éolien"
      ],
      automationScore: 90
    }
  ],
  chatbot: {
    name: "Assistant H2O",
    welcomeMessage: "Bonjour ! Je suis l'assistant virtuel d'H2O Ingénierie. Comment puis-je vous aider concernant vos projets d'hydraulique, d'infrastructure ou d'énergie ?",
    placeholder: "Posez votre question sur nos services..."
  }
}
