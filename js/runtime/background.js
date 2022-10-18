import Databus from "../databus";
const databus = new Databus()
export default class Background {
  constructor() {
    const bgImages = [databus.imgObj.bg_day, databus.imgObj.bg_night]
    this.image = bgImages[Math.floor(Math.random() * 2)]
    this.x = 0
    this.y = 0
    this.w = this.image.width
    this.h = databus.canvas.height
    this.ty = databus.canvas.height / 2
    this.tx = databus.canvas.width / 2

    databus.addActor(this)
  }
  update() {
    this.x -= databus.speed
    // 折返点
    if (this.x <= -this.w) {
      this.x = 0
    }
  }
  render() {
    databus.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    databus.ctx.drawImage(this.image, this.x + this.w, this.y, this.w, this.h)
    databus.ctx.drawImage(this.image, this.x + this.w * 2, this.y, this.w, this.h)
  }
}

