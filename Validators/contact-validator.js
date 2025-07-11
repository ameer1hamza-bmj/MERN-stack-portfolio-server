const { z } = require('zod')


const contactValidation = z.object({
  username: z.string().min(3),
  email: z.string().email().refine(val => val.endsWith('.com')),
  message: z.string().min(6)
});

module.exports = contactValidation;