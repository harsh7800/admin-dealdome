// Type for the Fields object (key-value pairs)

// Type for a single category
export interface Brand {
  _id?: string;
  name: string; // Unique identifier for the category
  description: string; // Description of the category
  logo: string; // URL for the icon representing the category
  isActive: boolean; // Flag indicating if the category is active
  categoryId: string; // ID of the category
}

// Type for the response containing a list of categories
export interface BrandResponse {
  statusCode: number; // HTTP status code
  timestamp: string; // Response timestamp
  data: {
    brands: Brand[];
  }; // Array of categories
}
