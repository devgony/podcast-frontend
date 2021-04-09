import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { PodcastForm } from "../components/podcast-form";
import { getPodcast, getPodcastVariables } from "../__generated__/getPodcast";
import {
  updatePodcast,
  updatePodcastVariables,
} from "../__generated__/updatePodcast";
import { GET_PODCAST } from "./episodes";

export const UpdatePodcast = () => {
  const params = useParams<{ id: string }>();
  const { data: dataPrev, loading: loadingPrev, refetch } = useQuery<
    getPodcast,
    getPodcastVariables
  >(GET_PODCAST, {
    fetchPolicy: "no-cache",
    variables: { input: { id: +params.id } },
  });
  return (
    <div>
      <div>updateform: {params.id}</div>
      {!loadingPrev && (
        <PodcastForm
          update
          podcast={dataPrev?.getPodcast.podcast}
          text="Edit"
          refetch={refetch}
        />
      )}
    </div>
  );
};
