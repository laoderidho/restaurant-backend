import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()

    try {
      const user = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(user)

      return response.ok({
        token: token,
        ...user.serialize(),
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Invalid credentials',
        error: error.message,
      })
    }
  }
}
