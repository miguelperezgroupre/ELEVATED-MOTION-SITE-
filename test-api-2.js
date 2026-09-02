const url = "https://api.bridgedataoutput.com/api/v2/pub/listings?access_token=6baca547742c6f96a6ff71b138424f21&$top=1";
fetch(url)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data).substring(0, 300)))
  .catch(err => console.error(err));
