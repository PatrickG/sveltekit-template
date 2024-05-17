import { z } from 'zod';

export const userSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	//terms: z.boolean({ required_error: 'You must accept the terms and privacy policy' }),
	role: z
		.enum(['USER', 'ADMIN'], { required_error: 'You must have a role' })
		.default('USER'),
	emailVerified: z.boolean().optional(),
	terms: z.literal<boolean>(true, {
		errorMap: () => ({ message: "You must accept the terms & privacy policy" }),
	}),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

export const userUpdateSchema = userSchema.pick({
	name: true,
    email: true
})
export type UserUpdateSchema = typeof userUpdateSchema;

export type UserSchema = typeof userSchema;

export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

export type UserUpdatePasswordSchema = typeof userUpdatePasswordSchema;

export const signUpSchema = userSchema.pick({
	name: true,
	email: true,
	password: true,
	terms: true
});
export type SignUpSchema = typeof signUpSchema;

export const logInSchema = userSchema.pick({
	email: true,
	password: true
});

export type LogInSchema = typeof logInSchema;

export const resetPasswordSchema = userSchema.pick({ email: true });
export type ResetPasswordSchema = typeof resetPasswordSchema;
