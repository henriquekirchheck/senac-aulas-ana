import {cpfValidator} from "$lib"

console.log(cpfValidator.safeParse("737.848.429-68").error)