import axios from 'axios'
import Config from './Config'

export function getGifs(params){
    let promises = [];
    
    params.forEach(async item => {
        promises.push(axios.get(`${Config.url}/search?q=${item}&api_key=IML4tLAMo8Fvr90EnkTpnVK7r7eZXPBt`))
    })
    return promises
} 

export async function getGifsById(param){
    
    const resp = await axios.get(`${Config.url}/${param}?api_key=IML4tLAMo8Fvr90EnkTpnVK7r7eZXPBt`)
    return resp.data.data
} 