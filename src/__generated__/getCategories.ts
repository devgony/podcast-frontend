/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategories
// ====================================================

export interface getCategories_getCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface getCategories_getCategories {
  __typename: "GetCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: getCategories_getCategories_categories[];
}

export interface getCategories {
  getCategories: getCategories_getCategories;
}
