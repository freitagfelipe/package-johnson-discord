const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const { Queue } = require("../utils/queue");
const { prefix } = require("../config.json");

module.exports = {
    name: "play",
    description: "Play a song in your current voice channel.",
    aliases: ["p"],
    usage: `${prefix}play <music name or music link>`,

    async execute(message, args, wichPlay = 0) {
        const channel = message.member.voice.channel;
        let songURL = args[0], songInfo;

        if (!(args.length > 0)) {
            return message.reply("You need to insert a music name or a music link!");
        } else if (!channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (message.guild.me.voice.channel && !(message.guild.me.voice.channel.name === channel.name)) {
            return message.reply("We aren't at the same voice channel!!");
        }

        const searchingMessage = await message.channel.send("**Searching your music!🔎**");
        
        if (!ytdl.validateURL(songURL)) {
            const musics = await ytsr(args.join(" "), {page: 1});

            if (!musics.items.length) {
                return message.reply("No songs were found! Please try again.");
            }

            songURL = musics.items.find(item => item.type === "video").url;
        }

        searchingMessage.delete();

        try {
            songInfo = await ytdl.getInfo(songURL);
        } catch (e) {
            console.log(e);

            message.reply("An error ocurred while I was searching your music. Remember to not send age-restricted musics, but if you are not, please try again!");

            return;
        }
    
        let queue = global.queues.find(obj => obj.id === message.guild.id);

        if (queue) {
            queue.add(songInfo, message, wichPlay);
        } else {
            queue = new Queue(channel, message.guild.id);

            global.queues.push(queue);
            
            queue.add(songInfo, message, wichPlay);
        }
    }
}