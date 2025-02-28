<script lang="ts">
  import IMask, { type InputMask, type FactoryArg,  } from "imask";
  import { onDestroy, onMount, tick } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  let {
    imask,
    unmask,
    value = $bindable(),
    ...props
  }: HTMLInputAttributes & {
    imask: FactoryArg;
    unmask?: "typed" | "untyped";
  } = $props();

  let maskRef: InputMask<FactoryArg> | undefined;
  let input: HTMLInputElement;
  // https://svelte.dev/playground/b590cddb69f4452b8f7704bd1e721e76?version=5.20.5
  $effect(() => {
    if (maskRef) {
        writeValue(value);
        tick().then(() => value = getValue());
    }
  });

  onMount(() => {
    maskRef = IMask(input, imask)
    setValue(value)
  })

  onDestroy(() => {
    if (maskRef) maskRef.destroy();
    maskRef = undefined;
  });

  function getValue() {
    if (!maskRef) return;
    if (unmask === "typed") return maskRef.typedValue;
    if (unmask) return maskRef.unmaskedValue;
    return maskRef.value;
  }

  function setValue(v:string) {
    if (!maskRef) return;

    v = v == null ? "" : v;
    if (unmask === "typed") maskRef.typedValue = v;
    else if (unmask) maskRef.unmaskedValue = v;
    else maskRef.value = v;
  }

  function writeValue(v:string) {
    if (!maskRef) return;

    if (
      getValue() !== v ||
      // handle cases like Number('') === 0,
      // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
      (typeof v !== "string" && value === "" && !maskRef.el.isActive)
    ) {
      setValue(v);
    }
  }
</script>

<input {...props} bind:this={input} />
