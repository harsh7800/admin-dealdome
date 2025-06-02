import { Brand } from "./brand";

export interface CategoriesApiResponse {
  statusCode: number;
  timestamp: string;
  data: {
    categories: Category[];
    total: number;
  };
}

export interface Category {
  _id: string;
  name: string;
  desc: string;
  childIDs: string[];
  children: Category[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  banner: string;
  icon: string;
  image: string;
  parentID?: string;
  fields: Field[];
  brands: Brand[];
  bgColor?: string;
  mobileImage?: string;
}

export interface Field {
  name: string;
  type:
    | "searchableDropdown"
    | "dropdown"
    | "selectableTabs"
    | "bool"
    | "int"
    | "number"
    | "string"
    | "file"
    | "location"
    | "[]string"
    | "[]number"
    | "text"
    | "checkboxes"
    | "image"
    | "selection"
    | "textArea"
    | "color"
    | "testArea";
  defaultValue: string | number | string[] | undefined;
  optionalArray?: string[];
  optionalMapOfArray?: string[];
  description?: string;
  isOptional: boolean;
  secureInput: boolean;
  isSecure: boolean;
  requires: boolean;
  dependsOn: string;
  singleImage?: boolean;
  min: number;
  max: number;
}

export interface CategoryCreateBody {
  name: string;
  desc: string;
  banner?: string | null;
  icon?: string | null;
  image?: string | null;
  mobileImage?: string | null;
  bgColor?: string | null;
  fields: Field[];
  brands: string[];
  parentID?: string; // Optional for root categories
}
