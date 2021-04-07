import samplePic from "../images/theDaily.jpeg";
import { useMutation, useQuery } from "@apollo/client";
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
import { Heart } from "../icons/heart";
import { Share } from "../icons/share";
import { Add } from "../icons/add";
import { NewEpisode } from "./new-episode";
import { useState } from "react";
import { XCircle } from "../icons/x-circle";
import {
  subscribeToPodcast,
  subscribeToPodcastVariables,
} from "../__generated__/subscribeToPodcast";
import {
  didISubscribe,
  didISubscribeVariables,
} from "../__generated__/didISubscribe";

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

const SUBSCRIBE_TO_PODCAST = gql`
  mutation subscribeToPodcast($input: SubscribeToPodcastInput!) {
    subscribeToPodcast(input: $input) {
      ok
      error
    }
  }
`;

const DID_I_SUBSCRIBE = gql`
  query didISubscribe($input: DidISubscribeInput!) {
    didISubscribe(input: $input) {
      ok
      error
      userSubcribed
    }
  }
`;

export const Episodes = () => {
  const params = useParams<IPodcastParams>();
  const [isOpened, SetIsOpened] = useState(false);
  const { data: podcastData, loading: podcastLoading } = useQuery<
    getPodcast,
    getPodcastVariables
  >(GET_PODCAST, {
    variables: { input: { id: +params.id } },
  });
  const { data: episodesData, loading: episodesLoading, refetch } = useQuery<
    getEpisodes,
    getEpisodesVariables
  >(GET_EPISODES, { variables: { input: { podcastId: +params.id } } });
  const {
    loading: loadingSubscribed,
    data: dataSubscribed,
    refetch: refetchSubscribed,
  } = useQuery<didISubscribe, didISubscribeVariables>(DID_I_SUBSCRIBE, {
    variables: {
      input: {
        podcastId: +params.id,
      },
    },
  });
  const onCompleted = (data: subscribeToPodcast) => {
    if (data.subscribeToPodcast.ok) {
      refetchSubscribed();
    }
  };
  const [subscribeToPodcast, { loading, data }] = useMutation<
    subscribeToPodcast,
    subscribeToPodcastVariables
  >(SUBSCRIBE_TO_PODCAST, { onCompleted });
  const onClickSubscribe = () => {
    subscribeToPodcast({
      variables: {
        input: {
          podcastId: +params.id,
        },
      },
    });
  };
  // console.log(loadingSubscribed, dataSubscribed?.didISubscribe.userSubcribed);
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
              <button
                onClick={onClickSubscribe}
                className={`${
                  dataSubscribed?.didISubscribe.userSubcribed
                    ? "bg-gradient-to-b from-podGradStart to-podGradEnd text-white"
                    : ""
                } focus:outline-none border border-gray-300 rounded-full hover:border-podOrange cursor-pointer px-2 flex items-center mr-1`}
              >
                <Heart />
                Subscribe
              </button>
              <button className="focus:outline-none border border-gray-300 rounded-full hover:border-podOrange cursor-pointer px-2 flex items-center">
                <Share />
                Share
              </button>
              <button
                onClick={() => SetIsOpened((prev) => !prev)}
                className={`${
                  isOpened
                    ? "bg-gradient-to-b from-podGradStart to-podGradEnd text-white"
                    : ""
                } focus:outline-none border border-gray-300 rounded-full hover:border-podOrange cursor-pointer px-2 flex items-center`}
              >
                {isOpened ? <XCircle /> : <Add />}
                New Episode
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
      {isOpened && (
        <div className="max-w-lg mx-auto">
          <NewEpisode
            podcastId={+params.id}
            SetIsOpened={SetIsOpened}
            refetch={refetch}
          />
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
