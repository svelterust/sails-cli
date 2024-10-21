#!/usr/bin/env bun

// Get args from command line
const args = process.argv.slice(2);
if (args.length == 0) {
  console.log("Usage: sails form <fields>");
  process.exit(1);
} else {
  if (args[0] == "form") {
    form(args.slice(1));
  } else {
    console.log("Unknown command:", args[0]);
    process.exit(1);
  }
}

// Generate new form shadcn form from fields
type Field = { name: string; type: string };

function renderInput({ name, type }: Field): string {
  if (type == "textarea") {
    return `<Textarea {...attrs} bind:value={$formData.${name}} rows={4} />`;
  } else {
    return `<Input {...attrs} bind:value={$formData.${name}} type="${type}" />`;
  }
}

function renderField({ name, type }: Field): string {
  return `  <Form.Field {form} name="${name}">
    <Form.Control let:attrs>
      <Form.Label>${name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
      ${renderInput({ name, type })}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>`;
}

function renderHeader(renderedFields: string): string {
  let output = "";
  if (renderedFields.includes("Input")) {
    output += `  import { Input } from "$ui/input";\n`;
  }
  if (renderedFields.includes("Textarea")) {
    output += `  import { Textarea } from "$ui/textarea";\n`;
  }
  return output.trimEnd();
}

function form(args: string[]) {
  // Parse fields
  const fields = args.map(arg => {
    const [name, type] = arg.split(':');
    return { name, type };
  });
  const renderedFields = fields.map(renderField).join("\n\n");
  const renderedHeader = renderHeader(renderedFields);

  // Generate +page.svelte
  const pageSvelte = `<script lang="ts">
  import * as Form from "$ui/form";
${renderedHeader}
  import { superForm } from "sveltekit-superforms";
  import Loader from "lucide-svelte/icons/loader";

  // Props
  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, delayed, submitting, enhance } = form;
</script>

<form class="grid gap-2" method="post" use:enhance>
${renderedFields}

  <Form.Button disabled={$submitting}>
    {#if $delayed}
      <Loader class="animate-spin" />
    {:else}
      Login
    {/if}
  </Form.Button>
</form>`;
  console.log(pageSvelte);
}
