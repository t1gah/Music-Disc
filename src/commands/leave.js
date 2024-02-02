module.exports = {
    name: 'stop',
    aliases: ['s'],
    description: 'Leave current voice channel',
    usage: 'stop',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `There is no music currently playing.`, allowedMentions: { repliedUser: false } });

        if (!queue.deleted)
            queue.delete();

        
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `There is no music currently playing.`, allowedMentions: { repliedUser: false } });

        if (!queue.deleted)
            queue.delete();

        return interaction.reply('Bot leave.');
    },
};