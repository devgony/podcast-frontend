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
import { FormError } from "../components/form-error";

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
    <div className="flex flex-col justify-center items-center h-screen text-white bg-gradient-to-b from-podGradStart to-podGradEnd">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={Logo} className="w-52 mb-4" alt="Podcast" />
        <h1 className="text-3xl mb-10">Podcloud</h1>
        <form
          className="grid gap-3 mb-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input"
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
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
            actionText="Login"
          />
        </form>
        <div className="text-black">
          New to Podcloud?{" "}
          <Link to="/create-account" className="hover:underline text-white">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
