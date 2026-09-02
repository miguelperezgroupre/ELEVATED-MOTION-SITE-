const url = "https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21&$top=1";
fetch(url).then(res => res.json()).then(d => console.log(d['@odata.context'], d.value[0]?.ResourceId)).catch(console.error);
