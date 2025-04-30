param (
    [string]$message = "Update changes"
)

git add .
git commit -m $message
git push
