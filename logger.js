exports.logger = msg => {
  // console.log(msg);
  console.log(
    `${msg.author.username || msg.channel.recipient.username} tried ${
      msg.content
    } in ${msg.channel.name || msg.channel.type}`
  );
};
