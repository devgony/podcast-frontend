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

export interface CategoryInputType {
  name: string;
  converImg?: string | null;
  slug: string;
  podcasts: PodcastInputType[];
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateEpisodeInput {
  title: string;
  content: string;
  audio?: string | null;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  image?: string | null;
  intro?: string | null;
  categoryName: string;
}

export interface DeleteEpisodeInput {
  id: number;
}

export interface DeletePodcastInput {
  id: number;
}

export interface DidISubscribeInput {
  podcastId: number;
}

export interface EditProfileInput {
  password?: string | null;
}

export interface EpdisodeInputType {
  title: string;
  content: string;
  audio?: string | null;
  podcast: PodcastInputType;
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

export interface PodcastInputType {
  title: string;
  category?: CategoryInputType | null;
  owner: UserInputType;
  rating: number;
  image?: string | null;
  intro?: string | null;
  episodes: EpdisodeInputType[];
  likedBy: UserInputType[];
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

export interface UpdateEpisodeInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  title?: string | null;
  content?: string | null;
  audio?: string | null;
  podcast?: PodcastInputType | null;
}

export interface UpdatePodcastInput {
  title?: string | null;
  image?: string | null;
  intro?: string | null;
  categoryName?: string | null;
  id: number;
}

export interface UserInputType {
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  subscribedPodcasts: PodcastInputType[];
  playedEpisodes: EpdisodeInputType[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
