import 'dotenv/config'
import dino_config from "./approved-dinos.js";
import MODES from "./modes.js"
import { Client, Intents } from  'discord.js'
import Spinner from './dino-spin.js'

// NAME_MODE Selects a dino by name, FOOD_MODE gives you a diet classification
const spinnerMode = MODES.FOOD_MODE 
// See https://discordjs.guide/popular-topics/reactions.html#unicode-emojis for details on intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
// Load the module, and provide necessary configurations
const spinner = new Spinner(process.env.MAP, spinnerMode, dino_config);

// Once started, you could do something fancy here, but i think this is meh
client.once('ready', () => {
	console.log('Start Complete');
});

client.on('messageCreate', message => {
  // Dependent on ROLLED the Wheel! being entered in mee6
	if (message.content.includes("Wants a new random dino") || message.content.includes("TEST_SPIN_BOT")) {
    let outputString = spinner.random_dino();
    message.reply({ content: `${outputString}`, fetchReply: true });
    message.react('🦖');
  }
});

// Hidden with dotEnv
client.login(process.env.TOKEN);