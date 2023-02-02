const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // @ts-ignore
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })
  console.log('response', response)

  return response.json()
}

export const getRecentTracks = async () => {
  const { access_token } = await getAccessToken()
  // could give user more options
  // 12am today in the format of unix time
  // const after = (new Date().setHours(0, 0, 0, 0) / 1000) as number
  // 24 hours ago from now in the format of unix time
  const after = (new Date().setHours(new Date().getHours() - 24, 0, 0, 0) / 1000) as number

  const songNum = 50 as number

  //   const playlist_id = process.env.SPOTIFY_PLAYLIST_SOTW_ID
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${songNum}&after=${after}
  `,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // redirect to main page
    return { error: 'error' }
  }
  return res.json()
}
