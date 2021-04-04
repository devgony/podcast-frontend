/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastsByCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastsByCategory
// ====================================================

export interface getPodcastsByCategory_getPodcastsByCategory_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface getPodcastsByCategory_getPodcastsByCategory_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getPodcastsByCategory_getPodcastsByCategory_podcasts_category | null;
  rating: number;
  image: string | null;
}

export interface getPodcastsByCategory_getPodcastsByCategory {
  __typename: "GetPodcastsByCategoryOutput";
  ok: boolean;
  error: string | null;
  podcasts: getPodcastsByCategory_getPodcastsByCategory_podcasts[] | null;
}

export interface getPodcastsByCategory {
  getPodcastsByCategory: getPodcastsByCategory_getPodcastsByCategory;
}

export interface getPodcastsByCategoryVariables {
  input: GetPodcastsByCategoryInput;
}
