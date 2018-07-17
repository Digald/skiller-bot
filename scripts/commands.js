exports.commands = (msg) => {
    if (msg.content === '!help') {
        const reply = '\nRoll Dice---------------!d <die number>' +
        '\n\nSmug Waifu Pic---------------!smugs' +
        '\n\nMore commands to be added later.'
        return msg.reply(reply);
    }
}