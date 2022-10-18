import { Resources } from "./resources";
import Databus from '../databus'
const databus = new Databus()
export default class ResourcesLoader {
  constructor() {
    this.srcs = Resources
    this.totalCount = Object.keys(this.srcs).length
    this.count = 0

    // 自动加载图片
    this.loadResources()
  }

  loadResources() {
    // 创建一个对象 存储所有的图片对象
    for (let i in this.srcs) {
      // 创建多个图片对象
      // 给每个对象的 src 赋值
      // 待图片加载完成  再进行游戏
      databus.imgObj[i] = wx.createImage()
      databus.imgObj[i].src = this.srcs[i]
      databus.imgObj[i].onload = () => {
        // 每次加载完一张图片
        this.count++
        // 判断是否所有的图片都加载完成
        if (this.count >= this.totalCount) {
          // console.log(this.count);
          databus.load = true
        }

      }
    }
  }
}

