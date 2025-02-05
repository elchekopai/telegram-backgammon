const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Используем токен, полученный от BotFather
const token = '7635148571:AAEXSoa5eaHXgZfDNRpxflEWpou-TUhZX20'; // Здесь вставь токен, который ты получил от BotFather
const bot = new TelegramBot(token, { polling: true });

// Команды бота
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Давай сыграем в нарды! Нажми кнопку, чтобы начать.");
});

// Команда для броска кубиков
bot.onText(/\/roll/, (msg) => {
  const chatId = msg.chat.id;
  // Логика для броска кубиков и обработки хода
  const dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
  bot.sendMessage(chatId, `Ты бросил кубики: ${dice[0]} и ${dice[1]}`);
  // Добавь логику для обновления состояния игры
});

// Настроим Express сервер
app.use(express.json());

// Обработчик для webhook (опционально, для продакшн-сервера)
app.post('/webhook', (req, res) => {
  const update = req.body;
  bot.processUpdate(update);
  res.sendStatus(200);
});

// Запуск сервера
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});