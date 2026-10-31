const https = require('https');

const tokenUrl = "https://mercury-t2.phonepe.com/transact/pgv3?token=hq4wOGdzX31IuPyyh7/7AYOLiipO42P8QtgmusudZHta7zUAMbV5uMV5f6kF1hmvheryrLtNiVZDT1FkQeHESRxfzyvrAOPo9zQNvh0jmT0SDIawL6ZOcnh029RJh6laVsR1saZpr8vN7Gl9FEq1k1wrlqbHPKAX8jpNvo6nzE5PIKsisUMKZOyi089QJy5uu3/HaTzDGOpFqBRXF2PtbxhawQle1nVSpOroXZ6Mo/PncCeCte19znoqJ1vFF/rEI04fUucby10uroHJygiMWHHDPGc4/7ap1fNpEze0ClJ9YMzoG4QyZZG6p+x6e0/m0m+wBAGBd+aQs3O7n1R7BRaVWnEVpbdDbomi/9BrjlvQOIp6nZsaqz3Xl3rNaNO9TaAxUeOgLtQ9cYNr7e76DGQmTOdR5RAJ86o1y2L1GeyjV7H9/iltwQLV7cbflvYIC1w/BeWt7tyIOc6GyOLt96RpZ6v3Qu7Torvp3sQo/qv0qa8JBzoV9FQtRtUEdwEYRSDf1UY/kMXBrdEneLiw6UM4QyhaFw==&routingKey=W";

https.get(tokenUrl, res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    // Search for sourboo.com in the html
    const matches = [...html.matchAll(/https?:\/\/[^\s"'<>]*/g)].map(m => m[0]);
    const sourbooMatches = matches.filter(m => m.includes('sourboo.com'));
    console.log('Sourboo references in PhonePe page:', sourbooMatches);
  });
});
