# Full receipt app with live reload
# Open http://localhost:3001/receipt/ in your browser
# Static file changes (HTML/CSS/JS) auto-reload in the browser
# API changes are picked up automatically by Vercel on next request
dev-run:
	@echo "Starting Vercel dev server + live reload..."
	@echo "Open http://localhost:3001/receipt/ in your browser"
	@vercel dev --listen 3000 & sleep 3 && npx browser-sync start \
		--proxy "localhost:3000" \
		--port 3001 \
		--files "public_html/receipt/**/*" \
		--no-open \
		--no-notify
