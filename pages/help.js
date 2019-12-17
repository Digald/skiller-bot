import React from "react";
import styled from "styled-components";
import { withRedux } from "../lib/redux";
import Layout from "../components/Layout";
import MaterialTable from "../components/MaterialTable";

const SectionHeadings = styled.h1`
  text-align: center;
`;

const Help = () => {
  function createData(command, example, description, response, note) {
    return { command, example, description, response, note };
  }
  const basicCommands = [
    createData(
      "!donate",
      "",
      "Consider helping Skiller-bot with hosting costs and the time and effort of development.",
      "Url Link.",
      ""
    ),
    createData(
      "!help",
      "",
      "List of commands that skiller-bot listens for.",
      "Url Link.",
      ""
    ),
    createData(
      "!roll {number}",
      "!roll 20",
      "Simulate dice roll from 1 to number specified in command.",
      "Number",
      ""
    ),
    createData(
      "!smugs",
      "",
      "Get a random smug face image for all your conversation needs.",
      "Image",
      ""
    ),
    createData(
      "!mypic",
      "",
      "Posts the full resolution version of your profile pic.",
      "Image",
      ""
    ),
    createData(
      "!reddit {subreddit}",
      "!reddit funny",
      "Grabs a random post from the specified subreddit and posts it in chat.",
      "Post Title, Url Link, Image",
      "Restricted to officer_lounge channel for now."
    )
  ];
  const pokemonCommands = [
    createData(
      "!catch",
      "",
      "Captures currently available pokemon and adds it to your collection.",
      "Discord embed w/ pokemon info and sprite | Countdown timer until next catch.",
      "Skiller-bot will announce when a new Pokemon is ready to be caught."
    ),
    createData(
      "!updateme",
      "",
      "Gives skiller-bot your most updated Discord profile pic.",
      "Text confirmation message.",
      "You must already be a recorded player to use this command."
    ),
    createData(
      "!teambuilder",
      "",
      "Get a private message from the bot with a unique password and url. Use that url to edit your current pokemon team.",
      "Private message, url.",
      "You must already be a recorded player to use this command."
    )
  ];
  return (
    <Layout>
      <SectionHeadings>Basic Commands</SectionHeadings>
      <MaterialTable rows={basicCommands} />
      <SectionHeadings>Pokemon Commands</SectionHeadings>
      <MaterialTable rows={pokemonCommands} />
    </Layout>
  );
};

export default withRedux(Help);
