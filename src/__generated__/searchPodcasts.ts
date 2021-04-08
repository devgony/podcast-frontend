/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcasts
// ====================================================

export interface searchPodcasts_searchPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface searchPodcasts_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: searchPodcasts_searchPodcasts_podcasts_category | null;
  rating: number;
  image: string | null;
  intro: string | null;
}

export interface searchPodcasts_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  count: number;
  podcasts: searchPodcasts_searchPodcasts_podcasts[];
}

export interface searchPodcasts {
  searchPodcasts: searchPodcasts_searchPodcasts;
}

export interface searchPodcastsVariables {
  input: SearchPodcastsInput;
}
