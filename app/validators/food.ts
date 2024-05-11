import vine from '@vinejs/vine'

export const createFoodValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string(),
    price: vine.number(),
    image: vine.string(),
    categoryId: vine.number(),
  })
)
