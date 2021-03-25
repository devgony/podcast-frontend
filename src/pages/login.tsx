import Logo from "../images/logo-white.png";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { Link } from "react-router-dom";
import { Button } from "../components/button";

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
    <div className="text-white flex flex-col justify-center items-center h-screen bg-gradient-to-b from-podGradStart to-podGradEnd">
      <form
        className="flex flex-col items-center justify-center mb-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src={Logo} className="w-52 mb-10" alt="Podcast" />
        <h1 className="text-3xl mb-10">Podcloud</h1>
        <input
          className="input"
          ref={register()}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="input mb-6"
          ref={register()}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button canClick={true} loading={false} actionText="Login" />
      </form>
      <div className="text-black">
        New to Podcloud?{" "}
        <Link to="/create-account" className="hover:underline text-white">
          Create an Account
        </Link>
      </div>
    </div>
  );
};
