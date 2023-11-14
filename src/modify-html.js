const fs = require('fs');

const filePath = './public/index.html'; // Adjust the path accordingly

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Replace leading slashes from asset paths
  const modifiedData = data.replace(/href="\/|src="\/|type="module" crossorigin src="\/|href="\//g, (match) => {
    return match.replace(/\//g, '');
  });

  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the modified file:', err);
    } else {
      console.log('HTML file modified successfully!');
    }
  });
});
