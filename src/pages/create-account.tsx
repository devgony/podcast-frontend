import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;
export const CreateAccount = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    watch,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateAccountForm>({ mode: "onChange" });
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <div>
      <form
        className="flex flex-col items-center justify-center bg-gray-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl">Create Account</h1>
        <input
          className="input"
          ref={register()}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="input"
          ref={register()}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <select
          name="role"
          ref={register({ required: true })}
          className="input"
        >
          {Object.keys(UserRole).map((role, index) => (
            <option key={index}>{role}</option>
          ))}
        </select>
        <button className="btn">Create Account</button>
      </form>
    </div>
  );
};
