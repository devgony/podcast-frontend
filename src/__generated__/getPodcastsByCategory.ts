/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastsByCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastsByCategory
// ====================================================

export interface getPodcastsByCategory_getPodcastsByCategory_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number;
  image: string | null;
}

export interface getPodcastsByCategory_getPodcastsByCategory {
  __typename: "GetPodcastsByCategoryOutput";
  ok: boolean;
  error: string | null;
  podcasts: getPodcastsByCategory_getPodcastsByCategory_podcasts[];
}

export interface getPodcastsByCategory {
  getPodcastsByCategory: getPodcastsByCategory_getPodcastsByCategory;
}

export interface getPodcastsByCategoryVariables {
  input: GetPodcastsByCategoryInput;
}
