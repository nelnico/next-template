import { z } from "zod";

export const personSearchSchema = z.object({
  query: z.string().optional(),
  genderId: z.string().optional(),
  countryIds: z.array(z.string()),
});

export type PersonSearchFormData = z.infer<typeof personSearchSchema>;
