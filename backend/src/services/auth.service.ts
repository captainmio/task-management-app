import jwt from 'jsonwebtoken'

interface UserTokenPayload {
    username: string
}

function generateAccessToken(user: UserTokenPayload): string {

    const { username } = user
    return jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION } as jwt.SignOptions
    );

}

function generateRefreshToken(user: UserTokenPayload): string {

    const { username } = user
    return jwt.sign({ username }, 
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION } as jwt.SignOptions
    )
}

async function refreshTokenService(refreshToken: string) {

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as UserTokenPayload
    const { username } = decoded

    const newAccessToken = generateAccessToken({ username })
    const newRefreshToken = generateRefreshToken({ username })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export { generateAccessToken, generateRefreshToken, refreshTokenService }