const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, 'src/assets/tb');
const outputPath = path.join(__dirname, 'src/app/photo-gallery/image-paths.ts');

let imagePaths = [];

function readDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const absolutePath = path.join(directory, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            readDirectory(absolutePath);
        } else if (absolutePath.endsWith('.jpg')) {
            let relativePath = absolutePath.replace(assetsPath, 'assets').replace(/\\/g, '/');
            imagePaths.push(relativePath);
        }
    });
}

readDirectory(assetsPath);

const content = `export const imagePaths: string[] = ${JSON.stringify(imagePaths, null, 2)};\n`;
fs.writeFileSync(outputPath, content);
