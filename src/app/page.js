"use client";
import { useEffect, useState } from "react";
import './styles.css'; // Подключаем стили

export default function Home() {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [dice, setDice] = useState([1, 1]);
  const [currentPlayer, setCurrentPlayer] = useState(1); // Игрок 1 начинает
  const [player1Pieces, setPlayer1Pieces] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]); // 15 фишек для игрока 1
  const [player2Pieces, setPlayer2Pieces] = useState([23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9]); // 15 фишек для игрока 2
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      setTg(telegram);
      telegram.expand(); // Разворачиваем Web App на весь экран

      if (telegram.initDataUnsafe?.user) {
        setUser(telegram.initDataUnsafe.user);
      }
    }
  }, []);

  const startGame = () => {
    // Инициализация игры, например, отправка первого хода
    setGameStarted(true);
  };

  // Функция для движения фишек
  const movePiece = (player, index, steps) => {
    let newPosition = player[index] + steps;
    if (newPosition >= 0 && newPosition < 24) {
      player[index] = newPosition;
    }
    return player;
  };

  const rollDice = () => {
    const randomDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    setDice(randomDice);

    // Пример движения фишки игрока 1
    const steps = randomDice[0]; // Двигаем фишку на столько шагов, сколько выпало на кубике
    const newPlayer1Pieces = movePiece(player1Pieces, 0, steps); // Двигаем первую фишку
    setPlayer1Pieces([...newPlayer1Pieces]); // Обновляем состояние

    // Переключаем игрока
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Меняем игрока
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Добро пожаловать в игру в нарды!</h1>
      {user ? (
        <p>Вы авторизованы как {user.first_name} {user.last_name}</p>
      ) : (
        <p>Не удалось получить данные пользователя</p>
      )}

      {/* Кнопка для старта игры */}
      {!gameStarted ? (
        <button onClick={startGame}>Начать игру</button>
      ) : (
        <div>
          <p>Текущий игрок: Игрок {currentPlayer}</p>
          <div className="board">
            <div className="player-side">
              {/* Отображаем фишки игрока 1 */}
              {player1Pieces.map((pos, idx) => (
                <div key={idx} className="chip" style={{ backgroundColor: "blue", position: "absolute", bottom: `${(pos % 12) * 8}%`, left: `${Math.floor(pos / 12) * 50}%` }}></div>
              ))}
            </div>

            <div className="dice-roll">
              <button onClick={rollDice}>Бросить кубики</button>
              <p>Кубики: {dice[0]} и {dice[1]}</p>
            </div>

            <div className="player-side">
              {/* Отображаем фишки игрока 2 */}
              {player2Pieces.map((pos, idx) => (
                <div key={idx} className="chip" style={{ backgroundColor: "red", position: "absolute", bottom: `${(pos % 12) * 8}%`, left: `${Math.floor(pos / 12) * 50}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}