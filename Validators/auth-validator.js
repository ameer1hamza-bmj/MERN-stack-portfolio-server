const { z } = require('zod')


const signupValidation = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .trim()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, { message: 'Username must be at most 20 characters long' }),
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email format' })
        .min(3, { message: 'Email must be at least 3 characters long' })
        .max(25, { message: 'Email must be at most 25 characters long' })
        .refine(val => val.endsWith('.com'), {
            message: 'Email must end with .com'
        }),
    phone: z
        .string({ required_error: 'phone Number is required' })
        .trim()
        .min(11, { message: 'phone Number must be at least 11 characters long' })
        .max(20, { message: 'phone Number must be at most 20 characters long' })
        .regex(/^[0-9]{11}$/, {
            message: 'Phone number must be exactly 11 digits'
        }),
    password: z
        .string({ required_error: 'password is required' })
        .trim()
        .min(6, { message: 'password must be at least 6 characters long' })
        .max(1024, { message: 'password must be at most 1024 characters long' }),

})
const signinValidation = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email format' })
        .min(3, { message: 'Email must be at least 3 characters long' })
        .max(25, { message: 'Email must be at most 25 characters long' })
        .refine(val => val.endsWith('.com'), {
            message: 'Email must end with .com'
        }),
    password: z
        .string({ required_error: 'password is required' })
        .trim()
        .min(6, { message: 'password must be at least 6 characters long' })
        .max(1024, { message: 'password must be at most 1024 characters long' }),
})


module.exports = { signupValidation, signinValidation }