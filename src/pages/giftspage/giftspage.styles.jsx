import styled from "styled-components";
import { Link } from "react-router-dom";
export const GiftsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  * + * {
    margin-top: 1.5em;
  }
`;
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
export const Button = styled.button`
  display: inline-block;
   padding: 0.35em 1.2em;
   border: 0.1em solid black;
   margin: 0 0.3em 0.3em 0;
   border-radius: 0.12em;
   box-sizing: border-box;
   text-decoration: none;
   font-family: "Roboto", sans-serif;
   font-weight: 600;
   background-color: black;
   color: #ffffff;
   text-align: center;
   transition: all 0.2s;
  &:hover {
     color: #000000;
     background-color: #ffffff;
  }
`;
