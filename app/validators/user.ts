import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string(),
    birthdate: vine.date({ formats: ['YYYY-MM-DD'] }),
    roleId: vine.number(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
    birthdate: vine.date({ formats: ['YYYY-MM-DD'] }),
    roleId: vine.number(),
  })
)
