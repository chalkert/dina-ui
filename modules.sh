rm -fr ./node_modules

if [ -d "~/src/dina-ui-aafc" ]; then
  rm -fr ~/src/dina-ui-aafc
fi

if [ ! -d "~/src" ]; then
  mkdir -p ~/src
fi

mkdir -p ~/src/dina-ui-aafc


cd ~/src/dina-ui-aafc

cp ~/host/dina-ui-aafc/package.json .

yarn

rm -r ./package.json

rsync --archive --verbose --copy-links ./node_modules/ ./node_modules_cp/

rm -r ./node_modules/

mv ./node_modules_cp/ ~/host/dina-ui-aafc/node_modules/
mv ./yarn.lock ~/host/dina-ui-aafc/

./packages/common-ui/modules.sh
./packages/objectstore-ui/modules.sh
./packages/seqdb-ui/modules.sh