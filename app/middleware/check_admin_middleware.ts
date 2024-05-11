import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CheckAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const user = await ctx.auth.authenticate()
      console.log(user)
      if (user.roleId === 1) {
        return next()
      }
      return ctx.response.forbidden({
        message: 'Sorry You are not authorized',
      })
    } catch (error) {
      return ctx.response.unauthorized({
        message: 'Sorry You are not authenticated',
        error: error.message,
      })
    }
  }
}
