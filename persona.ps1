<#
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

$sb = [System.Text.StringBuilder]::new()
function P($text, $color="White") {
    Write-Host $text -ForegroundColor $color
    [void]$sb.AppendLine($text)
}

# Функция живого посимвольного ввода опытного пользователя с симуляцией опечаток и исправлений
function Type-ExperiencedHuman([string]$targetText, [string]$typoText, [string]$correction) {
    # 1. Печатаем начальную часть (с намеренной опечаткой, если задана)
    $textToType = if ($typoText) { $typoText } else { $targetText }
    
    foreach ($ch in $textToType.ToCharArray()) {
        $c = [string]$ch
        if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            $c = "{$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait($c)
        
        # Скорость опытного наборщика: 35–85 мс между клавишами
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 85)
        
        # Редкая микропауза на размышление (1 на 15 символов)
        if ((Get-Random -Min 1 -Max 16) -eq 1) {
            Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220)
        }
    }

    # 2. Если была опечатка: пауза осознания -> стирание Backspace -> ввод правильного окончания
    if ($typoText -and $correction) {
        # Задержка: "заметил ошибку"
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 340)
        
        # Сколько букв нужно стереть
        $backspacesCount = (Get-Random -Min 2 -Max 4)
        for ($b = 0; $b -lt $backspacesCount; $b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 110)
        }
        
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 180)
        
        # Допечатываем правильное окончание
        foreach ($ch in $correction.ToCharArray()) {
            $c = [string]$ch
            if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
                $c = "{$c}"
            }
            [System.Windows.Forms.SendKeys]::SendWait($c)
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

P "  -> Локация:     $($geo.City), $($geo.Region) (ZIP: $($geo.Zip))" "Green"
P "  -> Провайдер:   $($geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подготовка рабочего профиля пользователя..." "Yellow"
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

# Закрываем старые висящие сессии перед стартом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут цифровой личности в ОДНОЙ ВКЛАДКЕ (быт, опечатки, рецепты, Ctrl+Click)
$city = $geo.City

$journey = @(
    @{
        Title        = "☕ Утренний кофе во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText     = "best cofee sho";
        Correction   = "ffee shops in $city open now";
        TargetFull   = "best coffee shops in $city open now";
        OpenResult   = $true;
        IsCommercial = $false
    },
    @{
        Title        = "🍳 Кулинарный рецепт ужина (опечатка 'patsa' -> 'pasta')";
        TypoText     = "easy 20 min garlic chiken pat";
        Correction   = "cken pasta recipe dinner";
        TargetFull   = "easy 20 min garlic chicken pasta recipe dinner";
        OpenResult   = $true;
        IsCommercial = $false
    },
    @{
        Title        = "🔧 Домашний ремонт сантехники (DIY запрос)";
        TypoText     = "how to replace runing flapp";
        Correction   = "running toilet flapper valve step by step";
        TargetFull   = "how to replace running toilet flapper valve step by step";
        OpenResult   = $false;
        IsCommercial = $false
    },
    @{
        Title        = "🎯 Коммерческий интернет (захват спонсорских трекеров)";
        TypoText     = "best home fiber internet pla";
        Correction   = "ans in $city reviews";
        TargetFull   = "best home fiber internet plans in $city reviews";
        OpenResult   = $true;
        IsCommercial = $true
    }
)

P "[3/5] Запуск ОДНОЙ вкладки Google и симуляция живого поиска..." "Yellow"

# Открываем ОДНО окно и ОДНУ вкладку Google
$proc = Start-Process -FilePath $chromePath -ArgumentList @(
    "--user-data-dir=`"$userChromeData`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV5]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
}

# Подтверждаем согласие с куками, если всплыло окно
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

$isFirstQuery = $true
$step = 1

foreach ($item in $journey) {
    P "  [$step/$($journey.Count)] $($item.Title)" "Cyan"

    if ($isFirstQuery) {
        # На главной странице Google: кликаем прямо в центральное поле ввода
        $inputX = Get-Random -Min 480 -Max 680
        $inputY = Get-Random -Min 345 -Max 385
        P "      -> Наведение на центральное поле поиска ($inputX, $inputY)..." "Gray"
        [WinInputV5]::Click($inputX, $inputY)
        $isFirstQuery = $false
    } else {
        # В СУЩЕСТВУЮЩЕЙ ВКЛАДКЕ ВЫДАЧИ: возвращаемся в ТО ЖЕ САМОЕ поле ввода наверху!
        # Очищаем старый запрос естественным выделением (Ctrl+A -> Backspace)
        $topInputX = Get-Random -Min 240 -Max 450
        $topInputY = Get-Random -Min 125 -Max 145
        P "      -> Возврат в то же поле поиска наверху страницы ($topInputX, $topInputY)..." "Gray"
        [WinInputV5]::Click($topInputX, $topInputY)
        Start-Sleep -Milliseconds 180
        
        # Выделяем весь старый текст и стираем
        [System.Windows.Forms.SendKeys]::SendWait("^a")
        Start-Sleep -Milliseconds 120
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 180
    }

    # Посимвольная печать с опечаткой и исправлением
    P "      -> Живая печать запроса с микроопечаткой и исправлением..." "Gray"
    Type-ExperiencedHuman $item.TargetFull $item.TypoText $item.Correction

    # Ждем загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Читаем выдачу: плавный скроллинг вниз
    for ($i = 0; $i -lt 3; $i++) {
        [WinInputV5]::ScrollSmooth(-180, 5)
        # Водим мышкой по результатам
        $curX = Get-Random -Min 380 -Max 720
        $curY = Get-Random -Min 280 -Max 480
        [WinInputV5]::MoveSmooth($curX, $curY, 450)
        Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
    }

    # Если требуется открыть результат: делаем Ctrl+Click (открытие ссылки в фоновой вкладке)
    if ($item.OpenResult) {
        $linkX = Get-Random -Min 350 -Max 600
        $linkY = if ($item.IsCommercial) { Get-Random -Min 230 -Max 280 } else { Get-Random -Min 320 -Max 420 }
        
        P "      [⚡] Power-User действие: Ctrl + Left Click по результату..." "Magenta"
        [WinInputV5]::CtrlClick($linkX, $linkY)
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

    $step++
}

# 4. Фиксация базы куков
P ""
P "[4/5] Фиксация базы куков и трекеров на диске..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { $_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

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

$googleDoms = $uniqueDomains | Where-Object { $_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
$adTrackers = $uniqueDomains | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|bing' }
$localDoms  = $uniqueDomains | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
$otherDoms  = $uniqueDomains | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v5.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        $($geo.City), $($geo.Region) ($($geo.ISP))" "White"
P "  Профиль браузера:  $userChromeData\Default" "White"
P "  Нагуляно сайтов:   $($uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] ДЕРЕВО НАГУЛА И ЦИФРОВОЙ ЛИЧНОСТИ:" "Cyan"
if ($googleDoms) {
    P "  ├── 🌐 Google Core Ecosystem ($($googleDoms.Count) доменов)" "Yellow"
    $googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── $_" "Gray" }
}
if ($adTrackers) {
    P "  ├── 🎯 Рекламные трекеры и спонсоры ($($adTrackers.Count) трекеров)" "Yellow"
    $adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── $_" "Gray" }
}
if ($localDoms) {
    P "  ├── 📍 Локальный контекст ($($geo.City)) ($($localDoms.Count) доменов)" "Yellow"
    $localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── $_" "Gray" }
}
if ($otherDoms) {
    P "  └── 🍳 Бытовой нагул (рецепты/DIY) ($($otherDoms.Count) доменов)" "Yellow"
    $otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── $_" "Gray" }
}

P ""
$trustStatus = if ($uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Tier 1: Human Organic Footprint)" } else { "HIGH TRUST" }
P "  Статус профиля:    [$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Запуск Chrome и открытие настроек куков для визуальной проверки (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие 'Show All' данных сайтов и куков..." "Yellow"
Start-Process -FilePath $chromePath -ArgumentList @(
    "--user-data-dir=`"$userChromeData`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
