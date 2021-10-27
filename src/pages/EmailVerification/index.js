import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import logoImage from "../../assets/images/header/logo.svg";
import LoadingButton from "../../components/Buttons/LoadingButton";

import { emailVerification } from "../../store/app/actions";

import {
  RootWrapper,
  AuthCard,
  Logo,
  CardTitle,
  Form,
  InputWrapper,
  Input,
  ButtonWrapper,
} from "../SignIn/styles";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const confirmCode = formData.get("confirmCode");

    await dispatch(emailVerification(confirmCode));

    setIsSubmitting(false);
  });

  return (
    <RootWrapper>
      <AuthCard>
        <Logo src={logoImage} />
        <CardTitle>Email Verification</CardTitle>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Confirm Code"
              name="confirmCode"
              required
            />
          </InputWrapper>
          <ButtonWrapper>
            <LoadingButton
              type="submit"
              color="#fff"
              bgColor="#000000"
              size="18px"
              padding="10px"
              isLoading={isSubmitting}
            >
              Confirm Code
            </LoadingButton>
          </ButtonWrapper>
        </Form>
      </AuthCard>
    </RootWrapper>
  );
}
