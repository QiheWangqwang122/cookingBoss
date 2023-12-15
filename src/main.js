
'use strict';

/***
 * First Name :Qihe(Jason)
 * Last Naame :Wang
 * Physics, Text, Animation, Timing, Tiles phaser3 emmiter
 * 
 */

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [Menu, Play, GameOver, Farm, GameDescribe, Credit]  // assuming you have a Menu scene as well
  };
  
  const game = new Phaser.Game(config);
  let level;

  let cursors;