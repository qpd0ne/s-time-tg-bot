const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "./config.json");

// Функция для чтения файла config.json
const readConfigFile = () => {
  try {
    const configData = fs.readFileSync(configPath);
    return JSON.parse(configData);
  } catch (error) {
    console.error("Ошибка чтения файла config.json:", error);
    process.exit(1); // Завершить процесс с ошибкой
  }
};

// Чтение конфигурации из файла config.json
const config = readConfigFile();

const TelegramApi = require("node-telegram-bot-api");
const token = config.token;
const bot = new TelegramApi(token, { polling: true });

const stopWatchLink = "https://ya.ru/";
const timerLink = "https://ya.ru/";
const planLink = "https://ya.ru/";

bot.on("message", async (msg) => {
  const UserMsg = msg.text;
  const ChatId = msg.chat.id;

  if (UserMsg === "/start") {
    return bot.sendMessage(ChatId, `Welcome to S'TIME, ${msg.chat.username}!`, {
      reply_markup: {
        keyboard: [
          [
            { text: "stopWatch", web_app: { url: stopWatchLink } },
            { text: "Plan", web_app: { url: planLink } },
            { text: "Timer", web_app: { url: timerLink } },
          ],
        ],
      },
    });
  }

  return bot.sendMessage(ChatId, "**command is not found**");
});
