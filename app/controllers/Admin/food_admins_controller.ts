import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { createCategoryValidator } from '#validators/category'
import { createFoodValidator } from '#validators/food'
import Food from '#models/food'

export default class FoodAdminsController {
  // foods
  async addFood({ request, response }: HttpContext) {
    const data = request.all()

    const validator = await createFoodValidator.validate(data)

    try {
      const food = new Food()
      food.name = data.name
      food.description = data.description
      food.price = data.price
      food.image = data.image
      food.categoryId = data.categoryId
      await food.save()

      return response.json({
        message: 'Food added successfully',
        data: food,
      })
    } catch (error) {
      return response.status(400).json({
        message: `Failed to add food: ${error.message}`,
      })
    }
  }

  // category
  async addCategory({ request, response }: HttpContext) {
    const { name } = request.body()

    const validator = await createCategoryValidator.validate({ name })

    const category = new Category()
    category.name = name
    await category.save()

    return response.json({
      message: 'Category added successfully',
      data: category,
    })
  }

  async updateCategory({ request, response, params }: HttpContext) {
    const { name } = request.body()
    const { id } = params

    await createCategoryValidator.validate({ name })

    const category = await Category.findOrFail(id)
    category.name = name
    await category.save()

    return response.json({
      message: 'Category updated successfully',
      data: category,
    })
  }

  async deleteCategory({ response, params }: HttpContext) {
    const { id } = params

    const category = await Category.findOrFail(id)
    await category.delete()

    return response.json({
      message: 'Category deleted successfully',
    })
  }

  async getCategories({ response }: HttpContext) {
    const categories = await Category.all()

    return response.json({
      data: categories,
    })
  }

  async getCategory({ response, params }: HttpContext) {
    const { id } = params

    const category = await Category.findOrFail(id)

    return response.json({
      data: category,
    })
  }
}
