const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "link",
    description: "Shows the link to add Package Johnson to your discord.",

    execute(message) {
        return message.channel.send(new MessageEmbed()
            .setAuthor(
                "Package Johnson",
                "https://i.imgur.com/vDVSu00.png"
            )
            .setColor(`${embedColor}`)
            .setTitle("To add me in your discord server you just need to click on this message!")
            .setURL(`http://gg.gg/package-johnson-discord`)
            .addFields(
                { name: "Created by:", value: "[Felipe Freitag](https://github.com/freitagfelipe)", inline: true},
                { name: "Link to repository:", value: "[Github](https://github.com/freitagfelipe/package-johnson)", inline: true}
            )
        );
    }
}