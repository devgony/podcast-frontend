/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deletePodcast
// ====================================================

export interface deletePodcast_deletePodcast {
  __typename: "DeletePodcastOutput";
  ok: boolean;
  error: string | null;
}

export interface deletePodcast {
  deletePodcast: deletePodcast_deletePodcast;
}

export interface deletePodcastVariables {
  input: DeletePodcastInput;
}
