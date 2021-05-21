const baseUrl = "/api/v1"
const requestDetails = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json"
  }
}

export const GET = async(url) => {
  try{
    let fullUrl = baseUrl + url
    const response = await fetch(fullUrl)
    if(!response.ok){
      let errorMessage = `${response.status} (${response.statusText})`
      throw(new Error(errorMessage))
    }
    let parsedResponse = await response.json()
    return parsedResponse
  } catch(err){
    console.log(`ERR: GET request to ${url} failed...`)
    console.log(err)
    return null
  }
}

export const POST = async(url, data) => {
  try{
    let fullUrl = baseUrl + url
    const response = await fetch(fullUrl, {
      ...requestDetails,
      ["method"]: 'POST',
      ["body"]: JSON.stringify(data)
    })
    if(!response.ok){
      let errorMessage = `${response.status} (${response.statusText})`
      throw(new Error(errorMessage))
    }
    let parsedResponse = await response.json()
    return parsedResponse
  } catch(err){
    console.log(`ERR: GET request to ${url} failed...`)
    console.log(err)
    return null
  }
}

export const DELETE = async(url, data = null) => {
  try{
    let fullUrl = baseUrl + url
    let params = {      
      ...requestDetails,
      ["method"]: "DELETE"
    }
    if(data != null){
      params.body = JSON.stringify(data)
    }
    const response = await fetch(fullUrl, params)
    if(!response.ok){
      let errorMessage = `${response.status} (${response.statusText})`
      throw(new Error(errorMessage))
    }
    let parsedResponse = await response.json()
    return parsedResponse
  } catch(err){
    console.log(`ERR: GET request to ${url} failed...`)
    console.log(err)
    return null
  }
}