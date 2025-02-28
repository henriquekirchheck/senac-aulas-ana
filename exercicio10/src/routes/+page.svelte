<script lang="ts">
  import type { PageData } from "./$types";
  import { dateProxy, superForm } from "sveltekit-superforms/client";
  import SuperDebug from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { formValidador } from "$lib";
  import { imask } from "@imask/svelte";

  let { data }: { data: PageData } = $props();

  const { form, constraints, errors, enhance, message } = superForm(data.form, {
    validators: zod(formValidador),
  });

  const proxyBirthDate = dateProxy(form, "birthDate", { format: "date" });

  const cpfMask = "000.000.000-00";
  const phoneMask = "(00) [0]0000-0000";
  const cepMask = "00000-000";
</script>

<main class="container">
  <article>
    <header>
      <h1>Cadastro</h1>
    </header>
    <form method="POST" use:enhance>
      <label>
        Nome:
        <input
          type="text"
          name="name"
          bind:value={$form.name}
          {...$constraints.name}
          aria-invalid={$errors.name ? "true" : undefined}
        />
        {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
      </label>
      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          bind:value={$form.cpf}
          {...$constraints.cpf}
          aria-invalid={$errors.cpf ? "true" : undefined}
          use:imask={{
            mask: cpfMask,
            lazy: false,
          }}
        />
        {#if $errors.cpf}<span class="invalid">{$errors.cpf}</span>{/if}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          bind:value={$form.email}
          {...$constraints.email}
          aria-invalid={$errors.email ? "true" : undefined}
        />
        {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
      </label>
      <label>
        Data de Nascimento:
        <input
          type="date"
          name="birthDate"
          bind:value={$proxyBirthDate}
          {...$constraints.birthDate}
          aria-invalid={$errors.birthDate ? "true" : undefined}
          min={$constraints.birthDate?.min?.toString().slice(0, 10)}
          max={$constraints.birthDate?.max?.toString().slice(0, 10)}
        />
        {#if $errors.birthDate}<span class="invalid">{$errors.birthDate}</span>{/if}
      </label>
      <label>
        Telefone:
        <input
          type="text"
          name="phone"
          bind:value={$form.phone}
          {...$constraints.phone}
          aria-invalid={$errors.phone ? "true" : undefined}
          use:imask={{
            mask: phoneMask,
            lazy: false,
          }}
        />
        {#if $errors.phone}<span class="invalid">{$errors.phone}</span>{/if}
      </label>
      <label>
        CEP:
        <input
          type="text"
          name="cep"
          bind:value={$form.cep}
          {...$constraints.cep}
          aria-invalid={$errors.cep ? "true" : undefined}
          use:imask={{
            mask: cepMask,
            lazy: false,
          }}
        />
        {#if $errors.cep}<span class="invalid">{$errors.cep}</span>{/if}
      </label>
      <label>
        Endereço:
        <input
          type="text"
          name="address"
          bind:value={$form.address}
          {...$constraints.address}
          aria-invalid={$errors.address ? "true" : undefined}
        />
        {#if $errors.address}<span class="invalid">{$errors.address}</span>{/if}
      </label>
      <label>
        Bairo:
        <input
          type="text"
          name="neighborhood"
          bind:value={$form.neighborhood}
          {...$constraints.neighborhood}
          aria-invalid={$errors.neighborhood ? "true" : undefined}
        />
        {#if $errors.neighborhood}<span class="invalid">{$errors.neighborhood}</span>{/if}
      </label>
      <label>
        Cidade:
        <input
          type="text"
          name="city"
          bind:value={$form.city}
          {...$constraints.city}
          aria-invalid={$errors.city ? "true" : undefined}
        />
        {#if $errors.city}<span class="invalid">{$errors.city}</span>{/if}
      </label>
      <label>
        Estado:
        <input
          type="text"
          name="state"
          bind:value={$form.state}
          {...$constraints.state}
          aria-invalid={$errors.state ? "true" : undefined}
        />
        {#if $errors.state}<span class="invalid">{$errors.state}</span>{/if}
      </label>
      <label>
        Complemento:
        <input
          type="text"
          name="extra"
          bind:value={$form.extra}
          {...$constraints.extra}
          aria-invalid={$errors.extra ? "true" : undefined}
        />
        {#if $errors.extra}<span class="invalid">{$errors.extra}</span>{/if}
      </label>
      <label>
        Numero:
        <input
          type="text"
          name="number"
          bind:value={$form.number}
          {...$constraints.number}
          aria-invalid={$errors.number ? "true" : undefined}
        />
        {#if $errors.number}<span class="invalid">{$errors.number}</span>{/if}
      </label>
      <button>Cadastrar</button>
    </form>
    <footer>{$message}</footer>
  </article>
</main>

<SuperDebug data={$form} />

<style>
  .invalid {
    color: red;
  }
</style>
