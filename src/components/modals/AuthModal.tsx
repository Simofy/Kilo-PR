import React from "react";
import styled from "styled-components";
import { Button } from "../buttons/Button";
import { StyledForm } from "../forms/StyledForm";
import { Input } from "../inputs/Input";
import { Box } from "../wrappers/Box";
import Typography from "react-styled-typography";

const Modal = styled.div`
  position: absolute;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthModal = (): JSX.Element => {
  return (
    <Modal>
      <form>
        <StyledForm>
          <Typography variant="h1" color="#fff" marginB="20">
            Reset Password
          </Typography>
          <Box width="100%" mb="1rem">
            <Input
              type="password"
              name="old-password"
              placeholder="Old passwod"
            />
          </Box>
          <Box width="100%" mb="1rem">
            <Input
              type="password"
              name="new-password"
              placeholder="New password"
            />
          </Box>
          <Box width="100%" mb="1rem">
            <Input
              type="password"
              name="repeat-new-password"
              placeholder="Repeat new password"
            />
          </Box>
          <Button>Reset</Button>
        </StyledForm>
      </form>
    </Modal>
  );
};
