import React, { useState, useCallback } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import logoImage from "../../assets/images/header/logo.svg";
import Alert from "../../components/Alert";
import LoadingButton from "../../components/Buttons/LoadingButton";

import { authenticate } from "../../store/app/actions";
import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
} from "../../store/app/constants";

import {
  RootWrapper,
  AuthCard,
  Logo,
  CardTitle,
  Form,
  InputWrapper,
  Input,
  AlertWrapper,
  Link,
  ButtonWrapper,
  HelpTextWrapper,
  HelpText,
} from "./styles";

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeInput = useCallback(
    (e) => setFormState({ ...formState, [e.target.name]: e.target.value }),
    [formState]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);
      setErrorMessage("");
      setIsLoading(true);

      const loginResult = await dispatch(
        authenticate({
          grant_type: "password",
          password: formState.password,
          email: formState.email,
        })
      );

      if (loginResult.type === AUTHENTICATE_SUCCESS) {
        setErrorMessage("");
        setIsLoading(false);
        history.push("/");
        setIsSubmitting(false);
      }

      if (loginResult.type === AUTHENTICATE_FAILURE) {
        const error = loginResult?.errors?.response?.data?.message
          ? loginResult.errors.response.data.message
          : "Login failed!";
        setIsLoading(false);
        setErrorMessage(error);
        setIsSubmitting(false);
      }
    },
    [formState, isSubmitting]
  );

  return (
    <RootWrapper>
      <AuthCard>
        <Logo src={logoImage} />
        <CardTitle>Login</CardTitle>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChangeInput}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
              required
            />
          </InputWrapper>
          {errorMessage && (
            <AlertWrapper>
              <Alert bgColor="#b50c0c" textColor="#111111">
                {errorMessage}
              </Alert>
            </AlertWrapper>
          )}
          <HelpTextWrapper>
            <Link href="reset-password">Forgot Password?</Link>
          </HelpTextWrapper>
          <ButtonWrapper>
            <LoadingButton
              type="submit"
              color="#fff"
              bgColor="#000000"
              size="18px"
              padding="10px"
              isLoading={isLoading}
            >
              Login
            </LoadingButton>
          </ButtonWrapper>
          <HelpTextWrapper>
            <HelpText>Don't have an account? </HelpText>
            <Link href="/signUp">Sign Up</Link>
          </HelpTextWrapper>
        </Form>
      </AuthCard>
    </RootWrapper>
  );
}
