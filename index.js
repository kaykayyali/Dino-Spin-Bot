import 'dotenv/config'
import dino_config from "./approved-dinos.js"
import MODES from "./modes.js"
import { Client, Intents } from  'discord.js'
import Spinner from './dino-spin.js'
import _ from 'underscore'

// NAME_MODE Selects a dino by name, FOOD_MODE gives you a diet classification
const spinnerMode = MODES.FOOD_MODE 
// See https://discordjs.guide/popular-topics/reactions.html#unicode-emojis for details on intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
// Load the module, and provide necessary configurations
const spinner = new Spinner(process.env.MAP, spinnerMode, dino_config);
let lastRequest = Date.now();

// Once started, you could do something fancy here, but i think this is meh
client.once('ready', () => {
	console.log('Start Complete');
});

client.on('messageCreate', message => {
  if (message.content.includes("Wants a new random dino") || message.content.includes("TEST_SPIN_BOT")) {
    // Simple Rate limiting
    let currentTime = Date.now();
    // Three Seconds
    let minimumTimeElapsed = 3000;
    if ((lastRequest + minimumTimeElapsed) > currentTime) {
      return;
    }
    lastRequest = Date.now();
    handle_message(message);
  }
});

function handle_message(message) {
  // Dependent on Wants a new random dino being entered in mee6
  let outputString = spinner.random_dino();
  message.reply({ content: `${outputString}`, fetchReply: true });
  message.react('🦖');
}
// Hidden with dotEnv
client.login(process.env.TOKEN);