/* global lib, gameItems */
/* eslint-disable no-unused-vars */
class GameItem {
  constructor(x, y, width, height, domElement) {
    this.x = x;
    this.y = y;
    this.xV = 0;
    this.yV = 0;
    this.width = width;
    this.height = height;
    this.canMove = false;
    this.domElement = domElement;
    this.inGame = true;
    this.initialiseDomElement();
    this.draw();
  }

  initialiseDomElement() {
    this.domElement.style.position = 'absolute';
    this.domElement.style.width = `${this.width}%`;
    this.domElement.style.height = `${this.height}%`;
    document.getElementById('game').appendChild(this.domElement);
  }

  draw() {
    const top = 100 - this.y - this.height;
    this.domElement.style.top = `${top}%`;
    this.domElement.style.left = `${this.x}%`;
  }

  remove() {
    this.domElement.remove();
    this.inGame = false;
    gameItems.splice(gameItems.indexOf(this), 1);
  }

  xVelocity(v) {
    if (v === undefined) return this.xV;
    this.xV = v;
  }

  yVelocity(v) {
    if (v === undefined) return this.yV;
    this.yV = v;
  }

  move() {
    if(this.yV || this.xV) {
      this.y += this.yV;
      this.x += this.xV;
      this.draw();
    }
  }

  collisionDirection(object) {
    const o1 = lib.dimensions(this);
    const o2 = lib.dimensions(object);
    const xOverlap = Math.max(0, Math.min(o1.r, o2.r) - Math.max(o1.l, o2.l));
    const yOverlap = Math.max(0, Math.min(o1.b, o2.b) - Math.max(o1.t, o2.t));
    if(xOverlap < yOverlap) return 'x';
    return 'y';
  }

  collidesWithObject(object) {
    const o1 = lib.dimensions(this);
    const o2 = lib.dimensions(object);
    const collides = ((o1.r > o2.l) && (o1.l < o2.r))
      && ((o1.t < o2.b) && (o1.b > o2.t));
    return collides;
  }

  collidesWith(arrayOfObjects) {
    return arrayOfObjects.filter(object => this.collidesWithObject(object));
  }

  hitByBall() {
    // Do nothing by default
  }
}
