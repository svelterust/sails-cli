import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";

const schema = z.object({
  value: z.number(),
  image: z.instanceof(File),
});

export const load: PageServerLoad = async () => {
  // Initialize form
  return {
    form: await superValidate(zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { value, image } = form.data;

    // Business logic
  },
};