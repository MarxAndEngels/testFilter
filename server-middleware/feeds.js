const axios = require('axios')
import {mainDomain} from '../app/variables'
export default async function (req, res, next) {
  let link = ''
  if(req.headers.host === mainDomain){
    link = 'https://api.стелс-авто.рф/feeds/yandex/xml/stels-avto-rf/main'
  }
  if(link !== ''){
    let response = await getXml(link)
    res.setHeader('Content-Type', response.headers['content-type']);
    res.end(response.data);
  }
  next()
}

async function getXml(link) {
  return axios({
    method: 'get',
    url: link
  });
}