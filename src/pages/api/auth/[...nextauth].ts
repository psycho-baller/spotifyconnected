import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        // authorization: {
        //     params: { show_dialog: true },
        //     url: 'https://accounts.spotify.com/authorize',
        //     token: 'https://accounts.spotify.com/api/token',
        //     profile: (profile) => {
        //         return {
        //             id: profile.id,
        //             name: profile.display_name,
        //             email: profile.email,
        //             image: profile.images[0].url,
        //         }
        //     },
        // },
      })
  ],
}
export default NextAuth(authOptions)