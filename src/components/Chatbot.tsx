'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react'
import { config } from '@/lib/config'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: config.chatbot.welcomeMessage,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(config.workflows.chatbot.webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          session_id: `web-${Date.now()}`,
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || "Desolee, je n'ai pas pu traiter votre demande.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chatbot error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Desolee, une erreur s'est produite. Veuillez reessayer ou nous contacter directement.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Button - Modern Light Style */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-accent shadow-lg flex items-center justify-center transition-all hover:scale-105 hover:shadow-xl z-40 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ boxShadow: '0 8px 24px rgba(198, 244, 50, 0.4)' }}
        data-intro="chatbot-button"
      >
        <MessageCircle className="text-text-primary" size={24} />
      </button>

      {/* Chat Window - Modern Light Style */}
      <div
        className={`fixed bottom-6 right-6 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all z-50 overflow-hidden ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-h2o-primary to-h2o-secondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">{config.chatbot.name}</p>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                En ligne - IA Active
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles size={14} className="text-text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-h2o-primary text-white rounded-2xl rounded-br-md'
                    : 'bg-white text-text-primary rounded-2xl rounded-bl-md shadow-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center mr-2">
                <Sparkles size={14} className="text-text-primary" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 bg-white border-t border-border-light flex gap-2 overflow-x-auto">
          {['Demander un devis', 'Nos services', 'Contacter'].map((reply) => (
            <button
              key={reply}
              onClick={() => setInput(reply)}
              className="px-3 py-1.5 bg-surface-hover rounded-full text-xs font-medium text-text-secondary hover:bg-accent hover:text-text-primary transition-all whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-border-light">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={config.chatbot.placeholder}
              className="flex-1 bg-background rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-accent text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-accent-hover hover:shadow-md"
              style={{ boxShadow: input.trim() ? '0 4px 12px rgba(198, 244, 50, 0.3)' : 'none' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
