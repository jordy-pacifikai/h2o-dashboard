import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ogsimsfqwibcmotaeevb.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for H2O tables
export interface Conversation {
  id: string
  session_id: string
  user_message: string
  assistant_message: string
  department?: string
  created_at: string
}

export interface Lead {
  id: string
  email: string
  name?: string
  company?: string
  phone?: string
  department?: string
  score: number
  status: 'new' | 'hot' | 'warm' | 'cold' | 'converted'
  source?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Content {
  id: string
  title: string
  content: string
  excerpt?: string
  department?: string
  status: 'draft' | 'published' | 'archived'
  seo_keywords?: string[]
  created_at: string
  published_at?: string
}

export interface Subscriber {
  id: string
  email: string
  name?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  interests?: string[]
  subscribed_at: string
}

export interface Analytics {
  id: string
  metric: string
  value: number
  date: string
  department?: string
}

// API functions
export async function getConversations(limit = 50) {
  const { data, error } = await supabase
    .from('h2o_conversations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Conversation[]
}

export async function getLeads(status?: string) {
  let query = supabase
    .from('h2o_leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Lead[]
}

export async function getContent(status?: string) {
  let query = supabase
    .from('h2o_content')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Content[]
}

export async function getSubscribers() {
  const { data, error } = await supabase
    .from('h2o_subscribers')
    .select('*')
    .eq('status', 'active')
    .order('subscribed_at', { ascending: false })

  if (error) throw error
  return data as Subscriber[]
}

export async function getAnalytics(metric?: string, days = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  let query = supabase
    .from('h2o_analytics')
    .select('*')
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (metric) {
    query = query.eq('metric', metric)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Analytics[]
}

export async function getDashboardStats() {
  const [conversations, leads, content, subscribers] = await Promise.all([
    supabase.from('h2o_conversations').select('id', { count: 'exact', head: true }),
    supabase.from('h2o_leads').select('id, status'),
    supabase.from('h2o_content').select('id', { count: 'exact', head: true }),
    supabase.from('h2o_subscribers').select('id', { count: 'exact', head: true }).eq('status', 'active'),
  ])

  const hotLeads = leads.data?.filter(l => l.status === 'hot').length || 0

  return {
    conversations: conversations.count || 0,
    totalLeads: leads.data?.length || 0,
    hotLeads,
    content: content.count || 0,
    subscribers: subscribers.count || 0,
  }
}
