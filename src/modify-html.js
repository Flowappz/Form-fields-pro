const fs = require('fs');

const filePath = './public/index.html'; // Adjust the path accordingly

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Replace leading slashes with an empty string
  const modifiedData = data.replace(/href="\.\/|src="\.\/|type="module" crossorigin src="\.\/assets/g, (match) => {
    return match.replace('./', '');
  });

  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the modified file:', err);
    } else {
      console.log('HTML file modified successfully!');
    }
  });
});
