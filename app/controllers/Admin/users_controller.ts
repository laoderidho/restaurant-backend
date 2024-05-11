import type { HttpContext } from '@adonisjs/core/http'
import User from '../../models/user.js'
import { createUserValidator, updateUserValidator } from '../../validators/user.js'

export default class UsersController {
  async addUsers({ request, response }: HttpContext) {
    const data = request.all()

    const validator = await createUserValidator.validate(data)

    try {
      User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        birthdate: data.birthdate,
        roleId: data.roleId,
      })
      return response.json({
        message: 'User created successfully',
      })
    } catch (error) {
      return response.json({
        message: 'Error creating user',
        error: error.message,
      })
    }
  }

  async updateUsers({ params, response, request }: HttpContext) {
    const { id } = params

    const user = await User.find(id)

    if (!user) {
      return response.json({
        message: 'User not found',
      })
    }

    const validate = await updateUserValidator.validate(request.all())

    try {
      user.fullName = request.input('fullName')
      user.email = request.input('email')
      user.password = request.input('password')
      user.birthdate = request.input('birthdate')
      user.roleId = request.input('roleId')

      await user.save()

      return response.json({
        message: 'User updated successfully',
      })
    } catch (error) {
      return response.json({
        message: 'Error updating user',
        error: error.message,
      })
    }
  }

  async detailUsers({ params, response }: HttpContext) {
    const { id } = params

    const user = await User.find(id)

    if (!user) {
      return response.json({
        message: 'User not found',
      })
    }

    return response.json({
      message: 'User found',
      data: user,
    })
  }
}
