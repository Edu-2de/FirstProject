import { defineCollection, z } from "astro:content";

const feelingsCollection = defineCollection({
  type: "content", // É conteúdo baseado em arquivo (Markdown)
  schema: z.object({
    title: z.string(),
    description: z.string(),
    color: z.string(), // Ex: 'text-yellow-500'
    bgColor: z.string(), // Ex: 'bg-yellow-50'
  }),
});

export const collections = {
  feelings: feelingsCollection,
};
