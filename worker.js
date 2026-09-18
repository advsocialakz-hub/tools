export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const validKey = env.AUTH_KEY || "akz2026";

    // Проверка персонального ключа авторизации
    if (!key || key !== validKey) {
      return new Response("[-] 403 Forbidden: Invalid or missing authorization key.\nAccess Denied.\n", {
        status: 403,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store"
        }
      });
    }

    // Возвращаем чистый PowerShell скрипт в UTF-8
    const script = `<#
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

    return new Response(script, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache, no-store, must-revalidate",
        "access-control-allow-origin": "*"
      }
    });
  }
};
