ROOT=$PWD
echo "Preparing globe-en"
cd $ROOT/test/globe-en
npm install
npm run build
echo "Preparing globe-cs"
cd $ROOT/test/globe-cs
npm install
npm run build
echo "Preparing moment-en"
cd $ROOT/test/moment-en
npm install
npm run build
echo "Preparing moment-cs"
cd $ROOT/test/moment-cs
npm install
npm run build
echo "Running"
cd $ROOT
node .
