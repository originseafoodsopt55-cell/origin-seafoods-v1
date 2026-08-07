import http from 'http';

http.get('http://127.0.0.1:3000/api/product-lines?limit=100', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(`Fetched ${json.docs.length} product lines from API:`);
    for (const doc of json.docs) {
      console.log(`Slug: ${doc.slug}`);
      console.log(`  coverImage type: ${typeof doc.coverImage}`);
      if (typeof doc.coverImage === 'object' && doc.coverImage !== null) {
        console.log(`  coverImage.url: ${doc.coverImage.url}`);
        console.log(`  coverImage.filename: ${doc.coverImage.filename}`);
      } else {
        console.log(`  coverImage: ${doc.coverImage}`);
      }
    }
  });
}).on('error', err => console.error(err));
