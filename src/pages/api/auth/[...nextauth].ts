import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */

async function refreshAccessToken(token) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    // https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/types.ts#L324
    // https://github.com/nextauthjs/next-auth/discussions/1053#discussioncomment-265810
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=playlist-read-private playlist-read-collaborative ugc-image-upload playlist-modify-private user-read-email user-read-private user-modify-playback-state user-follow-modify user-library-read user-library-modify playlist-modify-public user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read',
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      // @ts-ignore
      callbacks: {
        async jwt({ token, account }) {
          if (account) {
            token.accessToken = account.refresh_token
          }
          console.log('token', token)
          return token
        },
        async session(session: { accessToken: any; user: any }, token: { accessToken: any }, user: any) {
          session.accessToken = token.accessToken
          session.user = user
          return session as { accessToken: string; user: any }
        },
      },
    }),
  ],
  // A database is optional, but required to persist accounts in a database
}
export default NextAuth(authOptions)
