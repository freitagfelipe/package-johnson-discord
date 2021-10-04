const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "good afternoon",

    execute(message) {
        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(`${embedColor}`)
                .setTitle(`Kon'nichiwaaaaaaaaaaaaaa!`)
                .setImage("https://media1.tenor.com/images/e84edb279472c7ab49e97ec276d4ffda/tenor.gif?itemid=19354838")
        ] });
    }
}