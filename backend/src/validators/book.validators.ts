import joi from 'joi'

export const userSchema = joi.object({
    title: joi.string().min(2).required(),
    content: joi.string().min(2).required(),
})