// 使用单例模式
let instance
export default class Databus {
  constructor() {
    if (instance) return instance
    instance = this

    // 游戏难度
    this.speed = 2
    this.pipeFrequency = 150
    this.strength = 10

    this.canvas
    this.ctx
    this.imgObj = {}
    this.load = false
    this.actors = []
    this.bird
    this.scene = 0
    this.score = 0
    this.best = 0
  }

  addActor(actor) {
    this.actors.push(actor)
  }

  reset() {
    this.actors = []
    this.bird = null
    this.speed = 2
    this.scene = 0
    this.score = 0
  }
}