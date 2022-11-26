const { google } = require('googleapis')

const {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URIS
} = process.env

const oauthInit = new google.auth.OAuth2(
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URIS
)

module.exports = {
    generateUrl: () => {
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ]

        const url = oauthInit.generateAuthUrl({
            access_type: 'offline',
            response_type: 'code',
            scope: scopes
        })

        return url
    },

    setCredential: async (code) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { tokens } = await oauthInit.getToken(code)

                oauthInit.setCredentials(tokens)

                return resolve(tokens)
            } catch (err) {
                return reject(err)
            }
        })
    },

    getUserData: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const oauth2 = google.oauth2({
                    auth: oauthInit,
                    version: 'v2'
                })

                oauth2.userinfo.get((err, res) => {
                    if (err) {
                        return reject(err)
                    } else {
                        return resolve(res)
                    }
                })
            } catch (err) {
                return reject(err)
            }
        })
    }
}