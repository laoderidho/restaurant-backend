/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('../app/controllers/Admin/users_controller.js')
const FoodAdminsController = () => import('#controllers/Admin/food_admins_controller')

import { middleware } from './kernel.js'

router
  .group(() => {
    router.post('/login', [AuthController, 'login']).use(middleware.guest())
  })
  .prefix('auth')

router
  .group(() => {
    router
      .group(() => {
        router.post('/add', [UsersController, 'addUsers'])
        router.post('/update/:id/', [UsersController, 'updateUsers'])
        router.get('/:id', [UsersController, 'detailUsers'])
      })
      .prefix('users')

    router
      .group(() => {
        router.post('/add', [FoodAdminsController, 'addCategory'])
        router.post('/update/:id', [FoodAdminsController, 'updateCategory'])
        router.post('/delete/:id', [FoodAdminsController, 'deleteCategory'])
        router.get('/', [FoodAdminsController, 'getCategories'])
        router.get('/:id', [FoodAdminsController, 'getCategory'])
      })
      .prefix('categories')
  })
  .prefix('admin')
  .use([middleware.auth(), middleware.checkAdmin()])
