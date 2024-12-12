// @ts-nocheck
import { useEffect } from 'react';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import "Game.css"

function Game() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: GameScene
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="max-h-min bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-4">Adventure Quiz</h1>
      <div id="game-container" className="rounded-lg overflow-hidden shadow-2xl"></div>
      <p className="text-white mt-4">Use arrow keys to move and jump!</p>
    </div>
  );
}

export default Game;