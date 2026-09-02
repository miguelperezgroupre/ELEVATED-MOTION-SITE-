const token = "6baca547742c6f96a6ff71b138424f21";
const urls = [
  `https://api.bridgedataoutput.com/api/v2/miamire/listings?access_token=${token}&limit=1`,
  `https://api.bridgedataoutput.com/api/v2/OData/miamire/Property?access_token=${token}&$top=1`,
  `https://api.bridgedataoutput.com/api/v2/OData/miamire/listings?access_token=${token}&$top=1`
];
Promise.all(urls.map(url => fetch(url).then(res => res.json()).then(d => console.log(url, d.status || d.error?.code || 'OK'))));
