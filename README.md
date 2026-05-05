# Публикация сайта

Сайт настроен на автоматическую публикацию через **GitHub Pages**.

## Как включить публикацию

1. Загрузите репозиторий на GitHub.
2. Убедитесь, что основная ветка называется `main`.
3. Откройте: **Settings → Pages**.
4. В `Build and deployment` выберите **Source: GitHub Actions**.
5. Сделайте push в `main` — workflow `Deploy static site to GitHub Pages` опубликует сайт.

После успешного workflow URL появится в разделе Pages и в логе job `deploy`.
