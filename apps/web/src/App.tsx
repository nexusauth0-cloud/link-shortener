import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './auth/pages/LoginPage'
import RegisterPage from './auth/pages/RegisterPage'
import ForgotPasswordPage from './auth/pages/ForgotPasswordPage'
import ResetPasswordPage from './auth/pages/ResetPasswordPage'
import VerifyEmailPage from './auth/pages/VerifyEmailPage'
import TwoFactorPage from './auth/pages/TwoFactorPage'
import InvitePage from './auth/pages/InvitePage'
import AuthSuccessPage from './auth/pages/AuthSuccessPage'
import AuthErrorPage from './auth/pages/AuthErrorPage'
import { AppShell } from './shell/AppShell'
import DashboardPage from './shell/pages/DashboardPage'
import { NotFoundPage } from './shell/pages/NotFoundPage'
import LinkStudioPage from './link-studio/LinkStudioPage'
import AnalyticsPage from './analytics/AnalyticsPage'
import QRStudioPage from './qr-studio/QRStudioPage'
import DeveloperHubPage from './developer-hub/DeveloperHubPage'
import WorkspacePage from './workspace/WorkspacePage'
import SettingsPage from './settings/SettingsPage'
import BillingPage from './billing/BillingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/2fa" element={<TwoFactorPage />} />
        <Route path="/invite/:token" element={<InvitePage />} />
        <Route path="/auth/success" element={<AuthSuccessPage />} />
        <Route path="/auth/error" element={<AuthErrorPage />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="links" element={<LinkStudioPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="qr-studio" element={<QRStudioPage />} />
          <Route
            path="bio-links"
            element={<PlaceholderPage title="Bio Links" desc="Manage your bio link pages" />}
          />
          <Route
            path="domains"
            element={<PlaceholderPage title="Domains" desc="Manage your custom domains" />}
          />
          <Route path="api" element={<DeveloperHubPage />} />
          <Route path="teams" element={<WorkspacePage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route
            path="help"
            element={<PlaceholderPage title="Help Center" desc="Documentation and guides" />}
          />
          <Route
            path="support"
            element={<PlaceholderPage title="Support" desc="Contact our support team" />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function PlaceholderPage({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex h-[50vh] items-center justify-center px-6">
      <div className="text-center">
        <div className="bg-surface/50 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
          <div className="bg-muted/20 h-5 w-5 rounded-full" />
        </div>
        <h2 className="text-foreground text-lg font-semibold">{title}</h2>
        <p className="text-muted/60 mt-1 text-sm">{desc}</p>
      </div>
    </div>
  )
}
