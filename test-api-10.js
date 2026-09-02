const token = "6baca547742c6f96a6ff71b138424f21";
const url = `https://api.bridgedataoutput.com/api/v2/miamire/listings?access_token=${token}&limit=1`;
fetch(url).then(res => res.json()).then(d => console.log(JSON.stringify(d).substring(0,250)));
