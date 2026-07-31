'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Card, Chip } from '@nexuslinks/ui'
import { Copy, Check } from 'lucide-react'

const codeExamples = [
  {
    lang: 'JavaScript',
    code: `import { NexusLinks } from '@nexuslinks/sdk'

const nx = new NexusLinks('nx_sk_...')

const link = await nx.links.create({
  url: 'https://my.store/product',
  domain: 'go.mybrand.com',
  tags: ['campaign', 'summer']
})

console.log(link.shortUrl)
// → "https://go.mybrand.com/abc123"`,
  },
  {
    lang: 'cURL',
    code: `curl -X POST https://api.nexus.links/v1/links \\
  -H "Authorization: Bearer nx_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://my.store/product",
    "domain": "go.mybrand.com",
    "tags": ["campaign", "summer"]
  }'

# Response:
# { "shortUrl": "https://go.mybrand.com/abc123", ... }`,
  },
  {
    lang: 'Python',
    code: `from nexuslinks import NexusLinks

nx = NexusLinks(api_key="nx_sk_...")

link = nx.links.create(
    url="https://my.store/product",
    domain="go.mybrand.com",
    tags=["campaign", "summer"]
)

print(link.short_url)
# → "https://go.mybrand.com/abc123"`,
  },
  {
    lang: 'Go',
    code: `import "github.com/nexuslinks/sdk-go"

func main() {
    nx := nexuslinks.New("nx_sk_...")
    
    link, _ := nx.Links.Create(ctx, nexuslinks.CreateLinkInput{
        URL:    "https://my.store/product",
        Domain: "go.mybrand.com",
        Tags:   []string{"campaign", "summer"},
    })
    
    fmt.Println(link.ShortURL)
    // → "https://go.mybrand.com/abc123"
}`,
  },
]

export function DeveloperSection() {
  const [activeLang, setActiveLang] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeLang]!.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Section id="developers" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.04),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <Chip variant="accent" className="mb-4">
            Developer First
          </Chip>
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            API that developers love
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Integrate with any stack. We provide SDKs for every major language.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="glass" hover={false} className="overflow-hidden p-0">
            <div className="bg-surface/30 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                {codeExamples.map((ex, i) => (
                  <button
                    key={ex.lang}
                    onClick={() => {
                      setActiveLang(i)
                      setCopied(false)
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      i === activeLang
                        ? 'bg-primary shadow-primary/30 text-white shadow-sm'
                        : 'text-muted/60 hover:bg-surface/50 hover:text-foreground'
                    }`}
                  >
                    {ex.lang}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-muted/40 hidden text-[10px] sm:inline">
                    1.2M+ API calls today
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-muted/50 hover:bg-surface/50 hover:text-foreground rounded-lg p-1.5 transition-colors"
                  >
                    {copied ? (
                      <Check className="text-success h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <pre className="p-5 text-sm leading-relaxed">
                <code className="text-muted/80 [&_.hl]:text-primary [&_.cm]:text-muted/40 [&_.kw]:text-accent [&_.str]:text-secondary">
                  {codeExamples[activeLang]!.code.split('\n').map((line, i) => (
                    <span key={i} className="line">
                      <span className="text-muted/20 mr-5 select-none text-[10px]">{i + 1}</span>
                      {line || <span className="inline-block">&nbsp;</span>}
                      {'\n'}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
