/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateEpisodeInput {
  title: string;
  content: string;
  audio: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  image?: string | null;
  intro?: string | null;
  categoryName: string;
}

export interface DidISubscribeInput {
  podcastId: number;
}

export interface EditProfileInput {
  password?: string | null;
}

export interface GetEpisodesInput {
  podcastId: number;
}

export interface GetMyRatingInput {
  podcastId: number;
}

export interface GetPodcastInput {
  id: number;
}

export interface GetPodcastsByCategoryInput {
  slug: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ReviewPodcastInput {
  rating: number;
  podcastId: number;
}

export interface SearchPodcastsInput {
  searchKeyword: string;
}

export interface SubscribeToPodcastInput {
  podcastId: number;
}

export interface UpdatePodcastInput {
  title?: string | null;
  image?: string | null;
  intro?: string | null;
  categoryName?: string | null;
  id: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
