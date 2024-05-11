import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        fullName: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin',
        birthdate: new Date('1990-01-01'),
        roleId: 1
      }
    ])
  }
}
