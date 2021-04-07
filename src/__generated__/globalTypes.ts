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

export interface GetEpisodesInput {
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

export interface SearchPodcastsInput {
  searchKeyword: string;
}

export interface SubscribeToPodcastInput {
  podcastId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
