/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcsat
// ====================================================

export interface getPodcsat_getPodcast_podcast {
  __typename: "Podcast";
  title: string;
  category: string;
  rating: number;
}

export interface getPodcsat_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcsat_getPodcast_podcast | null;
}

export interface getPodcsat {
  getPodcast: getPodcsat_getPodcast;
}

export interface getPodcsatVariables {
  input: GetPodcastInput;
}
