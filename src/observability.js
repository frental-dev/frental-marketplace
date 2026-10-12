/**
 * Error tracking, opt-in via VITE_SENTRY_DSN (a build-time env var — must
 * be set in Vercel before the build runs, not just at runtime). If unset,
 * Vite's dead-code elimination strips this entire code path at build time —
 * verified: with no DSN, @sentry/react contributes zero bytes to the
 * bundle. With a DSN set, it's correctly code-split into its own ~360KB
 * chunk, loaded once on app start. Free Sentry tier covers a project this
 * size comfortably.
 *
 * Set up: sentry.io → new project (React) → copy the DSN → set
 * VITE_SENTRY_DSN in Vercel's env vars → redeploy (build-time var, won't
 * take effect without a rebuild).
 */
export async function initObservability() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    console.info('[observability] VITE_SENTRY_DSN not set — error tracking disabled');
    return;
  }

  try {
    const Sentry = await import('@sentry/react');
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      release: `frental-marketplace@${__APP_VERSION__}`,
      tracesSampleRate: 0.1,
    });
    window.Sentry = Sentry;
    console.info('[observability] Sentry initialized');
  } catch (err) {
    // Never let observability setup itself break the app.
    console.error('[observability] failed to initialize Sentry:', err);
  }
}
