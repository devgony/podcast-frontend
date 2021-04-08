/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: reviewPodcast
// ====================================================

export interface reviewPodcast_reviewPodcast {
  __typename: "ReviewPodcastOutput";
  ok: boolean;
  error: string | null;
}

export interface reviewPodcast {
  reviewPodcast: reviewPodcast_reviewPodcast;
}

export interface reviewPodcastVariables {
  input: ReviewPodcastInput;
}
