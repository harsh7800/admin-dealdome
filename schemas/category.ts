import { z } from "zod";

// Zod schema for Field
const fieldSchema = z
  .object({
    name: z.string().min(1, "Field name is required"),
    type: z.enum([
      "searchableDropdown",
      "dropdown",
      "selectableTabs",
      "bool",
      "int",
      "number",
      "string",
      "file",
      "location",
      "[]string",
      "[]number",
      "text",
      "checkboxes",
      "image",
      "selection",
      "textArea",
      "color",
      "testArea",
    ]),
    default: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
    optionalArray: z.array(z.string()).optional(),
    optionalMapOfArray: z.array(z.string()).optional(),
    isOptional: z.boolean().optional(),
    secureInput: z.boolean().optional(),
    isSecure: z.boolean().optional(),
    requires: z.boolean().optional().nullable(),
    dependsOn: z.string().optional().nullable(),
    singleImage: z.boolean().optional(),
    min: z.number().transform((val) => (val === null ? 0 : val)),
    max: z.number().transform((val) => (val === null ? 100 : val)),
  })
  .refine((data) => data.min <= data.max, {
    message: "Min value must be less than or equal to max value",
    path: ["min"],
  });

// Zod schema for Category
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  desc: z.string().min(1, "Description is required"),

  banner: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobileImage: z.string().optional().nullable(),
  bgColor: z.string().optional().nullable(),
  parentID: z.string().optional().nullable(),
  fields: z.array(fieldSchema),
  //   brands: z.array(z.string()),
});

// export type Brand = z.infer<typeof categorySchema.shape.brands.element>;

export type CategoryFormData = z.infer<typeof categorySchema>;
