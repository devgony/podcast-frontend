import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import {
  createEpisode,
  createEpisodeVariables,
} from "../__generated__/createEpisode";

interface ICreateEpisodeForm {
  title: string;
  content: string;
  audio: string;
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
  const onSubmit = () => {
    if (!loading) {
      const { title, content, audio } = getValues();
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
    }
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
        <input
          ref={register()}
          className="input"
          name="audio"
          placeholder="Audio"
        ></input>
        <Button
          actionText="Create"
          canClick={formState.isValid}
          loading={loading}
        />
      </form>
    </div>
  );
};
