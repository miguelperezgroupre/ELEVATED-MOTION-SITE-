const url = "https://api.bridgedataoutput.com/api/v2/pub/listings?access_token=DEMO_TOKEN&$top=1";
fetch(url)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data).substring(0, 200)))
  .catch(err => console.error(err));
