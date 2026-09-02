const token = "6baca547742c6f96a6ff71b138424f21";
const url = `https://api.bridgedataoutput.com/api/v2/OData/miamire/Property?access_token=${token}&$top=1`;
fetch(url).then(r=>r.json()).then(console.log).catch(console.error);

fetch('https://api.bridgedataoutput.com/api/v2/pub/listings?access_token=' + token + '&$top=1').then(r=>r.json()).then(console.log).catch(console.error);
