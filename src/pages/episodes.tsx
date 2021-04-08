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
import { PlayIcon } from "../icons/play-icon";
import { Cloud } from "../icons/cloud";
import {
  reviewPodcast,
  reviewPodcastVariables,
} from "../__generated__/reviewPodcast";

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
        audio
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

const REVIEW_PODCAST = gql`
  mutation reviewPodcast($input: ReviewPodcastInput!) {
    reviewPodcast(input: $input) {
      ok
      error
    }
  }
`;

export const Episodes = ({ setActive, setSource }: any) => {
  const [clouds, setClouds] = useState(Array(5).fill(false));
  const review = (target: number) => {
    setClouds((clouds) => clouds.map((_, i) => (i < target ? true : false)));
    reviewPodcast({
      variables: {
        input: {
          podcastId: +params.id,
          rating: target,
        },
      },
    });
  };
  const params = useParams<IPodcastParams>();
  const [isOpened, SetIsOpened] = useState(false);
  const {
    data: podcastData,
    loading: podcastLoading,
    refetch: refetchPodcast,
  } = useQuery<getPodcast, getPodcastVariables>(GET_PODCAST, {
    fetchPolicy: "no-cache",
    variables: { input: { id: +params.id } },
  });
  const { data: episodesData, loading: episodesLoading, refetch } = useQuery<
    getEpisodes,
    getEpisodesVariables
  >(GET_EPISODES, {
    fetchPolicy: "no-cache",
    variables: { input: { podcastId: +params.id } },
  });
  const {
    loading: loadingSubscribed,
    data: dataSubscribed,
    refetch: refetchSubscribed,
  } = useQuery<didISubscribe, didISubscribeVariables>(DID_I_SUBSCRIBE, {
    fetchPolicy: "no-cache",
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
  const onCompletedReview = () => {
    refetchPodcast();
  };
  const [
    reviewPodcast,
    { loading: loadingReview, data: dataReview },
  ] = useMutation<reviewPodcast, reviewPodcastVariables>(REVIEW_PODCAST, {
    onCompleted: onCompletedReview,
  });
  console.log(podcastData?.getPodcast.podcast);
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
            <div className="flex items-center py-4">
              <h3 className="text-2xl">
                Averge: {podcastData?.getPodcast.podcast?.rating}
                {Number.isInteger(podcastData?.getPodcast.podcast?.rating)
                  ? ".0"
                  : null}
              </h3>
              <div className="ml-4 flex">
                {clouds.map((cloud, i) => (
                  <Cloud
                    key={i + 1}
                    active={cloud}
                    onClick={() => review(i + 1)}
                  />
                ))}
              </div>
              <h1 className="text-podOrange text-2xl ml-2">
                {clouds.filter((cloud) => cloud).length}.0
              </h1>
            </div>
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
      <div>comments</div>
      <div className="flex flex-col divide-y divide-gray-300">
        {!episodesLoading &&
          episodesData?.getEpisodes.episodes?.map((episode) => (
            <div className="py-10" key={episode.id}>
              <h1 className="text-lg">{episode.title}</h1>
              <p className="text-sm max-w-lg truncate">{episode.content}</p>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setActive(true);
                  setSource(episode.audio);
                }}
              >
                <PlayIcon />
              </div>
              {/* <audio controls className="w-full text-red-500">
                <source className="" src={episode.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio> */}
            </div>
          ))}
      </div>
    </div>
  );
};
