# GitHub Setup

Use these commands from inside this project folder.

## Option A: Create repo using GitHub CLI

```bash
git init
git add .
git commit -m "Initial commit: Passport MRZ Reader"
gh repo create passport-mrz-reader-min-sithu --public --source=. --remote=origin --push
```

For a private repo, change `--public` to `--private`.

## Option B: Create repo from GitHub website

1. Go to GitHub and create a new repository named `passport-mrz-reader-min-sithu`.
2. Do not add a README, license, or `.gitignore` on GitHub because this project already includes them.
3. Run:

```bash
git init
git add .
git commit -m "Initial commit: Passport MRZ Reader"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/passport-mrz-reader-min-sithu.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.
