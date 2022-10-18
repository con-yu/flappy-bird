import Databus from "../databus";
import Music from "../runtime/music";

// 默认下落速度(难度偏大)
const GRAVITY = 0.98 / 2.9
const G = GRAVITY
// const G = 0.3 / 2.9

const databus = new Databus()
export default class Bird {
  constructor() {
    const birdImages = [
      [databus.imgObj.bird0_0, databus.imgObj.bird0_1, databus.imgObj.bird0_2],
      [databus.imgObj.bird1_0, databus.imgObj.bird1_1, databus.imgObj.bird1_2],
      [databus.imgObj.bird2_0, databus.imgObj.bird2_1, databus.imgObj.bird2_2]
    ]
    this.images = birdImages[Math.floor(Math.random() * 3)]
    this.wing = 0
    this.image = this.images[this.wing]
    this.x = 100
    this.y = 200
    this.w = this.image.width
    this.h = this.image.height
    this.t = 0
    this.ey = databus.canvas.height - this.h - databus.imgObj.land.height + 10
    this.fly = false
    this.rotate = 0

    if (!this.music) {
      this.music = new Music()
    }

    databus.addActor(this)
    databus.bird = this
  }
  update() {
    if (this.flag) return this.flag = false
    // 改变翅膀样式(除游戏结束场景外)
    if (databus.scene !== 2) this.wing++
    if (this.wing > 2) {
      this.wing = 0
    }

    if (this.fly) {
      this.t++
      this.rotate += 0.08
      if (this.rotate >= Math.PI / 2) {
        this.rotate = Math.PI / 2
      }
      this.y = this.y - databus.strength + G * this.t * this.t / 2

      // 小鸟触地 游戏结束
      if (this.y >= this.ey) {
        this.y = this.ey
        if (databus.scene === 1) {
          databus.scene = 2
          this.music.playCrash()
          this.music.playGameOver()

        }
      }
      if (this.y < -10) {
        this.y = -10
      }
    }
    this.flag = true
  }
  render() {

    this.image = this.images[this.wing]
    databus.ctx.save()
    databus.ctx.translate(this.x + this.w / 2, this.y + this.h / 2)
    databus.ctx.rotate(this.rotate)
    databus.ctx.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h)
    databus.ctx.restore()

  }

  bindFly() {
    this.fly = true
    this.t = 0
    this.rotate = -1
  }
}

