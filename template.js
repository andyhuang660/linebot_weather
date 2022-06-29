export default {
  type: 'bubble',
  hero: {
    type: 'image',
    size: 'full',
    url: 'https://images.chinatimes.com/newsphoto/2021-04-13/656/20210413002886.jpg',
    aspectRatio: '20:13',
    aspectMode: 'cover'
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Brown Cafe',
        weight: 'bold',
        size: 'xl'
      },
      {
        type: 'text',
        text: 'hello world'
      }
    ]
  }
}
