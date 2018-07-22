exports.myAvatar = msg => {
  // If the message is "what is my avatar"
  if (msg.content === "!myavatar") {
    // Send the user's avatar URL
    msg.reply(msg.author.avatarURL);
  }
};
