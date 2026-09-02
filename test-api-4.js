const url = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property?access_token=6baca547742c6f96a6ff71b138424f21&$top=1";
const url2 = "https://api.bridgedataoutput.com/api/v2/OData/miamire/listings?access_token=6baca547742c6f96a6ff71b138424f21&$top=1";
const url3 = "https://api.bridgedataoutput.com/api/v2/miamire/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=1";
fetch(url3).then(res => res.json()).then(d => console.log('url3', JSON.stringify(d).substring(0,200)));
fetch(url2).then(res => res.json()).then(d => console.log('url2', JSON.stringify(d).substring(0,200)));
