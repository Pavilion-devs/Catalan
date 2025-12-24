'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Rocket,
  Code2,
  Server,
  Settings,
  Layers,
  Search,
  Terminal,
  Globe,
  Database,
  Shield,
  Zap,
  ExternalLink,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Section = 'getting-started' | 'features' | 'api' | 'deployment' | 'configuration' | 'architecture'

const sections = [
  { id: 'getting-started' as Section, label: 'Getting Started', icon: Rocket },
  { id: 'features' as Section, label: 'Features', icon: Layers },
  { id: 'api' as Section, label: 'API Reference', icon: Code2 },
  { id: 'architecture' as Section, label: 'Architecture', icon: Database },
  { id: 'deployment' as Section, label: 'Deployment', icon: Server },
  { id: 'configuration' as Section, label: 'Configuration', icon: Settings },
]

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 hover:bg-neutral-700"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-neutral-400" />}
      </Button>
    </div>
  )
}

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight mt-8 mb-4 scroll-mt-20">
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold mt-6 mb-3">{children}</h3>
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-7 mb-4">{children}</p>
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<Section>('getting-started')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary">v1.0.0</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Catalan - the Xandeum pNode Analytics Platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </button>
                )
              })}

              <div className="pt-6 mt-6 border-t">
                <p className="px-3 text-xs font-medium text-muted-foreground mb-2">Resources</p>
                <a
                  href="https://github.com/Pavilion-devs/Catalan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Code2 className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
                <a
                  href="https://xandeum.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Xandeum
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
                <a
                  href="https://discord.gg/uqRSmmM5m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Discord
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Section Selector */}
            <div className="lg:hidden mb-6">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value as Section)}
                className="w-full p-3 rounded-lg border bg-background"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Getting Started */}
            {activeSection === 'getting-started' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Getting Started</h2>
                  <p className="text-lg text-muted-foreground">
                    Get up and running with Catalan in under 5 minutes
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Quick Start
                    </CardTitle>
                    <CardDescription>
                      Clone the repository and start the development server
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">1. Clone the repository</p>
                      <CodeBlock code="git clone https://github.com/Pavilion-devs/Catalan.git
cd Catalan" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">2. Install dependencies</p>
                      <CodeBlock code="npm install" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">3. Start the development server</p>
                      <CodeBlock code="npm run dev" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">4. Open in browser</p>
                      <CodeBlock code="http://localhost:3000" />
                    </div>
                  </CardContent>
                </Card>

                <SectionHeading>Prerequisites</SectionHeading>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Zap className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Node.js 20+</p>
                          <p className="text-sm text-muted-foreground">Required runtime</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Terminal className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">npm or pnpm</p>
                          <p className="text-sm text-muted-foreground">Package manager</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <SectionHeading>Project Structure</SectionHeading>
                <CodeBlock
                  language="text"
                  code={`src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Home dashboard
│   ├── pnodes/             # pNode explorer & details
│   ├── network/            # Network analytics
│   ├── analytics/          # Historical analytics
│   ├── compare/            # pNode comparison
│   ├── watchlist/          # Saved pNodes
│   ├── alerts/             # Alert management
│   └── docs/               # Documentation
├── components/             # React components
│   ├── ui/                 # Base UI components (shadcn)
│   ├── pnodes/             # pNode-specific components
│   └── analytics/          # Chart components
├── hooks/                  # Custom React hooks
├── services/               # API & data services
├── lib/                    # Utilities
└── types/                  # TypeScript types`}
                />

                <SectionHeading>What&apos;s Included</SectionHeading>
                <Paragraph>
                  Catalan comes pre-configured with everything you need:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Next.js 15 with App Router and React 19</li>
                  <li>Tailwind CSS 4 for styling</li>
                  <li>shadcn/ui component library</li>
                  <li>TanStack React Query for data fetching</li>
                  <li>Recharts for data visualization</li>
                  <li>Leaflet for interactive maps</li>
                  <li>TypeScript for type safety</li>
                  <li>Dark mode support</li>
                </ul>
              </div>
            )}

            {/* Features */}
            {activeSection === 'features' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Features</h2>
                  <p className="text-lg text-muted-foreground">
                    Comprehensive analytics tools for the Xandeum storage network
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-blue-500" />
                        pNode Explorer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Browse all pNodes in table, grid, or map view
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Filter by status, location, or performance
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Sort by any column
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Global search with keyboard shortcut (/)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-purple-500" />
                        Network Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Real-time network health monitoring
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Status distribution charts
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Geographic heatmap visualization
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Version distribution analysis
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Compare Tool
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Side-by-side pNode comparison
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Compare up to 4 nodes at once
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Visual difference highlighting
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Performance metric comparison
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        Watchlist & Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Save favorite pNodes to watchlist
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Set custom alert rules
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Monitor status changes
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Persistent storage (localStorage)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <SectionHeading>Keyboard Shortcuts</SectionHeading>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Open command palette</span>
                        <kbd className="px-2 py-1 text-xs rounded bg-muted">Cmd + K</kbd>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Quick search</span>
                        <kbd className="px-2 py-1 text-xs rounded bg-muted">/</kbd>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Toggle theme</span>
                        <kbd className="px-2 py-1 text-xs rounded bg-muted">Cmd + D</kbd>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Close dialogs</span>
                        <kbd className="px-2 py-1 text-xs rounded bg-muted">Esc</kbd>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionHeading>Data Export</SectionHeading>
                <Paragraph>
                  Export pNode data in multiple formats for external analysis or reporting:
                </Paragraph>
                <div className="flex gap-3">
                  <Badge variant="outline">CSV</Badge>
                  <Badge variant="outline">JSON</Badge>
                </div>
              </div>
            )}

            {/* API Reference */}
            {activeSection === 'api' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">API Reference</h2>
                  <p className="text-lg text-muted-foreground">
                    How Catalan integrates with the Xandeum pRPC endpoints
                  </p>
                </div>

                <Card className="border-blue-500/50 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle>pRPC Integration</CardTitle>
                    <CardDescription>
                      Catalan fetches real-time data from the Xandeum network using pRPC (pNode RPC) calls
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Primary Endpoint</p>
                        <CodeBlock code="https://api.devnet.xandeum.com:8899" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Protocol</p>
                        <p className="text-sm text-muted-foreground">JSON-RPC 2.0 over HTTP POST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionHeading>getClusterNodes</SectionHeading>
                <Paragraph>
                  The primary method used to retrieve all pNodes from the network.
                </Paragraph>

                <SubHeading>Request</SubHeading>
                <CodeBlock
                  language="json"
                  code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getClusterNodes"
}`}
                />

                <SubHeading>Response</SubHeading>
                <CodeBlock
                  language="json"
                  code={`{
  "jsonrpc": "2.0",
  "result": [
    {
      "pubkey": "7xKXtg2nM...",
      "gossip": "192.168.1.1:8001",
      "rpc": "http://192.168.1.1:8899",
      "version": "2.2.12",
      "featureSet": 123456789
    }
  ],
  "id": 1
}`}
                />

                <SectionHeading>Internal API Routes</SectionHeading>
                <Paragraph>
                  Catalan uses Next.js API routes as a proxy to handle CORS and data transformation.
                </Paragraph>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Badge>POST</Badge>
                        <code className="text-sm">/api/prpc</code>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Proxy endpoint for pRPC calls. Handles CORS, error handling, and response transformation.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/api/analytics/history</code>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Fetch historical network data (requires database configuration).
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/api/analytics/predictions</code>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Get AI-powered predictions and trend analysis.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <SectionHeading>Data Refresh Strategy</SectionHeading>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm font-medium">pNode List</span>
                        <span className="text-sm text-muted-foreground">Every 30 seconds</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm font-medium">Network Stats</span>
                        <span className="text-sm text-muted-foreground">Every 30 seconds</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm font-medium">pNode Details</span>
                        <span className="text-sm text-muted-foreground">Cached for 1 minute</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Architecture */}
            {activeSection === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Architecture</h2>
                  <p className="text-lg text-muted-foreground">
                    Technical overview of how Catalan is built
                  </p>
                </div>

                <SectionHeading>Tech Stack</SectionHeading>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: 'Next.js 15', desc: 'React framework with App Router', color: 'bg-black' },
                    { name: 'React 19', desc: 'UI library', color: 'bg-blue-500' },
                    { name: 'TypeScript', desc: 'Type safety', color: 'bg-blue-600' },
                    { name: 'Tailwind CSS 4', desc: 'Utility-first styling', color: 'bg-cyan-500' },
                    { name: 'shadcn/ui', desc: 'Component library', color: 'bg-neutral-800' },
                    { name: 'React Query', desc: 'Data fetching & caching', color: 'bg-red-500' },
                    { name: 'Recharts', desc: 'Data visualization', color: 'bg-purple-500' },
                    { name: 'Leaflet', desc: 'Interactive maps', color: 'bg-green-500' },
                    { name: 'Prisma', desc: 'Database ORM (optional)', color: 'bg-indigo-500' },
                  ].map((tech) => (
                    <Card key={tech.name}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${tech.color}`} />
                          <div>
                            <p className="font-medium">{tech.name}</p>
                            <p className="text-sm text-muted-foreground">{tech.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <SectionHeading>Data Flow</SectionHeading>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">1</div>
                        <div>
                          <p className="font-medium">Client Request</p>
                          <p className="text-sm text-muted-foreground">React Query triggers data fetch from hooks</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold">2</div>
                        <div>
                          <p className="font-medium">API Proxy</p>
                          <p className="text-sm text-muted-foreground">Next.js API route forwards to Xandeum RPC</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">3</div>
                        <div>
                          <p className="font-medium">pRPC Call</p>
                          <p className="text-sm text-muted-foreground">getClusterNodes fetches all pNodes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold">4</div>
                        <div>
                          <p className="font-medium">Data Transform</p>
                          <p className="text-sm text-muted-foreground">Raw data enriched with computed metrics</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold">5</div>
                        <div>
                          <p className="font-medium">UI Render</p>
                          <p className="text-sm text-muted-foreground">Components display data with auto-refresh</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionHeading>Performance Score Calculation</SectionHeading>
                <Paragraph>
                  Each pNode&apos;s performance score (0-100) is calculated using weighted components:
                </Paragraph>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uptime</span>
                        <Badge variant="outline">30%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <Badge variant="outline">25%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Storage Capacity</span>
                        <Badge variant="outline">20%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reliability</span>
                        <Badge variant="outline">15%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Software Version</span>
                        <Badge variant="outline">10%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Deployment */}
            {activeSection === 'deployment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Deployment</h2>
                  <p className="text-lg text-muted-foreground">
                    Deploy Catalan to production in minutes
                  </p>
                </div>

                <Card className="border-green-500/50 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-green-500" />
                      Recommended: Vercel
                    </CardTitle>
                    <CardDescription>
                      One-click deployment with automatic CI/CD
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">1. Push to GitHub</p>
                      <CodeBlock code="git push origin main" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">2. Import to Vercel</p>
                      <p className="text-sm text-muted-foreground">
                        Go to <a href="https://vercel.com/new" className="text-primary hover:underline">vercel.com/new</a> and import your repository
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">3. Deploy</p>
                      <p className="text-sm text-muted-foreground">
                        Click Deploy - no configuration needed!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <SectionHeading>Manual Deployment</SectionHeading>
                <Paragraph>
                  For self-hosted deployments on your own infrastructure:
                </Paragraph>

                <SubHeading>Build for Production</SubHeading>
                <CodeBlock code={`# Build the application
npm run build

# Start production server
npm run start`} />

                <SubHeading>Docker Deployment</SubHeading>
                <CodeBlock
                  language="dockerfile"
                  code={`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]`}
                />

                <SectionHeading>Environment Variables</SectionHeading>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border">
                        <code className="text-sm font-medium">NEXT_PUBLIC_XANDEUM_RPC_URL</code>
                        <p className="text-sm text-muted-foreground mt-1">
                          Custom RPC endpoint (optional, defaults to devnet)
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <code className="text-sm font-medium">DATABASE_URL</code>
                        <p className="text-sm text-muted-foreground mt-1">
                          PostgreSQL connection string (optional, for historical analytics)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Configuration */}
            {activeSection === 'configuration' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Configuration</h2>
                  <p className="text-lg text-muted-foreground">
                    Customize Catalan for your needs
                  </p>
                </div>

                <SectionHeading>Environment Variables</SectionHeading>
                <Paragraph>
                  Create a <code className="px-1.5 py-0.5 rounded bg-muted">.env.local</code> file in the root directory:
                </Paragraph>
                <CodeBlock code={`# RPC Configuration (optional)
NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.devnet.xandeum.com:8899

# Database (optional - for historical analytics)
DATABASE_URL=postgresql://user:password@localhost:5432/catalan

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_ALERTS=true
NEXT_PUBLIC_ENABLE_EXPORT=true`} />

                <SectionHeading>Network Configuration</SectionHeading>
                <Paragraph>
                  The app supports multiple Xandeum networks. Switch between them using the cluster selector in the navbar.
                </Paragraph>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">Devnet</p>
                          <p className="text-xs text-muted-foreground">Testing environment</p>
                        </div>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">Testnet</p>
                          <p className="text-xs text-muted-foreground">Staging environment</p>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">Mainnet</p>
                          <p className="text-xs text-muted-foreground">Production network</p>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionHeading>Database Setup (Optional)</SectionHeading>
                <Paragraph>
                  For historical analytics and data persistence, configure PostgreSQL:
                </Paragraph>
                <CodeBlock code={`# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Open Prisma Studio
npx prisma studio`} />

                <SectionHeading>Theme Customization</SectionHeading>
                <Paragraph>
                  Colors are defined in <code className="px-1.5 py-0.5 rounded bg-muted">src/app/globals.css</code> using CSS variables. Modify the <code className="px-1.5 py-0.5 rounded bg-muted">:root</code> and <code className="px-1.5 py-0.5 rounded bg-muted">.dark</code> selectors to customize the color scheme.
                </Paragraph>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t flex justify-between">
              <div>
                {sections.findIndex(s => s.id === activeSection) > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection)
                      setActiveSection(sections[currentIndex - 1].id)
                    }}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
                    {sections[sections.findIndex(s => s.id === activeSection) - 1]?.label}
                  </Button>
                )}
              </div>
              <div>
                {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection)
                      setActiveSection(sections[currentIndex + 1].id)
                    }}
                  >
                    {sections[sections.findIndex(s => s.id === activeSection) + 1]?.label}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
