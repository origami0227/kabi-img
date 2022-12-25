rm -rf dist &&
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'update' &&
git branch -M main  &&
git remote add origin git@github.com:origami0227/kabi-img-website.git &&
git push -f -u origin main &&
cd ..
echo https://origami0227.github.io/kabi-img-website/index.html