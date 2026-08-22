import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Vercel sets VERCEL_ENV (and, when "Automatically expose System
// Environment Variables" is on, this NEXT_PUBLIC_ alias) on every
// deployment: 'production' only for the deployment currently promoted to
// production, 'preview' for every branch/PR build — including the
// throwaway *-<hash>-<team>.vercel.app URLs a new build gets before it's
// promoted. The three IDs above are configured in Vercel for every
// environment, so their mere presence was never a reliable signal that a
// request was hitting the real site; a preview build with GTM_ID set fires
// the exact same GTM container (and everything GTM loads inside it — GA4,
// Google Ads conversion, Ads call tracking, Hotjar) straight into
// production analytics.
const IS_PRODUCTION_BUILD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

// Belt-and-braces beyond the build flag above: Vercel also marks the
// project's own auto-generated production alias (<project>.vercel.app) as
// 'production', not just the custom domain, so VERCEL_ENV alone doesn't
// stop tracking from firing there. Checked inside each injected script
// below (not here) because this component renders on the server, where
// `window` doesn't exist yet.
const PRODUCTION_HOSTNAME = "perfecteyesltd.com";

/**
 * The previous WordPress site's tracking stack, reproduced on this one.
 *
 * That site ran six distinct tools, found by inspecting its live network
 * traffic and, for the ones that turned out to be hardcoded rather than
 * configured server-side, its "Insert Headers and Footers" plugin database
 * entry directly:
 *
 *   - Google Tag Manager (GTM-MH8NNV2W)
 *   - Microsoft Clarity, loaded directly (project pcrguihfyw)
 *   - Meta Pixel (259527637836142), with a Lead event on form submission
 *   - GA4 (two properties), Google Ads conversion + call tracking, Hotjar,
 *     and a second Clarity project — none of whose IDs appear anywhere in
 *     the WordPress database or theme files, which means they were
 *     configured as tags inside the GTM container itself, not in code.
 *     Adding the GTM container below is what brings those back — there is
 *     nothing further to hardcode for them here.
 *
 * Fires unconditionally on the real production site, matching the old
 * site's behaviour exactly there (a deliberate choice — that site had no
 * cookie-consent gate on any of this either). components/shared/CookieConsent
 * still shows the banner and records a choice, but nothing here reads it.
 *
 * Renders nothing for a tool whose env var is unset, AND — regardless of
 * which IDs are set — nothing at all unless this is a Vercel production
 * build (IS_PRODUCTION_BUILD) being viewed on the real domain
 * (PRODUCTION_HOSTNAME, checked inside each script at runtime). Both gates
 * exist because relying on the env var alone let every preview deployment
 * quietly fire live conversion tracking; see the comments on those two
 * constants above.
 *
 * ⚠️ NEXT_PUBLIC_* variables are substituted into the bundle by `next build`,
 * not read from the environment at runtime — each ID has to be present in
 * the build environment (Vercel project settings), or that tool silently
 * stays off with nothing in the console to say why.
 */
export default function Tracking() {
  return (
    <>
      {IS_PRODUCTION_BUILD && GTM_ID && (
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(window.location.hostname==='${PRODUCTION_HOSTNAME}'){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');}`,
          }}
        />
      )}

      {IS_PRODUCTION_BUILD && CLARITY_ID && (
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(window.location.hostname==='${PRODUCTION_HOSTNAME}'){(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");}`,
          }}
        />
      )}

      {IS_PRODUCTION_BUILD && FB_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(window.location.hostname==='${PRODUCTION_HOSTNAME}'){!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');}`,
          }}
        />
      )}
    </>
  );
}
