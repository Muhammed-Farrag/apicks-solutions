# Publish Your Site

## Option 1: GitHub Pages
1. Confirm your homepage file is `index.html`.
2. Create a GitHub repository for your site.
3. Run these commands in PowerShell from your Desktop folder:

```powershell
cd $env:USERPROFILE\Desktop
git init
git add .
git commit -m "Publish A-Picks Solutions site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

4. In GitHub, open your repository Settings → Pages.
5. Set Source to `main` branch and folder `/root`.
6. Save and wait a few minutes for the site to publish.

Your site will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Option 2: Netlify
1. Sign up at https://www.netlify.com/.
2. Create a new site from Git.
3. Connect your GitHub repository.
4. Use the default build settings for a static site.
5. Deploy, and Netlify gives you a public URL immediately.

## Option 3: Vercel
1. Sign up at https://vercel.com/.
2. Create a new project and connect your GitHub repository.
3. Deploy the site.

## SEO and Google Search
- Google may take several days or weeks to index your site.
- To help Google find it faster:
  - Use a descriptive page title and meta description.
  - Use a custom domain if you want your name to appear in the URL.
  - Submit your site to Google Search Console.

## Custom domain (optional)
- Buy a domain name from a registrar.
- Point the domain to GitHub Pages, Netlify, or Vercel using DNS records.
- Add the custom domain in the hosting provider settings.

## Important
- The site is public once hosted.
- Search engines will discover it over time, but it is not instant.
- If you want your name to show in Google search, use a custom domain and good SEO text.

## Git not installed locally
If `git` is not installed on your Windows machine, install it first from:
https://git-scm.com/download/win

Then run the GitHub Pages commands again.
