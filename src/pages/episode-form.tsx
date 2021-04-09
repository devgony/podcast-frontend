import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { Input } from "../components/input";
import {
  createEpisode,
  createEpisodeVariables,
} from "../__generated__/createEpisode";
import { getEpisodes } from "../__generated__/getEpisodes";
import {
  updateEpisode,
  updateEpisodeVariables,
} from "../__generated__/updateEpisode";

interface ICreateEpisodeForm {
  title: string;
  content: string;
  file: string;
}

const CREATE_EPISODE = gql`
  mutation createEpisode($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      ok
      error
    }
  }
`;

const UPDATE_EPISODE = gql`
  mutation updateEpisode($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const EpisodeForm = ({
  podcastId,
  setIsOpened,
  setNewActive,
  setEditActive,
  refetch,
  updateMode = false,
  episode,
}: {
  podcastId: number;
  setIsOpened: any;
  setNewActive: any;
  setEditActive: any;
  refetch: any;
  updateMode?: boolean;
  episode: any;
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState,
    errors,
    setValue,
  } = useForm<ICreateEpisodeForm>({ mode: "onChange" });
  const [createEpisode, { loading, data }] = useMutation<
    createEpisode,
    createEpisodeVariables
  >(CREATE_EPISODE, {
    onCompleted: (data: createEpisode) => {
      if (data.createEpisode.ok) {
        alert("Episode Created!");
        setUploading(false);
        setIsOpened((prev: boolean) => !prev);
        setNewActive(false);
        refetch();
      }
    },
  });
  const [
    updateEpisode,
    { loading: loadingUpdate, data: dataUpdate },
  ] = useMutation<updateEpisode, updateEpisodeVariables>(UPDATE_EPISODE, {
    onCompleted: (data: updateEpisode) => {
      if (data?.updateEpisode.ok) {
        alert("Episode Updated!");
        setUploading(false);
        setIsOpened((prev: boolean) => !prev);
        setEditActive(false);
        refetch();
      }
    },
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    // if (!loading) {
    let audio = "";
    const { title, content, file } = getValues();
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
        audio = url;
      }
      // const variables = {
      //   variables: {
      //     input: {
      //       podcastId,
      //       title,
      //       content,
      //       ...(file.length ? { audio } : {}),
      //     },
      //   },
      // };
      updateMode
        ? updateEpisode({
            variables: {
              input: {
                id: episode.id,
                title,
                content,
                ...(file.length ? { audio } : {}),
              },
            },
          })
        : createEpisode({
            variables: {
              input: {
                podcastId,
                title,
                content,
                audio,
              },
            },
          });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (updateMode) {
      const { title, content } = episode;
      setValue("title", title);
      setValue("content", content);
    }
  }, []);
  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
          ref={register({ required: "Content is required" })}
          className="input"
          name="content"
          placeholder="Content"
          required
        ></input>
        {errors.content?.message && (
          <FormError errorMessage={errors.content?.message} />
        )}
        <Input
          register={register({ required: !updateMode })}
          name="file"
          accept="audio/*"
          text="Choose Episode Audio"
        />
        <Button
          actionText={updateMode ? "Update" : "Create"}
          canClick={updateMode ? true : formState.isValid}
          loading={uploading}
        />
      </form>
    </div>
  );
};
