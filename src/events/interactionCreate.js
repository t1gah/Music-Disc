const embed = require('../embeds/embeds');


module.exports = (client, int) => {

    if (!int.isButton()) return;
        const queue = client.player.nodes.get(int.guildId);

        if (!queue || !queue.isPlaying())
            return int.reply({ content: `There is no music currently playing.`, ephemeral: true, components: [] });


        const track = queue.currentTrack;
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `Author : **${track.author}**\nDuration **${trackDuration}**`;


        switch (int.customId) {
            case 'Save Song': {

                if (!queue || !queue.isPlaying())
                    return int.reply({ content: `No music currently playing.`, ephemeral: true, components: [] });


                int.member.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)] })
                    .then(() => {
                        return int.reply({ content: `I sent you the name of the music in a private message.`, ephemeral: true, components: [] });
                    })
                    .catch(error => {
                        console.log('error: ' + error);
                        return int.reply({ content: `I can't send you a private message.`, ephemeral: true, components: [] });
                    });
            } break;
        }
    };
