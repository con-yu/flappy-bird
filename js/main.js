import Databus from "./databus";
import ResourcesLoader from "./base/resourcesLoader";
import Background from './runtime/background'
import Land from './runtime/land'
import Pipe from "./runtime/pipe";
import Bird from "./player/bird";
import Score from './player/score'
import Over from './player/over'
import Panel from './player/panel'
import Music from './runtime/music'


const databus = new Databus()

export default class Main {
  constructor() {
    // 获取canvas画布  以及构图上下文
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext('2d')
    this.frames = 0
    databus.canvas = this.canvas
    databus.ctx = this.ctx

    this.resources = new ResourcesLoader()
    this.status = false
    this.loop()
    this.bindEvent()
  }

  // 初始化方法
  init() {
    if (this.status) return
    this.status = true
    // 清空数据
    this.over = null
    databus.reset()
    this.bg = new Background()
    this.land = new Land()
    this.bird = new Bird()
    this.score = new Score()

    this.bg.render()
    this.land.render()

    if (!this.music) {
      this.music = new Music()

    }

  }

  update() {
    // 每次重新绘制
    databus.ctx.clearRect(0, 0, databus.canvas.width, databus.canvas.height)
    databus.actors.forEach(a => {
      a.update()
      a.render()
    })
    this.score.render()
  }
  loop() {
    // 开启定时器
    requestAnimationFrame(() => {
      // 判断图片是否加载完成
      if (databus.load) {
        // 进行场景判断 0游戏开始  1游戏进行  2游戏结束
        switch (databus.scene) {
          case 0:
            this.init()
            break;
          case 1:
            // 每隔一定帧(和难度有关)生成一对管子
            if (this.frames % databus.pipeFrequency === 0) {
              const pipe = new Pipe()
            }
            break
          case 2:
            databus.speed = 0
            databus.bird.wing = 0
            databus.bird.rotate = Math.PI / 2
            if (!this.over) {
              this.over = new Over()
              this.panel = new Panel()
            }
            if (databus.score > databus.best) {
              databus.best = databus.score
            }
            break;
        }

        this.update()
      }

      this.frames++
      this.loop()
    })
  }

  bindEvent() {
    wx.onTouchStart(() => {
      switch (databus.scene) {
        case 0:
          this.bird.bindFly()
          databus.scene = 1
          break;
        case 1:
          this.bird.bindFly()
          break;
        case 2:
          databus.scene = 0
          this.status = false
          this.music.playBgm()
          break;
      }
    })
  }
}
