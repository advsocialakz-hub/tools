<#
=================================================================
 ULTRA DIGITAL PERSONA & AD TRACKER BOOSTER v4.0
 - Letter-by-Letter Human Typing
 - Natural Bezier Curve Mouse Dynamics & Scrolling
 - Everyday Household, Recipe & Local Persona Journey
 - Sponsored Ad/Tracker Interceptor (Click & Bailout)
 - Chrome Restart with chrome://settings/content/all GUI Inspection
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$Key = "akz2026"
)

# Проверка персонального ключа доступа
$AUTHORIZED_KEY = "akz2026"
if ($Key -ne $AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.Windows.Forms

# Регистрация C# модуля WinInputV4 (плавные кривые, клики, скроллинг)
if (-not ([System.Management.Automation.PSTypeName]'WinInputV4').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV4 {
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

    // Плавное перемещение курсора по дугам Безье со сглаживанием Smoothstep
    public static void MoveSmooth(int targetX, int targetY, int durationMs) {
        POINT start;
        GetCursorPos(out start);

        Random rnd = new Random();
        int ctrlX = (start.X + targetX) / 2 + rnd.Next(-80, 80);
        int ctrlY = (start.Y + targetY) / 2 + rnd.Next(-60, 60);

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

    // Человеческий клик мыши с естественным удержанием клавиши
    public static void Click(int x, int y) {
        MoveSmooth(x, y, 400);
        System.Threading.Thread.Sleep(80);
        mouse_event(0x0002, 0, 0, 0, 0); // LeftDown
        System.Threading.Thread.Sleep(new Random().Next(65, 110));
        mouse_event(0x0004, 0, 0, 0, 0); // LeftUp
    }

    // Плавная прокрутка колесом мыши микрошагами
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

$sb = [System.Text.StringBuilder]::new()
function P($text, $color="White") {
    Write-Host $text -ForegroundColor $color
    [void]$sb.AppendLine($text)
}

# Функция живого посимвольного ввода текста с естественными задержками
function Type-HumanText([string]$text) {
    foreach ($ch in $text.ToCharArray()) {
        $c = [string]$ch
        if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            $c = "{$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait($c)
        Start-Sleep -Milliseconds (Get-Random -Min 40 -Max 130)
        
        # Редкая задержка на "раздумье" человека
        if ((Get-Random -Min 1 -Max 14) -eq 1) {
            Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 380)
        }
    }
    Start-Sleep -Milliseconds (Get-Random -Min 350 -Max 650)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & AD TRACKER BOOSTER v4.0                " "Cyan"
P "  [AUTH OK] Licensed Personal Persona Run for AdvSocialAKZ       " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 1. Определение локации IP
P "[1/5] Синхронизация с географической точкой выхода..." "Yellow"
$geo = $null
$endpoints = @(
    "http://ip-api.com/json/?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,query",
    "https://ipwho.is/",
    "https://ipinfo.io/json"
)

foreach ($url in $endpoints) {
    try {
        $resp = Invoke-RestMethod -Uri $url -TimeoutSec 5 -ErrorAction Stop
        if ($resp.city) {
            $geo = [PSCustomObject]@{
                IP       = if ($resp.query) { $resp.query } elseif ($resp.ip) { $resp.ip } else { "130.12.47.191" }
                City     = $resp.city
                Region   = if ($resp.regionName) { $resp.regionName } else { $resp.region }
                Country  = if ($resp.country) { $resp.country } else { "United States" }
                Zip      = if ($resp.zip) { $resp.zip } else { $resp.postal }
                ISP      = if ($resp.isp) { $resp.isp } elseif ($resp.org) { $resp.org } else { $resp.connection.isp }
            }
            break
        }
    } catch {}
}

if (-not $geo -or -not $geo.City) {
    $geo = [PSCustomObject]@{
        IP       = "130.12.47.191"
        City     = "Fremont"
        Region   = "California"
        Country  = "United States"
        Zip      = "94538"
        ISP      = "ZhouyiSat Communications"
    }
}

P "  -> Точка выхода:  $($geo.IP) ($($geo.City), $($geo.Region))" "Green"
P "  -> Провайдер:     $($geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подключение к рабочему профилю браузера..." "Yellow"
$chromePath = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) { $chromePath = "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe" }
if (-not (Test-Path $chromePath)) { $chromePath = "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe" }

if (-not (Test-Path $chromePath)) {
    P "[-] Google Chrome не найден!" "Red"
    return
}

$activeUser = $env:USERNAME
if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    $users = Get-ChildItem "C:\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if ($users) { $activeUser = $users[0].Name }
}
$userChromeData = "C:\Users\$activeUser\AppData\Local\Google\Chrome\User Data"

# Закрываем старые процессы перед началом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут реалистичной цифровой личности (Быт, рецепты, заведения, трекеры)
$city = $geo.City
$state = $geo.Region

$personaRoutine = @(
    @{
        Title       = "☕ Завтрак и свежий кофе (локальный запрос)";
        QueryText   = "best local coffee and fresh bakery in $city open now";
        TargetType  = "Search";
        InteractAd  = $false
    },
    @{
        Title       = "🍳 Кулинарный рецепт (домашний быт)";
        QueryText   = "easy 20 minute creamy garlic chicken pasta recipe dinner";
        TargetType  = "Search";
        InteractAd  = $false
    },
    @{
        Title       = "🔧 Бытовой ремонт в доме (DIY запрос)";
        QueryText   = "how to fix running toilet flapper valve diy step by step";
        TargetType  = "Search";
        InteractAd  = $false
    },
    @{
        Title       = "🎯 Коммерческий запрос + Клик по рекламному трекеру";
        QueryText   = "best high speed home fiber internet plans $city ca";
        TargetType  = "Commercial";
        InteractAd  = $true
    },
    @{
        Title       = "📚 Локальные репетиторы и курсы (семейный контекст)";
        QueryText   = "private math and sat prep tutors in $city ca reviews";
        TargetType  = "Search";
        InteractAd  = $false
    }
)

P "[3/5] Запуск интерактивной симуляции с живым посимвольным вводом..." "Yellow"

# Запускаем Chrome один раз на весь сценарий
$proc = Start-Process -FilePath $chromePath -ArgumentList @(
    "--user-data-dir=`"$userChromeData`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV4]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
}

# Подтверждение диалога куков Google (если выскочил)
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

$step = 1
foreach ($task in $personaRoutine) {
    P "  [$step/$($personaRoutine.Count)] $($task.Title)" "Cyan"

    # Фокусируемся на адресной строке / строке поиска через Ctrl+L
    [System.Windows.Forms.SendKeys]::SendWait("^l")
    Start-Sleep -Milliseconds 300

    # Вводим адрес Google поиска
    [System.Windows.Forms.SendKeys]::SendWait("https://www.google.com{ENTER}")
    Start-Sleep -Seconds 3

    # Плавное наведение на строку поиска по центру экрана
    $searchBoxX = (Get-Random -Min 480 -Max 680)
    $searchBoxY = (Get-Random -Min 340 -Max 390)
    [WinInputV4]::Click($searchBoxX, $searchBoxY)
    Start-Sleep -Milliseconds 350

    # Посимвольный живой ввод запроса
    P "      Печать: '$($task.QueryText)'" "Gray"
    Type-HumanText $task.QueryText

    # Ожидание загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Плавный скроллинг выдачи вниз и чтение контента
    for ($i = 0; $i -lt 3; $i++) {
        [WinInputV4]::ScrollSmooth(-200, 5)
        # Водим мышкой по сниппетам
        $snippetX = Get-Random -Min 380 -Max 750
        $snippetY = Get-Random -Min 280 -Max 520
        [WinInputV4]::MoveSmooth($snippetX, $snippetY, 500)
        Start-Sleep -Milliseconds (Get-Random -Min 600 -Max 1000)
    }

    # Если шаг коммерческий — ловим рекламный спонсорский трекер (Google Ads / DoubleClick)
    if ($task.InteractAd) {
        P "      [⚡] Обнаружен коммерческий блок трекеров (Sponsored Ads)" "Magenta"
        # Скроллим наверх к рекламе
        [WinInputV4]::ScrollSmooth(350, 6)
        Start-Sleep -Milliseconds 500

        # Кликаем по верхнему рекламному объявлению (обычно Y: 240-310)
        $adClickX = Get-Random -Min 380 -Max 580
        $adClickY = Get-Random -Min 240 -Max 290
        P "      -> Случайный клик по спонсорскому объявлению (захват трекера)..." "Gray"
        [WinInputV4]::Click($adClickX, $adClickY)
        
        # Ждём 3 секунды загрузки рекламного сайта и редиректов
        Start-Sleep -Seconds 3
        
        # Симулируем: "Ой, нажал на рекламу по ошибке, закрываю вкладку"
        P "      -> Закрытие рекламной вкладки через Ctrl+W (ошибочный переход)..." "Gray"
        [System.Windows.Forms.SendKeys]::SendWait("^w")
        Start-Sleep -Seconds 1
    } else {
        # Скроллим назад вверх
        [WinInputV4]::ScrollSmooth(220, 5)
        Start-Sleep -Milliseconds 400
    }

    $step++
}

# 4. Фиксация базы куков и сброс WAL
P ""
P "[4/5] Фиксация накопленной базы куков и трекеров..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { $_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Анализ SQLite базы и формирование отчета
function Extract-DomainsFromBinary($filePath) {
    if (-not (Test-Path $filePath)) { return @() }
    try {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $text = [System.Text.Encoding]::ASCII.GetString($bytes)
        $regex = [regex]'(?i)\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.(?:com|org|net|io|co|us|gov|edu|biz|info)'
        $matches = $regex.Matches($text)
        $domains = @()
        foreach ($m in $matches) {
            $val = $m.Value.Trim().ToLower()
            if ($val.Length -gt 4 -and -not ($val -match '\.(png|jpg|gif|css|js|woff)$')) { $domains += $val }
        }
        return $domains | Select-Object -Unique
    } catch { return @() }
}

$allDomains = @()
$allDomains += Extract-DomainsFromBinary "$userChromeData\Default\Network\Cookies"
$allDomains += Extract-DomainsFromBinary "$userChromeData\Default\Network\Cookies-wal"
$allDomains += Extract-DomainsFromBinary "$userChromeData\Default\History"
$uniqueDomains = $allDomains | Select-Object -Unique | Sort-Object

# Категоризация
$googleDoms  = @()
$adTrackers  = @()
$localDoms   = @()
$lifestyleDoms = @()

foreach ($d in $uniqueDomains) {
    if ($d -match 'google|gstatic|youtube|googleadservices|googletag|gvt1') {
        $googleDoms += $d
    } elseif ($d -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing') {
        $adTrackers += $d
    } elseif ($d -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor') {
        $localDoms += $d
    } else {
        $lifestyleDoms += $d
    }
}

P "=================================================================" "Green"
P "       ULTRA DIGITAL PERSONA & COOKIE AUDIT REPORT v4.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        $($geo.City), $($geo.Region) ($($geo.ISP))" "White"
P "  Профиль браузера:  $userChromeData\Default" "White"
P "  Всего контекстов:  $($uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] СТРУКТУРА ЦИФРОВОЙ ЛИЧНОСТИ (PERSONA TRUST GRAPH):" "Cyan"

if ($googleDoms.Count -gt 0) {
    P "  ├── 🌐 Google Core & AI Ecosystem ($($googleDoms.Count) доменов)" "Yellow"
    $googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── $_" "Gray" }
}

if ($adTrackers.Count -gt 0) {
    P "  ├── 🎯 Рекламные трекеры и коммерческий след ($($adTrackers.Count) трекеров)" "Yellow"
    $adTrackers | Select-Object -First 8 | ForEach-Object { P "  │   ├── $_" "Gray" }
}

if ($localDoms.Count -gt 0) {
    P "  ├── 📍 Локальный контекст ($($geo.City), Silicon Valley) ($($localDoms.Count) доменов)" "Yellow"
    $localDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── $_" "Gray" }
}

if ($lifestyleDoms.Count -gt 0) {
    P "  └── 🍳 Бытовой и потребительский след (рецепты/ремонт) ($($lifestyleDoms.Count) доменов)" "Yellow"
    $lifestyleDoms | Select-Object -First 8 | ForEach-Object { P "      ├── $_" "Gray" }
}

P ""
$trustStatus = if ($uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Ultra Realistic Organic Persona)" } else { "HIGH TRUST" }
P "  Статус траста:     [$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Перезапуск Chrome с открытием настроек куков (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие настроек куков для визуальной проверки..." "Yellow"
Start-Process -FilePath $chromePath -ArgumentList @(
    "--user-data-dir=`"$userChromeData`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
