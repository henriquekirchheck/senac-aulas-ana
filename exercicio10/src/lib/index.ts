// place files you want to import through the `$lib` alias in this folder.
import { z } from 'zod';
export const cpfValidator = z
	.string()
	.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/g, 'Formato do CPF Invalido')
	.refine((val) => {
		const digitsOr = val.match(/\d/g);
		const digits = digitsOr?.map((val) => parseInt(val));
		if (!digits || digits.length !== 11) return false;

		const digit1 =
			(digits
				.slice(0, 9)
				.map((val, index) => val * (index + 1))
				.reduce((prev, newVal) => prev + newVal, 0) %
				11) %
			10;
		if (digit1 !== digits[9]) return false;

		const digit2 =
			(digits
				.slice(0, 10)
				.map((val, index) => val * index)
				.reduce((prev, newVal) => prev + newVal, 0) %
				11) %
			10;
		if (digit2 !== digits[10]) return false;

		return true;
	}, 'CPF Invalido');

export const phoneValidator = z
	.string()
	.regex(/^\(\d{2}\) \d{4,5}-\d{4}$/g, 'Formato do Telefone Invalido');
export const cepValidator = z.string().regex(/^\d{5}-\d{3}$/g, 'Formato de CEP Invalido');

export const formValidador = z.object({
	name: z.string().nonempty(),
	cpf: cpfValidator,
	email: z.string().email(),
	birthDate: z.date().max(new Date()),
	phone: phoneValidator,
	cep: cepValidator,
	address: z.string().nonempty(),
	neighborhood: z.string().nonempty(),
	city: z.string().nonempty(),
	state: z.string().nonempty(),
	extra: z.string(),
	number: z.string().nonempty(),
});
