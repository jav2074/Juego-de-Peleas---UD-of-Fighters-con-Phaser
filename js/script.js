var config = {
    type: Phaser.AUTO,
    width: 1066, //800,
    height: 600,
    parent: 'game-container'
};
var myGame = new Phaser.Game(config);

myGame.state.add('game', GameState);
//myGame.state.add('gameover', gameoverState);
myGame.state.start('game');
