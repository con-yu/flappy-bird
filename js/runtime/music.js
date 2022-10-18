let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if (instance) return instance

    instance = this

    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.loop = true
    this.bgmAudio.src = 'audio/bgm.mp3'

    this.crashAudio = wx.createInnerAudioContext()
    this.crashAudio.src = 'audio/crash.mp3'

    this.gameOverAudio = wx.createInnerAudioContext()
    this.gameOverAudio.src = 'audio/game_over.mp3'

    this.breakRecordAudio = wx.createInnerAudioContext()
    this.breakRecordAudio.src = 'audio/best.mp3'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playCrash() {
    this.crashAudio.currentTime = 0
    this.crashAudio.play()
  }

  playGameOver() {
    this.gameOverAudio.currentTime = 0
    this.gameOverAudio.play()
  }

  playBreakRecordAudio() {
    this.breakRecordAudio.currentTime = 0
    this.breakRecordAudio.play()
  }
}
