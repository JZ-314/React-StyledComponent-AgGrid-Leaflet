import styled from "styled-components";

export const RootWrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
`;

export const AuthCard = styled.div`
  width: 425px;
  max-width: 425px;
  background: rgba(28, 28, 28, 0.88);
  border-radius: 16px;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 220px;
  height: 72px;
`;

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 36px;
  text-transform: uppercase;
  color: #fff;
  margin-top: 24px;
  white-space: nowrap;
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputWrapper = styled.div`
  width: 97%;
  margin-top: 32px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  background: #c4c4c4;
  border-radius: 4px;
  border: none;
  color: rgba(0, 0, 0, 0.48);
  font-size: 18px;
  padding-left: 12px;

  &:focus {
    outline: none !important;
    border: none;
  }

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(0, 0, 0, 0.48);
    opacity: 1; /* Firefox */
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: 32px;
  text-align: left;
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  position: relative;
  cursor: pointer;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.72);
  margin-left: 10px;
`;

export const CheckBox = styled.input`
  cursor: pointer;
  margin-left: 8px;
  ${"" /* display: none; */}

  ${
    "" /* &:checked + ${CheckboxLabel}:before {
        background: #910048;
        border: 2px solid #910048;
    }

    &:checked + ${CheckboxLabel}:after {
        content: '';
        display: block;
        position: absolute;
        top: 0px;
        left: 8px;
        width: 6px;
        height: 14px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    } */
  }
`;

export const Link = styled.a`
  font-size: 14px;
  color: #777cff;
`;

export const ButtonWrapper = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const AuthButton = styled.button`
  width: 100%;
  height: 40px;
  background: #000000;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;

export const HelpTextWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const HelpText = styled.span`
  font-size: 14px;
  color: #ffffff;
`;

export const AlertWrapper = styled.div`
  margin-top: 16px;
`;
