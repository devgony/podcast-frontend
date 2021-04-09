import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../components/button";
import { CarouselLine } from "../components/carousel-line";
import { FormError } from "../components/form-error";
import { Input } from "../components/input";
import { PodcastForm } from "../components/podcast-form";
import { Add } from "../icons/add";
import {
  createPodcast,
  createPodcastVariables,
} from "../__generated__/createPodcast";
import { getMyPodcasts } from "../__generated__/getMyPodcasts";

const GET_MY_PODCASTS = gql`
  query getMyPodcasts {
    getMyPodcasts {
      ok
      error
      podcasts {
        id
        title
        category {
          name
        }
        rating
        image
      }
    }
  }
`;

export const Upload = () => {
  const {
    loading: loadingPodcasts,
    data: dataPodcasts,
    refetch,
  } = useQuery<getMyPodcasts>(GET_MY_PODCASTS, { fetchPolicy: "no-cache" });
  return (
    <div className="pt-6 px-2">
      <div>
        <h1 className="text-xl text-center py-2">Create your podcast!</h1>
        <PodcastForm refetch={refetch} text="Create" />
      </div>
      <div className="mt-8 mb-2 flex justify-center items-center text-xl">
        Choose your Podcast and Click
        <button
          className={`ml-2 focus:outline-none border rounded-full border-podOrange px-2 flex items-center cursor-default`}
        >
          <Add />
          New Episode
        </button>
      </div>
      <div>
        <CarouselLine
          loading={loadingPodcasts}
          podcasts={dataPodcasts?.getMyPodcasts.podcasts}
        />
      </div>
    </div>
  );
};
