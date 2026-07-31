import {
  LayoutDashboard,
  Link2,
  BarChart3,
  QrCode,
  UserSquare2,
  Globe,
  Code2,
  Users,
  CreditCard,
  Settings,
  LifeBuoy,
  MessageCircle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  badge?: string
  children?: NavItem[]
}

export const primaryNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/app' },
  {
    id: 'links',
    label: 'Links',
    icon: Link2,
    href: '/app/links',
    children: [
      { id: 'all-links', label: 'All Links', icon: ChevronRight, href: '/app/links' },
      { id: 'bio-links', label: 'Bio Links', icon: ChevronRight, href: '/app/bio-links' },
      { id: 'qr-codes', label: 'QR Codes', icon: ChevronRight, href: '/app/qr-studio' },
    ],
  },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/app/analytics' },
  { id: 'qr-studio', label: 'QR Studio', icon: QrCode, href: '/app/qr-studio' },
  { id: 'bio', label: 'Bio Links', icon: UserSquare2, href: '/app/bio-links' },
  { id: 'domains', label: 'Domains', icon: Globe, href: '/app/domains' },
  { id: 'api', label: 'API', icon: Code2, href: '/app/api' },
]

export const secondaryNav: NavItem[] = [
  { id: 'teams', label: 'Teams', icon: Users, href: '/app/teams', badge: 'Pro' },
  { id: 'billing', label: 'Billing', icon: CreditCard, href: '/app/billing' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/app/settings' },
]

export const footerNav: NavItem[] = [
  { id: 'help', label: 'Help', icon: LifeBuoy, href: '/app/help' },
  { id: 'support', label: 'Support', icon: MessageCircle, href: '/app/support' },
]
