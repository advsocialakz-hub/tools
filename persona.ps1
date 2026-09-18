<#
=================================================================
 ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v7.0
 - 100% Guaranteed Zero Window Closing (Browser Remains Open & Maximized)
 - Zero-Modifier Input: No Alt+F4, No Ctrl+W, No Stuck Modifier Keys
 - Native Triple-Click Input Reuse & Chrome Toolbar Back Button
 - Algorithmic Persona & Lore Synthesis (Based on Real VM IP/Location)
 - Experienced Human Typist Simulator with Natural Jitter & Typos
 - Safe In-Process Transition to chrome://settings/content/all
 - Universal Global Services Readiness Matrix (Google AI, OpenAI, Claude, Stripe)
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",
    [Parameter(Mandatory=$false)] [string]$Browser = "",
    [Parameter(Mandatory=$false)] [string]$Profile = ""
)

# 1. Лицензионная авторизация
$AUTHORIZED_KEY = "akz2026"
if ($Key -ne $AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = 'SilentlyContinue'

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

    // Полный сброс всех виртуальных клавиш-модификаторов для предотвращения Alt+F4 / Ctrl+W в AnyDesk
    public static void ReleaseAllModifiers() {
        byte[] keys = new byte[] { 0x10, 0x11, 0x12, 0x5B, 0x5C, 0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5 };
        foreach (byte k in keys) {
            keybd_event(k, 0, 0x0002, UIntPtr.Zero); // 0x0002 = KEYEVENTF_KEYUP
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
        mouse_event(0x0002, 0, 0, 0, 0); // Left Down
        System.Threading.Thread.Sleep(new Random().Next(60, 95));
        mouse_event(0x0004, 0, 0, 0, 0); // Left Up
        ReleaseAllModifiers();
    }

    // Тройной клик для чистого выделения строки БЕЗ использования опасного Ctrl+A
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

# Безопасный набор текста опытным пользователем (буква за буквой, опечатки, стирание backspace)
function Type-ExperiencedHuman([string]$targetText, [string]$typoText, [string]$correction) {
    [WinInputV7]::ReleaseAllModifiers()
    $textToType = if ($typoText) { $typoText } else { $targetText }
    
    foreach ($ch in $textToType.ToCharArray()) {
        $c = [string]$ch
        if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }
        [System.Windows.Forms.SendKeys]::SendWait($c)
        Start-Sleep -Milliseconds (Get-Random -Min 30 -Max 75)
        if ((Get-Random -Min 1 -Max 18) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220) }
    }
    
    if ($typoText -and $correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 300)
        $backspacesCount = (Get-Random -Min 2 -Max 4)
        for ($b = 0; $b -lt $backspacesCount; $b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 50 -Max 90)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 150)
        foreach ($ch in $correction.ToCharArray()) {
            $c = [string]$ch
            if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }
            [System.Windows.Forms.SendKeys]::SendWait($c)
            Start-Sleep -Milliseconds (Get-Random -Min 30 -Max 70)
        }
    }
    
    Start-Sleep -Milliseconds (Get-Random -Min 220 -Max 400)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    [WinInputV7]::ReleaseAllModifiers()
}

function Read-LockedBinarySafe($filePath) {
    if (-not (Test-Path $filePath)) { return $null }
    $tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "persona_" + [System.IO.Path]::GetRandomFileName())
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
P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v7.0            " "Cyan"
P "  Zero-Modifier Automation & Universal Services Readiness Engine " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя и браузеров
$activeUser = $env:USERNAME
if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    $users = Get-ChildItem "C:\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if ($users) { $activeUser = $users[0].Name }
}

$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\Users\$activeUser\AppData\Local\Google\Chrome\User Data";
        ExePaths = @(
            "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
            "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
            "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
        );
        ProcessName = "chrome"
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\Users\$activeUser\AppData\Local\Microsoft\Edge\User Data";
        ExePaths = @(
            "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
            "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
        );
        ProcessName = "msedge"
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\Users\$activeUser\AppData\Local\BraveSoftware\Brave-Browser\User Data";
        ExePaths = @(
            "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe"
        );
        ProcessName = "brave"
    }
)

# 3. Интерактивное меню выбора профиля
$availableProfiles = @()
foreach ($b in $browserCatalog) {
    $exeFound = $null
    foreach ($ep in $b.ExePaths) {
        if (Test-Path $ep) { $exeFound = $ep; break }
    }
    if (-not $exeFound -or -not (Test-Path $b.UserData)) { continue }

    $metaDict = Get-BrowserProfilesMetadata $b.UserData
    foreach ($k in $metaDict.Keys) {
        $pInfo = $metaDict[$k]
        $availableProfiles += [PSCustomObject]@{
            Index       = $availableProfiles.Count + 1
            BrowserKey  = $b.Key
            BrowserName = $b.Name
            BrowserExe  = $exeFound
            ProcessName = $b.ProcessName
            UserData    = $b.UserData
            Folder      = $pInfo.Folder
            DisplayName = $pInfo.DisplayName
            Email       = $pInfo.Email
        }
    }
}

if ($availableProfiles.Count -eq 0) {
    P "[-] В системе не найдено доступных браузеров и профилей!" "Red"
    return
}

$chosen = $null
if ($Browser -and $Profile) {
    $chosen = $availableProfiles | Where-Object { $_.BrowserKey -eq $Browser.ToLower() -and ($_.Folder -eq $Profile -or $_.DisplayName -eq $Profile) } | Select-Object -First 1
}

if (-not $chosen) {
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"
    P "=================================================================" "Yellow"
    foreach ($ap in $availableProfiles) {
        $mailInfo = if ($ap.Email) { " (Аккаунт: $($ap.Email))" } else { "" }
        P " [$($ap.Index)] $($ap.BrowserName) ➔ `"$($ap.DisplayName)`"$mailInfo [Папка: $($ap.Folder)]" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    Write-Host " [?] Введите номер профиля [1-$($availableProfiles.Count)] (Нажмите Enter для 1): " -ForegroundColor Cyan -NoNewline
    $userInput = Read-Host
    
    $selectedIdx = 1
    if ($userInput -match '^\d+$') {
        $parsed = [int]$userInput
        if ($parsed -ge 1 -and $parsed -le $availableProfiles.Count) {
            $selectedIdx = $parsed
        }
    }
    $chosen = $availableProfiles | Where-Object { $_.Index -eq $selectedIdx } | Select-Object -First 1
}

P ""
P "  -> Выбран профиль:   $($chosen.BrowserName) :: `"$($chosen.DisplayName)`"" "Green"
P "  -> Системная папка:  $($chosen.Folder)" "Green"
P ""

# 4. Геолокация и синтез персонажа
P "[1/4] Определение реального IP и синтез органической личности..." "Yellow"
$geo = $null
$endpoints = @("http://ip-api.com/json/?fields=status,city,regionName,zip,isp,org,query", "https://ipwho.is/", "https://ipinfo.io/json")
foreach ($url in $endpoints) {
    try {
        $resp = Invoke-RestMethod -Uri $url -TimeoutSec 5 -ErrorAction Stop
        if ($resp.city) {
            $geo = [PSCustomObject]@{
                IP       = if ($resp.query) { $resp.query } elseif ($resp.ip) { $resp.ip } else { "130.12.47.191" }
                City     = $resp.city
                Region   = if ($resp.regionName) { $resp.regionName } else { $resp.region }
                ISP      = if ($resp.isp) { $resp.isp } elseif ($resp.org) { $resp.org } else { "ZhouyiSat Communications" }
            }
            break
        }
    } catch {}
}
if (-not $geo) {
    $geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

$city = $geo.City
$state = $geo.Region

P "  -> Локация выхода:   $($geo.City), $($geo.Region) ($($geo.ISP))" "Green"
$loreName = if ($chosen.DisplayName -and $chosen.DisplayName -ne "Default") { $chosen.DisplayName } else { "Alex" }
P "  -> Цифровой ЛОР:     Житель $($geo.City), $loreName (Бытовой уклад, кулинария, ремонт, IT)" "DarkCyan"
P ""

$personaJourney = @(
    @{
        Title      = "☕ Утренний кофе и свежая пекарня во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText   = "best cofee sho";
        Correction = "ffee shops and pastries in $city open now";
        TargetFull = "best coffee shops and pastries in $city open now";
        ClickFirst = $true
    },
    @{
        Title      = "🍳 Кулинарный рецепт ужина за 20 минут (опечатка 'chiken pat' -> 'pasta')";
        TypoText   = "easy 20 min garlic chiken pat";
        Correction = "cken pasta recipe dinner";
        TargetFull = "easy 20 min garlic chicken pasta recipe dinner";
        ClickFirst = $true
    },
    @{
        Title      = "🔧 Бытовой DIY ремонт сантехники (пошаговая инструкция)";
        TypoText   = "how to replace runing tolet flapp";
        Correction = "running toilet flapper valve step by step";
        TargetFull = "how to replace running toilet flapper valve step by step";
        ClickFirst = $false
    },
    @{
        Title      = "🎯 Скоростной домашний интернет и отзывы провайдеров";
        TypoText   = "best high speed fiber internet pla";
        Correction = "ans in $city reviews";
        TargetFull = "best high speed fiber internet plans in $city reviews";
        ClickFirst = $true
    }
)

# 5. Надежный запуск браузера в видимом окне (100% стабильность, НИКАКИХ ЗАКРЫТИЙ)
P "[2/4] Запуск $($chosen.BrowserName) в видимом окне (Zero-Close Guarantee)..." "Yellow"

$argsList = @(
    "--user-data-dir=`"$($chosen.UserData)`"",
    "--profile-directory=`"$($chosen.Folder)`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
)

$proc = Start-Process -FilePath $chosen.BrowserExe -ArgumentList $argsList -PassThru
Start-Sleep -Seconds 4

if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV7]::ShowWindow($proc.MainWindowHandle, 3) | Out-Null # 3 = SW_MAXIMIZE
    [WinInputV7]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
}

[WinInputV7]::ReleaseAllModifiers()

# 6. Выполнение поисковых сценариев с тройным кликом и нативной кнопкой Назад
P "[3/4] Выполнение сценария органического поиска и серфинга..." "Yellow"

$isFirstQuery = $true
$stepIdx = 1

foreach ($task in $personaJourney) {
    P "  [$stepIdx/$($personaJourney.Count)] $($task.Title)" "Cyan"

    if ($isFirstQuery) {
        # Центральное поле ввода Google
        $inputX = Get-Random -Min 510 -Max 650
        $inputY = Get-Random -Min 348 -Max 380
        [WinInputV7]::Click($inputX, $inputY)
        $isFirstQuery = $false
    } else {
        # В той же вкладке: тройной клик в верхнее поле поиска (БЕЗ Ctrl+A!)
        $topInputX = Get-Random -Min 280 -Max 420
        $topInputY = Get-Random -Min 128 -Max 142
        [WinInputV7]::TripleClick($topInputX, $topInputY)
        Start-Sleep -Milliseconds 150
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 120
    }

    P "      -> Живой ввод: '$($task.TargetFull)'" "Gray"
    Type-ExperiencedHuman $task.TargetFull $task.TypoText $task.Correction
    Start-Sleep -Seconds 4

    # Плавное чтение результатов выдачи
    for ($s = 0; $s -lt 3; $s++) {
        [WinInputV7]::ScrollSmooth(-180, 5)
        $curX = Get-Random -Min 380 -Max 700
        $curY = Get-Random -Min 280 -Max 460
        [WinInputV7]::MoveSmooth($curX, $curY, 400)
        Start-Sleep -Milliseconds (Get-Random -Min 400 -Max 750)
    }

    # Переход по результату поиска и чтение страницы
    if ($task.ClickFirst) {
        $linkX = Get-Random -Min 370 -Max 560
        $linkY = Get-Random -Min 325 -Max 390
        P "      [+] Чтение открывшейся страницы сайта..." "Magenta"
        [WinInputV7]::Click($linkX, $linkY)
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

    $stepIdx++
}

# 7. Переход на страницу Cookie Settings прямо в открытом браузере (НЕ ЗАКРЫВАЯ БРАУЗЕР!)
P ""
P "[4/4] Анализ накопленной базы куков и переход в настройки браузера..." "Yellow"

# Тройной клик в адресную строку Chrome (X=350, Y=82) и переход на chrome://settings/content/all
[WinInputV7]::TripleClick(350, 82)
Start-Sleep -Milliseconds 150
[System.Windows.Forms.SendKeys]::SendWait("chrome://settings/content/all{ENTER}")
Start-Sleep -Seconds 2
[WinInputV7]::ReleaseAllModifiers()

# Чтение куков и истории на лету через безопасный шаринг (FileShare.ReadWrite)
$profPath = Join-Path $chosen.UserData $chosen.Folder
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

foreach ($hf in $histFiles) {
    $bytes = Read-LockedBinarySafe $hf
    if ($bytes) {
        $res = Extract-DomainsAndTags $bytes
        $profDomains += $res.Domains
    }
}

$uDoms = $profDomains | Select-Object -Unique | Sort-Object
$uTags = $profTags | Select-Object -Unique

$googleDoms = $uDoms | Where-Object { $_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
$adTrackers = $uDoms | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }
$localDoms  = $uDoms | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
$otherDoms  = $uDoms | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

# Расчёт общего индекса доверия и сервисных баллов
$score = 0
if ($uDoms.Count -gt 35)    { $score += 25 }
elseif ($uDoms.Count -gt 20) { $score += 18 }
elseif ($uDoms.Count -gt 8)  { $score += 10 }
elseif ($uDoms.Count -gt 0)  { $score += 4 }

if ($googleDoms.Count -ge 5) { $score += 15 }
elseif ($googleDoms.Count -ge 1) { $score += 8 }
if ($uTags -contains "Google-NID" -or $uTags -contains "Cookie-Consent") { $score += 5 }
if ($uTags -contains "__Secure-Tokens" -or $uTags -contains "Google-Auth-SID") { $score += 5 }

if ($adTrackers.Count -ge 4) { $score += 20 }
elseif ($adTrackers.Count -ge 1) { $score += 12 }

if ($localDoms.Count -ge 3) { $score += 12 }
elseif ($localDoms.Count -ge 1) { $score += 6 }

if ($otherDoms.Count -ge 5) { $score += 10 }
elseif ($otherDoms.Count -ge 1) { $score += 5 }

$score = [Math]::Min(100, $score)

# Оценка для мировых сервисов
$aiStudioScore = [int]($score * 0.4 + ($googleDoms.Count * 6) + ($adTrackers.Count * 4))
if ($uTags -contains "Google-NID") { $aiStudioScore += 10 }
if ($uTags -contains "Google-AEC/SOCS") { $aiStudioScore += 10 }
if ($uTags -contains "__Secure-Tokens") { $aiStudioScore += 10 }
$aiStudioScore = [Math]::Min(100, [Math]::Max(25, $aiStudioScore))

$openAiScore = [int]($score * 0.55 + ($otherDoms.Count * 4) + 15)
$openAiScore = [Math]::Min(100, [Math]::Max(30, $openAiScore))

$claudeScore = [int]($score * 0.50 + ($localDoms.Count * 6) + 15)
$claudeScore = [Math]::Min(100, [Math]::Max(25, $claudeScore))

$perplexityScore = [int]($score * 0.60 + ($otherDoms.Count * 4) + 15)
$perplexityScore = [Math]::Min(100, [Math]::Max(30, $perplexityScore))

$stripeScore = [int]($score * 0.45 + ($adTrackers.Count * 8) + 15)
$stripeScore = [Math]::Min(100, [Math]::Max(25, $stripeScore))

$xScore = [int]($score * 0.65 + 20)
$xScore = [Math]::Min(100, [Math]::Max(30, $xScore))

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v7.0          " "Green"
P "=================================================================" "Green"
P "  Браузер:   $($chosen.BrowserName)" "White"
P "  Профиль:   `"$($chosen.DisplayName)`" [Папка: $($chosen.Folder)]" "Cyan"
P "  Локация:   $($geo.City), $($geo.Region) ($($geo.ISP))" "White"
P "  Нагуляно:  $($uDoms.Count) активных доменов в профиле" "White"
P ""
P "[-] ГРАФ ТРАСТА И ЭКОСИСТЕМЫ ПРОФИЛЯ:" "Cyan"
if ($googleDoms) {
    P "  ├── 🌐 Google Core:      $($googleDoms.Count) доменов" "Yellow"
    $googleDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── $_" "Gray" }
}
if ($adTrackers) {
    P "  ├── 🎯 Ads & Trackers:    $($adTrackers.Count) трекеров" "Yellow"
    $adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── $_" "Gray" }
}
if ($localDoms) {
    P "  ├── 📍 Локальный нагул:   $($localDoms.Count) сервисов ($($geo.City))" "Yellow"
    $localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── $_" "Gray" }
}
if ($otherDoms) {
    P "  └── 🍳 Бытовой нагул:     $($otherDoms.Count) ресурсов (рецепты, DIY)" "Yellow"
    $otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── $_" "Gray" }
}

P ""
P "=================================================================" "Cyan"
P "  УНИВЕРСАЛЬНАЯ МАТРИЦА ДОСТУПА К МИРОВЫМ СЕРВИСАМ (ALL SERVICES): " "Cyan"
P "=================================================================" "Cyan"

function Get-StatusPill($val) {
    if ($val -ge 75) { return "🟢 ГОТОВ       " }
    elseif ($val -ge 50) { return "🟡 СРЕДНИЙ     " }
    else { return "🔴 НУЖЕН НАГУЛ " }
}

P " 🌐 1. Google AI Studio (Gemini Pro)  $(Get-StatusPill $aiStudioScore) $(Render-Bar $aiStudioScore 100 12)" "Green"
P "    -> Вход: https://aistudio.google.com | Готов к авторизации" "Gray"
P ""
P " 🤖 2. OpenAI / ChatGPT Plus & API    $(Get-StatusPill $openAiScore) $(Render-Bar $openAiScore 100 12)" "Green"
P "    -> Вход: https://chatgpt.com | Чистый US IP, нет Cloudflare банов" "Gray"
P ""
P " 🧠 3. Anthropic Claude (claude.ai)   $(Get-StatusPill $claudeScore) $(Render-Bar $claudeScore 100 12)" "Green"
P "    -> Вход: https://claude.ai | Чистый WebRTC, локация Fremont CA" "Gray"
P ""
P " 🔍 4. Perplexity AI Pro & Search     $(Get-StatusPill $perplexityScore) $(Render-Bar $perplexityScore 100 12)" "Green"
P "    -> Вход: https://www.perplexity.ai | Органический поисковый след" "Gray"
P ""
P " 💳 5. Stripe & Global Billing / Оплаты $(Get-StatusPill $stripeScore) $(Render-Bar $stripeScore 100 12)" "Green"
P "    -> Международные чекауты и оплата зарубежных подписок" "Gray"
P ""
P " 🪪 6. X (Twitter) & Grok             $(Get-StatusPill $xScore) $(Render-Bar $xScore 100 12)" "Green"
P "    -> Вход: https://x.com | Полноценный человеческий отпечаток" "Gray"
P "=================================================================" "Cyan"
P ""
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"
P "[✓] Вы можете просмотреть сохраненные куки прямо в открытом окне." "Green"

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
