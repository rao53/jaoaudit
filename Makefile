# Static corporate site preview
# Open http://localhost:8000 in your browser
serve:
	python3 -m http.server 8000 --directory public_html

# Full receipt app (API routes + frontend) via Vercel CLI
# Requires: npm i -g vercel
# Open http://localhost:3000/receipt/ in your browser
dev:
	vercel dev
