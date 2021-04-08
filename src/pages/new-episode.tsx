import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { Input } from "../components/input";
import {
  createEpisode,
  createEpisodeVariables,
} from "../__generated__/createEpisode";

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

export const NewEpisode = ({
  podcastId,
  SetIsOpened,
  refetch,
}: {
  podcastId: number;
  SetIsOpened: any;
  refetch: any;
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState,
    errors,
  } = useForm<ICreateEpisodeForm>({ mode: "onChange" });
  const onCompleted = (data: createEpisode) => {
    const {
      createEpisode: { ok, error },
    } = data;
    if (ok) {
      alert("Episode Created!");
      setUploading(false);
      SetIsOpened((prev: boolean) => !prev);
      refetch();
    }
  };
  const [createEpisode, { loading, data }] = useMutation<
    createEpisode,
    createEpisodeVariables
  >(CREATE_EPISODE, {
    onCompleted,
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    // if (!loading) {
    try {
      setUploading(true);
      const { title, content, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: audio } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      createEpisode({
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

    // }
  };

  return (
    <div>
      {/* <h1>Add new Episode!</h1> */}
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
        {/* <input
          ref={register()}
          className="input"
          name="audio"
          placeholder="Audio"
        ></input> */}
        <Input
          register={register({ required: true })}
          name="file"
          accept="audio/*"
          text="Choose Episode Audio"
        />
        <Button
          actionText="Create"
          canClick={formState.isValid}
          loading={uploading}
        />
      </form>
    </div>
  );
};
