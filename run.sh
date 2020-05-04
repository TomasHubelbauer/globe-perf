ROOT=$PWD
cd $ROOT/test/globe-en
npm install
npm run build
cd $ROOT/test/globe-cs
npm install
npm run build
cd $ROOT/test/moment-en
npm install
npm run build
cd $ROOT/test/moment-cs
npm install
npm run build
cd $ROOT
node .
