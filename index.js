import 'dotenv/config'
import linebot from 'linebot'
import data from './data.js'

const bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
})

const cities = ['基隆市', '嘉義市', '臺北市', '嘉義縣', '新北市', '臺南市', '桃園縣', '高雄市', '新竹市', '屏東縣', '新竹縣', '臺東縣', '苗栗縣', '花蓮縣', '臺中市', '宜蘭縣', '彰化縣', '澎湖縣', '南投縣', '金門縣', '雲林縣', '連江縣']

bot.on('message', async event => {
  if (event.message.type === 'text') {
    const idx = cities.findIndex(item => item === event.message.text)
    if (idx > -1) {
      data.getWeather(event)
      // data.filterData(event)
    } else {
      data.getData(event)
    }
  }
})

bot.listen('/', process.env.PROT || 3000, () => {
  console.log('機器人啟動')
})
