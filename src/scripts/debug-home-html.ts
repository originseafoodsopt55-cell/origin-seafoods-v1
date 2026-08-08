/* eslint-disable */
import http from 'http';

http.get('http://127.0.0.1:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    const heroMatch = data.match(/<section[^>]*class="[^"]*hero[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
    if (heroMatch) {
      console.log('=== HERO SECTION HTML ===');
      console.log(heroMatch[0].slice(0, 1500));
    } else {
      console.log('HERO SECTION NOT FOUND IN HTML');
    }
  });
}).on('error', (err) => {
  console.error('ERROR:', err);
});
