<#
=================================================================
 GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST SCORE AUDITOR v4.8
 - Profile Names & Account Emails Auto-Discovery (Local State)
 - Multi-Browser Audit: Chrome, Edge, Brave, Opera, Yandex
 - Non-Intrusive Locked File Reading (No Browser Close Required)
 - Real-Time Trust Scoring Engine (0 - 100 PTS)
 - Visual ASCII Distribution Graphs & Ecosystem Breakdown
 - Trust Classification: Trusted vs Untrusted Profile Verdict
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$Key = "akz2026"
)

# Проверка ключа
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

function Render-Bar($value, $max, $width=20) {
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
                        Folder = $f
                        DisplayName = $name
                        Email = $email
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
                    Folder = $d.Name
                    DisplayName = $d.Name
                    Email = ""
                }
            }
        }
    }
    return $meta
}

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v4.8     " "Cyan"
P "   Automatic Profile Human-Names & Anti-Fraud Graph Analysis     " "DarkCyan"
P "=================================================================" "Cyan"
P ""

$activeUser = $env:USERNAME
if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    $users = Get-ChildItem "C:\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if ($users) { $activeUser = $users[0].Name }
}

P "[1/3] Поиск установленных браузеров и декодирование имён профилей..." "Yellow"
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
        $lifestyle   = $uniqueProfDomains | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

        # Расчёт траста
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

        $verdict = ""
        $verdictColor = ""
        if ($score -ge 75) {
            $verdict = "🟢 ТРАСТОВЫЙ ПРОФИЛЬ (Tier 1: High Trust Organic Persona)"
            $verdictColor = "Green"
        } elseif ($score -ge 45) {
            $verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется вход через YouTube)"
            $verdictColor = "Yellow"
        } else {
            $verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - риск запроса номера)"
            $verdictColor = "Red"
        }

        $profileCards += [PSCustomObject]@{
            Title       = $profTitle;
            DisplayName = $meta.DisplayName;
            Email       = $meta.Email;
            Folder      = $meta.Folder;
            Browser     = $b.Name;
            TotalDoms   = $uniqueProfDomains.Count;
            GoogleDoms  = $googleDoms.Count;
            AdTrackers  = $adTrackers.Count;
            LocalDoms   = $localDoms.Count;
            Lifestyle   = $lifestyle.Count;
            Tags        = $uniqueProfTags;
            Score       = $score;
            Verdict     = $verdict;
            VerdictCol  = $verdictColor;
            GoogleList  = $googleDoms;
            AdList      = $adTrackers;
            LocalList   = $localDoms;
        }
    }
}

P "  -> Обнаружено профилей: $($profileCards.Count)" "Green"
P ""

# 2. Вывод карточек
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА ПО ИМЕНАМ ПРОФИЛЕЙ:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach ($card in $profileCards) {
    P "👤 ПРОФИЛЬ: $($card.Title)" "White"
    $bar = Render-Bar $card.Score 100 24
    P "   Индекс доверия:  $bar ($($card.Score) / 100 PTS)" "Cyan"
    P "   Статус:          $($card.Verdict)" $card.VerdictCol
    P ""
    P "   [+] ГРАФ ЭКОСИСТЕМЫ:" "Yellow"
    P "       ├── 🌐 Google Core:      $(Render-Bar $card.GoogleDoms 10 16) ($($card.GoogleDoms) доменов)" "Gray"
    P "       ├── 🎯 Commercial/Ads:   $(Render-Bar $card.AdTrackers 6 16) ($($card.AdTrackers) трекеров)" "Gray"
    P "       ├── 📍 Geo & Local:      $(Render-Bar $card.LocalDoms 6 16) ($($card.LocalDoms) локаций)" "Gray"
    P "       └── 🍳 Lifestyle/DIY:    $(Render-Bar $card.Lifestyle 12 16) ($($card.Lifestyle) сайтов)" "Gray"
    
    if ($card.Tags.Count -gt 0) {
        P "   [✓] Маркеры безопасности: $($card.Tags -join ' | ')" "DarkCyan"
    } else {
        P "   [-] Маркеры безопасности: НЕ ОБНАРУЖЕНЫ (чистый инкогнито)" "DarkRed"
    }
    P "-----------------------------------------------------------------" "Gray"
}

# 3. Итог
P "[3/3] СВОДНЫЙ ВЕРДИКТ ГОТОВНОСТИ:" "Yellow"
$trustedOnes = $profileCards | Where-Object { $_.Score -ge 70 }
$mediumOnes  = $profileCards | Where-Object { $_.Score -ge 45 -and $_.Score -lt 70 }
$bareOnes    = $profileCards | Where-Object { $_.Score -lt 45 }

if ($trustedOnes) {
    P "  🟢 ГОТОВЫ К ВХОДУ В GOOGLE AI STUDIO (Трастовые):" "Green"
    foreach ($tp in $trustedOnes) {
        $mail = if ($tp.Email) { " <$($tp.Email)>" } else { "" }
        P "     * $($tp.Browser) -> `"$($tp.DisplayName)`"$mail [Папка: $($tp.Folder)]" "Green"
    }
}
if ($mediumOnes) {
    P "  🟡 ТРЕБУЮТ ВХОДА ЧЕРЕЗ YOUTUBE (Средний траст):" "Yellow"
    foreach ($mp in $mediumOnes) {
        $mail = if ($mp.Email) { " <$($mp.Email)>" } else { "" }
        P "     * $($mp.Browser) -> `"$($mp.DisplayName)`"$mail [Папка: $($mp.Folder)]" "Yellow"
    }
}
if ($bareOnes) {
    P "  🔴 НЕТРАСТОВЫЕ (Рекомендуется запустить прогрев):" "Red"
    foreach ($bp in $bareOnes) {
        P "     * $($bp.Browser) -> `"$($bp.DisplayName)`" [Папка: $($bp.Folder)]" "Red"
    }
}

P "=================================================================" "Cyan"

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
