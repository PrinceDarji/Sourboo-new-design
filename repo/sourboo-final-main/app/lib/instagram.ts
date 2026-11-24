/**
 * Official Instagram Integration for @eatsourboo
 *
 * AUTOMATIC SYNC VIA META INSTAGRAM GRAPH API:
 * To enable automatic, real-time syncing of new Reels:
 * 1. Account: Convert @eatsourboo to an Instagram Professional (Business or Creator) account.
 * 2. Meta App: Create an App at developers.facebook.com with the "Instagram Graph API" product.
 * 3. Facebook Page: Connect @eatsourboo to a Facebook Page managed by the account admin.
 * 4. Token & ID: Generate a long-lived Page/User Access Token with permissions:
 *    - `instagram_basic`
 *    - `pages_show_list` / `pages_read_engagement`
 * 5. Environment Variables:
 *    - `INSTAGRAM_ACCESS_TOKEN`: The 60-day long-lived access token.
 *    - `INSTAGRAM_BUSINESS_ACCOUNT_ID`: The numeric Instagram Business Account ID.
 *
 * MANUAL FALLBACK & UPDATE WORKFLOW:
 * If API access is not configured, this module safely falls back to the curated
 * `FALLBACK_REELS` catalog below.
 *
 * NEWEST-FIRST GUARANTEE:
 * Both live API reels and manual catalog entries are strictly sorted descending
 * by `publishedAt` (newest timestamp first).
 * - Position 1 is ALWAYS the newest reel.
 * - Whenever a new reel is published on Instagram or added to FALLBACK_REELS,
 *   it automatically moves to Position 1, and earlier reels shift down.
 */

export interface ReelItem {
  id: string;
  number?: string;
  title: string;
  href: string;
  thumb: string;
  videoUrl?: string;
  publishedAt: string; // ISO 8601 date string, e.g. '2026-05-03T10:00:00Z'
  caption?: string;
}

/**
 * Curated list of @eatsourboo Reels.
 * When adding a new reel manually, simply provide its `publishedAt` ISO date.
 * The sorting engine will automatically calculate the correct order.
 */
export const FALLBACK_REELS: ReelItem[] = [
  {
    id: 'DX6DhJbpD28',
    title: "What's up with us",
    href: 'https://www.instagram.com/reel/DX6DhJbpD28/',
    thumb: '/about/reels/DX6DhJbpD28.jpg',
    publishedAt: '2026-05-03T10:00:00Z',
    caption: 'Hi lol this is what I’ve been doin..',
  },
  {
    id: 'DUYW9E8kstT',
    title: 'Try Sourboo',
    href: 'https://www.instagram.com/reel/DUYW9E8kstT/',
    thumb: '/about/reels/DUYW9E8kstT.jpg',
    publishedAt: '2026-02-05T10:00:00Z',
    caption: 'elle woods but confused',
  },
  {
    id: 'DTzhFCuElJ-',
    title: 'Eat w Sakshi',
    href: 'https://www.instagram.com/reel/DTzhFCuElJ-/',
    thumb: '/about/reels/DTzhFCuElJ-.jpg',
    publishedAt: '2026-01-21T10:00:00Z',
    caption: 'savoury sour girl',
  },
];

/**
 * Sorts reels strictly newest-first by `publishedAt` timestamp
 * and formats two-digit display numbers (01, 02, 03...).
 */
export function sortReelsNewestFirst(reels: ReelItem[]): ReelItem[] {
  return [...reels]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((reel, index) => ({
      ...reel,
      number: String(index + 1).padStart(2, '0'),
    }));
}

export interface ReelsResponse {
  reels: ReelItem[];
  source: 'instagram-graph-api' | 'manual-fallback';
  isDynamic: boolean;
  missingCredentials?: string[];
}

/**
 * Fetches the latest Reels for @eatsourboo.
 * Prioritizes Meta Instagram Graph API if credentials exist; otherwise falls back
 * to the verified, manually updateable catalog.
 */
export async function getLatestReels(limit = 3): Promise<ReelsResponse> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || process.env.INSTAGRAM_USER_ID;

  const missing: string[] = [];
  if (!token) missing.push('INSTAGRAM_ACCESS_TOKEN');
  if (!accountId) missing.push('INSTAGRAM_BUSINESS_ACCOUNT_ID');

  // If credentials are not present, use the verified fallback without faking
  if (missing.length > 0) {
    return {
      reels: sortReelsNewestFirst(FALLBACK_REELS).slice(0, limit),
      source: 'manual-fallback',
      isDynamic: false,
      missingCredentials: missing,
    };
  }

  try {
    const fields = 'id,caption,media_type,media_product_type,media_url,permalink,thumbnail_url,timestamp';
    const url = `https://graph.facebook.com/v21.0/${accountId}/media?fields=${fields}&limit=12&access_token=${encodeURIComponent(token!)}`;

    // Revalidate every hour on Next.js server
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.warn(`[Instagram API] HTTP ${res.status}: Falling back to verified catalog.`);
      return {
        reels: sortReelsNewestFirst(FALLBACK_REELS).slice(0, limit),
        source: 'manual-fallback',
        isDynamic: false,
        missingCredentials: [`API Error: HTTP ${res.status}`],
      };
    }

    const data = await res.json();
    const mediaList = Array.isArray(data.data) ? data.data : [];

    // Filter for video posts / Reels
    const reelItems: ReelItem[] = mediaList
      .filter((m: { media_type?: string; media_product_type?: string }) =>
        m.media_type === 'VIDEO' || m.media_product_type === 'REELS'
      )
      .map((m: { id: string; caption?: string; permalink?: string; thumbnail_url?: string; media_url?: string; timestamp: string }) => {
        // Derive clean title from first line of caption or default
        const rawTitle = m.caption ? m.caption.split('\n')[0].replace(/^["'\s]+|["'\s]+$/g, '').slice(0, 26) : '';
        const title = rawTitle || 'Watch Reel';

        return {
          id: m.id,
          title,
          href: m.permalink || `https://www.instagram.com/reel/${m.id}/`,
          thumb: m.thumbnail_url || m.media_url || '/about/reels/DX6DhJbpD28.jpg',
          videoUrl: m.media_url,
          publishedAt: m.timestamp,
          caption: m.caption,
        };
      });

    if (reelItems.length === 0) {
      return {
        reels: sortReelsNewestFirst(FALLBACK_REELS).slice(0, limit),
        source: 'manual-fallback',
        isDynamic: false,
      };
    }

    return {
      reels: sortReelsNewestFirst(reelItems).slice(0, limit),
      source: 'instagram-graph-api',
      isDynamic: true,
    };
  } catch (error) {
    console.error('[Instagram API] Request error:', error);
    return {
      reels: sortReelsNewestFirst(FALLBACK_REELS).slice(0, limit),
      source: 'manual-fallback',
      isDynamic: false,
      missingCredentials: [error instanceof Error ? error.message : 'Unknown network error'],
    };
  }
}
