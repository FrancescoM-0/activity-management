const ip: string = "http://127.0.0.1";
const port: string = "4000";

const address: string = ip + ":" + port;

const addressGraphQL: string = address + "/graphql";

async function fetchGraphql(query: string, variables: {} = {}) {
  const res = await fetch(addressGraphQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables,
    }),
  });
  const json = await res.json();
  return json.data;
}

export { addressGraphQL, fetchGraphql };
