import fs from 'fs';

let configFileContent = fs.readFileSync('config.json', 'utf8');
export const config = JSON.parse(configFileContent);
