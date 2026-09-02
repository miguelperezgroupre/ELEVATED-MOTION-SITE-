fetch("https://api.bridgedataoutput.com/api/v2/datasets?access_token=6baca547742c6f96a6ff71b138424f21&limit=200").then(res => res.json()).then(d => {
  const miami = d.bundle.filter(b => JSON.stringify(b).toLowerCase().includes('miami'));
  console.log('miami datasets:', miami);
});
