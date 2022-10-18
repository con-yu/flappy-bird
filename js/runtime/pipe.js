import Databus from "../databus";
import Music from '../runtime/music'
const databus = new Databus()
export default class Pipe {
  constructor() {
    this.image1 = databus.imgObj.pipe_down
    this.image2 = databus.imgObj.pipe_up
    this.x = databus.canvas.width
    this.y1 = 0
    this.y2 = 0
    this.w = this.image1.width
    this.h1 = Math.floor(Math.random() * (400 - 200 + 1)) + 200
    this.door = Math.floor(Math.random() * (160 - 100 + 1)) + 100
    this.y2 = this.h1 + this.door
    this.h2 = databus.canvas.height - this.y2 - databus.imgObj.land.height
    this.sy1 = this.image1.height - this.h1
    this.pass = false
    if (!this.music) {
      this.music = new Music()
    }

    databus.addActor(this)
  }
  update() {
    this.x -= databus.speed
    // 销毁点
    if (this.x <= -this.w) {
      this.clearPast()
    }
    // 更新碰撞检测盒
    this.checkCrash()

  }
  render() {
    databus.ctx.drawImage(this.image1, 0, this.sy1, this.w, this.h1, this.x, this.y1, this.w, this.h1)
    databus.ctx.drawImage(this.image2, 0, 0, this.w, this.h2, this.x, this.y2, this.w, this.h2)
  }

  clearPast() {
    databus.actors = databus.actors.filter(item => {
      return item !== this
    })
  }

  checkCrash() {
    // 小鸟的检测盒
    const birdT = databus.bird.y + 10
    const birdB = databus.bird.y + 40
    const birdL = databus.bird.x + 6
    const birdR = databus.bird.x + 40
    // 管子的检测盒
    this.lX = this.x
    this.rX = this.x + this.w
    this.tY1 = this.h1
    this.bY2 = this.y2

    // 小鸟与管子碰撞 游戏结束
    if (birdR >= this.lX && birdL <= this.rX && (birdT <= this.tY1 || birdB >= this.bY2)) {
      if (databus.scene === 1) {
        databus.scene = 2
        this.music.playCrash()
        this.music.playGameOver()
      }

    }

    // 小鸟每经过一组管子 加一分
    if (!this.pass && birdR >= this.x) {
      databus.score++
      this.pass = true
    }
  }
}

