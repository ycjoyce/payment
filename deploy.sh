set -e

npm run build

cd build

cp index.html 404.html
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/ycjoyce/payment master:gh-pages
cd -
