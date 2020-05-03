var sentido = 0;
var contadorGolpesPlayer1 = 0;
var contadorGolpesPlayer2 = 0;

var barraXplayer1 = 100;
var barraYplayer1 = 100;

var barraXplayer2 = 100;
var barraYplayer2 = 100;


var GameState = {

	render: function () {
		var me = this;
		// me.game.debug.spriteBounds(me.player1);
		// me.game.debug.spriteBounds(me.player2);
		// me.game.debug.spriteBounds(me.stateText);
	},

	preload: function () {
		var me = this;
		me.load.image('mapa', 'assets/img/mapa_1066x600.png');
		me.load.atlasJSONHash('raiden', 'assets/img/raiden.png', 'assets/img/raiden.json');
		me.load.atlasJSONHash('sonya', 'assets/img/sonya.png', 'assets/img/sonya.json');
		me.game.load.audio('patada', ['assets/audio/patada.mp3', 'assets/audio/patada.ogg']);
		me.game.load.audio('puno', ['assets/audio/puño.mp3', 'assets/audio/puno.ogg']);
		me.game.load.audio('tema', ['assets/audio/tema.mp3', 'assets/audio/tema.ogg']);
	},

	create: function () {
		var me = this;

		w05 = config.width / 2;		// me.game.world.centerX;
		h05 = config.height / 2;	// me.game.world.centerY;

		me.game.world.setBounds(0, 0, config.width, config.height);		// (0, 0, 1365, 768);
		me.game.forceSingleUpdate = true;

		//MAPA
		me.game.add.image(0, 0, 'mapa');

		//CONFIGURACION JUGADOR 1
		me.player1 = me.game.add.sprite(w05 - 150, h05 + 120, 'raiden');
		me.player1.scale.setTo(1, 1);
		//SECUENCIA CUANDO NO SE MUEVE
		// me.player1.animations.add('inicio', [47, 48, 49, 50, 51, 52, 53, 54, 55, 56], 8, true);
		me.player1.animations.add('inicio', [48, 49, 50, 51, 52, 53, 54, 55, 56], 8, true);
		//SECUENCIA DE CAMINAR
		me.player1.animations.add('caminar', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
		//SECUENCIA CAMINAR ATRAS
		me.player1.animations.add('caminarAtras', [8, 7, 6, 5, 4, 3, 2, 1, 0], 8, true);
		//SECUENCIA SALTOS
		me.player1.animations.add('saltar', [9, 10, 11], 8, true);
		//SECUENCIA PARA AGACHARSE
		me.player1.animations.add('agachar', [12, 13, 14], 15, true);
		//SECUENCIA PUÑOS
		me.player1.animations.add('puños', [15, 16, 17, 18, 19, 20, 21, 22, 23], 15, true);
		//SECUENCIA PATADAS
		me.player1.animations.add('patadas', [24, 25, 26, 27, 28], 15, true);
		//SECUENCIA CUBRIRSE
		me.player1.animations.add('cubrirse', [29, 30, 31], 15, true);
		//SECUENCIA CUANDO LO GOLPEAN
		me.player1.animations.add('golpePuño', [40, 41, 42, 43, 44], 15, true);
		//SECUENCIA CUANDO LO GOLPEAN CON PATADAS
		me.player1.animations.add('golpePatada', [45, 46], 15, true);
		//SECUENCIA PARA CAER
		me.player1.animations.add('caer', [35, 36, 37, 38, 39], 15, false);
		// festejo [10,11,12,14,15,16,17,18,19]
		me.player1.animations.add('festejo', [57, 58, 59, 60, 61], 9.5, true);

		me.player1.anchor.set(0.5);
		me.game.physics.enable(me.player1, Phaser.Physics.ARCADE);
		me.player1.body.collideWorldBounds = true;

		//CONFIGURACION JUGADOR 2
		me.player2 = me.game.add.sprite(w05 + 150, h05 + 120, 'sonya');
		me.player2.scale.setTo(-1, 1);
		//SECUENCIA CUANDO NO SE MUEVE
		me.player2.animations.add('inicio', [01, 02, 03, 04, 05, 06], 8, true);
		//SECUENCIA DE CAMINAR
		me.player2.animations.add('caminar', [17, 18, 19, 20, 21, 22, 23, 24, 25], 8, true);
		//SECUENCIA CAMINAR ATRAS
		me.player2.animations.add('caminarAtras', [25, 204, 23, 22, 21, 20, 19, 18, 17], 8, true);
		//SECUENCIA SALTOS
		me.player2.animations.add('saltar', [28, 29, 30], 8, true);
		//SECUENCIA PARA AGACHARSE
		me.player2.animations.add('agachar', [26, 27], 10, true);
		//SECUENCIA PUÑOS
		// me.player2.animations.add('puños', [31, 32, 33, 34, 35, 36], 15, true);
		me.player2.animations.add('puños', [31, 32, 34, 35, 36], 15, true);
		//SECUENCIA PATADAS
		// me.player2.animations.add('patadas', [37, 38, 39, 40, 41, 42, 43], 15, true);
		me.player2.animations.add('patadas', [37, 38, 39, 40, 41, 42], 15, true);
		//SECUENCIA CUBRIRSE
		me.player2.animations.add('cubrirse', [44, 45, 46], 15, true);
		//SECUENCIA CUANDO LO GOLPEAN
		me.player2.animations.add('golpePuño', [47, 48, 49], 15, true);
		//SECUENCIA CUANDO LO GOLPEAN CON PATADAS
		me.player2.animations.add('golpePatada', [50, 51, 52, 53, 54, 55], 15, true);
		//SECUENCIA PARA CAER
		me.player2.animations.add('caer', [56, 57, 58, 59], 15, false);
		// festejo [10,11,12,14,15,16,17,18,19]
		me.player2.animations.add('festejo', [14, 15, 16, 15], 7.6, true);

		me.player2.anchor.set(0.5);
		me.game.physics.enable(me.player2, Phaser.Physics.ARCADE);
		me.player2.body.collideWorldBounds = true;

		// CAMARA SIGUE AL JUGADOR 1
		// me.camara = me.game.camera.follow(me.player1, Phaser.Camera.FOLLOW_PLATFORMER);

		//SONIDOS
		me.musicaPatada = me.game.add.audio('patada');
		me.musicaPuno = me.game.add.audio('puno');
		me.musicaTema = me.game.add.audio('tema');
		me.musicaTema.play();

		//BOTONES DE JUEGO
		me.player1Izq = me.game.input.keyboard.addKey(Phaser.Keyboard.A);
		me.player1Der = me.game.input.keyboard.addKey(Phaser.Keyboard.D);
		me.player1Arriba = me.game.input.keyboard.addKey(Phaser.Keyboard.W);
		me.player1Abajo = me.game.input.keyboard.addKey(Phaser.Keyboard.S);

		me.player1Puño = me.game.input.keyboard.addKey(Phaser.Keyboard.C);
		me.player1Patada = me.game.input.keyboard.addKey(Phaser.Keyboard.V);
		me.player1Defensa = me.game.input.keyboard.addKey(Phaser.Keyboard.B);

		var teclado = me.game.input.keyboard.createCursorKeys();
		me.player2Izq = teclado.left;
		me.player2Der = teclado.right;
		me.player2Arriba = teclado.up;
		me.player2Abajo = teclado.down;

		me.player2Puño = me.game.input.keyboard.addKey(Phaser.Keyboard.I);
		me.player2Patada = me.game.input.keyboard.addKey(Phaser.Keyboard.O);
		me.player2Defensa = me.game.input.keyboard.addKey(Phaser.Keyboard.P);

		me.reInit = me.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		console.log("-----------------------------" + "\n" +
			"player1Izq = Keyboard.A" + "\n" +
			"player1Der = Keyboard.D" + "\n" +
			"player1Arriba = Keyboard.W" + "\n" +
			"player1Abajo = Keyboard.S" + "\n" +
			"player1Puño = Keyboard.C" + "\n" +
			"player1Patada = Keyboard.V" + "\n" +
			"player1Defensa = Keyboard.B" + "\n" +
			"-----------------------------" + "\n" +
			"player2Izq = teclado.left" + "\n" +
			"player2Der = teclado.right" + "\n" +
			"player2Arriba = teclado.up" + "\n" +
			"player2Abajo = teclado.down" + "\n" +
			"player2Puño = Keyboard.I" + "\n" +
			"player2Patada = Keyboard.O" + "\n" +
			"player2Defensa = Keyboard.P" + "\n" +
			"-----------------------------" + "\n" +
			"reInit = Keyboard.SPACEBAR" + "\n" +
			"-----------------------------");


		//Barras de vida y salud
		barraXplayer1 = 100;
		barraYplayer1 = 100;
		barraXplayer2 = 100;
		barraYplayer2 = 100;

		me.myHealthBarXPlayer1 = new HealthBar(me.game,
			{ width: 450, height: 40, x: w05 - 30, y: 80, bg: { color: '#101010' }, bar: { color: '#132FD3' }, flipped: true });
		//Etiquetas
		me.textPlayer1 = me.game.add.text(w05 - 40, 40, "Rayden", { font: "32px ARIAL", fill: "#ffffff", align: "left" });
		me.textPlayer1.anchor.setTo(1, 0);
		// me.textPlayer1.fixedToCamera = true;
		me.game.add.text(w05 - 470, 110, "Energy", { font: "16px ARIAL", fill: "#ffffff", align: "left" }).anchor.setTo(0, 1);
		me.textBarraXplayer1 = me.game.add.text(w05 - 40, 110, "barraXplayer1 ", { font: "16px ARIAL", fill: "#ffffff", align: "left" });
		me.textBarraXplayer1.text = barraXplayer1 + '%';
		me.textBarraXplayer1.anchor.setTo(1, 1);
		// me.textBarraXplayer1.fixedToCamera = true;

		me.myHealthBarYPlayer1 = new HealthBar(me.game,
			{ width: 450, height: 40, x: w05 - 30, y: 130, bg: { color: '#101010' }, bar: { color: '#84A5E7' }, flipped: true });
		//Etiquetas
		me.game.add.text(w05 - 470, 160, "Live", { font: "16px ARIAL", fill: "#ffffff", align: "left" }).anchor.setTo(0, 1);
		me.textBarraYplayer1 = me.game.add.text(w05 - 40, 160, "barraYplayer1", { font: "16px ARIAL", fill: "#ffffff", align: "left" });
		me.textBarraYplayer1.text = barraYplayer1 + '%';
		me.textBarraYplayer1.anchor.setTo(1, 1);
		// me.textBarraYplayer1.fixedToCamera = true;

		me.myHealthBarXPlayer2 = new HealthBar(me.game,
			{ width: 450, height: 40, x: w05 + 30, y: 80, bg: { color: '#101010' }, bar: { color: '#3EAA00' }, flipped: false });
		//Etiquetas
		me.textPlayer2 = me.game.add.text(w05 + 40, 40, "Sonya", { font: "32px ARIAL", fill: "#ffffff", align: "left" });
		me.textPlayer2.anchor.setTo(0, 0);
		// me.textPlayer2.fixedToCamera = true;
		me.game.add.text(w05 + 470, 110, "Energy", { font: "16px ARIAL", fill: "#ffffff", align: "left" }).anchor.setTo(1, 1);
		me.textBarraXplayer2 = me.game.add.text(w05 + 40, 110, "barraXplayer2", { font: "16px ARIAL", fill: "#ffffff", align: "left" });
		me.textBarraXplayer2.text = barraXplayer2 + '%';
		me.textBarraXplayer2.anchor.setTo(0, 1);
		// me.textBarraXplayer2.fixedToCamera = true;

		me.myHealthBarYPlayer2 = new HealthBar(me.game,
			{ width: 450, height: 40, x: w05 + 30, y: 130, bg: { color: '#101010' }, bar: { color: '#C8C864' }, flipped: false });
		//Etiquetas
		me.game.add.text(w05 + 470, 160, "Live", { font: "16px ARIAL", fill: "#ffffff", align: "left" }).anchor.setTo(1, 1);
		me.textBarraYplayer2 = me.game.add.text(w05 + 40, 160, "barraYplayer2", { font: "16px ARIAL", fill: "#ffffff", align: "left" });
		me.textBarraYplayer2.text = barraYplayer2 + '%';
		me.textBarraYplayer2.anchor.setTo(0, 1);
		// me.textBarraYplayer2.fixedToCamera = true;

		//TEXTO
		me.stateText = me.game.add.text(w05, h05, '', { font: '84px Arial', fill: '#ffffff' });
		me.stateText.anchor.setTo(0.5, 1);
		me.stateText.visible = true;	// true / false
		me.stateText.fixedToCamera = true;

		me.playerWin = 0;
	},

	update: function () {
		var me = this;

		me.player2.body.velocity.x = 0;
		me.player2.body.velocity.y = 0;
		me.player1.body.velocity.x = 0;
		me.player1.body.velocity.y = 0;

		// me.reInit
		if (me.reInit.isDown) {
			me.musicaTema.stop();
			me.game.state.restart();
		}

		//VALIDA EL SENTIDO DE LOS SPRITES
		if (me.player1.x - me.player2.x < 0) {
			sentido = true;
			me.player1.scale.setTo(1, 1);
			me.player2.scale.setTo(-1, 1);
		} else {
			sentido = false;
			me.player1.scale.setTo(-1, 1);
			me.player2.scale.setTo(1, 1);
		}

		// ENERGYs
		if (me.textBarraXplayer1.text != barraXplayer1 + '%') {
			me.textBarraXplayer1.text = barraXplayer1 + '%';
			me.myHealthBarXPlayer1.setPercent(barraXplayer1);
			if (barraXplayer1 <= 0) {
				if (sentido) {
					me.player1.x += (-50);
					me.player2.x += (+50);
				}
				else {
					me.player1.x += (+50);
					me.player2.x += (-50);
				}
				me.playerWin = 2;
			}
		}
		if (me.textBarraXplayer2.text != barraXplayer2 + '%') {
			me.textBarraXplayer2.text = barraXplayer2 + '%';
			me.myHealthBarXPlayer2.setPercent(barraXplayer2);
			if (barraXplayer2 <= 0) {
				if (sentido) {
					me.player1.x += (-50);
					me.player2.x += (+50);
				}
				else {
					me.player1.x += (+50);
					me.player2.x += (-50);
				}
				me.playerWin = 1;
			}
		}

		

		// LIVEs
		if (me.textBarraYplayer1.text != barraYplayer1 + '%') {
			me.textBarraYplayer1.text = barraYplayer1 + '%';
			me.myHealthBarYPlayer1.setPercent(barraYplayer1);
			if (barraYplayer1 <= 0) {
				if (sentido) {
					me.player1.x += (-50);
					me.player2.x += (+50);
				}
				else {
					me.player1.x += (+50);
					me.player2.x += (-50);
				}
				me.playerWin = 2;
			}
		}
		if (me.textBarraYplayer2.text != barraYplayer2 + '%') {
			me.textBarraYplayer2.text = barraYplayer2 + '%';
			me.myHealthBarYPlayer2.setPercent(barraYplayer2);
			if (barraYplayer2 <= 0) {
				if (sentido) {
					me.player1.x += (-50);
					me.player2.x += (+50);
				}
				else {
					me.player1.x += (+50);
					me.player2.x += (-50);
				}
				me.playerWin = 1;
			}
		}
		



		if (me.playerWin == 1) {
			me.stateText.text = "Rayden Win!";
			me.player1.animations.play('festejo');
			me.player2.animations.play('caer');
		}
		else if (me.playerWin == 2) {
			me.stateText.text = "Sonya Win!";
			me.player2.animations.play('festejo');
			me.player1.animations.play('caer');
		}
		else if (me.playerWin == 3) {
			me.stateText.text = "Diuse!";		// Empate ?
			me.player2.animations.play('festejo');
			me.player1.animations.play('festejo');
		}
		else if (contadorGolpesPlayer1 >= 50) {
			me.player1.animations.play('caer');
			contadorGolpesPlayer1 = 0;
		}
		else if (contadorGolpesPlayer2 >= 50) {
			me.player2.animations.play('caer');
			contadorGolpesPlayer2 = 0;
		}
		else {
			//JUGADOR 2
			//MOVER IZQUIERDA
			if (me.player2Izq.isDown) {
				me.player2.body.velocity.x -= 240;
				if (!sentido)
					me.player2.animations.play('caminarAtras');
				else
					me.player2.animations.play('caminar');
			}
			//MOVER DERECHA
			else if (me.player2Der.isDown) {
				me.player2.body.velocity.x += 240;
				if (sentido)
					me.player2.animations.play('caminarAtras');
				else
					me.player2.animations.play('caminar');
			}
			//SALTAR
			// else if (me.player2Arriba.isDown && me.player2.y == h05+120) {
			// 	me.player2.animations.play('saltar');
			// 	me.player2.body.velocity.y -= 500;
			// }
			else if (me.player2Arriba.isDown) {
				me.player2.animations.play('saltar');
			}
			//AGACHARSE
			else if (me.player2Abajo.isDown) {
				me.player2.animations.play('agachar');
			}
			//DAR PUÑOS
			else if (me.player2Puño.isDown && (barraYplayer2 > 0)) {
				me.player2.animations.play('puños');
				me.musicaPuno.play();
				if (me.x_dif(me.player1, me.player2, 75)) {
					if (!me.player1Defensa.isDown) {
						barraXplayer1--;
						if (barraXplayer1 <= 0) barraXplayer1 = 0;

						me.player1.animations.play('golpePuño');
						contadorGolpesPlayer1++;
					}
					barraYplayer2 -= 0.5;
					if (barraYplayer2 <= 0) barraYplayer2 = 0;
				}
			}
			//DAR PATADA
			else if (me.player2Patada.isDown && (barraYplayer2 > 0)) {
				me.player2.animations.play('patadas');
				me.musicaPatada.play();
				if (me.x_dif(me.player1, me.player2, 75)) {
					if (!me.player1Defensa.isDown) {
						barraXplayer1--;
						if (barraXplayer1 <= 0) barraXplayer1 = 0;

						me.player1.animations.play('golpePatada');
						contadorGolpesPlayer1++;
					}
					barraYplayer2 -= 0.5;
					if (barraYplayer2 <= 0) barraYplayer2 = 0;
				}
			}
			//CUBRIRSE
			else if (me.player2Defensa.isDown) {
				me.player2.animations.play('cubrirse');
			}
			//QUIETO
			else {
				me.player2.animations.play('inicio');
			}


			//JUGADOR 1
			//MOVER IZQUIERDA
			if (me.player1Izq.isDown) {
				me.player1.body.velocity.x -= 240;
				if (sentido)
					me.player1.animations.play('caminarAtras');
				else
					me.player1.animations.play('caminar');
			}
			//MOVER DERECHA
			else if (me.player1Der.isDown) {
				me.player1.body.velocity.x += 240;
				if (!sentido)
					me.player1.animations.play('caminarAtras');
				else
					me.player1.animations.play('caminar');
			}
			//SALTAR
			// else if (me.player1Arriba.isDown && me.player1.y == h05+120) {
			// 	me.player1.animations.play('saltar');
			// 	me.player1.body.velocity.y -= 500;
			// }
			else if (me.player1Arriba.isDown) {
				me.player1.animations.play('saltar');
			}
			//AGACHARSE
			else if (me.player1Abajo.isDown) {
				me.player1.animations.play('agachar');
			}
			//DAR PUÑOS
			else if (me.player1Puño.isDown && (barraYplayer1 > 0)) {
				me.player1.animations.play('puños');
				me.musicaPuno.play();
				if (me.x_dif(me.player1, me.player2, 75)) {
					if (!me.player2Defensa.isDown) {
						barraXplayer2--;
						if (barraXplayer2 <= 0) barraXplayer2 = 0;

						me.player2.animations.play('golpePuño');
						contadorGolpesPlayer2++;
					}
					barraYplayer1 -= 0.5;
					if (barraYplayer1 <= 0) barraYplayer1 = 0;
				}
			}
			//DAR PATADA
			else if (me.player1Patada.isDown && (barraYplayer1 > 0)) {
				me.player1.animations.play('patadas');
				me.musicaPatada.play();
				if (me.x_dif(me.player1, me.player2, 75)) {
					if (!me.player2Defensa.isDown) {
						barraXplayer2--;
						if (barraXplayer2 <= 0) barraXplayer2 = 0;

						me.player2.animations.play('golpePatada');
						contadorGolpesPlayer2++;
					}
					barraYplayer1 -= 0.5;
					if (barraYplayer1 <= 0) barraYplayer1 = 0;
				}
			}
			//CUBRIRSE
			else if (me.player1Defensa.isDown) {
				me.player1.animations.play('cubrirse');
			}
			//QUIETO
			else {
				if (!((me.player2Puño.isDown || me.player2Patada.isDown)
					&& me.x_dif(me.player1, me.player2, 75) && !me.player1Defensa.isDown))
					me.player1.animations.play('inicio');
			}
		}
	},


	x_dif: function (player1, player2, limit) {
		var result = false;
		var dif = (player1.body.x + (player1.body.width / 2)) - (player2.body.x + (player2.body.width / 2));
		if (dif < 0) dif = dif * (-1);
		if (dif < limit) result = true;
		return result;
	}
}
