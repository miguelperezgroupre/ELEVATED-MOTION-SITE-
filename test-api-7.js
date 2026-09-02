const url = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property?access_token=6baca547742c6f96a6ff71b138424f21&$top=1";
fetch(url).then(res => res.json()).then(console.log).catch(console.error);
