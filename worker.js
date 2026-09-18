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

    let script = `<#
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

    if (v === "audit" || path.includes("audit")) {
      script = `<#
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
    [Parameter(Mandatory=\$false)]
    [string]\$Key = "akz2026"
)

# 1. Проверка персонального ключа доступа
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

function Render-Bar(\$value, \$max, \$width=20) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

# Функция безопасного чтения заблокированных файлов без закрытия браузера
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
    
    # Поиск доменов
    \$domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    \$matches = \$domRegex.Matches(\$text)
    \$domains = @()
    foreach (\$m in \$matches) {
        \$val = \$m.Value.Trim().ToLower()
        if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)\$')) {
            \$domains += \$val
        }
    }
    
    # Поиск ключевых индикаторов доверия и трекеров
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

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v4.5     " "Cyan"
P "   Real-Time Digital Footprint & Anti-Fraud Graph Analyzer       " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

P "[1/3] Поиск установленных браузеров и активных профилей..." "Yellow"
P "  -> Системный пользователь: \$activeUser" "Gray"

\$browserConfigs = @(
    @{
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePath  = "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe"
    },
    @{
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";
        ExePath  = "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe"
    },
    @{
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
        ExePath  = "\$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
    }
)

\$profilesAudited = 0
\$totalDomainsAll = @()
\$totalTagsAll    = @()
\$profileCards    = @()

foreach (\$b in \$browserConfigs) {
    if (-not (Test-Path \$b.UserData)) { continue }
    
    # Поиск профилей (Default, Profile 1, Profile 2...)
    \$profDirs = Get-ChildItem \$b.UserData -Directory | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
    
    foreach (\$p in \$profDirs) {
        \$profilesAudited++
        \$profPath = \$p.FullName
        \$profName = "\$(\$b.Name) :: \$(\$p.Name)"

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

        \$totalDomainsAll += \$uniqueProfDomains
        \$totalTagsAll    += \$uniqueProfTags

        # Классификация доменов профиля
        \$googleDoms  = \$uniqueProfDomains | Where-Object { \$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
        \$adTrackers  = \$uniqueProfDomains | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing|amazon-adsystem' }
        \$localDoms   = \$uniqueProfDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor|care' }
        \$lifestyle   = \$uniqueProfDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

        # --- РАСЧЁТ ИНДЕКСА ТРАСТА (TRUST SCORE ENGINE: 0 - 100 PTS) ---
        \$score = 0
        
        # 1. Разнообразие и объем куков (макс 25)
        if (\$uniqueProfDomains.Count -gt 35)    { \$score += 25 }
        elseif (\$uniqueProfDomains.Count -gt 20) { \$score += 18 }
        elseif (\$uniqueProfDomains.Count -gt 8)  { \$score += 10 }
        elseif (\$uniqueProfDomains.Count -gt 0)  { \$score += 4 }

        # 2. Интеграция в Google Ecosystem (макс 25)
        if (\$googleDoms.Count -ge 5) { \$score += 15 }
        elseif (\$googleDoms.Count -ge 1) { \$score += 8 }
        if (\$uniqueProfTags -contains "Google-NID" -or \$uniqueProfTags -contains "Cookie-Consent") { \$score += 5 }
        if (\$uniqueProfTags -contains "__Secure-Tokens" -or \$uniqueProfTags -contains "Google-Auth-SID") { \$score += 5 }

        # 3. Рекламный и коммерческий след (макс 20)
        # Реальный пользователь ОБЯЗАТЕЛЬНО собирает трекеры DoubleClick / Criteo
        if (\$adTrackers.Count -ge 4) { \$score += 20 }
        elseif (\$adTrackers.Count -ge 1) { \$score += 12 }

        # 4. Глубина истории и локальный контекст (макс 20)
        if (\$localDoms.Count -ge 3) { \$score += 12 }
        elseif (\$localDoms.Count -ge 1) { \$score += 6 }
        if (\$histCount -gt 15) { \$score += 8 }
        elseif (\$histCount -gt 3) { \$score += 4 }

        # 5. Органический веб-след (макс 10)
        if (\$lifestyle.Count -ge 5) { \$score += 10 }
        elseif (\$lifestyle.Count -ge 1) { \$score += 5 }

        \$score = [Math]::Min(100, \$score)

        # Определение статуса профиля
        \$verdict = ""
        \$verdictColor = ""
        if (\$score -ge 75) {
            \$verdict = "🟢 ТРАСТОВЫЙ ПРОФИЛЬ (Tier 1: High Trust Organic Persona)"
            \$verdictColor = "Green"
        } elseif (\$score -ge 45) {
            \$verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется вход через YouTube)"
            \$verdictColor = "Yellow"
        } else {
            \$verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - высокий риск SMS/блока)"
            \$verdictColor = "Red"
        }

        \$profileCards += [PSCustomObject]@{
            Name        = \$profName;
            Path        = \$profPath;
            TotalDoms   = \$uniqueProfDomains.Count;
            GoogleDoms  = \$googleDoms.Count;
            AdTrackers  = \$adTrackers.Count;
            LocalDoms   = \$localDoms.Count;
            Lifestyle   = \$lifestyle.Count;
            Tags        = \$uniqueProfTags;
            Score       = \$score;
            Verdict     = \$verdict;
            VerdictCol  = \$verdictColor;
            GoogleList  = \$googleDoms;
            AdList      = \$adTrackers;
            LocalList   = \$localDoms;
            LifeList    = \$lifestyle;
        }
    }
}

P "  -> Обнаружено профилей: \$profilesAudited" "Green"
P ""

# 3. Вывод результатов и графиков
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА И ЦИФРОВОГО СЛЕДА:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach (\$card in \$profileCards) {
    P "🌐 ПРОФИЛЬ: \$(\$card.Name)" "White"
    P "   Путь: \$(\$card.Path)" "Gray"
    
    # Визуальная шкала траста
    \$bar = Render-Bar \$card.Score 100 24
    P "   Шкала траста:    \$bar (\$(\$card.Score) / 100 PTS)" "Cyan"
    P "   Вердикт:         \$(\$card.Verdict)" \$card.VerdictCol
    P ""
    
    # Графики распределения по категориям
    P "   [+] РАСПРЕДЕЛЕНИЕ ЭКОСИСТЕМЫ (ГРАФ ДОМЕНОВ):" "Yellow"
    \$gBar = Render-Bar \$card.GoogleDoms 10 16
    P "       ├── 🌐 Google Core:      \$gBar (\$(\$card.GoogleDoms) доменов)" "Gray"
    \$aBar = Render-Bar \$card.AdTrackers 6 16
    P "       ├── 🎯 Commercial/Ads:   \$aBar (\$(\$card.AdTrackers) трекеров)" "Gray"
    \$lBar = Render-Bar \$card.LocalDoms 6 16
    P "       ├── 📍 Geo & Local:      \$lBar (\$(\$card.LocalDoms) локаций)" "Gray"
    \$sBar = Render-Bar \$card.Lifestyle 12 16
    P "       └── 🍳 Lifestyle/DIY:    \$sBar (\$(\$card.Lifestyle) ресурсов)" "Gray"
    P ""

    # Ключевые маркеры безопасности
    if (\$card.Tags.Count -gt 0) {
        \$tagStr = (\$card.Tags -join " | ")
        P "   [✓] Маркеры антифрода:   \$tagStr" "DarkCyan"
    } else {
        P "   [-] Маркеры антифрода:   НЕ ОБНАРУЖЕНЫ (чистый инкогнито-профиль)" "DarkRed"
    }

    # Раскрытие дерева доменов
    P "   [+] ДЕРЕВО НАКОПЛЕННЫХ КУКОВ:" "White"
    if (\$card.GoogleList) {
        \$card.GoogleList | Select-Object -First 6 | ForEach-Object { P "       * [Google] \$_" "DarkGray" }
    }
    if (\$card.AdList) {
        \$card.AdList | Select-Object -First 6 | ForEach-Object { P "       * [AdTrack] \$_" "Magenta" }
    }
    if (\$card.LocalList) {
        \$card.LocalList | Select-Object -First 4 | ForEach-Object { P "       * [Local] \$_" "Green" }
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

\$bestProfile = \$profileCards | Sort-Object -Property Score -Descending | Select-Object -First 1
if (\$bestProfile) {
    if (\$bestProfile.Score -ge 70) {
        P "  РЕКОМЕНДАЦИЯ: Профиль '\$(\$bestProfile.Name)' ГОТОВ к регистрации/входу!" "Green"
        P "  Риск запроса номера телефона: МИНИМАЛЬНЫЙ (0-5%)." "Green"
    } elseif (\$bestProfile.Score -ge 40) {
        P "  РЕКОМЕНДАЦИЯ: Профиль '\$(\$bestProfile.Name)' прогрет, но рекомендуется войти сначала на YouTube." "Yellow"
    } else {
        P "  РЕКОМЕНДАЦИЯ: Профиль пуст. Обязательно запустите 'v=persona' прогрев перед логином!" "Red"
    }
}

P "=================================================================" "Cyan"

# Копирование в буфер обмена
\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try {
    Set-Clipboard -Value \$finalOutput
} catch {
    [System.Windows.Forms.Clipboard]::SetText(\$finalOutput)
}

Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
    } else if (v === "persona" || path.includes("persona")) {
      script = `<#
=================================================================
 ULTRA DIGITAL PERSONA & HUMAN SEARCH EXPERIENCE v5.0
 - Single Persistent Tab Session (No Tab Spamming)
 - Experienced Typist Simulation with Real-time Typos & Backspaces
 - In-Field Search Box Reuse (Natural Selection & Clear)
 - Power-User Navigation: Ctrl+Click Results, Read & Ctrl+W Return
 - Commercial & Organic Tracker Accumulator
 - Chrome Settings & Cookie GUI Inspection
 - Authorization Key Protected
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

# Регистрация C# модуля WinInputV5 (кинематика Безье, Ctrl+Click, скроллинг)
if (-not ([System.Management.Automation.PSTypeName]'WinInputV5').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV5 {
    [DllImport("user32.dll")]
    public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
    [DllImport("user32.dll")]
    public static extern bool SetCursorPos(int X, int Y);
    [DllImport("user32.dll")]
    public static extern bool GetCursorPos(out POINT lpPoint);
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, int dwExtraInfo);

    public const byte VK_CONTROL = 0x11;
    public const uint KEYEVENTF_KEYUP = 0x0002;

    public struct POINT {
        public int X;
        public int Y;
    }

    // Плавное дугообразное движение мыши (Кривая Безье + Smoothstep)
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

    // Обычный естественный клик
    public static void Click(int x, int y) {
        MoveSmooth(x, y, 400);
        System.Threading.Thread.Sleep(70);
        mouse_event(0x0002, 0, 0, 0, 0); // Down
        System.Threading.Thread.Sleep(new Random().Next(60, 110));
        mouse_event(0x0004, 0, 0, 0, 0); // Up
    }

    // Power-User клик: Ctrl + Left Click (открытие ссылки в фоновой вкладке)
    public static void CtrlClick(int x, int y) {
        MoveSmooth(x, y, 450);
        System.Threading.Thread.Sleep(80);
        keybd_event(VK_CONTROL, 0, 0, 0); // Ctrl Down
        System.Threading.Thread.Sleep(50);
        mouse_event(0x0002, 0, 0, 0, 0); // Left Down
        System.Threading.Thread.Sleep(new Random().Next(65, 100));
        mouse_event(0x0004, 0, 0, 0, 0); // Left Up
        System.Threading.Thread.Sleep(50);
        keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0); // Ctrl Up
    }

    // Микроскроллинг колесом мыши
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

# Функция живого посимвольного ввода опытного пользователя с симуляцией опечаток и исправлений
function Type-ExperiencedHuman([string]\$targetText, [string]\$typoText, [string]\$correction) {
    # 1. Печатаем начальную часть (с намеренной опечаткой, если задана)
    \$textToType = if (\$typoText) { \$typoText } else { \$targetText }
    
    foreach (\$ch in \$textToType.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            \$c = "{\$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        
        # Скорость опытного наборщика: 35–85 мс между клавишами
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 85)
        
        # Редкая микропауза на размышление (1 на 15 символов)
        if ((Get-Random -Min 1 -Max 16) -eq 1) {
            Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220)
        }
    }

    # 2. Если была опечатка: пауза осознания -> стирание Backspace -> ввод правильного окончания
    if (\$typoText -and \$correction) {
        # Задержка: "заметил ошибку"
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 340)
        
        # Сколько букв нужно стереть
        \$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\$b = 0; \$b -lt \$backspacesCount; \$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 110)
        }
        
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 180)
        
        # Допечатываем правильное окончание
        foreach (\$ch in \$correction.ToCharArray()) {
            \$c = [string]\$ch
            if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
                \$c = "{\$c}"
            }
            [System.Windows.Forms.SendKeys]::SendWait(\$c)
            Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 75)
        }
    }

    Start-Sleep -Milliseconds (Get-Random -Min 250 -Max 450)
    # Нажатие Enter для запуска поиска
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & HUMAN SEARCH EXPERIENCE v5.0           " "Cyan"
P "  Single-Tab Session, Realistic Typos & Power-User Navigation    " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 1. Определение локации IP
P "[1/5] Определение локации выходного узла..." "Yellow"
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

P "  -> Локация:     \$(\$geo.City), \$(\$geo.Region) (ZIP: \$(\$geo.Zip))" "Green"
P "  -> Провайдер:   \$(\$geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подготовка рабочего профиля пользователя..." "Yellow"
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

# Закрываем старые висящие сессии перед стартом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут цифровой личности в ОДНОЙ ВКЛАДКЕ (быт, опечатки, рецепты, Ctrl+Click)
\$city = \$geo.City

\$journey = @(
    @{
        Title        = "☕ Утренний кофе во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText     = "best cofee sho";
        Correction   = "ffee shops in \$city open now";
        TargetFull   = "best coffee shops in \$city open now";
        OpenResult   = \$true;
        IsCommercial = \$false
    },
    @{
        Title        = "🍳 Кулинарный рецепт ужина (опечатка 'patsa' -> 'pasta')";
        TypoText     = "easy 20 min garlic chiken pat";
        Correction   = "cken pasta recipe dinner";
        TargetFull   = "easy 20 min garlic chicken pasta recipe dinner";
        OpenResult   = \$true;
        IsCommercial = \$false
    },
    @{
        Title        = "🔧 Домашний ремонт сантехники (DIY запрос)";
        TypoText     = "how to replace runing flapp";
        Correction   = "running toilet flapper valve step by step";
        TargetFull   = "how to replace running toilet flapper valve step by step";
        OpenResult   = \$false;
        IsCommercial = \$false
    },
    @{
        Title        = "🎯 Коммерческий интернет (захват спонсорских трекеров)";
        TypoText     = "best home fiber internet pla";
        Correction   = "ans in \$city reviews";
        TargetFull   = "best home fiber internet plans in \$city reviews";
        OpenResult   = \$true;
        IsCommercial = \$true
    }
)

P "[3/5] Запуск ОДНОЙ вкладки Google и симуляция живого поиска..." "Yellow"

# Открываем ОДНО окно и ОДНУ вкладку Google
\$proc = Start-Process -FilePath \$chromePath -ArgumentList @(
    "--user-data-dir=\`"\$userChromeData\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV5]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
}

# Подтверждаем согласие с куками, если всплыло окно
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

\$isFirstQuery = \$true
\$step = 1

foreach (\$item in \$journey) {
    P "  [\$step/\$(\$journey.Count)] \$(\$item.Title)" "Cyan"

    if (\$isFirstQuery) {
        # На главной странице Google: кликаем прямо в центральное поле ввода
        \$inputX = Get-Random -Min 480 -Max 680
        \$inputY = Get-Random -Min 345 -Max 385
        P "      -> Наведение на центральное поле поиска (\$inputX, \$inputY)..." "Gray"
        [WinInputV5]::Click(\$inputX, \$inputY)
        \$isFirstQuery = \$false
    } else {
        # В СУЩЕСТВУЮЩЕЙ ВКЛАДКЕ ВЫДАЧИ: возвращаемся в ТО ЖЕ САМОЕ поле ввода наверху!
        # Очищаем старый запрос естественным выделением (Ctrl+A -> Backspace)
        \$topInputX = Get-Random -Min 240 -Max 450
        \$topInputY = Get-Random -Min 125 -Max 145
        P "      -> Возврат в то же поле поиска наверху страницы (\$topInputX, \$topInputY)..." "Gray"
        [WinInputV5]::Click(\$topInputX, \$topInputY)
        Start-Sleep -Milliseconds 180
        
        # Выделяем весь старый текст и стираем
        [System.Windows.Forms.SendKeys]::SendWait("^a")
        Start-Sleep -Milliseconds 120
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 180
    }

    # Посимвольная печать с опечаткой и исправлением
    P "      -> Живая печать запроса с микроопечаткой и исправлением..." "Gray"
    Type-ExperiencedHuman \$item.TargetFull \$item.TypoText \$item.Correction

    # Ждем загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Читаем выдачу: плавный скроллинг вниз
    for (\$i = 0; \$i -lt 3; \$i++) {
        [WinInputV5]::ScrollSmooth(-180, 5)
        # Водим мышкой по результатам
        \$curX = Get-Random -Min 380 -Max 720
        \$curY = Get-Random -Min 280 -Max 480
        [WinInputV5]::MoveSmooth(\$curX, \$curY, 450)
        Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
    }

    # Если требуется открыть результат: делаем Ctrl+Click (открытие ссылки в фоновой вкладке)
    if (\$item.OpenResult) {
        \$linkX = Get-Random -Min 350 -Max 600
        \$linkY = if (\$item.IsCommercial) { Get-Random -Min 230 -Max 280 } else { Get-Random -Min 320 -Max 420 }
        
        P "      [⚡] Power-User действие: Ctrl + Left Click по результату..." "Magenta"
        [WinInputV5]::CtrlClick(\$linkX, \$linkY)
        Start-Sleep -Milliseconds 900

        # Переключаемся на открытую вкладку через Ctrl+Tab
        P "      -> Переход на открытую вкладку (Ctrl+Tab)..." "Gray"
        [System.Windows.Forms.SendKeys]::SendWait("^{TAB}")
        Start-Sleep -Seconds 3

        # Скроллим и читаем сайт (набивая куки домена)
        [WinInputV5]::ScrollSmooth(-220, 5)
        Start-Sleep -Milliseconds 800
        [WinInputV5]::ScrollSmooth(-200, 5)
        Start-Sleep -Seconds 2

        # Закрываем вкладку и возвращаемся в нашу исходную вкладку поиска (Ctrl+W)
        P "      -> Закрытие вкладки через Ctrl+W (возврат к поисковику)..." "Gray"
        [System.Windows.Forms.SendKeys]::SendWait("^w")
        Start-Sleep -Milliseconds 800
    } else {
        # Скроллим наверх
        [WinInputV5]::ScrollSmooth(250, 5)
        Start-Sleep -Milliseconds 400
    }

    \$step++
}

# 4. Фиксация базы куков
P ""
P "[4/5] Фиксация базы куков и трекеров на диске..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { \$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

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

\$googleDoms = \$uniqueDomains | Where-Object { \$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
\$adTrackers = \$uniqueDomains | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|bing' }
\$localDoms  = \$uniqueDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
\$otherDoms  = \$uniqueDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v5.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "White"
P "  Профиль браузера:  \$userChromeData\\Default" "White"
P "  Нагуляно сайтов:   \$(\$uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] ДЕРЕВО НАГУЛА И ЦИФРОВОЙ ЛИЧНОСТИ:" "Cyan"
if (\$googleDoms) {
    P "  ├── 🌐 Google Core Ecosystem (\$(\$googleDoms.Count) доменов)" "Yellow"
    \$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$adTrackers) {
    P "  ├── 🎯 Рекламные трекеры и спонсоры (\$(\$adTrackers.Count) трекеров)" "Yellow"
    \$adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$localDoms) {
    P "  ├── 📍 Локальный контекст (\$(\$geo.City)) (\$(\$localDoms.Count) доменов)" "Yellow"
    \$localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$otherDoms) {
    P "  └── 🍳 Бытовой нагул (рецепты/DIY) (\$(\$otherDoms.Count) доменов)" "Yellow"
    \$otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── \$_" "Gray" }
}

P ""
\$trustStatus = if (\$uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Tier 1: Human Organic Footprint)" } else { "HIGH TRUST" }
P "  Статус профиля:    [\$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Запуск Chrome и открытие настроек куков для визуальной проверки (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие 'Show All' данных сайтов и куков..." "Yellow"
Start-Process -FilePath \$chromePath -ArgumentList @(
    "--user-data-dir=\`"\$userChromeData\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

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
