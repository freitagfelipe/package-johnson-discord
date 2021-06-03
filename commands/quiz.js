const fetch = require("node-fetch");

const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");
const { shuffleArray } = require("../utils/shuffleArray");

module.exports = {
    name: "quiz",
    description: "Package will send questions and whoever gets it right first wins.",

    async execute(message) {
        const getQuestions = async () => {
            const response = await fetch("https://opentdb.com/api.php?amount=50&type=multiple");

            try {
                if (response.ok) {
                    const jsonResponse = await response.json();

                    let verifyQuestion;

                    while(true) {
                        verifyQuestion = jsonResponse.results[Math.floor(Math.random() * 50)];
                        isGood = true;

                        for (let i = 0; i < verifyQuestion.question.length; i++) {
                            if (verifyQuestion.question[i] == "&") {
                                isGood = false;
                            }
                        }

                        for (let i = 0; i < verifyQuestion.correct_answer.length; i++) {
                            if (verifyQuestion.correct_answer[i] == "&") {
                                isGood = false;
                            }
                        }

                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < verifyQuestion.incorrect_answers[i].length; j++) {
                                if (verifyQuestion.incorrect_answers[i][j] == "&") {
                                    isGood = false;
                                }
                            }
                        }

                        if (isGood) {
                            break;
                        }
                    }

                    return verifyQuestion;
                } else {
                    throw new Error("Request failed!");
                }
            } catch(error) {
                console.log(error);
                return message.reply("An error occurred while trying to execute your command, please try again!");
            }
        }

        const question = await getQuestions();

        let answers = question.incorrect_answers.slice(0, question.incorrect_answers.length);

        answers.push(question.correct_answer);
        answer = shuffleArray(answers);

        message.channel.send(new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTitle("React with the number of the answer you think is correct!")
            .addField(`${question.question}`, `1) ${answers[0]}\n2) ${answers[1]}\n3) ${answers[2]}\n 4) ${answers[3]}`)
            .addField("\u200B", `${message.author.username} have one minute to answer the question or it will be deleted! You just have one chance.`)
            .setTimestamp()
        ).then(msg => {
            setInterval(() => {
                if (!msg.deleted) {
                    message.channel.send("**Timeout!⌛**");
                    message.delete();
                    msg.delete();
                }
            }, 60000);

            const filter = (reaction, user) => {
                return ["1️⃣", "2️⃣", "3️⃣", "4️⃣"].includes(reaction.emoji.name) && user.id === message.author.id;
            }
            
            const collector = msg.createReactionCollector(filter, { time: 60000 });

            collector.on("collect", collected => {
                let isCorrect;

                switch (collected.emoji.name) {
                    case "1️⃣":
                        answers[0] == question.correct_answer ? isCorrect = true : isCorrect = false;
                        break;
                    case "2️⃣":
                        answers[1] == question.correct_answer ? isCorrect = true : isCorrect = false;
                        break;
                    case "3️⃣":
                        answers[2] == question.correct_answer ? isCorrect = true : isCorrect = false;
                        break;
                    case "4️⃣":
                        answers[3] == question.correct_answer ? isCorrect = true : isCorrect = false;
                        break;
                }

                if (isCorrect == true) {
                    message.channel.send("**Correct answer!✅**");
                } else if(isCorrect == "default") {
                    message.reply("Please react with a number from one to four!");
                } else {
                    message.channel.send("**Incorrect answer!❎**");
                }

                    message.delete();
                    msg.delete();
            });
        });
    }
}