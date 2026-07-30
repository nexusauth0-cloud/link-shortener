# Analytics (Product) — Nexus Links

> Product analytics: metrics, events, funnels.

## North Star Metric

**Monthly Active Links (MAL)**

A link is "active" if it received at least one click in the trailing 28 days. This measures _usefulness_, not creation volume. It aligns the whole company around building tools that people actually use, not just features that generate signups.

### Why MAL?

- Correlates with retention (links with clicks → users return)
- Correlates with revenue (active links → need for more capacity → upgrade)
- Actionable (we can actively improve: suggest destinations, optimize QR codes)
- Measures value delivered, not activity performed

## Activation

### Definition

A user is "activated" when they:

1. Sign up
2. Create their first link
3. Share it
4. **Come back to see the analytics** (this is the key step)

### Activation Funnel

| Step                       | Expected % | Target |
| -------------------------- | ---------- | ------ |
| Signed up                  | 100%       | 100%   |
| Created first link         | 85%        | >90%   |
| Shared link (copied or QR) | 70%        | >80%   |
| Returned to view analytics | 40%        | >60%   |

### Activation Interventions

- Email: "Your first link just got its first click!" (triggers return)
- Dashboard: prominent "How's your link doing?" card
- Onboarding: guided tour showing analytics value

## Retention

### Weekly Retention Cohorts

| Week    | Expected | Target | Intervention                            |
| ------- | -------- | ------ | --------------------------------------- |
| Week 1  | 60%      | >70%   | —                                       |
| Week 4  | 40%      | >50%   | Weekly email digest                     |
| Week 8  | 30%      | >40%   | Feature announcement                    |
| Week 12 | 25%      | >35%   | "You haven't created a link this month" |

### Retention Drivers

- **Habit:** Users who create links weekly have 80% 90-day retention
- **Team:** Users in workspaces have 2x retention of solo users
- **API:** Developer users have highest LTV (3x average)

## Engagement

### Key Actions

| Action               | Frequency | % of DAU |
| -------------------- | --------- | -------- |
| View dashboard       | Daily     | 100%     |
| Create link          | Weekly    | 40%      |
| View analytics       | Daily     | 60%      |
| Share link (copy/QR) | Weekly    | 50%      |
| Export report        | Monthly   | 10%      |
| Manage team          | Monthly   | 15%      |
| Configure settings   | Monthly   | 5%       |

### Power User Curve

| Segment | Definition             | % of Users |
| ------- | ---------------------- | ---------- |
| Core    | Active on 6+ of 7 days | 15%        |
| Regular | Active 2–5 of 7 days   | 35%        |
| Casual  | Active 1 of 7 days     | 30%        |
| Dormant | No activity in 7 days  | 20%        |

## Revenue Metrics

| Metric                | Formula                                                                   | Target |
| --------------------- | ------------------------------------------------------------------------- | ------ |
| ARPU                  | Revenue / paying users                                                    | $50/mo |
| LTV                   | ARPU × average lifetime months                                            | $1,500 |
| CAC                   | Sales & marketing / new customers                                         | $150   |
| LTV:CAC               | LTV / CAC                                                                 | 10:1   |
| Gross margin          | (Revenue - COGS) / Revenue                                                | >80%   |
| Monthly churn         | Users lost / total users                                                  | <4%    |
| Net revenue retention | (Starting revenue + expansions - contractions - churn) / Starting revenue | >100%  |

## Funnels

### Trial → Paid

| Step                 | Conversion |
| -------------------- | ---------- |
| Signed up (free)     | 100%       |
| Created 5+ links     | 60%        |
| Added custom domain  | 30%        |
| Invited team member  | 20%        |
| Hit usage limit      | 15%        |
| **Upgraded to paid** | **5%**     |

### Free → Pro Upgrade Triggers

1. "You've used 80% of your monthly links" (in-app notification)
2. "Team collaboration unlocked on Pro" (banner when inviting second person)
3. "Custom domains start at Pro" (when adding domain)

## Captured Events

### Page Views

```typescript
page_viewed: {
  path: string
  referrer?: string
  utm?: { source: string; medium: string; campaign: string }
}
```

### Link Actions

```typescript
link_created: {
  alias: string
  hasCustomAlias: boolean
  hasTags: boolean
  hasUtm: boolean
  hasPassword: boolean
  hasExpiry: boolean
  source: 'web' | 'api'
}

link_shared: {
  method: 'copy' | 'qr' | 'share-api'
  linkId: string
}

link_analytics_viewed: {
  linkId: string
  timeRange: '7d' | '30d' | '90d'
}
```

### Account Events

```typescript
user_signed_up: {
  method: 'email' | 'google' | 'github'
  workspace: 'solo' | 'invited'
}

plan_upgraded: {
  from: 'free' | 'pro'
  to: 'pro' | 'business'
  trigger: 'limit' | 'team' | 'domain' | 'manual'
}

workspace_member_invited: {
  invitedByRole: 'admin' | 'editor'
}
```

## KPIs Dashboard

| Category   | KPI                        | Target    | Frequency |
| ---------- | -------------------------- | --------- | --------- |
| Growth     | New signups                | +20% MoM  | Weekly    |
| Growth     | Paid conversions           | 5%        | Weekly    |
| Engagement | DAU/MAU                    | >40%      | Daily     |
| Engagement | MAL (Monthly Active Links) | +15% MoM  | Monthly   |
| Retention  | D7 retention               | >50%      | Weekly    |
| Revenue    | MRR                        | $42K (Y1) | Monthly   |
| Revenue    | ARPU                       | $50       | Monthly   |
| Quality    | NPS                        | >50       | Quarterly |
| Quality    | P95 redirect latency       | <50ms     | Daily     |
| Quality    | Uptime                     | 99.9%     | Daily     |

## Tooling

- **Product analytics:** PostHog (self-hosted option available)
- **Session replay:** PostHog (for UX debugging)
- **A/B testing:** PostHog feature flags
- **NPS surveys:** In-app (triggered after 30 days)
- **Retention cohorts:** PostHog
- **Revenue analytics:** Stripe dashboard + custom SQL
