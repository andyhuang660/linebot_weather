import axios from 'axios'
// import template from './template.js'

const getData = async (event) => {
  try {
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
    const idx = data.XML_Head.Infos.Info.findIndex(item => item.Name === event.message.text)
    if (idx > -1) {
      event.reply({
        type: 'location',
        title: data.XML_Head.Infos.Info[idx].Name,
        address: data.XML_Head.Infos.Info[idx].Add,
        latitude: data.XML_Head.Infos.Info[idx].Py,
        longitude: data.XML_Head.Infos.Info[idx].Px
      })
    } else {
      event.reply('沒有這個景點')
      // console.log(template)
      event.reply([
        {
          type: 'flex',
          altText: '推薦地點',
          contents: {
            type: 'carousel',
            contents: 'template'
          }
        }
      ])
    }
  } catch (error) {
  }
}

const filterData = async (event) => {
  try {
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
    const idx = data.XML_Head.Infos.Info
    const filData = idx.filter(item => item.Region === event.message.text)
    const number = Math.round(Math.random() * filData.length)
    event.reply({
      type: 'location',
      title: filData[number].Name,
      address: filData[number].Add,
      latitude: filData[number].Py,
      longitude: filData[number].Px,
      description: filData[number].Description
    })
  } catch (error) {
  }
}

const getWeather = async (event) => {
  try {
    const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-8F645170-5E40-4414-A0FE-199E170401D7'
    const { data } = await axios.get(url)
    const location = data.records.location
    const filLocation = location.filter(item => item.locationName === event.message.text)
    const filData = []
    let i = 0
    filLocation.forEach(function (item, index) {
      item.weatherElement.forEach(function (item, index) {
        item.time.forEach(function (item, index) {
          filData.push(item)
        })
        i += 3
      })
    })
    const firstWeather = []
    for (const value in filData) {
      if (value % 3 === 0) {
        firstWeather.push(filData[value])
      }
    }
    // event.reply({
    //   type: 'bubble',
    //   hero: {
    //     type: 'image',
    //     url: 'https://img.ixintu.com/download/jpg/201912/fc97bb07545e5998a857af33939e9fb6.jpg!ys',
    //     size: 'full',
    //     aspectRatio: '20:13',
    //     aspectMode: 'cover'
    //   },
    //   body: {
    //     type: 'box',
    //     layout: 'vertical',
    //     contents: [
    //       {
    //         type: 'text',
    //         text: '12小時天氣預報',
    //         weight: 'bold',
    //         size: 'xl'
    //       },
    //       {
    //         type: 'box',
    //         layout: 'vertical',
    //         margin: 'lg',
    //         spacing: 'sm',
    //         contents: [
    //           {
    //             type: 'box',
    //             layout: 'baseline',
    //             spacing: 'sm',
    //             contents: [
    //               {
    //                 type: 'text',
    //                 text: '時間',
    //                 color: '#aaaaaa',
    //                 size: 'sm',
    //                 flex: 1
    //               },
    //               {
    //                 type: 'text',
    //                 text: `${firstWeather[0].startTime} ~ ${firstWeather[0].endTime}`,
    //                 wrap: true,
    //                 color: '#666666',
    //                 size: 'sm',
    //                 flex: 5
    //               }
    //             ]
    //           },
    //           {
    //             type: 'box',
    //             layout: 'baseline',
    //             spacing: 'sm',
    //             contents: [
    //               {
    //                 type: 'text',
    //                 text: '天氣狀況：',
    //                 color: '#aaaaaa',
    //                 size: 'sm',
    //                 flex: 1
    //               },
    //               {
    //                 type: 'text',
    //                 text: `${firstWeather[0].parameter.parameterName}`,
    //                 wrap: true,
    //                 color: '#666666',
    //                 size: 'sm',
    //                 flex: 5
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // })

    event.reply({
      type: 'text',
      text: `${firstWeather[0].startTime} ~ ${firstWeather[0].endTime}
    天氣狀況：${firstWeather[0].parameter.parameterName}
    降雨機率：${firstWeather[1].parameter.parameterName}%
    溫度：${firstWeather[2].parameter.parameterName}°C~ ${firstWeather[4].parameter.parameterName}°C`
    })
  } catch (error) {
    event.reply('錯誤')
  }
}

export default {
  getData,
  filterData,
  getWeather
}
