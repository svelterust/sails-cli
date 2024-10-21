<script lang="ts">
  import * as Form from "$ui/form";
  import { Input } from "$ui/input";
  import { superForm } from "sveltekit-superforms";
  import Loader from "lucide-svelte/icons/loader";

  // Props
  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, delayed, submitting, enhance } = form;
</script>

<form class="grid gap-2" method="post" enctype="multipart/form-data" use:enhance>
  <Form.Field {form} name="value">
    <Form.Control let:attrs>
      <Form.Label>Value</Form.Label>
      <Input {...attrs} bind:value={$formData.value} type="number" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="image">
    <Form.Control let:attrs>
      <Form.Label>Image</Form.Label>
      <Input {...attrs} bind:value={$formData.image} type="file" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting}>
    {#if $delayed}
      <Loader class="animate-spin" />
    {:else}
      Submit
    {/if}
  </Form.Button>
</form>