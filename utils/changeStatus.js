const { prefix } = require("../config.json");
const { getCurrentInteraction, getAwakeTime } = require("../utils/timeUtils");

module.exports = {
    changeStatus() {
        const client = global.client;
        let i = 0;

        setInterval(async () => {
            if (i === 8) {
                i = 0;
            }

            const currentInteraction = getCurrentInteraction();
            const awakeTime = await getAwakeTime();

            const activities = [
                "Say hi to @Package Johnson!",
                `I'm in ${client.guilds.cache.size} servers!`,
                `${currentInteraction}`,
                `${prefix} commands to see my command list!`,
                `${prefix} playlist to see my favorites lofi!`,
                "Do you know that I'm open source? https://github.com/freitagfelipe/package-johnson-discord",
                `${prefix} help <command name> if you have any questions about a command!`,
                `I've been awake for ${awakeTime}!`,
            ]

            return client.user.setActivity(`${activities[i++]}`);
        }, 10000);
    }
}