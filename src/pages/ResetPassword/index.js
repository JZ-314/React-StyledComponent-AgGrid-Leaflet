import React from "react";
import logoImage from "../../assets/images/header/logo.svg";

import {
  RootWrapper,
  AuthCard,
  Logo,
  CardTitle,
  Form,
  InputWrapper,
  Input,
  Link,
  ButtonWrapper,
  AuthButton,
  HelpTextWrapper,
} from "../SignIn/styles";

export default function ResetPassword() {
  return (
    <RootWrapper>
      <AuthCard>
        <Logo src={logoImage} />
        <CardTitle>Reset Password</CardTitle>
        <Form>
          <InputWrapper>
            <Input type="email" placeholder="Email" required />
          </InputWrapper>
          <ButtonWrapper>
            <AuthButton type="submit">Send Reset Link</AuthButton>
          </ButtonWrapper>
          <HelpTextWrapper>
            <Link href="/login">Sign In</Link>
          </HelpTextWrapper>
        </Form>
      </AuthCard>
    </RootWrapper>
  );
}
