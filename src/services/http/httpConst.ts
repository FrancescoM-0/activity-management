import httpConfig from "../../http-config.json";
import { readCacheUser } from "../auth/cacheAuth";

const address: string = httpConfig.ip + ":" + httpConfig.port;
const addressGraphql: string = address + httpConfig.graphqlPath;

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const headerWithAuthorization = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: JSON.stringify(readCacheUser()),
};

async function fetchGraphql(query: string, variables: {} = {}) {
  const res = await fetch(addressGraphql, {
    method: "POST",
    headers: readCacheUser() === null ? header : headerWithAuthorization,
    body: JSON.stringify({
      query,
      variables: variables,
    }),
  });
  const json = await res.json();
  return json.data;
}

export { fetchGraphql };
