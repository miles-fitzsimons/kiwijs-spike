var TemplateGame = TemplateGame || {};

TemplateGame.Play = new Kiwi.State( "Play" );

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
*/

/**
* This create method is executed when a Kiwi state has finished loading
* any resources that were required to load.
*/
TemplateGame.Play.create = function () {
	this.background = new Kiwi.GameObjects.StaticImage (
		this, this.textures['background'], 0, 0)

	this.character = new Kiwi.GameObjects.Sprite (
		this, this.textures['detective'], 350, 450, true)

	Kiwi.State.prototype.create.call( this );
	console.log('ffffff', this)
	this.background.scaleToHeight(700)
	/*
	* Replace with your own game creation code here...
	*/

	this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT );
	this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT );
	this.downKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.DOWN );
	this.runKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.SPACEBAR )

	this.character.animation.add(
		'idleright', [7], 0.1, false);
	// this.character.animation.add(
	// 	'crouchright', [1], 0.1, false);
	this.character.animation.add(
		'moveright', [7, 0, 1, 2, 3, 4, 5, 6], 0.1, true);
	this.character.animation.add(
		'idleleft', [8], 0.1, false);
	this.character.animation.add(
		'crouchleft', [9], 0.1, false);
	this.character.animation.add(
		'moveleft', [15, 14, 13, 12, 11, 10], 0.1, true);
	this.facing = 'right';
	this.character.animation.play('idleright');

	// Add the GameObjects to the stage
	this.addChild( this.background );
	this.addChild( this.character );
};


TemplateGame.Play.update = function() {

	Kiwi.State.prototype.update.call( this );

	// Crouch
	if (this.downKey.isDown) {
		if (this.character.animation.currentAnimation.name !== 'crouch' + this.facing) {
			this.character.animation.play('crouch' + this.facing)
		}
	}
	// Walk left
	else if (this.leftKey.isDown) {
		if (this.runKey.isDown) {
			console.log('runnnn')
		}
		this.facing = 'left'
		this.character.scaleX = -1
		if (this.character.transform.x > 3) {
			this.character.transform.x -= 3
		}
		if (this.character.animation.currentAnimation.name !== 'moveleft') {
			this.character.animation.play('moveright')
		}
	}
	// Walk right
	else if (this.rightKey.isDown) {
		this.facing = 'right'
		if (this.character.transform.x < 675) {
			this.character.transform.x += 3
		}
		if (this.character.animation.currentAnimation.name !== 'moveright') {
			this.character.animation.play('moveright')
		}
	}
	// Run
	else if (this.runKey.isDown) {
		if (this.character.transform.x < 675) {
			this.character.transform.x += 6
		}
	}
	// Reset to idle standing
	else if (this.character.animation.currentAnimation.name !== 'idle' + this.facing) {
		this.character.animation.play('idle' + this.facing)
	}

};
