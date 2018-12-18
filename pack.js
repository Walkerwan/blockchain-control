const tar = require('tar');
const fecha = require('fecha');
console.log('==============================================');
console.log('Packaging...');
const data= fecha.format(new Date(),'YYYY-MM-DD-HH-mm-ss');

tar.c({
  gzip: true,
  cwd: './dist/',
  file: 'block-chain_'+data+'.tar.gz',
}, ['./']).then(_ => console.log('Packaging complete!'));
