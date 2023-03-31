import {mainDomain, apiSlug, apiDomain} from '../app/variables'
const axios = require('axios')
export default async function (req, res, next) {
    let link = ''
    if(req.headers.host === mainDomain.domain){
        link = `https://${apiDomain}/sitemap/xml/${apiSlug}`
    }
    if(link !== ''){
        let response = await getXml(link)
        res.setHeader('Content-Type', response.headers['content-type']);
        res.end(response.data);
    }
    // res is the Node.js http response object

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}

async function getXml(link) {
    return axios({
        method: 'get',
        url: link
    });
}
