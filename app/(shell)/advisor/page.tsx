'use client'

import { useState } from 'react'
import { ModulePage } from '@/components/modules/ModulePage'
import { MetricCard } from '@/components/modules/MetricCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { generateAdvisorData } from '@/lib/modules/mockData'
import { Bot, TrendingUp, Target, AlertTriangle, CheckCircle, Clock, Send, MessageSquare } from 'lucide-react'

export default function AdvisorPage() {
  const [data, setData] = useState(generateAdvisorData())
  const [isLoading, setIsLoading] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Hello! I\'m your AI advisor. Ask me anything about market trends, trade data, or business intelligence.' }
  ])

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setData(generateAdvisorData())
    setIsLoading(false)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }])
    setChatInput('')

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `I understand you're asking about "${chatInput.slice(0, 50)}...". Based on current data, I recommend reviewing the relevant module for detailed analysis. This is a simulated response.`
      }])
    }, 1000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-error-100 text-error-800'
      case 'Medium':
        return 'bg-warning-100 text-warning-800'
      case 'Low':
        return 'bg-success-100 text-success-800'
      default:
        return 'bg-muted-100 text-muted-800'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-success-600'
    if (confidence >= 0.6) return 'text-warning-600'
    return 'text-error-600'
  }

  return (
    <ModulePage
      title="Advisor"
      description="AI-powered insights and recommendations"
      icon={<Bot className="h-5 w-5 text-primary" />}
      onRefresh={handleRefresh}
      onSave={() => console.log('Saving advisor view')}
      onExport={() => console.log('Exporting advisor data')}
      onShare={() => console.log('Sharing advisor view')}
      onSchedule={() => console.log('Scheduling advisor report')}
      isLoading={isLoading}
      lastUpdated={new Date()}
      metrics={
        <>
          {data.metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              title={metric.name}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              format={metric.format}
              description={metric.description}
              icon={<Bot className="h-4 w-4" />}
            />
          ))}
        </>
      }
    >
      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">{insight.text}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        {insight.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {insight.timeframe}
                      </span>
                      <Badge
                        variant="secondary"
                        className={getImpactColor(insight.impact)}
                      >
                        {insight.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                      {Math.round(insight.confidence * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <Badge
                        variant="outline"
                        className={rec.risk === 'High' ? 'border-error-200 text-error-700' :
                                  rec.risk === 'Medium' ? 'border-warning-200 text-warning-700' :
                                  'border-success-200 text-success-700'}
                      >
                        {rec.risk} Risk
                      </Badge>
                      <span className="text-muted-foreground">
                        {rec.timeframe}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                      {Math.round(rec.confidence * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Market Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <div className="text-2xl font-bold text-success-600">68%</div>
              <div className="text-sm text-success-700">Bullish</div>
            </div>
            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <div className="text-2xl font-bold text-warning-600">22%</div>
              <div className="text-sm text-warning-700">Neutral</div>
            </div>
            <div className="text-center p-4 bg-error-50 rounded-lg">
              <div className="text-2xl font-bold text-error-600">10%</div>
              <div className="text-sm text-error-700">Bearish</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Ask AI Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3 bg-muted/20">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your business data..."
                className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </ModulePage>
  )
}
