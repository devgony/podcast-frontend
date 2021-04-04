import samplePic from "../images/theDaily.jpeg";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import {
  getEpisodes,
  getEpisodesVariables,
} from "../__generated__/getEpisodes";
import { getPodcast, getPodcastVariables } from "../__generated__/getPodcast";
import { getPodcasts } from "../__generated__/getPodcasts";
import { GetPodcastInput } from "../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";

interface IPodcastParams {
  id: string;
}

export const GET_PODCAST = gql`
  query getPodcast($input: GetPodcastInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        title
        category {
          name
        }
        rating
        image
        intro
      }
    }
  }
`;

export const GET_EPISODES = gql`
  query getEpisodes($input: GetEpisodesInput!) {
    getEpisodes(input: $input) {
      ok
      error
      episodes {
        id
        title
        content
      }
    }
  }
`;

export const Episodes = () => {
  const params = useParams<IPodcastParams>();
  const { data: podcastData, loading: podcastLoading } = useQuery<
    getPodcast,
    getPodcastVariables
  >(GET_PODCAST, {
    variables: { input: { id: 1 } },
  });
  const { data: episodesData, loading: episodesLoading, error } = useQuery<
    getEpisodes,
    getEpisodesVariables
  >(GET_EPISODES, { variables: { input: { podcastId: +params.id } } });
  return (
    <div className="px-6 pt-4">
      <Helmet>
        <title>Episodes | Podcloud</title>
      </Helmet>
      {!podcastLoading && (
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-xl">
              {podcastData?.getPodcast.podcast?.title}
            </h1>
            <h2 className="text-sm text-gray-400">
              {podcastData?.getPodcast.podcast?.category?.name}
            </h2>
            <h3 className="text-sm mb-4">
              rating: {podcastData?.getPodcast.podcast?.rating}
            </h3>
            <div className="flex mb-4">
              <button className="border border-gray-300 rounded-full hover:border-podOrange cursor-pointer px-2 flex items-center mr-1">
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Subscribe
              </button>
              <button className="border border-gray-300 rounded-full hover:border-podOrange cursor-pointer px-2 flex items-center">
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
              </button>
            </div>
            <h4 className="text-sm mt-1">
              {podcastData?.getPodcast.podcast?.intro}
            </h4>
          </div>
          <div
            className="bg-cover bg-center p-20 m-2 mr-8 "
            style={{
              backgroundImage: `url(${podcastData?.getPodcast.podcast?.image})`,
            }}
          ></div>
        </div>
      )}
      <div className="flex flex-col divide-y divide-gray-300">
        {!episodesLoading &&
          episodesData?.getEpisodes.episodes?.map((episode) => (
            <div className="py-10" key={episode.id}>
              <h1 className="text-lg">{episode.title}</h1>
              <p className="text-sm max-w-lg truncate">{episode.content}</p>
              <div>⏯</div>
            </div>
          ))}
      </div>
    </div>
  );
};
