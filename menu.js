var config = {
    type: Phaser.AUTO,
    parent: 'body',
    width: window.innerWidth,
    height: window.innerHeight,
    // backgroundColor: '#865c38',
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('menu', 'http://media.discordapp.net/attachments/593811885787447297/924780848434274305/menujogo.png',
        { frameWidth: 1310, frameHeight: 667 });
}

function create ()
{
    menu = this.add.sprite((window.innerWidth - 1310) / 2, (window.innerHeight - 667) / 2, 'menu').setOrigin(0, 0);

    this.anims.create({
        key: 'menu-loop',
        frames: this.anims.generateFrameNumbers('menu', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1
    });
    menu.anims.play('menu-loop');

}

function update(){

    // console.log('teste')

    // cursors = this.input.keyboard.createCursorKeys();
    //
    //
    //
    // menu.anims.play('turn');

}
