import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene {
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars!: Phaser.Physics.Arcade.Group;
    private modal!: Phaser.GameObjects.Container;
    private score: number = 0;
    private groundTop!: Phaser.Physics.Arcade.StaticGroup;
    private groundBottom!: Phaser.Physics.Arcade.StaticGroup;
    private modalElements!: any;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');
        
        // Load game assets
        this.load.image('sky', 'latest.png');
        this.load.image('ground-top', 'top.svg');
        this.load.image('ground-bottom', 'botoom.svg');
        this.load.image('tile', '222.svg');  // Load the tile image
        this.load.image('star', 'star.png');  // Load the star image
        this.load.image('D','D.svg');
        this.load.image('A','A.svg');
        this.load.image('C','C.svg')
        this.load.image('ch','ch.svg')
        this.load.image('cl','complex.svg')
        this.load.image('B2','B2.png')
        this.load.image('B3','B3.png')
        this.load.image('L1','L1.png')
        this.load.image('L2','L2.png')
        this.load.image('B1','B1.png')



        
        // Load player sprites
        this.load.image('still1', 'still position 1.png');
        this.load.image('still2', 'still position 2.png');
        this.load.image('walk1', 'walking positon 1.png');
        this.load.image('walk2', 'walking position 2.png');
        this.load.image('jump1', 'jumping pposition 1.png');
        this.load.image('jump2', 'jumping position 2.png');
        this.load.image('jump3', 'jumping position 3.png');
        
        
        this.load.image('collectible', 'star.png');
    }

    create() {
        // Get window dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(width,height)
        // Add background
        const bg = this.add.image(width/2, height/2, 'sky');
        bg.setDisplaySize(width, height );
        
        // Remove the blue background color since we have an image
        // this.cameras.main.setBackgroundColor('#1e90ff');  // Dodger blue sky color

        // Create ground layers
        this.groundBottom = this.physics.add.staticGroup();
        this.groundTop = this.physics.add.staticGroup();

        // Create ground from wider platforms - bottom layer
        const bottom = this.groundBottom.create(width/2, height , 'ground-bottom');
        bottom.setScale(1000, 15).refreshBody();
        bottom.setAlpha(0); // Added transparency

        // Create ground from wider platforms - top layer (slightly above)
        // const top = this.groundTop.create(width/2, height - 25, 'ground-top');
        // top.setScale(1000, 5).refreshBody();
        // top.setAlpha(0.5); // Added transparency for top layer if uncommented

        // Create platforms with a more interesting layout
        this.platforms = this.physics.add.staticGroup();

        // Create a single tile platform
        const platform1 = this.platforms.create(842,  744, 'tile');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform2 = this.platforms.create(1920-835,  744, 'tile');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform3 = this.platforms.create(152,  717, 'D');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform4= this.platforms.create(1783,  717, 'D');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform5 = this.platforms.create(528,  848, 'A');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform6= this.platforms.create(1399,  848, 'A');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform7 = this.platforms.create(265,  280, 'C');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform8= this.platforms.create(1666,  280, 'C');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform9= this.platforms.create(960,  410, 'A');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        const platform10 = this.platforms.create(408,  513, 'cl');
        platform10.setScale(0.8).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform11 = this.platforms.create(1524,  513, 'cl');
        platform11.setScale(0.8).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform11.setFlipX(true); // Slightly transparent
        const platform12 = this.platforms.create(587,  464, 'ch');
        platform12.setScale(0.8).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform13= this.platforms.create(1342,  464, 'ch');
        platform13.setScale(0.8).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform13.setFlipX(true); // Slightly transparent
        const platform14= this.platforms.create(136,  990, 'B1');
        const platform15= this.platforms.create(960,  990, 'B2');
        const platform16= this.platforms.create(1784,  990, 'B3');
        const platform17= this.platforms.create(521,  1051, 'L1');
        const platform18= this.platforms.create(1399,  1051, 'L2');
    }
}