'use client'

import { Container } from '@nexuslinks/ui'
import { Code2, Globe, MessageCircle } from 'lucide-react'

const footerLinks = [
  { label: 'Product', items: ['Features', 'Pricing', 'Changelog', 'Integration', 'API Docs'] },
  { label: 'Company', items: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
  { label: 'Legal', items: ['Privacy', 'Terms', 'Security', 'GDPR', 'SOC 2'] },
  { label: 'Resources', items: ['Help Center', 'Community', 'Status', 'Tutorials', 'Brand Kit'] },
]

export function Footer() {
  return (
    <footer className="bg-surface/20 relative">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="from-primary to-accent flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white">
                N
              </div>
              <span className="text-foreground text-sm font-semibold">Nexus Links</span>
            </div>
            <p className="text-muted/50 mt-3 text-xs leading-relaxed">
              Enterprise link management platform. Shorten, track, and optimize your links at scale.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: <Globe className="h-4 w-4" />, href: '#' },
                { icon: <Code2 className="h-4 w-4" />, href: '#' },
                { icon: <MessageCircle className="h-4 w-4" />, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="bg-surface/30 text-muted/50 hover:bg-primary/10 hover:text-primary flex h-8 w-8 items-center justify-center rounded-lg transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((group) => (
            <div key={group.label}>
              <p className="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted/50 hover:text-foreground text-xs transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-muted/30 mt-10 pt-6 text-center text-[10px]">
          &copy; {new Date().getFullYear()} Nexus Links, Inc. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
