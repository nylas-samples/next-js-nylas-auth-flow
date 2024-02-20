import { cookies } from 'next/headers'
import Nylas from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
})

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  const cookieStore = cookies()

  const data = nylas.auth.urlForOAuth2PKCE({
    clientId: process.env.NYLAS_CLIENT_ID,
    provider: 'google',
    redirectUri: process.env.NYLAS_REDIRECT_URI,
    loginHint: 'user-email-to-connect',
  })

  cookieStore.set('nylas_code_challenge', data.secretHash)

  return Response.redirect(data.url)
}