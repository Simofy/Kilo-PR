import styled, { css } from "styled-components";

interface IProfilePopup {
  driveIn: boolean;
}

export const ProfilePopup = styled.div<IProfilePopup>`
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  min-height: 150px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffff;
  border-radius: 0.5rem;
  color: #000;
  padding: 0.5rem 1rem;
  gap: 1rem;
  transform: translateY(25%);
  transition: 0.3s ease-in-out;
  opacity: 0;
  z-index: -1;
  ${({ driveIn }) =>
    driveIn &&
    css`
      opacity: 1;
      z-index: 50;
    `}
`;
