require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const scriptsData = {
  blox_fruits: [
    {
      label: 'Redz Hub (V1)',
      value: 'redz_hub',
      script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/TlDinhKhoi/Xeter/refs/heads/main/Main.lua"))()'
    },
    {
      label: 'Hoho Hub',
      value: 'hoho_hub',
      script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/acsu123/HOHO_H/main/Loading_UI"))()'
    },
    {
      label: 'Banana Cat Hub',
      value: 'banana_cat',
      script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/K00LHelper/Roblox/main/BananaCat.lua"))()'
    },
  ],
};

client.once('ready', () => {
  console.log(`Bot logado como ${client.user.tag}`);
  client.user.setActivity('Scripts Gratis 🎮');
});

const gameOptions = Object.keys(scriptsData).map(game => ({
  label: game.replace('_', ' ').toUpperCase(),
  value: game
}));

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content !== '!painel') return;

  const ownerId = '1330055561865330780';
  if (message.author.id !== ownerId) return;

  await message.delete().catch(() => {});

  const select = new StringSelectMenuBuilder()
    .setCustomId('game_selector')
    .setPlaceholder('Escolha um jogo')
    .addOptions(gameOptions);

  const embed = new EmbedBuilder()
    .setTitle('🎮 Painel de Scripts')
    .setDescription('Escolha um jogo abaixo')
    .setColor('#0099ff');

  await message.channel.send({
    embeds: [embed],
    components: [new ActionRowBuilder().addComponents(select)]
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  await interaction.deferUpdate();

  const game = interaction.values[0];
  const scripts = scriptsData[game];

  const options = scripts.map(s => ({
    label: s.label,
    value: s.value
  }));

  const select = new StringSelectMenuBuilder()
    .setCustomId(`script_${game}`)
    .setPlaceholder('Escolha um script')
    .addOptions(options);

  await interaction.editReply({
    components: [new ActionRowBuilder().addComponents(select)]
  });
});

client.login(process.env.TOKEN);
