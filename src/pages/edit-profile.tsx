import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/use-me";
import {
  editProfile,
  editProfileVariables,
} from "../__generated__/editProfile";

const EDIT_PROFILE_INPUT = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface ILoginForm {
  password: string;
}

export const EditProfile = () => {
  const history = useHistory();
  const me = useMe();
  const {
    getValues,
    register,
    errors,
    handleSubmit,
    formState,
    setValue,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { password } = getValues();
    editProfile({ variables: { input: { password } } });
  };
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok) {
      alert("Account edited!");
      setValue("password", "");
    }
  };
  const [editProfile, { loading, data }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_INPUT, { onCompleted });
  return (
    <div className="pt-6 px-2">
      <h1 className="text-xl text-center py-6">Edit Your password</h1>
      <form
        className="grid gap-3 mb-4 max-w-lg mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="input text-gray-700">{me.data?.me.email}</p>
        <input
          className="input"
          ref={register({ required: "Password is required", minLength: 4 })}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        {errors.password?.type === "minLength" && (
          <FormError errorMessage="Password must be more than 4 chars." />
        )}
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText="Edit"
        />
      </form>
    </div>
  );
};
