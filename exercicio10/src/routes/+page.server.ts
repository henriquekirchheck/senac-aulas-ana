import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { formValidador } from '$lib';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const form = await superValidate(zod(formValidador));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({request}) => {
		const form = await superValidate(request, zod(formValidador))

		if (!form.valid) return message(form, "Invalid form")

		return message(form, "Cadastro realizado com sucesso")
	}
}