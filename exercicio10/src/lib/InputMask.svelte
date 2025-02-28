<script lang="ts">
  import IMaskSvelte from "@imask/svelte";
  import IMask, { type FactoryArg,  } from "imask";
  import { onMount } from "svelte";
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

  let maskRef: IMask;
  let input: HTMLInputElement;

  $effect(() => {
    if (maskRef)
  });

  onMount(() => {
    maskRef = IMask(input, imask)
    setValue(value)
  })

  function getValue() {
    if (unmask === "typed") return maskRef.typedValue;
    if (unmask) return maskRef.unmaskedValue;
    return maskRef.value;
  }

  function setValue(v) {
    v = v == null ? "" : v;
    if (unmask === "typed") maskRef.typedValue = v;
    else if (unmask) maskRef.unmaskedValue = v;
    else maskRef.value = v;
  }

  function writeValue(v) {
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

<input {...props} bind:this={input}/>
