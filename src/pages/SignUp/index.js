import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logoImage from "../../assets/images/header/logo.svg";
import Alert from "../../components/Alert/index";
import LoadingButton from "../../components/Buttons/LoadingButton";
import CustomCheckbox from "../../components/Checkbox";

import { createUser } from "../../store/user/actions";
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "../../store/user/constants";
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
  CheckboxWrapper,
  // CheckBox,
  CheckboxLabel,
  ButtonWrapper,
  HelpTextWrapper,
  HelpText,
} from "../SignIn/styles";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeInput = useCallback(
    (e) => setFormState({ ...formState, [e.target.name]: e.target.value }),
    [formState]
  );

  const handleChangeCheckbox = useCallback(
    () => (value) => setFormState({ ...formState, terms: value }),
    [formState]
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setIsLoading(true);

    if (formState.password !== formState.confirmPassword) {
      setErrorMessage("Your password is not correct.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      username: formState.username,
      email: formState.email,
      password: formState.password,
    };

    const createUserResult = await dispatch(createUser(payload));

    if (createUserResult.type === CREATE_USER_SUCCESS) {
      setErrorMessage("");
      const loginResult = await dispatch(
        authenticate({
          grant_type: "password",
          password: formState.password,
          email: formState.email,
        })
      );

      if (loginResult.type === AUTHENTICATE_SUCCESS) {
        setIsLoading(false);
        setErrorMessage("");
        // history.push("/email-verification");
        history.push("/");
      }

      if (loginResult.type === AUTHENTICATE_FAILURE) {
        setIsLoading(false);
        setIsSubmitting(false);
        const error = loginResult?.errors?.response?.data?.message
          ? loginResult.errors.response.data.message
          : "Login failed!";
        setErrorMessage(error);
      }
    }

    if (createUserResult.type === CREATE_USER_FAILURE) {
      setIsLoading(false);
      setIsSubmitting(false);
      setErrorMessage("Failed to Sign up!");
    }
  });

  return (
    <RootWrapper>
      <AuthCard>
        <Logo src={logoImage} />
        <CardTitle>Sign Up</CardTitle>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChangeInput}
              required
            />
          </InputWrapper>
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
          <InputWrapper>
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
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
          <CheckboxWrapper>
            <CustomCheckbox
              title=""
              checked={formState.terms}
              onChange={handleChangeCheckbox}
            />
            <CheckboxLabel htmlFor="checkbox">
              By signing up I agree to terms and conditions
            </CheckboxLabel>
          </CheckboxWrapper>
          <ButtonWrapper>
            <LoadingButton
              type="submit"
              color="#fff"
              bgColor="#000000"
              size="18px"
              padding="10px"
              isLoading={isLoading}
            >
              Sign Up
            </LoadingButton>
          </ButtonWrapper>
          <HelpTextWrapper>
            <HelpText>already have an account? </HelpText>
            <Link href="/login">Sign In</Link>
          </HelpTextWrapper>
        </Form>
      </AuthCard>
    </RootWrapper>
  );
}
