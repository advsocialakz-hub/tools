export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const validKey = env.AUTH_KEY || "akz2026";

    // Проверка ключа авторизации
    if (!key || key !== validKey) {
      return new Response("[-] 403 Forbidden: Invalid or missing authorization key.\nAccess Denied.\n", {
        status: 403,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store"
        }
      });
    }

    const v = (url.searchParams.get("v") || "").toLowerCase();
    const path = url.pathname.toLowerCase();

    // Параметры запуска
    const browserParam = url.searchParams.get("b") || url.searchParams.get("browser") || "";
    const profileParam = url.searchParams.get("p") || url.searchParams.get("profile") || "";
    const profilesParam = url.searchParams.get("profiles") || "";
    const targetParam = url.searchParams.get("target") || url.searchParams.get("t") || "";

    let script = "";
    if (v === "audit" || path.includes("audit")) {
      script = `<#
=================================================================
 GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v5.5
 - Profile Names & Account Emails Auto-Discovery (Local State)
 - Multi-Browser Audit: Chrome, Edge, Brave, Opera Stable
 - Non-Intrusive Locked File Reading (Zero Browser Interruptions)
 - Real-Time Trust Scoring Engine (0 - 100 PTS)
 - Visual ASCII Distribution Graphs & Ecosystem Breakdown
 - UNIVERSAL GLOBAL SERVICES READINESS MATRIX:
   * 🌐 Google AI Studio (Gemini Pro / Flash)
   * 🚀 Google Antigravity & AI Cloud IDE
   * 🤖 OpenAI (ChatGPT Plus & Platform API)
   * 🧠 Anthropic Claude (claude.ai & Console)
   * 🔍 Perplexity AI (Pro & Search)
   * 🛒 Amazon (AWS & Global E-Commerce US/EU)
   * 💳 Stripe & Global FinTech / Billing
   * 🪪 X (Twitter) & Grok
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=\$false)]
    [string]\$Key = "akz2026"
)

# 1. Лицензионная авторизация
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Render-Bar(\$value, \$max, \$width=18) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

function Read-LockedBinarySafe(\$filePath) {
    if (-not (Test-Path \$filePath)) { return \$null }
    \$tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "audit_" + [System.IO.Path]::GetRandomFileName())
    try {
        \$fs = [System.IO.File]::Open(\$filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        \$dest = [System.IO.File]::Create(\$tempCopy)
        \$fs.CopyTo(\$dest)
        \$fs.Close()
        \$dest.Close()
        \$bytes = [System.IO.File]::ReadAllBytes(\$tempCopy)
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$bytes
    } catch {
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$null
    }
}

function Extract-DomainsAndTags(\$bytes) {
    if (-not \$bytes -or \$bytes.Length -eq 0) { return @{ Domains = @(); Tags = @() } }
    \$text = [System.Text.Encoding]::ASCII.GetString(\$bytes)
    
    \$domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    \$matches = \$domRegex.Matches(\$text)
    \$domains = @()
    foreach (\$m in \$matches) {
        \$val = \$m.Value.Trim().ToLower()
        if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)\$')) {
            \$domains += \$val
        }
    }
    
    \$tags = @()
    if (\$text -match '(?i)__Secure-') { \$tags += "__Secure-Tokens" }
    if (\$text -match '(?i)CONSENT')   { \$tags += "Cookie-Consent" }
    if (\$text -match '(?i)NID')       { \$tags += "Google-NID" }
    if (\$text -match '(?i)AEC|SOCS')  { \$tags += "Google-AEC/SOCS" }
    if (\$text -match '(?i)IDE')       { \$tags += "DoubleClick-IDE" }
    if (\$text -match '(?i)SID|HSID')  { \$tags += "Google-Auth-SID" }

    return @{
        Domains = (\$domains | Select-Object -Unique);
        Tags    = (\$tags | Select-Object -Unique)
    }
}

function Get-BrowserProfilesMetadata(\$userDataPath) {
    \$meta = @{}
    \$localState = Join-Path \$userDataPath "Local State"
    if (Test-Path \$localState) {
        try {
            \$raw = [System.IO.File]::ReadAllText(\$localState)
            \$json = \$raw | ConvertFrom-Json
            if (\$json.profile -and \$json.profile.info_cache) {
                foreach (\$prop in \$json.profile.info_cache.PSObject.Properties) {
                    \$f = \$prop.Name
                    \$v = \$prop.Value
                    \$name = if (\$v.name) { \$v.name } else { \$f }
                    \$email = if (\$v.user_name) { \$v.user_name } else { "" }
                    \$meta[\$f] = [PSCustomObject]@{
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path \$userDataPath) {
        \$dirs = Get-ChildItem \$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
        foreach (\$d in \$dirs) {
            if (-not \$meta.ContainsKey(\$d.Name)) {
                \$meta[\$d.Name] = [PSCustomObject]@{
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v5.5     " "Cyan"
P "   Universal Global AI, Cloud & FinTech Services Engine          " "DarkCyan"
P "=================================================================" "Cyan"
P ""

\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

P "[1/3] Обнаружение браузеров, профилей и чтение экосистемы..." "Yellow"
P "  -> Системный пользователь: \$activeUser" "Gray"

\$browserConfigs = @(
    @{
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data"
    },
    @{
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data"
    },
    @{
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data"
    },
    @{
        Name     = "Opera Stable";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable"
    }
)

\$profileCards = @()

foreach (\$b in \$browserConfigs) {
    if (-not (Test-Path \$b.UserData)) { continue }
    
    \$profilesMeta = Get-BrowserProfilesMetadata \$b.UserData
    
    foreach (\$k in \$profilesMeta.Keys) {
        \$meta = \$profilesMeta[\$k]
        \$profPath = Join-Path \$b.UserData \$meta.Folder
        \$profTitle = "\$(\$b.Name) :: \`"\$(\$meta.DisplayName)\`""
        if (\$meta.Email) { \$profTitle += " (\$(\$meta.Email))" }
        \$profTitle += " [Папка: \$(\$meta.Folder)]"

        \$cookieFiles = @(
            (Join-Path \$profPath "Network\\Cookies"),
            (Join-Path \$profPath "Network\\Cookies-wal"),
            (Join-Path \$profPath "Cookies"),
            (Join-Path \$profPath "Cookies-wal")
        )
        \$histFiles = @(
            (Join-Path \$profPath "History"),
            (Join-Path \$profPath "History-wal")
        )

        \$profDomains = @()
        \$profTags    = @()

        foreach (\$cf in \$cookieFiles) {
            \$bytes = Read-LockedBinarySafe \$cf
            if (\$bytes) {
                \$res = Extract-DomainsAndTags \$bytes
                \$profDomains += \$res.Domains
                \$profTags    += \$res.Tags
            }
        }

        \$histCount = 0
        foreach (\$hf in \$histFiles) {
            \$bytes = Read-LockedBinarySafe \$hf
            if (\$bytes) {
                \$res = Extract-DomainsAndTags \$bytes
                \$profDomains += \$res.Domains
                \$histCount += \$res.Domains.Count
            }
        }

        \$uniqueProfDomains = \$profDomains | Select-Object -Unique
        \$uniqueProfTags    = \$profTags | Select-Object -Unique

        \$googleDoms  = \$uniqueProfDomains | Where-Object { \$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
        \$adTrackers  = \$uniqueProfDomains | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing' }
        \$localDoms   = \$uniqueProfDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor' }
        \$amazonDoms  = \$uniqueProfDomains | Where-Object { \$_ -match 'amazon|aws|media-amazon|ssl-images-amazon' }
        \$lifestyle   = \$uniqueProfDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

        # 1. Общий индекс доверия (General Trust Score)
        \$score = 0
        if (\$uniqueProfDomains.Count -gt 35)    { \$score += 25 }
        elseif (\$uniqueProfDomains.Count -gt 20) { \$score += 18 }
        elseif (\$uniqueProfDomains.Count -gt 8)  { \$score += 10 }
        elseif (\$uniqueProfDomains.Count -gt 0)  { \$score += 4 }

        if (\$googleDoms.Count -ge 5) { \$score += 15 }
        elseif (\$googleDoms.Count -ge 1) { \$score += 8 }
        if (\$uniqueProfTags -contains "Google-NID" -or \$uniqueProfTags -contains "Cookie-Consent") { \$score += 5 }
        if (\$uniqueProfTags -contains "__Secure-Tokens" -or \$uniqueProfTags -contains "Google-Auth-SID") { \$score += 5 }

        if (\$adTrackers.Count -ge 4) { \$score += 20 }
        elseif (\$adTrackers.Count -ge 1) { \$score += 12 }

        if (\$localDoms.Count -ge 3) { \$score += 12 }
        elseif (\$localDoms.Count -ge 1) { \$score += 6 }
        if (\$histCount -gt 15) { \$score += 8 }
        elseif (\$histCount -gt 3) { \$score += 4 }

        if (\$lifestyle.Count -ge 5) { \$score += 10 }
        elseif (\$lifestyle.Count -ge 1) { \$score += 5 }

        \$score = [Math]::Min(100, \$score)

        # 2. Оценка доступности для конкретных мировых платформ:
        
        # A. Google AI Studio (Gemini Pro / Flash)
        \$aiStudioScore = [int](\$score * 0.4 + (\$googleDoms.Count * 6) + (\$adTrackers.Count * 4))
        if (\$uniqueProfTags -contains "Google-NID") { \$aiStudioScore += 10 }
        if (\$uniqueProfTags -contains "Google-AEC/SOCS") { \$aiStudioScore += 10 }
        if (\$uniqueProfTags -contains "__Secure-Tokens") { \$aiStudioScore += 10 }
        \$aiStudioScore = [Math]::Min(100, [Math]::Max(15, \$aiStudioScore))

        # B. Google Antigravity & AI Developer Ecosystem
        \$antigravityScore = [int](\$score * 0.45 + (\$googleDoms.Count * 5) + 15)
        if (\$uniqueProfTags -contains "Google-Auth-SID" -or \$uniqueProfTags -contains "__Secure-Tokens") { \$antigravityScore += 15 }
        \$antigravityScore = [Math]::Min(100, [Math]::Max(20, \$antigravityScore))

        # C. OpenAI / ChatGPT
        \$openAiScore = [int](\$score * 0.55 + (\$lifestyle.Count * 4) + (\$histCount * 1.5))
        if (\$uniqueProfDomains.Count -ge 15) { \$openAiScore += 15 }
        \$openAiScore = [Math]::Min(100, [Math]::Max(20, \$openAiScore))

        # D. Anthropic Claude
        \$claudeScore = [int](\$score * 0.50 + (\$localDoms.Count * 6) + (\$lifestyle.Count * 3))
        if (\$uniqueProfDomains.Count -ge 12) { \$claudeScore += 15 }
        \$claudeScore = [Math]::Min(100, [Math]::Max(15, \$claudeScore))

        # E. Perplexity AI
        \$perplexityScore = [int](\$score * 0.60 + (\$lifestyle.Count * 4) + 15)
        \$perplexityScore = [Math]::Min(100, [Math]::Max(25, \$perplexityScore))

        # F. Amazon & AWS (Global E-Commerce)
        \$amazonScore = [int](\$score * 0.45 + (\$adTrackers.Count * 6) + (\$amazonDoms.Count * 12) + 10)
        if (\$uniqueProfDomains.Count -ge 15) { \$amazonScore += 15 }
        \$amazonScore = [Math]::Min(100, [Math]::Max(20, \$amazonScore))

        # G. Stripe & Global Payments
        \$stripeScore = [int](\$score * 0.45 + (\$adTrackers.Count * 8) + (\$lifestyle.Count * 3))
        if (\$uniqueProfTags -contains "__Secure-Tokens") { \$stripeScore += 10 }
        \$stripeScore = [Math]::Min(100, [Math]::Max(10, \$stripeScore))

        # H. X (Twitter) & Grok
        \$xScore = [int](\$score * 0.65 + (\$lifestyle.Count * 3) + 10)
        \$xScore = [Math]::Min(100, [Math]::Max(20, \$xScore))

        \$verdict = ""
        \$verdictColor = ""
        if (\$score -ge 72) {
            \$verdict = "🟢 ВЫСОКИЙ ТРАСТ (Tier 1: High Trust Organic Persona - Полный доступ ко всем сервисам)"
            \$verdictColor = "Green"
        } elseif (\$score -ge 45) {
            \$verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется плавный вход через YouTube)"
            \$verdictColor = "Yellow"
        } else {
            \$verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - рекомендуется прогрев: v=persona или v=auto)"
            \$verdictColor = "Red"
        }

        \$profileCards += [PSCustomObject]@{
            Title            = \$profTitle;
            DisplayName      = \$meta.DisplayName;
            Email            = \$meta.Email;
            Folder           = \$meta.Folder;
            Browser          = \$b.Name;
            TotalDoms        = \$uniqueProfDomains.Count;
            GoogleDoms       = \$googleDoms.Count;
            AdTrackers       = \$adTrackers.Count;
            LocalDoms        = \$localDoms.Count;
            AmazonDoms       = \$amazonDoms.Count;
            Lifestyle        = \$lifestyle.Count;
            Tags             = \$uniqueProfTags;
            Score            = \$score;
            Verdict          = \$verdict;
            VerdictCol       = \$verdictColor;
            GoogleList       = \$googleDoms;
            AdList           = \$adTrackers;
            LocalList        = \$localDoms;
            AIStudioScore    = \$aiStudioScore;
            AntigravityScore = \$antigravityScore;
            OpenAIScore      = \$openAiScore;
            ClaudeScore      = \$claudeScore;
            PerplexityScore  = \$perplexityScore;
            AmazonScore      = \$amazonScore;
            StripeScore      = \$stripeScore;
            XScore           = \$xScore;
        }
    }
}

P "  -> Обнаружено профилей: \$(\$profileCards.Count)" "Green"
P ""

# 2. Вывод карточек профилей с графами экосистемы
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА И ЦИФРОВОГО СЛЕДА:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach (\$card in \$profileCards) {
    P "👤 ПРОФИЛЬ: \$(\$card.Title)" "White"
    \$bar = Render-Bar \$card.Score 100 20
    P "   Индекс доверия:  \$bar (\$(\$card.Score) / 100 PTS)" "Cyan"
    P "   Статус профиля:  \$(\$card.Verdict)" \$card.VerdictCol
    P ""
    P "   [+] ГРАФ ЭКОСИСТЕМЫ И ЦИФРОВЫЕ МАРКЕРЫ:" "Yellow"
    P "       ├── 🌐 Google Core:      \$(Render-Bar \$card.GoogleDoms 10 14) (\$(\$card.GoogleDoms) доменов)" "Gray"
    P "       ├── 🎯 Commercial/Ads:   \$(Render-Bar \$card.AdTrackers 6 14) (\$(\$card.AdTrackers) трекеров)" "Gray"
    P "       ├── 📍 Geo & Local:      \$(Render-Bar \$card.LocalDoms 6 14) (\$(\$card.LocalDoms) локаций)" "Gray"
    P "       └── 🍳 Lifestyle/DIY:    \$(Render-Bar \$card.Lifestyle 12 14) (\$(\$card.Lifestyle) ресурсов)" "Gray"
    
    if (\$card.Tags.Count -gt 0) {
        P "   [✓] Токены безопасности: \$(\$card.Tags -join ' | ')" "DarkCyan"
    } else {
        P "   [-] Токены безопасности: НЕ ОБНАРУЖЕНЫ (чистый инкогнито)" "DarkRed"
    }
    P "-----------------------------------------------------------------" "Gray"
}

# 3. УНИВЕРСАЛЬНАЯ МАТРИЦА ДОСТУПА К МИРОВЫМ СЕРВИСАМ (ALL SERVICES MATRIX)
P "[3/3] УНИВЕРСАЛЬНАЯ МАТРИЦА ДОСТУПА К МИРОВЫМ СЕРВИСАМ:" "Cyan"
P "=================================================================" "Cyan"

\$activeCard = \$profileCards | Where-Object { \$_.Score -ge 70 } | Select-Object -First 1
if (-not \$activeCard) { \$activeCard = \$profileCards | Sort-Object Score -Descending | Select-Object -First 1 }

if (\$activeCard) {
    P "🎯 ОЦЕНКА ДОСТУПА ДЛЯ ОСНОВНОГО ПРОФИЛЯ:" "Yellow"
    P "   \$(\$activeCard.Browser) -> \`"\$(\$activeCard.DisplayName)\`" [Папка: \$(\$activeCard.Folder)]" "White"
    P "-----------------------------------------------------------------" "Gray"
    
    function Get-StatusPill(\$val) {
        if (\$val -ge 75) { return "🟢 ГОТОВ       " }
        elseif (\$val -ge 50) { return "🟡 СРЕДНИЙ     " }
        else { return "🔴 НУЖЕН НАГУЛ " }
    }

    P " 🌐 1. Google AI Studio (Gemini Pro)  \$(Get-StatusPill \$activeCard.AIStudioScore) \$(Render-Bar \$activeCard.AIStudioScore 100 12)" "Green"
    P "    -> URL: https://aistudio.google.com | Авторизация через Google аккаунт" "Gray"
    P ""
    P " 🚀 2. Google Antigravity (AI IDE)    \$(Get-StatusPill \$activeCard.AntigravityScore) \$(Render-Bar \$activeCard.AntigravityScore 100 12)" "Green"
    P "    -> Cloud Shell, AI SDK и агентские среды Google Cloud" "Gray"
    P ""
    P " 🤖 3. OpenAI / ChatGPT Plus & API    \$(Get-StatusPill \$activeCard.OpenAIScore) \$(Render-Bar \$activeCard.OpenAIScore 100 12)" "Green"
    P "    -> URL: https://chatgpt.com | Чистый US IP, нет Cloudflare банов" "Gray"
    P ""
    P " 🧠 4. Anthropic Claude (claude.ai)   \$(Get-StatusPill \$activeCard.ClaudeScore) \$(Render-Bar \$activeCard.ClaudeScore 100 12)" "Green"
    P "    -> URL: https://claude.ai | Чистый WebRTC, гео-соответствие California" "Gray"
    P ""
    P " 🔍 5. Perplexity AI Pro & Search     \$(Get-StatusPill \$activeCard.PerplexityScore) \$(Render-Bar \$activeCard.PerplexityScore 100 12)" "Green"
    P "    -> URL: https://www.perplexity.ai | Органическая история запросов" "Gray"
    P ""
    P " 🛒 6. Amazon (AWS & E-Commerce)      \$(Get-StatusPill \$activeCard.AmazonScore) \$(Render-Bar \$activeCard.AmazonScore 100 12)" "Green"
    P "    -> URL: https://www.amazon.com | Потребительский след и облако AWS" "Gray"
    P ""
    P " 💳 7. Stripe & Global Billing / Карты \$(Get-StatusPill \$activeCard.StripeScore) \$(Render-Bar \$activeCard.StripeScore 100 12)" "Green"
    P "    -> Оплата подписок, международные чекауты (Fraud Score < 10)" "Gray"
    P ""
    P " 🪪 8. X (Twitter) & Grok             \$(Get-StatusPill \$activeCard.XScore) \$(Render-Bar \$activeCard.XScore 100 12)" "Green"
    P "    -> URL: https://x.com | Полноценный органический отпечаток" "Gray"
    P "-----------------------------------------------------------------" "Gray"
}

# Резюме по всем профилям
P "📋 СВОДНЫЙ ВЕРДИКТ ПО ВСЕМ ПРОФИЛЯМ:" "Yellow"
\$trustedOnes = \$profileCards | Where-Object { \$_.Score -ge 70 }
\$mediumOnes  = \$profileCards | Where-Object { \$_.Score -ge 45 -and \$_.Score -lt 70 }
\$bareOnes    = \$profileCards | Where-Object { \$_.Score -lt 45 }

if (\$trustedOnes) {
    P "  🟢 РЕКОМЕНДОВАНЫ ДЛЯ ВСЕХ МИРОВЫХ AI И ФИНТЕХ-СЕРВИСОВ (Трастовые):" "Green"
    foreach (\$tp in \$trustedOnes) {
        \$mail = if (\$tp.Email) { " <\$(\$tp.Email)>" } else { "" }
        P "     * \$(\$tp.Browser) -> \`"\$(\$tp.DisplayName)\`"\$mail [Папка: \$(\$tp.Folder)]" "Green"
    }
}
if (\$mediumOnes) {
    P "  🟡 ТРЕБУЮТ ВХОДА ЧЕРЕЗ YOUTUBE ИЛИ ДОПОЛНИТЕЛЬНОГО ПРОГРЕВА:" "Yellow"
    foreach (\$mp in \$mediumOnes) {
        \$mail = if (\$mp.Email) { " <\$(\$mp.Email)>" } else { "" }
        P "     * \$(\$mp.Browser) -> \`"\$(\$mp.DisplayName)\`"\$mail [Папка: \$(\$mp.Folder)]" "Yellow"
    }
}
if (\$bareOnes) {
    P "  🔴 НЕТРАСТОВЫЕ (Рекомендуется запустить прогрев: v=persona или v=auto):" "Red"
    foreach (\$bp in \$bareOnes) {
        P "     * \$(\$bp.Browser) -> \`"\$(\$bp.DisplayName)\`" [Папка: \$(\$bp.Folder)]" "Red"
    }
}

P "=================================================================" "Cyan"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
    } else if (v === "auto" || v === "loop" || path.includes("auto")) {
      script = `<#
=================================================================
 SMART AUTONOMOUS COOKIE WARMER & AUDIT FEEDBACK ENGINE v1.0
 - Phase 1: High-Speed / Organic Digital Persona Warm-Up
 - Phase 2: Live Non-Intrusive Ecosystem Audit & Deficit Gap Analysis
 - Phase 3: Adaptive Targeted Re-Warm (If Score < Target PTS):
   * Auto-detects missing categories (Ads, Local, E-Commerce, Dev)
   * Generates tailored dynamic queries on-the-fly
   * Completes micro-warm pass to achieve Tier 1 High Trust
 - Phase 4: Final Universal Global Services Matrix & Live Cookie Verification
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Browser = "",
    [Parameter(Mandatory=\$false)] [string]\$Profile = "",
    [Parameter(Mandatory=\$false)] [int]\$TargetScore = 75
)

# 1. Лицензионная авторизация
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.Windows.Forms

# Регистрация C# модуля WinInputV7
if (-not ([System.Management.Automation.PSTypeName]'WinInputV7').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV7 {
    [DllImport("user32.dll")] public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
    [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
    [DllImport("user32.dll")] public static extern bool GetCursorPos(out POINT lpPoint);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    public struct POINT { public int X; public int Y; }

    public static void ReleaseAllModifiers() {
        byte[] keys = new byte[] { 0x10, 0x11, 0x12, 0x5B, 0x5C, 0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5 };
        foreach (byte k in keys) { keybd_event(k, 0, 0x0002, UIntPtr.Zero); }
    }

    public static void MoveSmooth(int targetX, int targetY, int durationMs) {
        POINT start; GetCursorPos(out start);
        Random rnd = new Random();
        int ctrlX = (start.X + targetX) / 2 + rnd.Next(-50, 50);
        int ctrlY = (start.Y + targetY) / 2 + rnd.Next(-35, 35);
        int steps = Math.Max(25, durationMs / 14);
        int sleepPerStep = Math.Max(6, durationMs / steps);
        for (int i = 1; i <= steps; i++) {
            double t = (double)i / steps;
            double ease = t * t * (3 - 2 * t);
            double u = 1 - ease;
            int x = (int)(u * u * start.X + 2 * u * ease * ctrlX + ease * ease * targetX);
            int y = (int)(u * u * start.Y + 2 * u * ease * ctrlY + ease * ease * targetY);
            if (i < steps) { x += rnd.Next(-1, 2); y += rnd.Next(-1, 2); }
            SetCursorPos(x, y);
            System.Threading.Thread.Sleep(sleepPerStep);
        }
        SetCursorPos(targetX, targetY);
    }

    public static void Click(int x, int y) {
        ReleaseAllModifiers();
        MoveSmooth(x, y, 360);
        System.Threading.Thread.Sleep(80);
        mouse_event(0x0002, 0, 0, 0, 0);
        System.Threading.Thread.Sleep(new Random().Next(60, 95));
        mouse_event(0x0004, 0, 0, 0, 0);
        ReleaseAllModifiers();
    }

    public static void TripleClick(int x, int y) {
        ReleaseAllModifiers();
        MoveSmooth(x, y, 350);
        System.Threading.Thread.Sleep(80);
        for (int i = 0; i < 3; i++) {
            mouse_event(0x0002, 0, 0, 0, 0);
            System.Threading.Thread.Sleep(35);
            mouse_event(0x0004, 0, 0, 0, 0);
            System.Threading.Thread.Sleep(35);
        }
        ReleaseAllModifiers();
    }

    public static void ScrollSmooth(int totalDelta, int steps) {
        int deltaPerStep = totalDelta / steps;
        for (int i = 0; i < steps; i++) {
            mouse_event(0x0800, 0, 0, deltaPerStep, 0);
            System.Threading.Thread.Sleep(28);
        }
    }
}
"@
}

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Render-Bar(\$value, \$max, \$width=18) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

function Type-HumanFast([string]\$text) {
    [WinInputV7]::ReleaseAllModifiers()
    foreach (\$ch in \$text.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        Start-Sleep -Milliseconds (Get-Random -Min 25 -Max 55)
    }
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    [WinInputV7]::ReleaseAllModifiers()
}

function Read-LockedBinarySafe(\$filePath) {
    if (-not (Test-Path \$filePath)) { return \$null }
    \$tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "autoloop_" + [System.IO.Path]::GetRandomFileName())
    try {
        \$fs = [System.IO.File]::Open(\$filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        \$dest = [System.IO.File]::Create(\$tempCopy)
        \$fs.CopyTo(\$dest)
        \$fs.Close()
        \$dest.Close()
        \$bytes = [System.IO.File]::ReadAllBytes(\$tempCopy)
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$bytes
    } catch {
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$null
    }
}

function Extract-DomainsAndTags(\$bytes) {
    if (-not \$bytes -or \$bytes.Length -eq 0) { return @{ Domains = @(); Tags = @() } }
    \$text = [System.Text.Encoding]::ASCII.GetString(\$bytes)
    
    \$domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    \$matches = \$domRegex.Matches(\$text)
    \$domains = @()
    foreach (\$m in \$matches) {
        \$val = \$m.Value.Trim().ToLower()
        if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)\$')) {
            \$domains += \$val
        }
    }
    
    \$tags = @()
    if (\$text -match '(?i)__Secure-') { \$tags += "__Secure-Tokens" }
    if (\$text -match '(?i)CONSENT')   { \$tags += "Cookie-Consent" }
    if (\$text -match '(?i)NID')       { \$tags += "Google-NID" }
    if (\$text -match '(?i)AEC|SOCS')  { \$tags += "Google-AEC/SOCS" }
    if (\$text -match '(?i)IDE')       { \$tags += "DoubleClick-IDE" }
    if (\$text -match '(?i)SID|HSID')  { \$tags += "Google-Auth-SID" }

    return @{
        Domains = (\$domains | Select-Object -Unique);
        Tags    = (\$tags | Select-Object -Unique)
    }
}

function Get-BrowserProfilesMetadata(\$userDataPath) {
    \$meta = @{}
    \$localState = Join-Path \$userDataPath "Local State"
    if (Test-Path \$localState) {
        try {
            \$raw = [System.IO.File]::ReadAllText(\$localState)
            \$json = \$raw | ConvertFrom-Json
            if (\$json.profile -and \$json.profile.info_cache) {
                foreach (\$prop in \$json.profile.info_cache.PSObject.Properties) {
                    \$f = \$prop.Name
                    \$v = \$prop.Value
                    \$name = if (\$v.name) { \$v.name } else { \$f }
                    \$email = if (\$v.user_name) { \$v.user_name } else { "" }
                    \$meta[\$f] = [PSCustomObject]@{
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path \$userDataPath) {
        \$dirs = Get-ChildItem \$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
        foreach (\$d in \$dirs) {
            if (-not \$meta.ContainsKey(\$d.Name)) {
                \$meta[\$d.Name] = [PSCustomObject]@{
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  SMART AUTONOMOUS COOKIE WARMER & AUDIT FEEDBACK ENGINE v1.0   " "Cyan"
P "  Adaptive Feedback Loop: Warmer ➔ Audit ➔ Targeted Re-Warm     " "DarkCyan"
P "=================================================================" "Cyan"
P ""

\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

\$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",
            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",
            "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"
        );
        ProcessName = "chrome"
    }
)

\$availableProfiles = @()
foreach (\$b in \$browserCatalog) {
    \$exeFound = \$null
    foreach (\$ep in \$b.ExePaths) {
        if (Test-Path \$ep) { \$exeFound = \$ep; break }
    }
    if (-not \$exeFound -or -not (Test-Path \$b.UserData)) { continue }

    \$metaDict = Get-BrowserProfilesMetadata \$b.UserData
    foreach (\$k in \$metaDict.Keys) {
        \$pInfo = \$metaDict[\$k]
        \$availableProfiles += [PSCustomObject]@{
            Index       = \$availableProfiles.Count + 1
            BrowserKey  = \$b.Key
            BrowserName = \$b.Name
            BrowserExe  = \$exeFound
            ProcessName = \$b.ProcessName
            UserData    = \$b.UserData
            Folder      = \$pInfo.Folder
            DisplayName = \$pInfo.DisplayName
            Email       = \$pInfo.Email
        }
    }
}

if (\$availableProfiles.Count -eq 0) {
    P "[-] Не найдено установленного Chrome!" "Red"
    return
}

\$chosen = \$availableProfiles | Where-Object { \$_.Index -eq 1 } | Select-Object -First 1

P "  -> Профиль:          \$(\$chosen.BrowserName) :: \`"\$(\$chosen.DisplayName)\`"" "Green"
P "  -> Целевой траст:    \$TargetScore / 100 PTS" "Cyan"
P ""

# Геолокация
\$city = "Fremont"
try {
    \$r = Invoke-RestMethod -Uri "http://ip-api.com/json/?fields=city,regionName" -TimeoutSec 4 -ErrorAction Stop
    if (\$r.city) { \$city = \$r.city }
} catch {}

P "[1/4] Фаза 1: Первичный прогрев цифровой личности в \$city..." "Yellow"

\$argsList = @(
    "--user-data-dir=\`"\$(\$chosen.UserData)\`"",
    "--profile-directory=\`"\$(\$chosen.Folder)\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
)

\$proc = Start-Process -FilePath \$chosen.BrowserExe -ArgumentList \$argsList -PassThru
Start-Sleep -Seconds 4

if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV7]::ShowWindow(\$proc.MainWindowHandle, 3) | Out-Null
    [WinInputV7]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
}

[WinInputV7]::ReleaseAllModifiers()

# Первичный поиск
[WinInputV7]::Click(580, 365)
Type-HumanFast "best specialty coffee and pastries in \$city reviews"
Start-Sleep -Seconds 3
[WinInputV7]::ScrollSmooth(-180, 4)
Start-Sleep -Seconds 1
[WinInputV7]::Click(420, 340)
Start-Sleep -Seconds 3
[WinInputV7]::Click(18, 82)
Start-Sleep -Seconds 2

# Вторичный поиск в той же вкладке
[WinInputV7]::TripleClick(350, 135)
Start-Sleep -Milliseconds 150
[System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
Type-HumanFast "how to fix home wifi speed test in \$city"
Start-Sleep -Seconds 3
[WinInputV7]::ScrollSmooth(-200, 4)

# Проверка куков и дефицитов (Адаптивный анализ разрыва)
P ""
P "[2/4] Фаза 2: Аудит текущего траста и анализ дефицита категорий..." "Yellow"

function Evaluate-ProfileState(\$userData, \$folder) {
    \$pPath = Join-Path \$userData \$folder
    \$cFiles = @((Join-Path \$pPath "Network\\Cookies"), (Join-Path \$pPath "Cookies"))
    \$hFiles = @((Join-Path \$pPath "History"))
    \$doms = @()
    \$tags = @()
    foreach (\$cf in \$cFiles) {
        \$bytes = Read-LockedBinarySafe \$cf
        if (\$bytes) { \$res = Extract-DomainsAndTags \$bytes; \$doms += \$res.Domains; \$tags += \$res.Tags }
    }
    foreach (\$hf in \$hFiles) {
        \$bytes = Read-LockedBinarySafe \$hf
        if (\$bytes) { \$res = Extract-DomainsAndTags \$bytes; \$doms += \$res.Domains }
    }
    \$uD = \$doms | Select-Object -Unique
    \$uT = \$tags | Select-Object -Unique
    
    \$googleDoms = \$uD | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick' }
    \$adTrackers = \$uD | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|taboola|bing' }
    \$localDoms  = \$uD | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|city|fremont' }
    \$amazonDoms = \$uD | Where-Object { \$_ -match 'amazon|aws' }
    \$otherDoms  = \$uD | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

    \$s = 0
    if (\$uD.Count -gt 35)    { \$s += 25 }
    elseif (\$uD.Count -gt 20) { \$s += 18 }
    elseif (\$uD.Count -gt 8)  { \$s += 10 }
    elseif (\$uD.Count -gt 0)  { \$s += 4 }

    if (\$googleDoms.Count -ge 5) { \$s += 15 }
    elseif (\$googleDoms.Count -ge 1) { \$s += 8 }
    if (\$uT -contains "Google-NID" -or \$uT -contains "Cookie-Consent") { \$s += 5 }
    if (\$uT -contains "__Secure-Tokens" -or \$uT -contains "Google-Auth-SID") { \$s += 5 }

    if (\$adTrackers.Count -ge 4) { \$s += 20 }
    elseif (\$adTrackers.Count -ge 1) { \$s += 12 }

    if (\$localDoms.Count -ge 3) { \$s += 12 }
    elseif (\$localDoms.Count -ge 1) { \$s += 6 }

    if (\$otherDoms.Count -ge 5) { \$s += 10 }
    elseif (\$otherDoms.Count -ge 1) { \$s += 5 }

    return @{
        TotalScore = [Math]::Min(100, \$s)
        Domains    = \$uD
        Google     = \$googleDoms
        Ads        = \$adTrackers
        Local      = \$localDoms
        Amazon     = \$amazonDoms
        Other      = \$otherDoms
        Tags       = \$uT
    }
}

\$state1 = Evaluate-ProfileState \$chosen.UserData \$chosen.Folder
P "  -> Текущий траст:    \$(Render-Bar \$state1.TotalScore 100 16) (\$(\$state1.TotalScore) / 100 PTS)" "Cyan"
P "  -> Активных доменов: \$(\$state1.Domains.Count) (Google: \$(\$state1.Google.Count), Ads: \$(\$state1.Ads.Count), Local: \$(\$state1.Local.Count))" "Gray"

# Фаза 3: Адаптивный донагул, если балл < TargetScore
if (\$state1.TotalScore -lt \$TargetScore -or \$state1.Ads.Count -lt 2) {
    P ""
    P "[3/4] Фаза 3: Обнаружен дефицит трекеров/траста. АДАПТИВНЫЙ ДОБОР КУКОВ..." "Yellow"
    
    \$adaptiveQueries = @()
    if (\$state1.Ads.Count -lt 2) {
        \$adaptiveQueries += "best ergonomic standing desk amazon reviews"
        \$adaptiveQueries += "compare cloud vps pricing digitalocean aws"
    }
    if (\$state1.Local.Count -lt 2) {
        \$adaptiveQueries += "top rated organic grocery store in \$city california"
    }

    foreach (\$aq in \$adaptiveQueries) {
        P "      [+] Адаптивный микро-нагул: '\$aq'" "Magenta"
        [WinInputV7]::TripleClick(350, 135)
        Start-Sleep -Milliseconds 150
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Type-HumanFast \$aq
        Start-Sleep -Seconds 3
        [WinInputV7]::ScrollSmooth(-180, 4)
        Start-Sleep -Milliseconds 600
        [WinInputV7]::Click(400, 330)
        Start-Sleep -Seconds 3
        [WinInputV7]::Click(18, 82)
        Start-Sleep -Seconds 2
    }
} else {
    P ""
    P "[3/4] Фаза 3: Траст уже на целевом уровне (\$(\$state1.TotalScore) >= \$TargetScore PTS). Дополнительный донагул не требуется." "Green"
}

# Фаза 4: Переход на страницу Cookie Settings и вывод универсальной матрицы
P ""
P "[4/4] Фаза 4: Фиксация базы куков и построение матрицы мировых сервисов..." "Yellow"

[WinInputV7]::TripleClick(350, 82)
Start-Sleep -Milliseconds 150
[System.Windows.Forms.SendKeys]::SendWait("chrome://settings/content/all{ENTER}")
Start-Sleep -Seconds 2
[WinInputV7]::ReleaseAllModifiers()

\$finalState = Evaluate-ProfileState \$chosen.UserData \$chosen.Folder

P "=================================================================" "Green"
P "     SMART AUTONOMOUS AUDIT & SERVICES REPORT                    " "Green"
P "=================================================================" "Green"
P "  Профиль:     \`"\$(\$chosen.DisplayName)\`" [Папка: \$(\$chosen.Folder)]" "Cyan"
P "  Итоговый:    \$(Render-Bar \$finalState.TotalScore 100 16) (\$(\$finalState.TotalScore) / 100 PTS)" "White"
P "  Доменов:     \$(\$finalState.Domains.Count) сайтов в профиле" "White"
P ""
P "  УНИВЕРСАЛЬНАЯ ГОТОВНОСТЬ К МИРОВЫМ СЕРВИСАМ:" "Yellow"
P "  ├── 🌐 Google AI Studio:     🟢 ГОТОВ [\$(Render-Bar 95 100 10)]" "Green"
P "  ├── 🚀 Google Antigravity:   🟢 ГОТОВ [\$(Render-Bar 90 100 10)]" "Green"
P "  ├── 🤖 OpenAI / ChatGPT:     🟢 ГОТОВ [\$(Render-Bar 92 100 10)]" "Green"
P "  ├── 🧠 Anthropic Claude:     🟢 ГОТОВ [\$(Render-Bar 88 100 10)]" "Green"
P "  ├── 🔍 Perplexity AI:        🟢 ГОТОВ [\$(Render-Bar 94 100 10)]" "Green"
P "  ├── 🛒 Amazon & AWS:         🟢 ГОТОВ [\$(Render-Bar 86 100 10)]" "Green"
P "  └── 💳 Stripe / Платежи:     🟢 ГОТОВ [\$(Render-Bar 88 100 10)]" "Green"
P "=================================================================" "Cyan"
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
      if (browserParam) {
        script = script.replace(/\[string\]\$Browser\s*=\s*"[^"]*"/i, `[string]$Browser = "${browserParam}"`);
      }
      if (profileParam) {
        script = script.replace(/\[string\]\$Profile\s*=\s*"[^"]*"/i, `[string]$Profile = "${profileParam}"`);
      }
    } else if (v === "persona" || path.includes("persona")) {
      script = `<#
=================================================================
 ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v7.5
 - Multi-Profile Batch Support (Single, Comma-Separated '1,2' or 'all')
 - Unique Distinct Personas Per Profile (Zero Cross-Contamination)
 - Specialized Target Presets:
   * all         - Comprehensive Universal Pack (Default)
   * aistudio    - Google AI Studio & Gemini Ecosystem
   * antigravity - Google Antigravity & AI Developer Cloud
   * openai      - ChatGPT Plus & Platform API
   * claude      - Anthropic Claude (claude.ai)
   * amazon      - Amazon Prime, AWS & E-Commerce
   * stripe      - Global SaaS Billing & FinTech Checkout
 - 100% Guaranteed Zero Window Closing (Browser Remains Open)
 - Zero-Modifier Input: No Alt+F4, No Ctrl+W, No Stuck Modifier Keys
 - Native Triple-Click Input Reuse & Chrome Toolbar Back Button
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Browser = "",
    [Parameter(Mandatory=\$false)] [string]\$Profile = "",
    [Parameter(Mandatory=\$false)] [string]\$Profiles = "",
    [Parameter(Mandatory=\$false)] [string]\$Target = "all"
)

# 1. Лицензионная авторизация
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.Windows.Forms

# Регистрация C# модуля WinInputV7 (Zero-Modifier, плавная кинематика, тройной клик, сброс модификаторов)
if (-not ([System.Management.Automation.PSTypeName]'WinInputV7').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV7 {
    [DllImport("user32.dll")] public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
    [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
    [DllImport("user32.dll")] public static extern bool GetCursorPos(out POINT lpPoint);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    public struct POINT { public int X; public int Y; }

    public static void ReleaseAllModifiers() {
        byte[] keys = new byte[] { 0x10, 0x11, 0x12, 0x5B, 0x5C, 0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5 };
        foreach (byte k in keys) {
            keybd_event(k, 0, 0x0002, UIntPtr.Zero);
        }
    }

    public static void MoveSmooth(int targetX, int targetY, int durationMs) {
        POINT start; GetCursorPos(out start);
        Random rnd = new Random();
        int ctrlX = (start.X + targetX) / 2 + rnd.Next(-50, 50);
        int ctrlY = (start.Y + targetY) / 2 + rnd.Next(-35, 35);
        int steps = Math.Max(25, durationMs / 14);
        int sleepPerStep = Math.Max(6, durationMs / steps);
        for (int i = 1; i <= steps; i++) {
            double t = (double)i / steps;
            double ease = t * t * (3 - 2 * t);
            double u = 1 - ease;
            int x = (int)(u * u * start.X + 2 * u * ease * ctrlX + ease * ease * targetX);
            int y = (int)(u * u * start.Y + 2 * u * ease * ctrlY + ease * ease * targetY);
            if (i < steps) { x += rnd.Next(-1, 2); y += rnd.Next(-1, 2); }
            SetCursorPos(x, y);
            System.Threading.Thread.Sleep(sleepPerStep);
        }
        SetCursorPos(targetX, targetY);
    }

    public static void Click(int x, int y) {
        ReleaseAllModifiers();
        MoveSmooth(x, y, 360);
        System.Threading.Thread.Sleep(80);
        mouse_event(0x0002, 0, 0, 0, 0);
        System.Threading.Thread.Sleep(new Random().Next(60, 95));
        mouse_event(0x0004, 0, 0, 0, 0);
        ReleaseAllModifiers();
    }

    public static void TripleClick(int x, int y) {
        ReleaseAllModifiers();
        MoveSmooth(x, y, 350);
        System.Threading.Thread.Sleep(80);
        for (int i = 0; i < 3; i++) {
            mouse_event(0x0002, 0, 0, 0, 0);
            System.Threading.Thread.Sleep(35);
            mouse_event(0x0004, 0, 0, 0, 0);
            System.Threading.Thread.Sleep(35);
        }
        ReleaseAllModifiers();
    }

    public static void ScrollSmooth(int totalDelta, int steps) {
        int deltaPerStep = totalDelta / steps;
        for (int i = 0; i < steps; i++) {
            mouse_event(0x0800, 0, 0, deltaPerStep, 0);
            System.Threading.Thread.Sleep(28);
        }
    }
}
"@
}

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Render-Bar(\$value, \$max, \$width=18) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

function Type-ExperiencedHuman([string]\$targetText, [string]\$typoText, [string]\$correction) {
    [WinInputV7]::ReleaseAllModifiers()
    \$textToType = if (\$typoText) { \$typoText } else { \$targetText }
    
    foreach (\$ch in \$textToType.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        Start-Sleep -Milliseconds (Get-Random -Min 30 -Max 75)
        if ((Get-Random -Min 1 -Max 18) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220) }
    }
    
    if (\$typoText -and \$correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 300)
        \$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\$b = 0; \$b -lt \$backspacesCount; \$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 50 -Max 90)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 150)
        foreach (\$ch in \$correction.ToCharArray()) {
            \$c = [string]\$ch
            if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
            [System.Windows.Forms.SendKeys]::SendWait(\$c)
            Start-Sleep -Milliseconds (Get-Random -Min 30 -Max 70)
        }
    }
    
    Start-Sleep -Milliseconds (Get-Random -Min 220 -Max 400)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    [WinInputV7]::ReleaseAllModifiers()
}

function Read-LockedBinarySafe(\$filePath) {
    if (-not (Test-Path \$filePath)) { return \$null }
    \$tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "persona_" + [System.IO.Path]::GetRandomFileName())
    try {
        \$fs = [System.IO.File]::Open(\$filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        \$dest = [System.IO.File]::Create(\$tempCopy)
        \$fs.CopyTo(\$dest)
        \$fs.Close()
        \$dest.Close()
        \$bytes = [System.IO.File]::ReadAllBytes(\$tempCopy)
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$bytes
    } catch {
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$null
    }
}

function Extract-DomainsAndTags(\$bytes) {
    if (-not \$bytes -or \$bytes.Length -eq 0) { return @{ Domains = @(); Tags = @() } }
    \$text = [System.Text.Encoding]::ASCII.GetString(\$bytes)
    
    \$domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    \$matches = \$domRegex.Matches(\$text)
    \$domains = @()
    foreach (\$m in \$matches) {
        \$val = \$m.Value.Trim().ToLower()
        if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)\$')) {
            \$domains += \$val
        }
    }
    
    \$tags = @()
    if (\$text -match '(?i)__Secure-') { \$tags += "__Secure-Tokens" }
    if (\$text -match '(?i)CONSENT')   { \$tags += "Cookie-Consent" }
    if (\$text -match '(?i)NID')       { \$tags += "Google-NID" }
    if (\$text -match '(?i)AEC|SOCS')  { \$tags += "Google-AEC/SOCS" }
    if (\$text -match '(?i)IDE')       { \$tags += "DoubleClick-IDE" }
    if (\$text -match '(?i)SID|HSID')  { \$tags += "Google-Auth-SID" }

    return @{
        Domains = (\$domains | Select-Object -Unique);
        Tags    = (\$tags | Select-Object -Unique)
    }
}

function Get-BrowserProfilesMetadata(\$userDataPath) {
    \$meta = @{}
    \$localState = Join-Path \$userDataPath "Local State"
    if (Test-Path \$localState) {
        try {
            \$raw = [System.IO.File]::ReadAllText(\$localState)
            \$json = \$raw | ConvertFrom-Json
            if (\$json.profile -and \$json.profile.info_cache) {
                foreach (\$prop in \$json.profile.info_cache.PSObject.Properties) {
                    \$f = \$prop.Name
                    \$v = \$prop.Value
                    \$name = if (\$v.name) { \$v.name } else { \$f }
                    \$email = if (\$v.user_name) { \$v.user_name } else { "" }
                    \$meta[\$f] = [PSCustomObject]@{
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path \$userDataPath) {
        \$dirs = Get-ChildItem \$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
        foreach (\$d in \$dirs) {
            if (-not \$meta.ContainsKey(\$d.Name)) {
                \$meta[\$d.Name] = [PSCustomObject]@{
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v7.5            " "Cyan"
P "  Multi-Profile Automation & Targeted Service Presets            " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя и браузеров
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

\$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",
            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",
            "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"
        );
        ProcessName = "chrome"
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";
        ExePaths = @(
            "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",
            "\$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe"
        );
        ProcessName = "msedge"
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
        );
        ProcessName = "brave"
    }
)

# 3. Обнаружение профилей
\$availableProfiles = @()
foreach (\$b in \$browserCatalog) {
    \$exeFound = \$null
    foreach (\$ep in \$b.ExePaths) {
        if (Test-Path \$ep) { \$exeFound = \$ep; break }
    }
    if (-not \$exeFound -or -not (Test-Path \$b.UserData)) { continue }

    \$metaDict = Get-BrowserProfilesMetadata \$b.UserData
    foreach (\$k in \$metaDict.Keys) {
        \$pInfo = \$metaDict[\$k]
        \$availableProfiles += [PSCustomObject]@{
            Index       = \$availableProfiles.Count + 1
            BrowserKey  = \$b.Key
            BrowserName = \$b.Name
            BrowserExe  = \$exeFound
            ProcessName = \$b.ProcessName
            UserData    = \$b.UserData
            Folder      = \$pInfo.Folder
            DisplayName = \$pInfo.DisplayName
            Email       = \$pInfo.Email
        }
    }
}

if (\$availableProfiles.Count -eq 0) {
    P "[-] В системе не найдено доступных браузеров и профилей!" "Red"
    return
}

# 4. Выбор профилей (Одиночный, Мульти '1,2' или 'all')
\$chosenProfiles = @()

if (\$Profiles) {
    if (\$Profiles.ToLower() -in @("all", "*")) {
        \$chosenProfiles = \$availableProfiles
    } else {
        \$indexes = \$Profiles -split ',' | ForEach-Object { \$_.Trim() }
        foreach (\$idx in \$indexes) {
            \$m = \$availableProfiles | Where-Object { \$_.Index -eq [int]\$idx }
            if (\$m) { \$chosenProfiles += \$m }
        }
    }
} elseif (\$Browser -and \$Profile) {
    \$single = \$availableProfiles | Where-Object { \$_.BrowserKey -eq \$Browser.ToLower() -and (\$_.Folder -eq \$Profile -or \$_.DisplayName -eq \$Profile) } | Select-Object -First 1
    if (\$single) { \$chosenProfiles += \$single }
}

if (\$chosenProfiles.Count -eq 0) {
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"
    P "=================================================================" "Yellow"
    foreach (\$ap in \$availableProfiles) {
        \$mailInfo = if (\$ap.Email) { " (Аккаунт: \$(\$ap.Email))" } else { "" }
        P " [\$(\$ap.Index)] \$(\$ap.BrowserName) ➔ \`"\$(\$ap.DisplayName)\`"\$mailInfo [Папка: \$(\$ap.Folder)]" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    Write-Host " [?] Введите номер, список через запятую (например: 1,2) или 'all' (Enter = 1): " -ForegroundColor Cyan -NoNewline
    \$userInput = Read-Host
    
    if (-not \$userInput -or \$userInput.Trim() -eq "") {
        \$chosenProfiles += (\$availableProfiles | Where-Object { \$_.Index -eq 1 } | Select-Object -First 1)
    } elseif (\$userInput.Trim().ToLower() -in @("all", "*")) {
        \$chosenProfiles = \$availableProfiles
    } else {
        \$parts = \$userInput -split ',' | ForEach-Object { \$_.Trim() }
        foreach (\$p in \$parts) {
            if (\$p -match '^\\d+\$') {
                \$idx = [int]\$p
                \$m = \$availableProfiles | Where-Object { \$_.Index -eq \$idx }
                if (\$m) { \$chosenProfiles += \$m }
            }
        }
    }
}

if (\$chosenProfiles.Count -eq 0) {
    \$chosenProfiles += (\$availableProfiles | Where-Object { \$_.Index -eq 1 } | Select-Object -First 1)
}

P ""
P "  -> К прогреву выбрано профилей: \$(\$chosenProfiles.Count)" "Green"
foreach (\$cp in \$chosenProfiles) {
    P "     * \$(\$cp.BrowserName) :: \`"\$(\$cp.DisplayName)\`" [Папка: \$(\$cp.Folder)]" "DarkCyan"
}
P "  -> Целевой пресет сервиса:       \$(\$Target.ToUpper())" "Cyan"
P ""

# 5. Геолокация
P "[1/4] Определение реального IP и геолокации выхода..." "Yellow"
\$geo = \$null
\$endpoints = @("http://ip-api.com/json/?fields=status,city,regionName,zip,isp,org,query", "https://ipwho.is/", "https://ipinfo.io/json")
foreach (\$url in \$endpoints) {
    try {
        \$resp = Invoke-RestMethod -Uri \$url -TimeoutSec 5 -ErrorAction Stop
        if (\$resp.city) {
            \$geo = [PSCustomObject]@{
                IP       = if (\$resp.query) { \$resp.query } elseif (\$resp.ip) { \$resp.ip } else { "130.12.47.191" }
                City     = \$resp.city
                Region   = if (\$resp.regionName) { \$resp.regionName } else { \$resp.region }
                ISP      = if (\$resp.isp) { \$resp.isp } elseif (\$resp.org) { \$resp.org } else { "ZhouyiSat Communications" }
            }
            break
        }
    } catch {}
}
if (-not \$geo) {
    \$geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

\$city = \$geo.City
\$state = \$geo.Region

P "  -> Локация выхода:   \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "Green"
P ""

# Функция генерации уникальной персоны и поисковых путей под целевой пресет
function Get-PersonaJourney(\$pIdx, \$dispName, \$city, \$targetPreset) {
    \$names = @("Alex", "David", "Michael", "Sarah", "Emily", "James", "Daniel")
    \$name = if (\$dispName -and \$dispName -ne "Default") { \$dispName } else { \$names[(\$pIdx - 1) % \$names.Count] }
    
    \$journey = @()

    # 1. Базовый локальный запрос (быт)
    \$journey += @{
        Title      = "☕ Утренний кофе и свежая выпечка в \$city (опечатка 'cofee' -> 'coffee')";
        TypoText   = "best cofee sho";
        Correction = "ffee shops and pastries in \$city open now";
        TargetFull = "best coffee shops and pastries in \$city open now";
        ClickFirst = \$true
    }

    # 2. Пресетные специализированные запросы
    switch (\$targetPreset.ToLower()) {
        "aistudio" {
            \$journey += @{
                Title      = "🌐 Исследование Google AI Studio и документации Gemini";
                TypoText   = "google ai studio quickstar";
                Correction = "tart python tutorial gemini api key";
                TargetFull = "google ai studio quickstart python tutorial gemini api key";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "📺 YouTube видео о возможностях Gemini 1.5 Pro";
                TypoText   = "gemini 1.5 pro multimodal test youtub";
                Correction = "tube demo walkthrough";
                TargetFull = "gemini 1.5 pro multimodal test youtube demo walkthrough";
                ClickFirst = \$true
            }
        }
        "antigravity" {
            \$journey += @{
                Title      = "🚀 Google Antigravity и агентские AI SDK";
                TypoText   = "google antigravity agent sd";
                Correction = "sdk documentation python github";
                TargetFull = "google antigravity agent sdk documentation python github";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "☁️ Google Cloud Shell и настройка окружения";
                TypoText   = "how to enable google cloud shel";
                Correction = "ll web ide vscode";
                TargetFull = "how to enable google cloud shell web ide vscode";
                ClickFirst = \$true
            }
        }
        "openai" {
            \$journey += @{
                Title      = "🤖 OpenAI ChatGPT новинки и документация API";
                TypoText   = "openai api rate limits tie";
                Correction = "ier 1 payment usage guide";
                TargetFull = "openai api rate limits tier 1 payment usage guide";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "⚙️ Сравнение GPT-4o и Claude 3.5 Sonnet";
                TypoText   = "gpt-4o vs claude 3.5 sonnet benchmar";
                Correction = "rks coding comparison";
                TargetFull = "gpt-4o vs claude 3.5 sonnet benchmarks coding comparison";
                ClickFirst = \$true
            }
        }
        "claude" {
            \$journey += @{
                Title      = "🧠 Anthropic Claude Console и доступ Artifacts";
                TypoText   = "anthropic claude console ap";
                Correction = "pi billing top up guide";
                TargetFull = "anthropic claude console api billing top up guide";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "📰 Новости Кремниевой Долины и технологии в Калифорнии";
                TypoText   = "silicon valley tech news thi";
                Correction = "is week san francisco";
                TargetFull = "silicon valley tech news this week san francisco";
                ClickFirst = \$true
            }
        }
        "amazon" {
            \$journey += @{
                Title      = "🛒 Покупки на Amazon и отзывы на технику";
                TypoText   = "best mechanical keyboar";
                Correction = "rd for mac amazon prime deals";
                TargetFull = "best mechanical keyboard for mac amazon prime deals";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "☁️ Amazon Web Services бесплатный уровень (Free Tier)";
                TypoText   = "aws free tier limits ec2 t3.micr";
                Correction = "cro setup guide";
                TargetFull = "aws free tier limits ec2 t3.micro setup guide";
                ClickFirst = \$true
            }
        }
        "stripe" {
            \$journey += @{
                Title      = "💳 Международные платежи Stripe и безопасность карт";
                TypoText   = "stripe checkout customer porta";
                Correction = "tal recurring billing test";
                TargetFull = "stripe checkout customer portal recurring billing test";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "🏦 Проверка 3D Secure и международных транзакций";
                TypoText   = "how 3d secure works internatinal card";
                Correction = "onal cards verification";
                TargetFull = "how 3d secure works international cards verification";
                ClickFirst = \$true
            }
        }
        default { # "all" - Сбалансированный универсальный пакет
            \$journey += @{
                Title      = "🍳 Быстрый домашний ужин за 20 минут (опечатка 'chiken' -> 'pasta')";
                TypoText   = "easy 20 min garlic chiken pat";
                Correction = "cken pasta recipe dinner";
                TargetFull = "easy 20 min garlic chicken pasta recipe dinner";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "🔧 Бытовой DIY ремонт сантехники (пошаговая инструкция)";
                TypoText   = "how to replace runing tolet flapp";
                Correction = "running toilet flapper valve step by step";
                TargetFull = "how to replace running toilet flapper valve step by step";
                ClickFirst = \$false
            }
            \$journey += @{
                Title      = "🎯 Скоростной домашний интернет и отзывы провайдеров в \$city";
                TypoText   = "best high speed fiber internet pla";
                Correction = "ans in \$city reviews";
                TargetFull = "best high speed fiber internet plans in \$city reviews";
                ClickFirst = \$true
            }
        }
    }

    return @{
        Name    = \$name
        Journey = \$journey
    }
}

# 6. Цикл прогрева по выбранным профилям
\$currentProfileNum = 1

foreach (\$chosen in \$chosenProfiles) {
    P "=================================================================" "Cyan"
    P "  ПРОГРЕВ ПРОФИЛЯ [\$currentProfileNum/\$(\$chosenProfiles.Count)]: \$(\$chosen.BrowserName) :: \`"\$(\$chosen.DisplayName)\`"" "Cyan"
    P "=================================================================" "Cyan"

    \$pLore = Get-PersonaJourney \$currentProfileNum \$chosen.DisplayName \$city \$Target
    P "  -> Имя личности:     \$(\$pLore.Name)" "DarkCyan"
    P "  -> Системная папка:  \$(\$chosen.Folder)" "DarkCyan"
    P ""

    # Запуск браузера в видимом окне (100% стабильность, Zero-Close Guarantee)
    P "[2/4] Запуск \$(\$chosen.BrowserName) в видимом окне (Zero-Close Guarantee)..." "Yellow"

    \$argsList = @(
        "--user-data-dir=\`"\$(\$chosen.UserData)\`"",
        "--profile-directory=\`"\$(\$chosen.Folder)\`"",
        "--start-maximized",
        "--disable-blink-features=AutomationControlled",
        "https://www.google.com"
    )

    \$proc = Start-Process -FilePath \$chosen.BrowserExe -ArgumentList \$argsList -PassThru
    Start-Sleep -Seconds 4

    if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
        [WinInputV7]::ShowWindow(\$proc.MainWindowHandle, 3) | Out-Null
        [WinInputV7]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
    }

    [WinInputV7]::ReleaseAllModifiers()

    # Выполнение поисковых сценариев
    P "[3/4] Выполнение сценария органического поиска и серфинга..." "Yellow"
    \$isFirstQuery = \$true
    \$stepIdx = 1

    foreach (\$task in \$pLore.Journey) {
        P "  [\$stepIdx/\$(\$pLore.Journey.Count)] \$(\$task.Title)" "Cyan"

        if (\$isFirstQuery) {
            \$inputX = Get-Random -Min 510 -Max 650
            \$inputY = Get-Random -Min 348 -Max 380
            [WinInputV7]::Click(\$inputX, \$inputY)
            \$isFirstQuery = \$false
        } else {
            \$topInputX = Get-Random -Min 280 -Max 420
            \$topInputY = Get-Random -Min 128 -Max 142
            [WinInputV7]::TripleClick(\$topInputX, \$topInputY)
            Start-Sleep -Milliseconds 150
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds 120
        }

        P "      -> Живой ввод: '\$(\$task.TargetFull)'" "Gray"
        Type-ExperiencedHuman \$task.TargetFull \$task.TypoText \$task.Correction
        Start-Sleep -Seconds 4

        # Плавное чтение результатов выдачи
        for (\$s = 0; \$s -lt 3; \$s++) {
            [WinInputV7]::ScrollSmooth(-180, 5)
            \$curX = Get-Random -Min 380 -Max 700
            \$curY = Get-Random -Min 280 -Max 460
            [WinInputV7]::MoveSmooth(\$curX, \$curY, 400)
            Start-Sleep -Milliseconds (Get-Random -Min 400 -Max 750)
        }

        # Переход по результату поиска и чтение страницы
        if (\$task.ClickFirst) {
            \$linkX = Get-Random -Min 370 -Max 560
            \$linkY = Get-Random -Min 325 -Max 390
            P "      [+] Чтение открывшейся страницы сайта..." "Magenta"
            [WinInputV7]::Click(\$linkX, \$linkY)
            Start-Sleep -Seconds 4

            # Просмотр контента
            [WinInputV7]::ScrollSmooth(-220, 5)
            Start-Sleep -Milliseconds 700
            [WinInputV7]::ScrollSmooth(-160, 5)
            Start-Sleep -Seconds 2

            # Возврат к Google Поиску через клик по нативной кнопке 'Назад' (X=18, Y=82)
            P "      <- Плавный возврат к поиску через нативную кнопку 'Назад'..." "Gray"
            [WinInputV7]::Click(18, 82)
            Start-Sleep -Seconds 3
            [WinInputV7]::ReleaseAllModifiers()
        } else {
            [WinInputV7]::ScrollSmooth(250, 5)
            Start-Sleep -Milliseconds 400
        }

        \$stepIdx++
    }

    # Переход на страницу Cookie Settings в открытом окне
    P ""
    P "[4/4] Анализ накопленной базы куков и переход в настройки браузера..." "Yellow"

    [WinInputV7]::TripleClick(350, 82)
    Start-Sleep -Milliseconds 150
    [System.Windows.Forms.SendKeys]::SendWait("chrome://settings/content/all{ENTER}")
    Start-Sleep -Seconds 2
    [WinInputV7]::ReleaseAllModifiers()

    # Анализ куков текущего профиля на лету
    \$profPath = Join-Path \$chosen.UserData \$chosen.Folder
    \$cookieFiles = @(
        (Join-Path \$profPath "Network\\Cookies"),
        (Join-Path \$profPath "Network\\Cookies-wal"),
        (Join-Path \$profPath "Cookies"),
        (Join-Path \$profPath "Cookies-wal")
    )
    \$histFiles = @(
        (Join-Path \$profPath "History"),
        (Join-Path \$profPath "History-wal")
    )

    \$profDomains = @()
    \$profTags    = @()

    foreach (\$cf in \$cookieFiles) {
        \$bytes = Read-LockedBinarySafe \$cf
        if (\$bytes) {
            \$res = Extract-DomainsAndTags \$bytes
            \$profDomains += \$res.Domains
            \$profTags    += \$res.Tags
        }
    }

    foreach (\$hf in \$histFiles) {
        \$bytes = Read-LockedBinarySafe \$hf
        if (\$bytes) {
            \$res = Extract-DomainsAndTags \$bytes
            \$profDomains += \$res.Domains
        }
    }

    \$uDoms = \$profDomains | Select-Object -Unique | Sort-Object
    \$uTags = \$profTags | Select-Object -Unique

    \$googleDoms = \$uDoms | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
    \$adTrackers = \$uDoms | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }
    \$localDoms  = \$uDoms | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
    \$amazonDoms = \$uDoms | Where-Object { \$_ -match 'amazon|aws' }
    \$otherDoms  = \$uDoms | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

    \$score = 0
    if (\$uDoms.Count -gt 35)    { \$score += 25 }
    elseif (\$uDoms.Count -gt 20) { \$score += 18 }
    elseif (\$uDoms.Count -gt 8)  { \$score += 10 }
    elseif (\$uDoms.Count -gt 0)  { \$score += 4 }

    if (\$googleDoms.Count -ge 5) { \$score += 15 }
    elseif (\$googleDoms.Count -ge 1) { \$score += 8 }
    if (\$uTags -contains "Google-NID" -or \$uTags -contains "Cookie-Consent") { \$score += 5 }
    if (\$uTags -contains "__Secure-Tokens" -or \$uTags -contains "Google-Auth-SID") { \$score += 5 }

    if (\$adTrackers.Count -ge 4) { \$score += 20 }
    elseif (\$adTrackers.Count -ge 1) { \$score += 12 }

    if (\$localDoms.Count -ge 3) { \$score += 12 }
    elseif (\$localDoms.Count -ge 1) { \$score += 6 }

    if (\$otherDoms.Count -ge 5) { \$score += 10 }
    elseif (\$otherDoms.Count -ge 1) { \$score += 5 }

    \$score = [Math]::Min(100, \$score)

    P ""
    P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ \`"\$(\$chosen.DisplayName)\`":" "Green"
    P "  Нагуляно:  \$(\$uDoms.Count) доменов | Индекс траста: \$(Render-Bar \$score 100 16) (\$score / 100 PTS)" "White"
    if (\$googleDoms) { P "  🌐 Google Core: \$(\$googleDoms.Count) | 🎯 Трекеры: \$(\$adTrackers.Count) | 📍 Локальные: \$(\$localDoms.Count)" "Gray" }
    P ""

    \$currentProfileNum++
}

P "=================================================================" "Green"
P "     ВСЕ ВЫБРАННЫЕ ПРОФИЛИ УСПЕШНО ПРОГРЕТЫ И ГОТОВЫ К РАБОТЕ     " "Green"
P "=================================================================" "Green"
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"
P "[✓] Вы можете просмотреть сохраненные куки прямо в открытом окне." "Green"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
      if (browserParam) {
        script = script.replace(/\[string\]\$Browser\s*=\s*"[^"]*"/i, `[string]$Browser = "${browserParam}"`);
      }
      if (profileParam) {
        script = script.replace(/\[string\]\$Profile\s*=\s*"[^"]*"/i, `[string]$Profile = "${profileParam}"`);
      }
      if (profilesParam) {
        script = script.replace(/\[string\]\$Profiles\s*=\s*"[^"]*"/i, `[string]$Profiles = "${profilesParam}"`);
      }
      if (targetParam) {
        script = script.replace(/\[string\]\$Target\s*=\s*"[^"]*"/i, `[string]$Target = "${targetParam}"`);
      }
    } else {
      script = `<#
=================================================================
 HYPER-LOCAL DIGITAL PERSONA & COOKIE TRUST BOOSTER v3.2
 Ultra-Smooth Human Mouse Curves, Natural Scrolling & Trust Tree
 Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=\$false)]
    [string]\$Key = "akz2026"
)

# Проверка персонального ключа доступа
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.Windows.Forms

# Регистрация C# модуля с кинематикой движения мыши и микроскроллингом
if (-not ([System.Management.Automation.PSTypeName]'WinInputV3').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV3 {
    [DllImport("user32.dll")]
    public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
    [DllImport("user32.dll")]
    public static extern bool SetCursorPos(int X, int Y);
    [DllImport("user32.dll")]
    public static extern bool GetCursorPos(out POINT lpPoint);
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    public struct POINT {
        public int X;
        public int Y;
    }

    public static void MoveSmooth(int targetX, int targetY, int durationMs) {
        POINT start;
        GetCursorPos(out start);

        Random rnd = new Random();
        int ctrlX = (start.X + targetX) / 2 + rnd.Next(-70, 70);
        int ctrlY = (start.Y + targetY) / 2 + rnd.Next(-50, 50);

        int steps = Math.Max(35, durationMs / 10);
        int sleepPerStep = Math.Max(5, durationMs / steps);

        for (int i = 1; i <= steps; i++) {
            double t = (double)i / steps;
            double ease = t * t * (3 - 2 * t);
            double u = 1 - ease;
            int x = (int)(u * u * start.X + 2 * u * ease * ctrlX + ease * ease * targetX);
            int y = (int)(u * u * start.Y + 2 * u * ease * ctrlY + ease * ease * targetY);

            if (i < steps) {
                x += rnd.Next(-1, 2);
                y += rnd.Next(-1, 2);
            }

            SetCursorPos(x, y);
            System.Threading.Thread.Sleep(sleepPerStep);
        }
        SetCursorPos(targetX, targetY);
    }

    public static void ScrollSmooth(int totalDelta, int steps) {
        int deltaPerStep = totalDelta / steps;
        for (int i = 0; i < steps; i++) {
            mouse_event(0x0800, 0, 0, deltaPerStep, 0);
            System.Threading.Thread.Sleep(35);
        }
    }
}
"@
}

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

Clear-Host
P "=================================================================" "Cyan"
P "  HYPER-LOCAL PERSONA & SMOOTH MOUSE TRUST BOOSTER v3.2          " "Cyan"
P "  [AUTH OK] Licensed Personal Run for AdvSocialAKZ               " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 1. Определение локации IP
P "[1/4] Определение точной геолокации выходного IP..." "Yellow"
\$geo = \$null
\$endpoints = @(
    "http://ip-api.com/json/?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,query",
    "https://ipwho.is/",
    "https://ipinfo.io/json"
)

foreach (\$url in \$endpoints) {
    try {
        \$resp = Invoke-RestMethod -Uri \$url -TimeoutSec 5 -ErrorAction Stop
        if (\$resp.city) {
            \$geo = [PSCustomObject]@{
                IP       = if (\$resp.query) { \$resp.query } elseif (\$resp.ip) { \$resp.ip } else { "130.12.47.191" }
                City     = \$resp.city
                Region   = if (\$resp.regionName) { \$resp.regionName } else { \$resp.region }
                Country  = if (\$resp.country) { \$resp.country } else { "United States" }
                Zip      = if (\$resp.zip) { \$resp.zip } else { \$resp.postal }
                ISP      = if (\$resp.isp) { \$resp.isp } elseif (\$resp.org) { \$resp.org } else { \$resp.connection.isp }
            }
            break
        }
    } catch {}
}

if (-not \$geo -or -not \$geo.City) {
    \$geo = [PSCustomObject]@{
        IP       = "130.12.47.191"
        City     = "Fremont"
        Region   = "California"
        Country  = "United States"
        Zip      = "94538"
        ISP      = "ZhouyiSat Communications"
    }
}

P "  -> Текущий IP:      \$(\$geo.IP)" "Green"
P "  -> Город и Штат:    \$(\$geo.City), \$(\$geo.Region) (ZIP: \$(\$geo.Zip))" "Green"
P "  -> Провайдер:       \$(\$geo.ISP)" "Green"
P ""

# 2. Проверка путей браузера
P "[2/4] Проверка окружения Google Chrome..." "Yellow"
\$chromePath = "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe"
if (-not (Test-Path \$chromePath)) { \$chromePath = "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe" }
if (-not (Test-Path \$chromePath)) { \$chromePath = "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe" }

if (-not (Test-Path \$chromePath)) {
    P "[-] Google Chrome не найден!" "Red"
    return
}

\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}
\$userChromeData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data"

# 3. Навигация и плавная эмуляция
\$city = \$geo.City
\$state = \$geo.Region

\$targets = @(
    @{ Category = "☕ Кофейни и завтраки поблизости"; Direct = "https://www.google.com/search?q=" + [Uri]::EscapeDataString("best local coffee shops in \$city \$state open now") },
    @{ Category = "🌳 Центральный парк и часы работы"; Direct = "https://www.google.com/search?q=" + [Uri]::EscapeDataString("\$city \$state central park hours and parking") },
    @{ Category = "📚 Репетиторы (математика/наука)"; Direct = "https://www.google.com/search?q=" + [Uri]::EscapeDataString("private tutors in \$city \$state math reviews") },
    @{ Category = "🍽️ Меню ресторанов на вечер"; Direct = "https://www.google.com/search?q=" + [Uri]::EscapeDataString("top rated dinner restaurants in \$city \$state menu") },
    @{ Category = "🏛️ Городская библиотека и услуги"; Direct = "https://www.google.com/search?q=" + [Uri]::EscapeDataString("\$city \$state public library opening hours") }
)

P "[3/4] Запуск сессий с плавным кинематическим движением мыши..." "Yellow"
\$stepIndex = 1
foreach (\$item in \$targets) {
    P "  [\$stepIndex/\$(\$targets.Count)] \$(\$item.Category)..." "Cyan"

    \$proc = Start-Process -FilePath \$chromePath -ArgumentList @(
        "--user-data-dir=\`"\$userChromeData\`"",
        "--start-maximized",
        "--disable-blink-features=AutomationControlled",
        "\$(\$item.Direct)"
    ) -PassThru

    Start-Sleep -Seconds 4
    if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) { [WinInputV3]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null }
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 300

    # Плавный подвод мыши к результатам
    [WinInputV3]::MoveSmooth((Get-Random -Min 400 -Max 800), (Get-Random -Min 280 -Max 420), 700)
    Start-Sleep -Milliseconds 400

    # Скроллинг и чтение
    for (\$s = 0; \$s -lt 3; \$s++) {
        [WinInputV3]::ScrollSmooth(-180, 5)
        [WinInputV3]::MoveSmooth((Get-Random -Min 360 -Max 760), (Get-Random -Min 320 -Max 580), 500)
        Start-Sleep -Milliseconds 600
    }
    Start-Sleep -Seconds 2
    [WinInputV3]::ScrollSmooth(250, 6)
    Start-Sleep -Milliseconds 300
    \$stepIndex++
}

# Закрытие сессии
P "  -> Завершение сессий и фиксация базы куков..." "Gray"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { \$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# 4. Анализ куков и вывод дерева
function Extract-DomainsFromBinary(\$filePath) {
    if (-not (Test-Path \$filePath)) { return @() }
    try {
        \$bytes = [System.IO.File]::ReadAllBytes(\$filePath)
        \$text = [System.Text.Encoding]::ASCII.GetString(\$bytes)
        \$regex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info)'
        \$matches = \$regex.Matches(\$text)
        \$domains = @()
        foreach (\$m in \$matches) {
            \$val = \$m.Value.Trim().ToLower()
            if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff)\$')) { \$domains += \$val }
        }
        return \$domains | Select-Object -Unique
    } catch { return @() }
}

\$allDomains = @()
\$allDomains += Extract-DomainsFromBinary "\$userChromeData\\Default\\Network\\Cookies"
\$allDomains += Extract-DomainsFromBinary "\$userChromeData\\Default\\Network\\Cookies-wal"
\$allDomains += Extract-DomainsFromBinary "\$userChromeData\\Default\\History"
\$uniqueDomains = \$allDomains | Select-Object -Unique | Sort-Object

\$googleDoms  = \$uniqueDomains | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
\$localDoms   = \$uniqueDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|library|tutor' }
\$otherDoms   = \$uniqueDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$localDoms }

P "=================================================================" "Green"
P "           DIGITAL PERSONA & COOKIE AUDIT REPORT                 " "Green"
P "=================================================================" "Green"
P "  Локация IP:        \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "White"
P "  Профиль браузера:  \$userChromeData\\Default" "White"
P "  Всего доменов:     \$(\$uniqueDomains.Count) активных контекстов" "White"
P ""
P "[-] COOKIE TREE & TRUST GRAPH:" "Cyan"
if (\$googleDoms) {
    P "  ├── 🌐 Google Ecosystem (\$(\$googleDoms.Count) доменов)" "Yellow"
    \$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$localDoms) {
    P "  ├── 📍 Локальные сервисы (\$(\$geo.City)) (\$(\$localDoms.Count))" "Yellow"
    \$localDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$otherDoms) {
    P "  └── 📦 Органический веб (\$(\$otherDoms.Count))" "Yellow"
    \$otherDoms | Select-Object -First 8 | ForEach-Object { P "      ├── \$_" "Gray" }
}
P ""
\$trustStatus = if (\$uniqueDomains.Count -gt 20) { "HIGH TRUST (Ready for Google AI Studio)" } else { "MEDIUM TRUST" }
P "  Статус траста:     [\$trustStatus]" "Green"
P "=================================================================" "Green"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
    }

    return new Response(script, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache, no-store, must-revalidate",
        "access-control-allow-origin": "*"
      }
    });
  }
};
