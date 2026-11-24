import { NextResponse } from 'next/server';
import { getLatestReels, FALLBACK_REELS, sortReelsNewestFirst } from '@/app/lib/instagram';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await getLatestReels(6);
  const tokenSet = Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
  const accountIdSet = Boolean(
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || process.env.INSTAGRAM_USER_ID
  );

  return NextResponse.json({
    account: '@eatsourboo',
    accountUrl: 'https://www.instagram.com/eatsourboo/',
    source: result.source,
    isDynamic: result.isDynamic,
    totalCount: result.reels.length,
    reels: result.reels,
    apiStatus: {
      isFullyConfigured: tokenSet && accountIdSet,
      credentials: {
        INSTAGRAM_ACCESS_TOKEN: tokenSet ? 'Configured (Secret)' : 'Missing',
        INSTAGRAM_BUSINESS_ACCOUNT_ID: accountIdSet ? 'Configured' : 'Missing',
      },
      howToEnableAutomatedSync: [
        '1. Ensure @eatsourboo is an Instagram Professional (Creator/Business) account.',
        '2. Connect @eatsourboo to a Facebook Page managed by Sakshi/admin.',
        '3. Create an app in Meta for Developers (developers.facebook.com) with Instagram Graph API.',
        '4. Generate a long-lived Access Token with `instagram_basic` and `pages_read_engagement` scopes.',
        '5. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID to your production environment variables (.env.production / Vercel).',
      ],
      manualUpdateLocation: 'app/lib/instagram.ts (FALLBACK_REELS array)',
    },
  });
}
