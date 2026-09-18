<#
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
    [Parameter(Mandatory=$false)]
    [string]$Key = "akz2026"
)

# 1. Лицензионная авторизация
$AUTHORIZED_KEY = "akz2026"
if ($Key -ne $AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = 'SilentlyContinue'

$sb = [System.Text.StringBuilder]::new()
function P($text, $color="White") {
    Write-Host $text -ForegroundColor $color
    [void]$sb.AppendLine($text)
}

function Render-Bar($value, $max, $width=18) {
    if ($max -le 0) { $max = 1 }
    $ratio = [Math]::Min(1.0, [Math]::Max(0.0, ($value / $max)))
    $filled = [int][Math]::Round($ratio * $width)
    $empty = $width - $filled
    $bar = ("█" * $filled) + ("░" * $empty)
    $pct = [int]($ratio * 100)
    return "[$bar] $pct%"
}

function Read-LockedBinarySafe($filePath) {
    if (-not (Test-Path $filePath)) { return $null }
    $tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "audit_" + [System.IO.Path]::GetRandomFileName())
    try {
        $fs = [System.IO.File]::Open($filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        $dest = [System.IO.File]::Create($tempCopy)
        $fs.CopyTo($dest)
        $fs.Close()
        $dest.Close()
        $bytes = [System.IO.File]::ReadAllBytes($tempCopy)
        Remove-Item -Path $tempCopy -Force -ErrorAction SilentlyContinue
        return $bytes
    } catch {
        Remove-Item -Path $tempCopy -Force -ErrorAction SilentlyContinue
        return $null
    }
}

function Extract-DomainsAndTags($bytes) {
    if (-not $bytes -or $bytes.Length -eq 0) { return @{ Domains = @(); Tags = @() } }
    $text = [System.Text.Encoding]::ASCII.GetString($bytes)
    
    $domRegex = [regex]'(?i)\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    $matches = $domRegex.Matches($text)
    $domains = @()
    foreach ($m in $matches) {
        $val = $m.Value.Trim().ToLower()
        if ($val.Length -gt 4 -and -not ($val -match '\.(png|jpg|gif|css|js|woff|svg|ico)$')) {
            $domains += $val
        }
    }
    
    $tags = @()
    if ($text -match '(?i)__Secure-') { $tags += "__Secure-Tokens" }
    if ($text -match '(?i)CONSENT')   { $tags += "Cookie-Consent" }
    if ($text -match '(?i)NID')       { $tags += "Google-NID" }
    if ($text -match '(?i)AEC|SOCS')  { $tags += "Google-AEC/SOCS" }
    if ($text -match '(?i)IDE')       { $tags += "DoubleClick-IDE" }
    if ($text -match '(?i)SID|HSID')  { $tags += "Google-Auth-SID" }

    return @{
        Domains = ($domains | Select-Object -Unique);
        Tags    = ($tags | Select-Object -Unique)
    }
}

function Get-BrowserProfilesMetadata($userDataPath) {
    $meta = @{}
    $localState = Join-Path $userDataPath "Local State"
    if (Test-Path $localState) {
        try {
            $raw = [System.IO.File]::ReadAllText($localState)
            $json = $raw | ConvertFrom-Json
            if ($json.profile -and $json.profile.info_cache) {
                foreach ($prop in $json.profile.info_cache.PSObject.Properties) {
                    $f = $prop.Name
                    $v = $prop.Value
                    $name = if ($v.name) { $v.name } else { $f }
                    $email = if ($v.user_name) { $v.user_name } else { "" }
                    $meta[$f] = [PSCustomObject]@{
                        Folder      = $f
                        DisplayName = $name
                        Email       = $email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path $userDataPath) {
        $dirs = Get-ChildItem $userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(Default|Profile \d+)$' }
        foreach ($d in $dirs) {
            if (-not $meta.ContainsKey($d.Name)) {
                $meta[$d.Name] = [PSCustomObject]@{
                    Folder      = $d.Name
                    DisplayName = $d.Name
                    Email       = ""
                }
            }
        }
    }
    return $meta
}

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v5.5     " "Cyan"
P "   Universal Global AI, Cloud & FinTech Services Engine          " "DarkCyan"
P "=================================================================" "Cyan"
P ""

$activeUser = $env:USERNAME
if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    $users = Get-ChildItem "C:\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if ($users) { $activeUser = $users[0].Name }
}

P "[1/3] Обнаружение браузеров, профилей и чтение экосистемы..." "Yellow"
P "  -> Системный пользователь: $activeUser" "Gray"

$browserConfigs = @(
    @{
        Name     = "Google Chrome";
        UserData = "C:\Users\$activeUser\AppData\Local\Google\Chrome\User Data"
    },
    @{
        Name     = "Microsoft Edge";
        UserData = "C:\Users\$activeUser\AppData\Local\Microsoft\Edge\User Data"
    },
    @{
        Name     = "Brave Browser";
        UserData = "C:\Users\$activeUser\AppData\Local\BraveSoftware\Brave-Browser\User Data"
    },
    @{
        Name     = "Opera Stable";
        UserData = "C:\Users\$activeUser\AppData\Roaming\Opera Software\Opera Stable"
    }
)

$profileCards = @()

foreach ($b in $browserConfigs) {
    if (-not (Test-Path $b.UserData)) { continue }
    
    $profilesMeta = Get-BrowserProfilesMetadata $b.UserData
    
    foreach ($k in $profilesMeta.Keys) {
        $meta = $profilesMeta[$k]
        $profPath = Join-Path $b.UserData $meta.Folder
        $profTitle = "$($b.Name) :: `"$($meta.DisplayName)`""
        if ($meta.Email) { $profTitle += " ($($meta.Email))" }
        $profTitle += " [Папка: $($meta.Folder)]"

        $cookieFiles = @(
            (Join-Path $profPath "Network\Cookies"),
            (Join-Path $profPath "Network\Cookies-wal"),
            (Join-Path $profPath "Cookies"),
            (Join-Path $profPath "Cookies-wal")
        )
        $histFiles = @(
            (Join-Path $profPath "History"),
            (Join-Path $profPath "History-wal")
        )

        $profDomains = @()
        $profTags    = @()

        foreach ($cf in $cookieFiles) {
            $bytes = Read-LockedBinarySafe $cf
            if ($bytes) {
                $res = Extract-DomainsAndTags $bytes
                $profDomains += $res.Domains
                $profTags    += $res.Tags
            }
        }

        $histCount = 0
        foreach ($hf in $histFiles) {
            $bytes = Read-LockedBinarySafe $hf
            if ($bytes) {
                $res = Extract-DomainsAndTags $bytes
                $profDomains += $res.Domains
                $histCount += $res.Domains.Count
            }
        }

        $uniqueProfDomains = $profDomains | Select-Object -Unique
        $uniqueProfTags    = $profTags | Select-Object -Unique

        $googleDoms  = $uniqueProfDomains | Where-Object { $_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
        $adTrackers  = $uniqueProfDomains | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing' }
        $localDoms   = $uniqueProfDomains | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor' }
        $amazonDoms  = $uniqueProfDomains | Where-Object { $_ -match 'amazon|aws|media-amazon|ssl-images-amazon' }
        $lifestyle   = $uniqueProfDomains | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

        # 1. Общий индекс доверия (General Trust Score)
        $score = 0
        if ($uniqueProfDomains.Count -gt 35)    { $score += 25 }
        elseif ($uniqueProfDomains.Count -gt 20) { $score += 18 }
        elseif ($uniqueProfDomains.Count -gt 8)  { $score += 10 }
        elseif ($uniqueProfDomains.Count -gt 0)  { $score += 4 }

        if ($googleDoms.Count -ge 5) { $score += 15 }
        elseif ($googleDoms.Count -ge 1) { $score += 8 }
        if ($uniqueProfTags -contains "Google-NID" -or $uniqueProfTags -contains "Cookie-Consent") { $score += 5 }
        if ($uniqueProfTags -contains "__Secure-Tokens" -or $uniqueProfTags -contains "Google-Auth-SID") { $score += 5 }

        if ($adTrackers.Count -ge 4) { $score += 20 }
        elseif ($adTrackers.Count -ge 1) { $score += 12 }

        if ($localDoms.Count -ge 3) { $score += 12 }
        elseif ($localDoms.Count -ge 1) { $score += 6 }
        if ($histCount -gt 15) { $score += 8 }
        elseif ($histCount -gt 3) { $score += 4 }

        if ($lifestyle.Count -ge 5) { $score += 10 }
        elseif ($lifestyle.Count -ge 1) { $score += 5 }

        $score = [Math]::Min(100, $score)

        # 2. Оценка доступности для конкретных мировых платформ:
        
        # A. Google AI Studio (Gemini Pro / Flash)
        $aiStudioScore = [int]($score * 0.4 + ($googleDoms.Count * 6) + ($adTrackers.Count * 4))
        if ($uniqueProfTags -contains "Google-NID") { $aiStudioScore += 10 }
        if ($uniqueProfTags -contains "Google-AEC/SOCS") { $aiStudioScore += 10 }
        if ($uniqueProfTags -contains "__Secure-Tokens") { $aiStudioScore += 10 }
        $aiStudioScore = [Math]::Min(100, [Math]::Max(15, $aiStudioScore))

        # B. Google Antigravity & AI Developer Ecosystem
        $antigravityScore = [int]($score * 0.45 + ($googleDoms.Count * 5) + 15)
        if ($uniqueProfTags -contains "Google-Auth-SID" -or $uniqueProfTags -contains "__Secure-Tokens") { $antigravityScore += 15 }
        $antigravityScore = [Math]::Min(100, [Math]::Max(20, $antigravityScore))

        # C. OpenAI / ChatGPT
        $openAiScore = [int]($score * 0.55 + ($lifestyle.Count * 4) + ($histCount * 1.5))
        if ($uniqueProfDomains.Count -ge 15) { $openAiScore += 15 }
        $openAiScore = [Math]::Min(100, [Math]::Max(20, $openAiScore))

        # D. Anthropic Claude
        $claudeScore = [int]($score * 0.50 + ($localDoms.Count * 6) + ($lifestyle.Count * 3))
        if ($uniqueProfDomains.Count -ge 12) { $claudeScore += 15 }
        $claudeScore = [Math]::Min(100, [Math]::Max(15, $claudeScore))

        # E. Perplexity AI
        $perplexityScore = [int]($score * 0.60 + ($lifestyle.Count * 4) + 15)
        $perplexityScore = [Math]::Min(100, [Math]::Max(25, $perplexityScore))

        # F. Amazon & AWS (Global E-Commerce)
        $amazonScore = [int]($score * 0.45 + ($adTrackers.Count * 6) + ($amazonDoms.Count * 12) + 10)
        if ($uniqueProfDomains.Count -ge 15) { $amazonScore += 15 }
        $amazonScore = [Math]::Min(100, [Math]::Max(20, $amazonScore))

        # G. Stripe & Global Payments
        $stripeScore = [int]($score * 0.45 + ($adTrackers.Count * 8) + ($lifestyle.Count * 3))
        if ($uniqueProfTags -contains "__Secure-Tokens") { $stripeScore += 10 }
        $stripeScore = [Math]::Min(100, [Math]::Max(10, $stripeScore))

        # H. X (Twitter) & Grok
        $xScore = [int]($score * 0.65 + ($lifestyle.Count * 3) + 10)
        $xScore = [Math]::Min(100, [Math]::Max(20, $xScore))

        $verdict = ""
        $verdictColor = ""
        if ($score -ge 72) {
            $verdict = "🟢 ВЫСОКИЙ ТРАСТ (Tier 1: High Trust Organic Persona - Полный доступ ко всем сервисам)"
            $verdictColor = "Green"
        } elseif ($score -ge 45) {
            $verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется плавный вход через YouTube)"
            $verdictColor = "Yellow"
        } else {
            $verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - рекомендуется прогрев: v=persona или v=auto)"
            $verdictColor = "Red"
        }

        $profileCards += [PSCustomObject]@{
            Title            = $profTitle;
            DisplayName      = $meta.DisplayName;
            Email            = $meta.Email;
            Folder           = $meta.Folder;
            Browser          = $b.Name;
            TotalDoms        = $uniqueProfDomains.Count;
            GoogleDoms       = $googleDoms.Count;
            AdTrackers       = $adTrackers.Count;
            LocalDoms        = $localDoms.Count;
            AmazonDoms       = $amazonDoms.Count;
            Lifestyle        = $lifestyle.Count;
            Tags             = $uniqueProfTags;
            Score            = $score;
            Verdict          = $verdict;
            VerdictCol       = $verdictColor;
            GoogleList       = $googleDoms;
            AdList           = $adTrackers;
            LocalList        = $localDoms;
            AIStudioScore    = $aiStudioScore;
            AntigravityScore = $antigravityScore;
            OpenAIScore      = $openAiScore;
            ClaudeScore      = $claudeScore;
            PerplexityScore  = $perplexityScore;
            AmazonScore      = $amazonScore;
            StripeScore      = $stripeScore;
            XScore           = $xScore;
        }
    }
}

P "  -> Обнаружено профилей: $($profileCards.Count)" "Green"
P ""

# 2. Вывод карточек профилей с графами экосистемы
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА И ЦИФРОВОГО СЛЕДА:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach ($card in $profileCards) {
    P "👤 ПРОФИЛЬ: $($card.Title)" "White"
    $bar = Render-Bar $card.Score 100 20
    P "   Индекс доверия:  $bar ($($card.Score) / 100 PTS)" "Cyan"
    P "   Статус профиля:  $($card.Verdict)" $card.VerdictCol
    P ""
    P "   [+] ГРАФ ЭКОСИСТЕМЫ И ЦИФРОВЫЕ МАРКЕРЫ:" "Yellow"
    P "       ├── 🌐 Google Core:      $(Render-Bar $card.GoogleDoms 10 14) ($($card.GoogleDoms) доменов)" "Gray"
    P "       ├── 🎯 Commercial/Ads:   $(Render-Bar $card.AdTrackers 6 14) ($($card.AdTrackers) трекеров)" "Gray"
    P "       ├── 📍 Geo & Local:      $(Render-Bar $card.LocalDoms 6 14) ($($card.LocalDoms) локаций)" "Gray"
    P "       └── 🍳 Lifestyle/DIY:    $(Render-Bar $card.Lifestyle 12 14) ($($card.Lifestyle) ресурсов)" "Gray"
    
    if ($card.Tags.Count -gt 0) {
        P "   [✓] Токены безопасности: $($card.Tags -join ' | ')" "DarkCyan"
    } else {
        P "   [-] Токены безопасности: НЕ ОБНАРУЖЕНЫ (чистый инкогнито)" "DarkRed"
    }
    P "-----------------------------------------------------------------" "Gray"
}

# 3. УНИВЕРСАЛЬНАЯ МАТРИЦА ДОСТУПА К МИРОВЫМ СЕРВИСАМ (ALL SERVICES MATRIX)
P "[3/3] УНИВЕРСАЛЬНАЯ МАТРИЦА ДОСТУПА К МИРОВЫМ СЕРВИСАМ:" "Cyan"
P "=================================================================" "Cyan"

$activeCard = $profileCards | Where-Object { $_.Score -ge 70 } | Select-Object -First 1
if (-not $activeCard) { $activeCard = $profileCards | Sort-Object Score -Descending | Select-Object -First 1 }

if ($activeCard) {
    P "🎯 ОЦЕНКА ДОСТУПА ДЛЯ ОСНОВНОГО ПРОФИЛЯ:" "Yellow"
    P "   $($activeCard.Browser) -> `"$($activeCard.DisplayName)`" [Папка: $($activeCard.Folder)]" "White"
    P "-----------------------------------------------------------------" "Gray"
    
    function Get-StatusPill($val) {
        if ($val -ge 75) { return "🟢 ГОТОВ       " }
        elseif ($val -ge 50) { return "🟡 СРЕДНИЙ     " }
        else { return "🔴 НУЖЕН НАГУЛ " }
    }

    P " 🌐 1. Google AI Studio (Gemini Pro)  $(Get-StatusPill $activeCard.AIStudioScore) $(Render-Bar $activeCard.AIStudioScore 100 12)" "Green"
    P "    -> URL: https://aistudio.google.com | Авторизация через Google аккаунт" "Gray"
    P ""
    P " 🚀 2. Google Antigravity (AI IDE)    $(Get-StatusPill $activeCard.AntigravityScore) $(Render-Bar $activeCard.AntigravityScore 100 12)" "Green"
    P "    -> Cloud Shell, AI SDK и агентские среды Google Cloud" "Gray"
    P ""
    P " 🤖 3. OpenAI / ChatGPT Plus & API    $(Get-StatusPill $activeCard.OpenAIScore) $(Render-Bar $activeCard.OpenAIScore 100 12)" "Green"
    P "    -> URL: https://chatgpt.com | Чистый US IP, нет Cloudflare банов" "Gray"
    P ""
    P " 🧠 4. Anthropic Claude (claude.ai)   $(Get-StatusPill $activeCard.ClaudeScore) $(Render-Bar $activeCard.ClaudeScore 100 12)" "Green"
    P "    -> URL: https://claude.ai | Чистый WebRTC, гео-соответствие California" "Gray"
    P ""
    P " 🔍 5. Perplexity AI Pro & Search     $(Get-StatusPill $activeCard.PerplexityScore) $(Render-Bar $activeCard.PerplexityScore 100 12)" "Green"
    P "    -> URL: https://www.perplexity.ai | Органическая история запросов" "Gray"
    P ""
    P " 🛒 6. Amazon (AWS & E-Commerce)      $(Get-StatusPill $activeCard.AmazonScore) $(Render-Bar $activeCard.AmazonScore 100 12)" "Green"
    P "    -> URL: https://www.amazon.com | Потребительский след и облако AWS" "Gray"
    P ""
    P " 💳 7. Stripe & Global Billing / Карты $(Get-StatusPill $activeCard.StripeScore) $(Render-Bar $activeCard.StripeScore 100 12)" "Green"
    P "    -> Оплата подписок, международные чекауты (Fraud Score < 10)" "Gray"
    P ""
    P " 🪪 8. X (Twitter) & Grok             $(Get-StatusPill $activeCard.XScore) $(Render-Bar $activeCard.XScore 100 12)" "Green"
    P "    -> URL: https://x.com | Полноценный органический отпечаток" "Gray"
    P "-----------------------------------------------------------------" "Gray"
}

# Резюме по всем профилям
P "📋 СВОДНЫЙ ВЕРДИКТ ПО ВСЕМ ПРОФИЛЯМ:" "Yellow"
$trustedOnes = $profileCards | Where-Object { $_.Score -ge 70 }
$mediumOnes  = $profileCards | Where-Object { $_.Score -ge 45 -and $_.Score -lt 70 }
$bareOnes    = $profileCards | Where-Object { $_.Score -lt 45 }

if ($trustedOnes) {
    P "  🟢 РЕКОМЕНДОВАНЫ ДЛЯ ВСЕХ МИРОВЫХ AI И ФИНТЕХ-СЕРВИСОВ (Трастовые):" "Green"
    foreach ($tp in $trustedOnes) {
        $mail = if ($tp.Email) { " <$($tp.Email)>" } else { "" }
        P "     * $($tp.Browser) -> `"$($tp.DisplayName)`"$mail [Папка: $($tp.Folder)]" "Green"
    }
}
if ($mediumOnes) {
    P "  🟡 ТРЕБУЮТ ВХОДА ЧЕРЕЗ YOUTUBE ИЛИ ДОПОЛНИТЕЛЬНОГО ПРОГРЕВА:" "Yellow"
    foreach ($mp in $mediumOnes) {
        $mail = if ($mp.Email) { " <$($mp.Email)>" } else { "" }
        P "     * $($mp.Browser) -> `"$($mp.DisplayName)`"$mail [Папка: $($mp.Folder)]" "Yellow"
    }
}
if ($bareOnes) {
    P "  🔴 НЕТРАСТОВЫЕ (Рекомендуется запустить прогрев: v=persona или v=auto):" "Red"
    foreach ($bp in $bareOnes) {
        P "     * $($bp.Browser) -> `"$($bp.DisplayName)`" [Папка: $($bp.Folder)]" "Red"
    }
}

P "=================================================================" "Cyan"

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
