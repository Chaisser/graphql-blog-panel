import { gql } from "apollo-boost";

const EXCHANGE_RATES = gql`
  {
    brands {
      title
    }
  }
`;
