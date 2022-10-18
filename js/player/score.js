import Databus from '../databus'
import Music from "../runtime/music";
const databus = new Databus()
export default class Score {
  constructor() {
    this.x = databus.canvas.width / 2
    this.y = 100
    // 记录当前最高分
    this.currentBest = databus.best
    this.isBroken = false

    if (!this.music) {
      this.music = new Music()
    }

  }

  render() {

    // 如果当前分数超过了最高分 分数颜色改变👍
    if (!this.isBroken && databus.score > this.currentBest) {
      this.isBroken = true
      this.music.playBreakRecordAudio()
    }
    // 游戏未开始时 score样式透明 界面更简洁
    let scoreStyle = databus.scene === 0 ? 'rgba(0,0,0,0)' : '#fff'
    let bestStyle = 'yellow'
    databus.ctx.fillStyle = this.isBroken ? bestStyle : scoreStyle

    databus.ctx.font = '40px Arail'
    databus.ctx.textAlign = 'center'
    databus.ctx.fillText(databus.score, this.x, this.y)
  }

}