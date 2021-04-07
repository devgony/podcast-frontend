import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../components/button";
import { CarouselLine } from "../components/carousel-line";
import { FormError } from "../components/form-error";
import { Add } from "../icons/add";
import {
  createPodcast,
  createPodcastVariables,
} from "../__generated__/createPodcast";
import { getMyPodcasts } from "../__generated__/getMyPodcasts";

const CREATE_PODCAST = gql`
  mutation createPodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
    }
  }
`;

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

interface ICreatePodcastForm {
  title: string;
  categoryName: string;
  intro: string;
  image: string;
}

export const Upload = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState,
    errors,
  } = useForm<ICreatePodcastForm>({
    mode: "onChange",
  });
  const onCompleted = (data: createPodcast) => {
    const {
      createPodcast: { ok, error },
    } = data;
    if (ok) {
      alert("Podcast Created! add episode now!");
      refetch();
    }
  };
  const [createPodcast, { loading, data }] = useMutation<
    createPodcast,
    createPodcastVariables
  >(CREATE_PODCAST, { onCompleted });
  const {
    loading: loadingPodcasts,
    data: dataPodcasts,
    refetch,
  } = useQuery<getMyPodcasts>(GET_MY_PODCASTS);
  const onSubmit = () => {
    if (!loading) {
      const { title, categoryName, intro, image } = getValues();
      createPodcast({
        variables: {
          input: {
            title,
            categoryName,
            intro,
            image,
          },
        },
      });
    }
  };
  return (
    <div className="pt-4">
      <div>
        <h1 className="text-xl">Create your podcast!</h1>
        <form
          className="max-w-2xl mx-auto flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            ref={register({ required: "Title is required" })}
            className="input"
            name="title"
            placeholder="Title"
            required
          ></input>
          {errors.title?.message && (
            <FormError errorMessage={errors.title?.message} />
          )}
          <input
            ref={register({ required: "Category is required" })}
            className="input"
            name="categoryName"
            placeholder="Category"
            required
          ></input>
          {errors.categoryName?.message && (
            <FormError errorMessage={errors.categoryName?.message} />
          )}
          <input
            ref={register({ required: "Introduction is required" })}
            className="input"
            name="intro"
            placeholder="Introduction"
            required
          ></input>
          {errors.intro?.message && (
            <FormError errorMessage={errors.intro?.message} />
          )}
          <input
            ref={register({ required: "Image is required" })}
            className="input"
            name="image"
            placeholder="Image"
            required
          ></input>
          {errors.image?.message && (
            <FormError errorMessage={errors.image?.message} />
          )}
          <Button
            actionText="Create"
            canClick={formState.isValid}
            loading={loading}
          />
        </form>
      </div>
      <div className="mt-10 flex justify-center items-center text-xl">
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
