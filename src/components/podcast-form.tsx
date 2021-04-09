import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import {
  createPodcast,
  createPodcastVariables,
} from "../__generated__/createPodcast";
import {
  updatePodcast,
  updatePodcastVariables,
} from "../__generated__/updatePodcast";
import { Button } from "./button";
import { FormError } from "./form-error";
import { Input } from "./input";

const CREATE_PODCAST = gql`
  mutation createPodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
    }
  }
`;

const UPDATE_PODCAST = gql`
  mutation updatePodcast($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface ICreatePodcastForm {
  title: string;
  categoryName: string;
  intro: string;
  file: string;
}

export const PodcastForm = ({
  refetch,
  text,
  update = false,
  podcast,
}: any) => {
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState,
    errors,
    setValue,
    watch,
  } = useForm<ICreatePodcastForm>({
    mode: "onChange",
  });
  const done = (way: "update" | "create") => {
    alert(`Podcast ${way} is done! add episode now!`);
    setUploading(false);
  };
  const onCreated = (data: createPodcast) => {
    if (data.createPodcast.ok) {
      done("create");
      refetch();
      setValue("title", "");
      setValue("categoryName", "");
      setValue("intro", "");
      setValue("file", "");
    }
  };
  const onUpdated = (data: updatePodcast) => {
    if (data.updatePodcast.ok) {
      done("update");
      history.push(`/podcast/${podcast.id}`);
    }
  };
  const [createPodcast, { loading, data, error }] = useMutation<
    createPodcast,
    createPodcastVariables
  >(CREATE_PODCAST, { onCompleted: onCreated });
  const [
    updatePodcast,
    { data: dataUpdate, loading: loadingUpdate },
  ] = useMutation<updatePodcast, updatePodcastVariables>(UPDATE_PODCAST, {
    onCompleted: onUpdated,
  });
  const onSubmit = async () => {
    // if (!loading) {
    const { title, categoryName, intro, file } = getValues();
    let image = "";
    try {
      if (file.length) {
        setUploading(true);
        const actualFile = file[0];
        const formBody = new FormData();
        formBody.append("file", actualFile);
        const { url } = await (
          await fetch("http://localhost:4000/uploads/", {
            method: "POST",
            body: formBody,
          })
        ).json();
        image = url;
      }
      // console.log(image);
      if (update) {
        updatePodcast({
          variables: {
            input: {
              id: podcast.id,
              title,
              categoryName,
              intro,
              ...(file.length ? { image } : {}),
            },
          },
        });
      } else {
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (update) {
      const {
        title,
        category: { name: categoryName },
        intro,
      } = podcast;
      setValue("title", title);
      setValue("categoryName", categoryName);
      setValue("intro", intro);
    }
  }, []);

  return (
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
      <Input
        register={register({ required: update ? false : true })}
        name="file"
        accept="image/*"
        text="Choose Cover Image"
      />
      <Button
        actionText={text}
        canClick={update ? true : formState.isValid}
        loading={uploading}
      />
    </form>
  );
};
