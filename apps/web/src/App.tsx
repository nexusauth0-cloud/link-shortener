import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './shell/components/ErrorBoundary'
import { Spinner } from '@nexuslinks/ui'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('./auth/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./auth/pages/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('./auth/pages/VerifyEmailPage'))
const TwoFactorPage = lazy(() => import('./auth/pages/TwoFactorPage'))
const InvitePage = lazy(() => import('./auth/pages/InvitePage'))
const AuthSuccessPage = lazy(() => import('./auth/pages/AuthSuccessPage'))
const AuthErrorPage = lazy(() => import('./auth/pages/AuthErrorPage'))
const AppShell = lazy(() => import('./shell/AppShell').then((m) => ({ default: m.AppShell })))
const DashboardPage = lazy(() => import('./shell/pages/DashboardPage'))
const LinkStudioPage = lazy(() => import('./link-studio/LinkStudioPage'))
const AnalyticsPage = lazy(() => import('./analytics/AnalyticsPage'))
const QRStudioPage = lazy(() => import('./qr-studio/QRStudioPage'))
const DeveloperHubPage = lazy(() => import('./developer-hub/DeveloperHubPage'))
const WorkspacePage = lazy(() => import('./workspace/WorkspacePage'))
const SettingsPage = lazy(() => import('./settings/SettingsPage'))
const BillingPage = lazy(() => import('./billing/BillingPage'))
const NotFoundPage = lazy(() =>
  import('./shell/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function RouteFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-muted/50 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteFallback />}>
                <LandingPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<RouteFallback />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<RouteFallback />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ForgotPasswordPage />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ResetPasswordPage />
              </Suspense>
            }
          />
          <Route
            path="/verify-email"
            element={
              <Suspense fallback={<RouteFallback />}>
                <VerifyEmailPage />
              </Suspense>
            }
          />
          <Route
            path="/2fa"
            element={
              <Suspense fallback={<RouteFallback />}>
                <TwoFactorPage />
              </Suspense>
            }
          />
          <Route
            path="/invite/:token"
            element={
              <Suspense fallback={<RouteFallback />}>
                <InvitePage />
              </Suspense>
            }
          />
          <Route
            path="/auth/success"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AuthSuccessPage />
              </Suspense>
            }
          />
          <Route
            path="/auth/error"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AuthErrorPage />
              </Suspense>
            }
          />
          <Route
            path="/app"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AppShell />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<RouteFallback />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              path="links"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <LinkStudioPage />
                </Suspense>
              }
            />
            <Route
              path="analytics"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <AnalyticsPage />
                </Suspense>
              }
            />
            <Route
              path="qr-studio"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <QRStudioPage />
                </Suspense>
              }
            />
            <Route
              path="bio-links"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <PlaceholderPage title="Bio Links" desc="Manage your bio link pages" />
                </Suspense>
              }
            />
            <Route
              path="domains"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <PlaceholderPage title="Domains" desc="Manage your custom domains" />
                </Suspense>
              }
            />
            <Route
              path="api"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <DeveloperHubPage />
                </Suspense>
              }
            />
            <Route
              path="teams"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <WorkspacePage />
                </Suspense>
              }
            />
            <Route
              path="billing"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <BillingPage />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <SettingsPage />
                </Suspense>
              }
            />
            <Route
              path="help"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <PlaceholderPage title="Help Center" desc="Documentation and guides" />
                </Suspense>
              }
            />
            <Route
              path="support"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <PlaceholderPage title="Support" desc="Contact our support team" />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
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
