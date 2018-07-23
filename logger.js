exports.logger = msg => {
  console.log(
    `${msg.channel.recipient.username} tried ${msg.content} in ${
      msg.channel.type
    }`
  );
};
