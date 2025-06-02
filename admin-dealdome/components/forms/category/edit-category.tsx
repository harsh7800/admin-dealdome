"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader, Plus, Trash2 } from "lucide-react";
import { CategoryFormData, categorySchema } from "@/schemas/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryById, updateCategory } from "@/app/api/categories";
import { toast } from "sonner";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

const fieldTypes = [
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
] as const;

export default function EditCategoryForm() {
  const { id } = useParams();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id as string),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: categories?.name || "",
      desc: categories?.desc || "",
      banner: categories?.banner || null,
      icon: categories?.icon || null,
      image: categories?.image || null,
      mobileImage: categories?.mobileImage || null,
      bgColor: categories?.bgColor || null,
      parentID: categories?.parentID || null,
      fields: categories?.fields || [],
    },
  });
  console.log("errors: ", errors);

  useEffect(() => {
    if (categories) {
      reset({
        name: categories.name || "",
        desc: categories.desc || "",
        banner: categories.banner || null,
        icon: categories.icon || null,
        image: categories.image || null,
        mobileImage: categories.mobileImage || null,
        bgColor: categories.bgColor || null,
        parentID: categories.parentID || null,
        fields: categories.fields || [],
      });
    }
  }, [categories, reset]);

  const {
    fields: fieldArray,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: "fields",
  });

  // const {
  //   fields: brandArray,
  //   append: appendBrand,
  //   remove: removeBrand,
  // } = useFieldArray({
  //   control,
  //   name: "brands",
  // });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormData }) =>
      updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      redirect("/categories");
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    if (!id || Array.isArray(id)) {
      toast.error("Category ID is missing or invalid");
      return;
    }

    await mutateAsync({ id, data });
  };

  const addField = () => {
    appendField({
      name: "",
      type: "string",
      optionalArray: [],
      default: "",
      isOptional: false,
      secureInput: false,
      isSecure: false,
      requires: false,
      dependsOn: "",
      min: 0,
      max: 100,
    });
  };

  // const addBrand = () => {
  //   appendBrand("");
  // };

  if (isLoading) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Category Form</h1>
        <p className="text-muted-foreground mt-2">
          Create and configure a new category
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Category Details */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details for your category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter category name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="banner">Banner URL (Optional)</Label>
                <Input
                  id="banner"
                  {...register("banner")}
                  placeholder="https://example.com/banner.jpg"
                />
                {errors.banner && (
                  <p className="text-sm text-red-500">
                    {errors.banner.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon URL (Optional)</Label>
                <Input
                  id="icon"
                  {...register("icon")}
                  placeholder="https://example.com/icon.svg"
                />
                {errors.icon && (
                  <p className="text-sm text-red-500">{errors.icon.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileImage">Mobile Image URL (Optional)</Label>
                <Input
                  id="mobileImage"
                  {...register("mobileImage")}
                  placeholder="https://example.com/mobile-image.jpg"
                />
                {errors.mobileImage && (
                  <p className="text-sm text-red-500">
                    {errors.mobileImage.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Field Definitions
              <Button
                icon={<Plus className="w-4 h-4" />}
                label="Add Field"
                type="button"
                onClick={addField}
                size="sm"
              />
            </CardTitle>
            <CardDescription>
              Define the fields for your category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fieldArray.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Field {index + 1}</h4>
                  {fieldArray.length > 1 && (
                    <Button
                      type="button"
                      icon={<Trash2 className="w-4 h-4" />}
                      variant="outline"
                      size="sm"
                      onClick={() => removeField(index)}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Field Name</Label>
                    <Input
                      {...register(`fields.${index}.name`)}
                      placeholder="Field name"
                    />
                    {errors.fields?.[index]?.name && (
                      <p className="text-sm text-red-500">
                        {errors.fields[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Field Type</Label>
                    <Controller
                      name={`fields.${index}.type`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Default Value</Label>
                    <Input
                      {...register(`fields.${index}.default`)}
                      placeholder="Default value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Depends On</Label>
                    <Input
                      {...register(`fields.${index}.dependsOn`)}
                      placeholder="Field dependency"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Min Value</Label>
                    <Input
                      type="number"
                      {...register(`fields.${index}.min`, {
                        valueAsNumber: true,
                      })}
                      placeholder="0"
                    />
                    {errors.fields?.[index]?.min && (
                      <p className="text-sm text-red-500">
                        {errors.fields[index]?.min?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      {...register(`fields.${index}.max`, {
                        valueAsNumber: true,
                      })}
                      placeholder="100"
                    />
                    {errors.fields?.[index]?.max && (
                      <p className="text-sm text-red-500">
                        {errors.fields[index]?.max?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`fields.${index}.isOptional`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`optional-${index}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`optional-${index}`}>Optional</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`fields.${index}.secureInput`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`secure-input-${index}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`secure-input-${index}`}>
                      Secure Input
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`fields.${index}.isSecure`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`is-secure-${index}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`is-secure-${index}`}>Is Secure</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`fields.${index}.requires`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`requires-${index}`}
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`requires-${index}`}>Required</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`fields.${index}.singleImage`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`single-image-${index}`}
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`single-image-${index}`}>
                      Single Image
                    </Label>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Brands */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Brands
              <Button type="button" onClick={addBrand} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Brand
              </Button>
            </CardTitle>
            <CardDescription>
              Add brands associated with this category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {brandArray.map((brand, index) => (
              <div key={brand.id} className="flex items-center gap-2">
                <Input
                  {...register(`brands.${index}`)}
                  placeholder="Brand name"
                  className="flex-1"
                />
                {brandArray.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBrand(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card> */}

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            isLoading={isPending}
            disabled={isPending}
          >
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
}
