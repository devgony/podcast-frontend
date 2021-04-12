import { CopyToClipboard } from "react-copy-to-clipboard";
import samplePic from "../images/theDaily.jpeg";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory, useParams } from "react-router";
import {
  getEpisodes,
  getEpisodesVariables,
} from "../__generated__/getEpisodes";
import { getPodcast, getPodcastVariables } from "../__generated__/getPodcast";
import { getPodcasts } from "../__generated__/getPodcasts";
import { GetPodcastInput, UserRole } from "../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { Heart } from "../icons/heart";
import { Share } from "../icons/share";
import { Add } from "../icons/add";
import { EpisodeForm } from "./episode-form";
import { useEffect, useState } from "react";
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
import {
  getMyRating,
  getMyRatingVariables,
} from "../__generated__/getMyRating";
import { RoundedButton } from "../components/rounded-button";
import {
  updatePodcast,
  updatePodcastVariables,
} from "../__generated__/updatePodcast";
import {
  deletePodcast,
  deletePodcastVariables,
} from "../__generated__/deletePodcast";
import {
  updateEpisode,
  updateEpisodeVariables,
} from "../__generated__/updateEpisode";
import {
  deleteEpisode,
  deleteEpisodeVariables,
} from "../__generated__/deleteEpisode";
import { useMe } from "../hooks/use-me";

interface IPodcastParams {
  id: string;
}

export const GET_PODCAST = gql`
  query getPodcast($input: GetPodcastInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        id
        title
        category {
          name
        }
        rating
        image
        intro
        owner {
          id
        }
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

const GET_MY_RATING = gql`
  query getMyRating($input: GetMyRatingInput!) {
    getMyRating(input: $input) {
      ok
      error
      rating
    }
  }
`;

const DELETE_PODCAST = gql`
  mutation deletePodcast($input: DeletePodcastInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

const DELETE_EPISODE = gql`
  mutation deleteEpisode($input: DeleteEpisodeInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const Episodes = ({ setActive, setSource }: any) => {
  const me = useMe();
  const history = useHistory();
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
  const [isOpened, setIsOpened] = useState(false);
  const [newActive, setNewActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [updateMode, SetUpdateMode] = useState(false);
  const [targetEpisode, SetTargetEpisode] = useState({
    title: "",
    content: "",
  });
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
  const [
    didISubscribe,
    {
      loading: loadingSubscribed,
      data: dataSubscribed,
      refetch: refetchSubscribed,
    },
  ] = useLazyQuery<didISubscribe, didISubscribeVariables>(DID_I_SUBSCRIBE, {
    fetchPolicy: "no-cache",
    variables: {
      input: {
        podcastId: +params.id,
      },
    },
  });
  const onCompleted = (data: subscribeToPodcast) => {
    if (data.subscribeToPodcast.ok && refetchSubscribed) {
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
    if (!loadingGetMyRating && refetchReview) refetchReview();
  };
  const [
    reviewPodcast,
    { loading: loadingReview, data: dataReview },
  ] = useMutation<reviewPodcast, reviewPodcastVariables>(REVIEW_PODCAST, {
    onCompleted: onCompletedReview,
  });
  const [
    getMyRating,
    {
      data: dataGetMyRating,
      loading: loadingGetMyRating,
      refetch: refetchReview,
    },
  ] = useLazyQuery<getMyRating, getMyRatingVariables>(GET_MY_RATING, {
    fetchPolicy: "no-cache",
    variables: {
      input: {
        podcastId: +params.id,
      },
    },
  });

  const [deletePodcast] = useMutation<deletePodcast, deletePodcastVariables>(
    DELETE_PODCAST,
    {
      onCompleted: () => {
        history.push("/");
      },
    }
  );

  const [deleteEpisode] = useMutation<deleteEpisode, deleteEpisodeVariables>(
    DELETE_EPISODE,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const isHostOwner =
    me.data?.me.id === podcastData?.getPodcast.podcast?.owner.id &&
    me.data?.me.role === UserRole.Host;

  useEffect(() => {
    if (dataGetMyRating?.getMyRating.rating && !isHostOwner) {
      review(dataGetMyRating?.getMyRating.rating);
    }
  }, [dataGetMyRating?.getMyRating.rating]);

  useEffect(() => {
    // if (me.data?.me.role === UserRole.Listener) {
    if (!isHostOwner) {
      getMyRating();
      didISubscribe();
    }
  }, [me]);
  return (
    <div className="px-6 pt-4">
      <Helmet>
        <title>Episodes | Podcloud</title>
      </Helmet>
      {!podcastLoading && (
        <div className="flex justify-between items-center">
          <div className="">
            <div className="flex items-center">
              <h1 className="text-2xl">
                {podcastData?.getPodcast.podcast?.title}
              </h1>
              {isHostOwner && (
                <RoundedButton
                  className="ml-1 "
                  content="Edit"
                  onClick={() => {
                    history.push(`/update-podcast/${params.id}`);
                  }}
                />
              )}
              {isHostOwner && (
                <RoundedButton
                  className="ml-1 "
                  content="Delete"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure to Delete "${podcastData?.getPodcast.podcast?.title}"?`
                      )
                    ) {
                      deletePodcast({
                        variables: { input: { id: +params.id } },
                      });
                    }
                  }}
                />
              )}
            </div>
            <h2 className="text-sm text-gray-400">
              {podcastData?.getPodcast.podcast?.category?.name}
            </h2>
            <div className="flex items-center py-4">
              <h3 className="text-xl">
                Averge Rating: {podcastData?.getPodcast.podcast?.rating}
                {Number.isInteger(podcastData?.getPodcast.podcast?.rating)
                  ? ".0"
                  : null}
              </h3>
              {!isHostOwner && (
                <div className="flex items-center">
                  <div className="ml-4 flex">
                    {clouds.map((cloud, i) => (
                      <Cloud
                        key={i + 1}
                        active={cloud}
                        onClick={() => review(i + 1)}
                      />
                    ))}
                  </div>
                  <h1 className="text-podOrange text-xl ml-2">
                    {/* {clouds.filter((cloud) => cloud).length}.0 */}
                    {dataGetMyRating?.getMyRating.rating}
                    {Number.isInteger(dataGetMyRating?.getMyRating.rating)
                      ? ".0"
                      : null}
                  </h1>
                </div>
              )}
            </div>
            <div className="flex mb-4">
              {!isHostOwner && (
                <RoundedButton
                  onClick={onClickSubscribe}
                  className={`${
                    dataSubscribed?.didISubscribe.userSubcribed
                      ? "bg-gradient-to-b from-podGradStart to-podGradEnd text-white"
                      : ""
                  }`}
                  content={
                    <>
                      <Heart />
                      Subscribe
                    </>
                  }
                />
              )}
              <CopyToClipboard
                text={window.location.href}
                onCopy={() => {
                  alert("URL is copied to clipboard!");
                }}
              >
                <RoundedButton
                  auth={true}
                  content={
                    <>
                      <Share />
                      Share
                    </>
                  }
                />
              </CopyToClipboard>

              {isHostOwner && (
                <RoundedButton
                  onClick={() => {
                    SetUpdateMode(false);
                    setIsOpened((prev) => !prev);
                    setNewActive((prev) => !prev);
                  }}
                  className={`${
                    newActive
                      ? "bg-gradient-to-b from-podGradStart to-podGradEnd text-white"
                      : ""
                  }`}
                  content={
                    <>
                      {newActive ? <XCircle /> : <Add />}
                      New Episode
                    </>
                  }
                />
              )}
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
        <div className="max-w-lg mx-auto pt-6">
          <EpisodeForm
            podcastId={+params.id}
            setIsOpened={setIsOpened}
            setNewActive={setNewActive}
            setEditActive={setEditActive}
            refetch={refetch}
            updateMode={updateMode}
            episode={targetEpisode}
          />
        </div>
      )}
      {/* <div>comments</div> */}
      <div className="flex flex-col divide-y divide-gray-300">
        {!episodesLoading &&
          episodesData?.getEpisodes.episodes?.map((episode) => (
            <div className="py-4" key={episode.id}>
              <div className="flex items-center">
                <h1 className="text-lg">{episode.title}</h1>
                {isHostOwner && (
                  <RoundedButton
                    onClick={() => {
                      SetTargetEpisode(episode);
                      SetUpdateMode(true);
                      setIsOpened((prev) => !prev);
                      setEditActive((prev) => !prev);
                    }}
                    className={`${
                      editActive
                        ? "bg-gradient-to-b from-podGradStart to-podGradEnd text-white"
                        : ""
                    } ml-1`}
                    content={
                      <>
                        {editActive ? <XCircle /> : <Add />}
                        Edit
                      </>
                    }
                  />
                )}
                {isHostOwner && (
                  <RoundedButton
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure to Delete "${episode.title}"?`
                        )
                      ) {
                        deleteEpisode({
                          variables: { input: { id: episode.id } },
                        });
                      }
                    }}
                    content={"Delete"}
                  />
                )}
              </div>
              <div className="flex items-center">
                <PlayIcon
                  onClick={() => {
                    setActive(true);
                    setSource(episode.audio);
                  }}
                />
                <p className="text-sm w-11/12 overflow-auto h-24 mx-auto my-2">
                  {episode.content}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
