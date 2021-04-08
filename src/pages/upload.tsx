import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../components/button";
import { CarouselLine } from "../components/carousel-line";
import { FormError } from "../components/form-error";
import { Input } from "../components/input";
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
  file: string;
}

export const Upload = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState,
    errors,
    setValue,
  } = useForm<ICreatePodcastForm>({
    mode: "onChange",
  });
  const onCompleted = (data: createPodcast) => {
    const {
      createPodcast: { ok, error },
    } = data;
    if (ok) {
      alert("Podcast Created! add episode now!");
      setUploading(false);
      refetch();
      setValue("title", "");
      setValue("categoryName", "");
      setValue("intro", "");
      setValue("file", "");
    }
  };
  const [createPodcast, { loading, data, error }] = useMutation<
    createPodcast,
    createPodcastVariables
  >(CREATE_PODCAST, { onCompleted });
  const {
    loading: loadingPodcasts,
    data: dataPodcasts,
    refetch,
  } = useQuery<getMyPodcasts>(GET_MY_PODCASTS, { fetchPolicy: "no-cache" });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    // if (!loading) {
    try {
      setUploading(true);
      const { title, categoryName, intro, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: image } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      // console.log(image);
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
    } catch (error) {
      console.log(error);
    }
    // }
  };
  // console.log(error);
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
          {/* <input
            ref={register({ required: "Image is required" })}
            className="input"
            name="image"
            placeholder="Image"
            required
          ></input>
          {errors.image?.message && (
            <FormError errorMessage={errors.image?.message} />
          )} */}
          {/* <input
            type="file"
            name="file"
            accept="image/*"
            ref={register({ required: true })}
          /> */}
          <Input
            register={register({ required: true })}
            name="file"
            accept="image/*"
            text="Choose Cover Image"
          />
          <Button
            actionText="Create"
            canClick={formState.isValid}
            loading={uploading}
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
