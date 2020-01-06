const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://skiller-bot.herokuapp.com';

// For working with crostini container
// export const server = dev ? 'http://100.115.92.206:3000' : 'https://skiller-bot.herokuapp.com';