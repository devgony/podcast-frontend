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

interface IPodcastParams {
  id: string;
}

const GET_PODCAST = gql`
  query getPodcast($input: GetPodcastInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        title
        category
        rating
        image
      }
    }
  }
`;

const GET_EPISODES = gql`
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

export const Podcast = () => {
  const params = useParams<IPodcastParams>();
  const { data: episodesData, loading: episodesLoading } = useQuery<
    getEpisodes,
    getEpisodesVariables
  >(GET_EPISODES, { variables: { input: { podcastId: +params.id } } });
  const { data: podcastData, loading: podcastLoading } = useQuery<
    getPodcast,
    getPodcastVariables
  >(GET_PODCAST, {
    variables: { input: { id: +params.id } },
  });
  return (
    <div className="px-6">
      {!podcastLoading && (
        <div className="flex justify-between items-center">
          <div>
            <h1>{podcastData?.getPodcast.podcast?.title}</h1>
            <h2>{podcastData?.getPodcast.podcast?.category}</h2>
            <h3>rating: {podcastData?.getPodcast.podcast?.rating}</h3>
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
