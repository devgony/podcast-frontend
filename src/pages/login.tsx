import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    watch,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({ mode: "onChange" });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token, error },
    } = data;
    console.log(ok, error);
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register()} name="email" type="email" placeholder="Email" />
        <input
          ref={register()}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};
