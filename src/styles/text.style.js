import styled, { css } from "styled-components";
import { theme } from "./theme";

export const BannerHeading = styled.h1`
  color: ${theme.e};
  font-family: "Open Sans", sans-serif;
  font-weight: 800;
  z-index: 5;
  margin: 3rem 5rem;

  font-size: calc(2rem + 7vw);
`;

export const SectionHeading = styled.h2`
  color: ${theme.e};
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: calc(1.3rem + 3vw);
`;

export const ParaHeading = styled.h3`
  font-family: "Montserrat", sans-serif;
  align-self: flex-start;
  text-align: left;
  padding-bottom: 10px;
  margin: 0.5rem 0;
  border-bottom: 2px solid ${theme.e};
`;
export const SectionPara = styled.p`
  font-family: "Montserrat", sans-serif;

  text-align: left;
  margin: 0.3rem 0.3rem 2.5rem 0.3rem;
`;
