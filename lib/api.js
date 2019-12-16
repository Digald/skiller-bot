import fetch from "isomorphic-unfetch";
import { server } from "./config";

export const getUsersApi = async () => {
  const res = await fetch(`${server}/api/users`);
  const json = await res.json();
  return json;
};

export const getUserApi = async (query, type) => {
  const res = await fetch(`${server}/api/${type}/${query.user}`);
  const json = await res.json();
  return json;
};

export const addToTeamApi = async (pokemonList, teamId) => {
  const body = {
    user: teamId,
    pokemonList
  }
  const res = await fetch(`${server}/api/add-to-team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  console.log(json);
  return json;
};