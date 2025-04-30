param (
    [string]$message = "Update changes"
)

git add .
git commit -m $message
git push
#npm run git-auto -- "pesan commit kamu"