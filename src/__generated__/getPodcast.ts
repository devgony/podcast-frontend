/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcast
// ====================================================

export interface getPodcast_getPodcast_podcast_category {
  __typename: "Category";
  name: string;
}

export interface getPodcast_getPodcast_podcast_owner {
  __typename: "User";
  id: number;
}

export interface getPodcast_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getPodcast_getPodcast_podcast_category | null;
  rating: number;
  image: string | null;
  intro: string | null;
  owner: getPodcast_getPodcast_podcast_owner;
}

export interface getPodcast_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcast_getPodcast_podcast | null;
}

export interface getPodcast {
  getPodcast: getPodcast_getPodcast;
}

export interface getPodcastVariables {
  input: GetPodcastInput;
}
