# Kakao-Jump

App Academy JavaScript Project

## Background and Overview

[Kakao Jump](https://jaewooklim1.github.io/Kakao-Jump/) is a javascript project that emulates doodle jump but in a simpler way. The game has randomly generated platforms that the player must jump on top with the arrow keys with a score that keeps track of all the platforms they are able to reach. There is also a high score that keeps track of the highest score that the player achieves giving the player an incentive to do better!

![](https://i.imgur.com/Jsjh64J.jpg)

## Setup

Click 'enter' to start playing
WAD keys to move the character

# Functionality and MVPs

## MVP 1: Character Movement

The Kakao character is always jumping such and then using the 'a' or 'd' keys, (s is not included as there is no backward/down function)
the character would then jump up a couple of pixels on the screen everytime the spacebar is pressed. The sides of the screen are basically portals which allow the character to go to the other side of the screen as to make the game easier if the player is stuck.

## MVP 2: Platforms

The platforms number and locations are randomly generated that extend past the top screen. This is to ensure the character can never see the actual popping in of the platforms. After a certain point of stagnant platforms that the player traverses, some of the platforms will move from left to right to add an additional challenge to the game.

## MVP 3: Scores

The scores are kept track of based on how long and how far up you can get in the game. The high score tracks the highest score you achieve.

## Architecture and Technology

Javascript

The game logic is entirely coded in Object-Oriented Javascript.

https://i.imgur.com/nh56IJf.png

HTML Canvas

https://i.imgur.com/Y68KeS0.png

https://i.imgur.com/1liMf2c.png
