# jaoaudit

Legacy cPanel site moved into GitHub. The main site lives under `public_html/`.

## What’s here
- `public_html/` - site root (HTML/CSS/JS/images + PHP includes)
- `public_html/receiptApp/` - PHP-based receipt app and related assets

## Is it static?
Partially. The main pages are static HTML, but the receipt app uses PHP and a database, so the repo is not fully static.

## Quick preview
- Static pages: open `public_html/index.html` or run `python3 -m http.server` inside `public_html/`
- PHP pages: `php -S localhost:8000 -t public_html` (receipt app may need DB setup from `public_html/receiptApp/jaoaudit.sql`)
