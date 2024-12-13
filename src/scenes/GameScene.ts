// @ts-nocheck
import Phaser from 'phaser';
import { questions } from '../data/questions';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private questionBoxes!: Phaser.Physics.Arcade.Group;
  private hearts!: Phaser.Physics.Arcade.Group;
  private coins!: Phaser.Physics.Arcade.Group;
  private score: number = 0;
  private health: number = 3;
  private level: number = 1;
  private scoreText!: Phaser.GameObjects.Text;
  private healthText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;
  private currentQuestion: any = null;
  private questionDialog!: Phaser.GameObjects.Container;
  private isShowingQuestion: boolean = false;
  private background!: Phaser.GameObjects.TileSprite;
  private levelCompleted: boolean = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Load assets
    this.load.image('background', 'https://labs.phaser.io/assets/skies/space1.png');
    this.load.image('platform', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('questionBox', 'https://labs.phaser.io/assets/sprites/diamond.png');
    this.load.image('heart', 'https://labs.phaser.io/assets/sprites/heart.png');
    this.load.image('coin', 'https://labs.phaser.io/assets/sprites/coin.png');
    this.load.spritesheet('dude', 
      'https://labs.phaser.io/assets/sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    // Add scrolling background
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');

    // Create platforms based on current level
    this.createLevel();

    // Create player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // Add collectibles
    this.hearts = this.physics.add.group({
      allowGravity: false
    });
    this.coins = this.physics.add.group({
      allowGravity: false
    });
    this.questionBoxes = this.physics.add.group({
      allowGravity: false
    });
    this.createCollectibles();

    // Colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.questionBoxes, this.platforms);
    this.physics.add.collider(this.hearts, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);

    // Overlaps
    this.physics.add.overlap(
      this.player,
      this.questionBoxes,
      this.handleQuestionBoxCollision,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.hearts,
      this.collectHeart,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      undefined,
      this
    );

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // UI
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '24px',
      color: '#fff'
    });
    this.healthText = this.add.text(16, 50, 'Health: 3', {
      fontSize: '24px',
      color: '#ff0000'
    });
    this.levelText = this.add.text(16, 84, `Level: ${this.level}`, {
      fontSize: '24px',
      color: '#00ff00'
    });

    // Create question dialog
    this.createQuestionDialog();
  }

  createLevel() {
    this.platforms = this.physics.add.staticGroup();

    // Different platform layouts for each level
    switch (this.level) {
      case 1:
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'platform').refreshBody();
        this.platforms.create(50, 250, 'platform').refreshBody();
        break;
      case 2:
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(300, 450, 'platform').refreshBody();
        this.platforms.create(700, 350, 'platform').refreshBody();
        this.platforms.create(100, 250, 'platform').refreshBody();
        break;
      case 3:
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(200, 450, 'platform').refreshBody();
        this.platforms.create(500, 400, 'platform').refreshBody();
        this.platforms.create(700, 300, 'platform').refreshBody();
        this.platforms.create(300, 200, 'platform').refreshBody();
        break;
      case 4:
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(150, 450, 'platform').refreshBody();
        this.platforms.create(400, 380, 'platform').refreshBody();
        this.platforms.create(650, 300, 'platform').refreshBody();
        this.platforms.create(400, 220, 'platform').refreshBody();
        break;
      case 5:
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(200, 480, 'platform').refreshBody();
        this.platforms.create(500, 400, 'platform').refreshBody();
        this.platforms.create(200, 320, 'platform').refreshBody();
        this.platforms.create(500, 240, 'platform').refreshBody();
        this.platforms.create(200, 160, 'platform').refreshBody();
        break;
    }
  }

  createCollectibles() {
    // Add question boxes for current level
    const startIdx = (this.level - 1);
    const question = questions[startIdx];
    if (question) {
      const box = this.questionBoxes.create(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(100, 300),
        'questionBox'
      );
      box.setData('questionId', startIdx);
    }

    // Add hearts
    for (let i = 0; i < 2; i++) {
      const heart = this.hearts.create(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(100, 300),
        'heart'
      );
    }

    // Add coins
    for (let i = 0; i < 5; i++) {
      const coin = this.coins.create(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(100, 300),
        'coin'
      );
    }
  }

  collectHeart(player: any, heart: any) {
    heart.destroy();
    this.health = Math.min(this.health + 1, 5);
    this.healthText.setText('Health: ' + this.health);
  }

  collectCoin(player: any, coin: any) {
    coin.destroy();
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  handleQuestionBoxCollision(player: any, box: any) {
    if (this.isShowingQuestion) return;

    const questionId = box.getData('questionId');
    this.currentQuestion = questions[questionId];
    this.showQuestion(this.currentQuestion);
    box.destroy();
  }

  showQuestion(question: any) {
    this.isShowingQuestion = true;
    this.physics.pause();

    const questionText = this.questionDialog.getData('questionText');
    questionText.setText(question.question);

    let buttonY = 0;
    question.options.forEach((option: string, index: number) => {
      const button = this.add.text(0, buttonY, option, {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#4a5568',
        padding: { x: 20, y: 10 }
      })
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.handleAnswer(option));

      this.questionDialog.add(button);
      buttonY += 50;
    });

    this.questionDialog.setVisible(true);
  }

  handleAnswer(answer: string) {
    const isCorrect = answer === this.currentQuestion.correctAnswer;
    
    if (isCorrect) {
      this.score += 100;
      this.scoreText.setText('Score: ' + this.score);
      this.levelCompleted = true;
    } else {
      this.health--;
      this.healthText.setText('Health: ' + this.health);
      if (this.health <= 0) {
        this.scene.restart();
        this.level = 1;
        this.score = 0;
        this.health = 3;
      }
    }

    this.questionDialog.setVisible(false);
    this.isShowingQuestion = false;
    this.physics.resume();

    const buttons = this.questionDialog.getAll();
    buttons.slice(2).forEach((button: any) => button.destroy());

    if (this.levelCompleted && this.level < 5) {
      this.level++;
      this.scene.restart();
    }
  }

  createQuestionDialog() {
    this.questionDialog = this.add.container(400, 300);
    this.questionDialog.setDepth(1000);
    this.questionDialog.setVisible(false);

    const bg = this.add.rectangle(0, 0, 600, 400, 0x000000, 0.8);
    this.questionDialog.add(bg);

    const questionText = this.add.text(0, -150, '', {
      fontSize: '24px',
      color: '#fff',
      align: 'center',
      wordWrap: { width: 500 }
    });
    questionText.setOrigin(0.5);
    this.questionDialog.add(questionText);

    this.questionDialog.setData('questionText', questionText);
  }

  update() {
    if (this.isShowingQuestion) return;

    // Parallax background
    this.background.tilePositionX += 0.5;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}