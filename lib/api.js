import fetch from "isomorphic-unfetch";
import { server } from "./config";

export const getUsers = async () => {
  const res = await fetch(`${server}/api/users`);
  const json = await res.json();
  return json;
};

export const getUser = async (query, type) => {
  const res = await fetch(`${server}/api/${type}/${query.user}`);
  const json = await res.json();
  return json;
};

export const addToTeam = async pokemon => {
  const teamObject = {
      name: pokemon.name
  }
  const res = await fetch(`${server}/api/add-to-team`, {
    method: "POST",
    body: teamObject
  });
  const json = await res.json();
  console.log(json);
  return json;
};
