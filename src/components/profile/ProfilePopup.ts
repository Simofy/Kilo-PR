import styled, { css } from "styled-components";

interface IProfilePopup {
  driveIn: boolean;
}

export const ProfilePopup = styled.div<IProfilePopup>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  min-height: 100px;
  min-width: 140px;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #ffff;
  border-radius: 0.2rem;
  color: #000;
  transform: translateY(35%);
  transition: 0.3s ease-in-out;
  opacity: 0;
  z-index: -1;
  font-size: 16px;
  ${({ driveIn }) =>
    driveIn &&
    css`
      opacity: 1;
      z-index: 50;
    `}
`;
