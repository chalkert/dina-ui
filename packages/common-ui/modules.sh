rm -fr ./node_modules

if [ -d "~/src/dina-ui-aafc/packages/common-ui" ]; then
  rm -fr ~/src/dina-ui-aafc/packages/common-ui
fi

if [ ! -d "~/src/dina-ui-aafc/packages" ]; then
  mkdir -p ~/src/dina-ui-aafc/packages
fi

mkdir -p ~/src/dina-ui-aafc/packages/common-ui


cd ~/src/dina-ui-aafc/packages/common-ui

cp ~/host/dina-ui-aafc/packages/common-ui/package.json .

yarn

rm -r ./package.json

rsync --archive --verbose --copy-links ./node_modules/ ./node_modules_cp/

rm -r ./node_modules/

mv ./node_modules_cp/ ~/host/dina-ui-aafc/packages/common-ui/node_modules/
mv ./yarn.lock ~/host/dina-ui-aafc/packages/common-ui/