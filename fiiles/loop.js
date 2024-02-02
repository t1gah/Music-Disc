module.exports = {
  name: 'loop',
  aliases: ['lp'],
  description: 'Loop',
  usage: 'loop',
  voiceChannel: true,


  execute(client, message, args) {
    const queue = client.player.nodes.get(message.guild.id);
    const prefix = client.config.prefix;

    if (!queue || !queue.isPlaying())
      return message.reply({ content: `There is no music currently playing.`, allowedMentions: { repliedUser: false } });

    let mode = null;
    const methods = ['', '', ''];

    if (!args[0])
      return message.reply({ content: `${prefix}loop <all/one/off>`, allowedMentions: { repliedUser: false } });

    switch (args[0].toLowerCase()) {
      case '':
        mode = 0;
        break;
      case '' || '':
        mode = 1;
        break;
      case '' || '':
        mode = 2;
        break;
      default:
        return message.reply({ content: `${prefix}loop <all/one/off>`, allowedMentions: { repliedUser: false } });
    }
    queue.setRepeatMode(mode);


    return message.reply({ content: `Set loop to \`${methods[mode]}\``, allowedMentions: { repliedUser: false } });
  },

  slashExecute(client, interaction) {
    const queue = client.player.nodes.get(interaction.guild.id);

    if (!queue || !queue.isPlaying())
      return interaction.reply({ content: `There is no music currently playing.`, allowedMentions: { repliedUser: false } });


    const methods = {
      off: 0,
      one: 1,
      all: 2
    }
    const names = {
      off: "",
      one: "",
      all: ""
    }

    queue.setRepeatMode(methods[interaction.options.getString("mode")]);

    return interaction.reply({ content: `Set loop to \`${names[interaction.options.getString("mode")]}\``, allowedMentions: { repliedUser: false } });
  },
};
