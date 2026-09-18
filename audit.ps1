<#
=================================================================
 GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST SCORE AUDITOR v4.5
 - Multi-Browser & Profile Auto-Discovery (Chrome, Edge, Brave)
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

# 1. Проверка персонального ключа доступа
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

# Функция безопасного чтения заблокированных файлов без закрытия браузера
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
    
    # Поиск доменов
    $domRegex = [regex]'(?i)\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    $matches = $domRegex.Matches($text)
    $domains = @()
    foreach ($m in $matches) {
        $val = $m.Value.Trim().ToLower()
        if ($val.Length -gt 4 -and -not ($val -match '\.(png|jpg|gif|css|js|woff|svg|ico)$')) {
            $domains += $val
        }
    }
    
    # Поиск ключевых индикаторов доверия и трекеров
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

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v4.5     " "Cyan"
P "   Real-Time Digital Footprint & Anti-Fraud Graph Analyzer       " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
$activeUser = $env:USERNAME
if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    $users = Get-ChildItem "C:\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if ($users) { $activeUser = $users[0].Name }
}

P "[1/3] Поиск установленных браузеров и активных профилей..." "Yellow"
P "  -> Системный пользователь: $activeUser" "Gray"

$browserConfigs = @(
    @{
        Name     = "Google Chrome";
        UserData = "C:\Users\$activeUser\AppData\Local\Google\Chrome\User Data";
        ExePath  = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
    },
    @{
        Name     = "Microsoft Edge";
        UserData = "C:\Users\$activeUser\AppData\Local\Microsoft\Edge\User Data";
        ExePath  = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
    },
    @{
        Name     = "Brave Browser";
        UserData = "C:\Users\$activeUser\AppData\Local\BraveSoftware\Brave-Browser\User Data";
        ExePath  = "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe"
    }
)

$profilesAudited = 0
$totalDomainsAll = @()
$totalTagsAll    = @()
$profileCards    = @()

foreach ($b in $browserConfigs) {
    if (-not (Test-Path $b.UserData)) { continue }
    
    # Поиск профилей (Default, Profile 1, Profile 2...)
    $profDirs = Get-ChildItem $b.UserData -Directory | Where-Object { $_.Name -match '^(Default|Profile \d+)$' }
    
    foreach ($p in $profDirs) {
        $profilesAudited++
        $profPath = $p.FullName
        $profName = "$($b.Name) :: $($p.Name)"

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

        $totalDomainsAll += $uniqueProfDomains
        $totalTagsAll    += $uniqueProfTags

        # Классификация доменов профиля
        $googleDoms  = $uniqueProfDomains | Where-Object { $_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
        $adTrackers  = $uniqueProfDomains | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing|amazon-adsystem' }
        $localDoms   = $uniqueProfDomains | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor|care' }
        $lifestyle   = $uniqueProfDomains | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

        # --- РАСЧЁТ ИНДЕКСА ТРАСТА (TRUST SCORE ENGINE: 0 - 100 PTS) ---
        $score = 0
        
        # 1. Разнообразие и объем куков (макс 25)
        if ($uniqueProfDomains.Count -gt 35)    { $score += 25 }
        elseif ($uniqueProfDomains.Count -gt 20) { $score += 18 }
        elseif ($uniqueProfDomains.Count -gt 8)  { $score += 10 }
        elseif ($uniqueProfDomains.Count -gt 0)  { $score += 4 }

        # 2. Интеграция в Google Ecosystem (макс 25)
        if ($googleDoms.Count -ge 5) { $score += 15 }
        elseif ($googleDoms.Count -ge 1) { $score += 8 }
        if ($uniqueProfTags -contains "Google-NID" -or $uniqueProfTags -contains "Cookie-Consent") { $score += 5 }
        if ($uniqueProfTags -contains "__Secure-Tokens" -or $uniqueProfTags -contains "Google-Auth-SID") { $score += 5 }

        # 3. Рекламный и коммерческий след (макс 20)
        # Реальный пользователь ОБЯЗАТЕЛЬНО собирает трекеры DoubleClick / Criteo
        if ($adTrackers.Count -ge 4) { $score += 20 }
        elseif ($adTrackers.Count -ge 1) { $score += 12 }

        # 4. Глубина истории и локальный контекст (макс 20)
        if ($localDoms.Count -ge 3) { $score += 12 }
        elseif ($localDoms.Count -ge 1) { $score += 6 }
        if ($histCount -gt 15) { $score += 8 }
        elseif ($histCount -gt 3) { $score += 4 }

        # 5. Органический веб-след (макс 10)
        if ($lifestyle.Count -ge 5) { $score += 10 }
        elseif ($lifestyle.Count -ge 1) { $score += 5 }

        $score = [Math]::Min(100, $score)

        # Определение статуса профиля
        $verdict = ""
        $verdictColor = ""
        if ($score -ge 75) {
            $verdict = "🟢 ТРАСТОВЫЙ ПРОФИЛЬ (Tier 1: High Trust Organic Persona)"
            $verdictColor = "Green"
        } elseif ($score -ge 45) {
            $verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется вход через YouTube)"
            $verdictColor = "Yellow"
        } else {
            $verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - высокий риск SMS/блока)"
            $verdictColor = "Red"
        }

        $profileCards += [PSCustomObject]@{
            Name        = $profName;
            Path        = $profPath;
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
            LifeList    = $lifestyle;
        }
    }
}

P "  -> Обнаружено профилей: $profilesAudited" "Green"
P ""

# 3. Вывод результатов и графиков
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА И ЦИФРОВОГО СЛЕДА:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach ($card in $profileCards) {
    P "🌐 ПРОФИЛЬ: $($card.Name)" "White"
    P "   Путь: $($card.Path)" "Gray"
    
    # Визуальная шкала траста
    $bar = Render-Bar $card.Score 100 24
    P "   Шкала траста:    $bar ($($card.Score) / 100 PTS)" "Cyan"
    P "   Вердикт:         $($card.Verdict)" $card.VerdictCol
    P ""
    
    # Графики распределения по категориям
    P "   [+] РАСПРЕДЕЛЕНИЕ ЭКОСИСТЕМЫ (ГРАФ ДОМЕНОВ):" "Yellow"
    $gBar = Render-Bar $card.GoogleDoms 10 16
    P "       ├── 🌐 Google Core:      $gBar ($($card.GoogleDoms) доменов)" "Gray"
    $aBar = Render-Bar $card.AdTrackers 6 16
    P "       ├── 🎯 Commercial/Ads:   $aBar ($($card.AdTrackers) трекеров)" "Gray"
    $lBar = Render-Bar $card.LocalDoms 6 16
    P "       ├── 📍 Geo & Local:      $lBar ($($card.LocalDoms) локаций)" "Gray"
    $sBar = Render-Bar $card.Lifestyle 12 16
    P "       └── 🍳 Lifestyle/DIY:    $sBar ($($card.Lifestyle) ресурсов)" "Gray"
    P ""

    # Ключевые маркеры безопасности
    if ($card.Tags.Count -gt 0) {
        $tagStr = ($card.Tags -join " | ")
        P "   [✓] Маркеры антифрода:   $tagStr" "DarkCyan"
    } else {
        P "   [-] Маркеры антифрода:   НЕ ОБНАРУЖЕНЫ (чистый инкогнито-профиль)" "DarkRed"
    }

    # Раскрытие дерева доменов
    P "   [+] ДЕРЕВО НАКОПЛЕННЫХ КУКОВ:" "White"
    if ($card.GoogleList) {
        $card.GoogleList | Select-Object -First 6 | ForEach-Object { P "       * [Google] $_" "DarkGray" }
    }
    if ($card.AdList) {
        $card.AdList | Select-Object -First 6 | ForEach-Object { P "       * [AdTrack] $_" "Magenta" }
    }
    if ($card.LocalList) {
        $card.LocalList | Select-Object -First 4 | ForEach-Object { P "       * [Local] $_" "Green" }
    }
    P "-----------------------------------------------------------------" "Gray"
}

# 4. Итоговая матрица сравнения
P "[3/3] СВОДНАЯ МАТРИЦА ГОТОВНОСТИ К GOOGLE AI STUDIO:" "Yellow"
P ""
P "  Критерии трастового профиля для обхода фрода Google:" "White"
P "   1. Наличие Google Core доменов + куки NID/CONSENT (минимум 5+ доменов)" "Gray"
P "   2. Присутствие коммерческих трекеров DoubleClick/Criteo (доказывает живого человека)" "Gray"
P "   3. Разнообразие истории поиска (не менее 15-20 активных доменов)" "Gray"
P "   4. Нулевой рассинхрон IP и Timezone (ранее подтверждено: Fremont, CA)" "Gray"
P ""

$bestProfile = $profileCards | Sort-Object -Property Score -Descending | Select-Object -First 1
if ($bestProfile) {
    if ($bestProfile.Score -ge 70) {
        P "  РЕКОМЕНДАЦИЯ: Профиль '$($bestProfile.Name)' ГОТОВ к регистрации/входу!" "Green"
        P "  Риск запроса номера телефона: МИНИМАЛЬНЫЙ (0-5%)." "Green"
    } elseif ($bestProfile.Score -ge 40) {
        P "  РЕКОМЕНДАЦИЯ: Профиль '$($bestProfile.Name)' прогрет, но рекомендуется войти сначала на YouTube." "Yellow"
    } else {
        P "  РЕКОМЕНДАЦИЯ: Профиль пуст. Обязательно запустите 'v=persona' прогрев перед логином!" "Red"
    }
}

P "=================================================================" "Cyan"

# Копирование в буфер обмена
$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try {
    Set-Clipboard -Value $finalOutput
} catch {
    [System.Windows.Forms.Clipboard]::SetText($finalOutput)
}

Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
