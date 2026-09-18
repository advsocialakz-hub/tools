<#
=================================================================
 ULTRA DIGITAL PERSONA & MULTI-BROWSER/PROFILE WARM-UP v5.5
 - Real Profile Name & Account Discovery (Local State parsing)
 - Multi-Browser Support: Chrome, Edge, Brave, Opera, Yandex
 - Multi-Profile Targeting: Default, Profile 1, Profile 2 (Comma-separated or 'all')
 - Single Persistent Tab Session with Human Typos & Backspaces
 - Power-User Navigation (Ctrl+Click, in-field search reuse)
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",
    [Parameter(Mandatory=$false)] [string]$Browser = "Chrome",
    [Parameter(Mandatory=$false)] [string]$Profiles = "Default"
)

# 1. Проверка лицензионного ключа
$AUTHORIZED_KEY = "akz2026"
if ($Key -ne $AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.Windows.Forms

# Регистрация C# модуля WinInputV5
if (-not ([System.Management.Automation.PSTypeName]'WinInputV5').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV5 {
    [DllImport("user32.dll")] public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
    [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
    [DllImport("user32.dll")] public static extern bool GetCursorPos(out POINT lpPoint);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, int dwExtraInfo);

    public const byte VK_CONTROL = 0x11;
    public const uint KEYEVENTF_KEYUP = 0x0002;

    public struct POINT { public int X; public int Y; }

    public static void MoveSmooth(int targetX, int targetY, int durationMs) {
        POINT start; GetCursorPos(out start);
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
            if (i < steps) { x += rnd.Next(-1, 2); y += rnd.Next(-1, 2); }
            SetCursorPos(x, y);
            System.Threading.Thread.Sleep(sleepPerStep);
        }
        SetCursorPos(targetX, targetY);
    }

    public static void Click(int x, int y) {
        MoveSmooth(x, y, 400);
        System.Threading.Thread.Sleep(70);
        mouse_event(0x0002, 0, 0, 0, 0);
        System.Threading.Thread.Sleep(new Random().Next(60, 110));
        mouse_event(0x0004, 0, 0, 0, 0);
    }

    public static void CtrlClick(int x, int y) {
        MoveSmooth(x, y, 450);
        System.Threading.Thread.Sleep(80);
        keybd_event(VK_CONTROL, 0, 0, 0);
        System.Threading.Thread.Sleep(50);
        mouse_event(0x0002, 0, 0, 0, 0);
        System.Threading.Thread.Sleep(new Random().Next(65, 100));
        mouse_event(0x0004, 0, 0, 0, 0);
        System.Threading.Thread.Sleep(50);
        keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0);
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

$sb = [System.Text.StringBuilder]::new()
function P($text, $color="White") {
    Write-Host $text -ForegroundColor $color
    [void]$sb.AppendLine($text)
}

function Type-ExperiencedHuman([string]$targetText, [string]$typoText, [string]$correction) {
    $textToType = if ($typoText) { $typoText } else { $targetText }
    foreach ($ch in $textToType.ToCharArray()) {
        $c = [string]$ch
        if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }
        [System.Windows.Forms.SendKeys]::SendWait($c)
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 85)
        if ((Get-Random -Min 1 -Max 16) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220) }
    }
    if ($typoText -and $correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 340)
        $backspacesCount = (Get-Random -Min 2 -Max 4)
        for ($b = 0; $b -lt $backspacesCount; $b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 110)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 180)
        foreach ($ch in $correction.ToCharArray()) {
            $c = [string]$ch
            if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }
            [System.Windows.Forms.SendKeys]::SendWait($c)
            Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 75)
        }
    }
    Start-Sleep -Milliseconds (Get-Random -Min 250 -Max 450)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}

# Функция извлечения реальных человеческих имен профилей из Local State
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
    # Дополняем папками, если не было в Local State
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
P "  ULTRA DIGITAL PERSONA & MULTI-BROWSER/PROFILE ENGINE v5.5      " "Cyan"
P "  Real Profile Names Discovery & Precision Human Warm-Up         " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
$activeUser = $env:USERNAME
if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    $users = Get-ChildItem "C:\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if ($users) { $activeUser = $users[0].Name }
}

$browserCatalog = @{
    "chrome" = @{
        Name     = "Google Chrome";
        UserData = "C:\Users\$activeUser\AppData\Local\Google\Chrome\User Data";
        ExePaths = @(
            "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
            "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
            "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
        );
        ProcessName = "chrome"
    };
    "edge" = @{
        Name     = "Microsoft Edge";
        UserData = "C:\Users\$activeUser\AppData\Local\Microsoft\Edge\User Data";
        ExePaths = @(
            "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
            "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
        );
        ProcessName = "msedge"
    };
    "brave" = @{
        Name     = "Brave Browser";
        UserData = "C:\Users\$activeUser\AppData\Local\BraveSoftware\Brave-Browser\User Data";
        ExePaths = @(
            "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe",
            "${env:ProgramFiles(x86)}\BraveSoftware\Brave-Browser\Application\brave.exe"
        );
        ProcessName = "brave"
    };
    "opera" = @{
        Name     = "Opera Stable";
        UserData = "C:\Users\$activeUser\AppData\Roaming\Opera Software\Opera Stable";
        ExePaths = @(
            "$env:LOCALAPPDATA\Programs\Opera\launcher.exe",
            "$env:ProgramFiles\Opera\launcher.exe",
            "${env:ProgramFiles(x86)}\Opera\launcher.exe"
        );
        ProcessName = "opera"
    };
    "yandex" = @{
        Name     = "Yandex Browser";
        UserData = "C:\Users\$activeUser\AppData\Local\Yandex\YandexBrowser\User Data";
        ExePaths = @(
            "$env:LOCALAPPDATA\Yandex\YandexBrowser\Application\browser.exe"
        );
        ProcessName = "browser"
    }
}

$selectedBrowserKey = $Browser.Trim().ToLower()
if (-not $browserCatalog.ContainsKey($selectedBrowserKey)) { $selectedBrowserKey = "chrome" }
$bInfo = $browserCatalog[$selectedBrowserKey]

$browserExe = $null
foreach ($p in $bInfo.ExePaths) {
    if (Test-Path $p) { $browserExe = $p; break }
}

if (-not $browserExe) {
    P "[-] Браузер '$($bInfo.Name)' не найден на системе!" "Red"
    return
}

# 3. Сканирование и вывод ВСЕХ найденных профилей с их именами
P "[1/5] Сканирование профилей браузера '$($bInfo.Name)'..." "Yellow"
$allProfilesMeta = Get-BrowserProfilesMetadata $bInfo.UserData

P "  Найденные профили в системе:" "Cyan"
foreach ($k in $allProfilesMeta.Keys) {
    $item = $allProfilesMeta[$k]
    $emailInfo = if ($item.Email) { " (Аккаунт: $($item.Email))" } else { "" }
    P "   * Папка: [$($item.Folder)] ➔ Имя: `"$($item.DisplayName)`"$emailInfo" "White"
}
P ""

# Выбор целевых профилей
$targetProfiles = @()
if ($Profiles -eq "all" -or $Profiles -eq "*") {
    $targetProfiles = @($allProfilesMeta.Keys)
} else {
    $targetProfiles = $Profiles.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
}
if ($targetProfiles.Count -eq 0) { $targetProfiles = @("Default") }

# 4. Геолокация
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
                ISP      = if ($resp.isp) { $resp.isp } elseif ($resp.org) { $resp.org } else { $resp.connection.isp }
            }
            break
        }
    } catch {}
}
if (-not $geo) {
    $geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

$city = $geo.City

$journey = @(
    @{
        Title        = "☕ Утренний кофе (опечатка 'cofee' -> 'coffee')";
        TypoText     = "best cofee sho";
        Correction   = "ffee shops in $city open now";
        TargetFull   = "best coffee shops in $city open now";
        OpenResult   = $true;
        IsCommercial = $false
    },
    @{
        Title        = "🍳 Рецепт ужина (опечатка 'patsa' -> 'pasta')";
        TypoText     = "easy 20 min garlic chiken pat";
        Correction   = "cken pasta recipe dinner";
        TargetFull   = "easy 20 min garlic chicken pasta recipe dinner";
        OpenResult   = $true;
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

# Прогрев каждого выбранного профиля
$currIdx = 1
foreach ($profFolder in $targetProfiles) {
    $metaInfo = $allProfilesMeta[$profFolder]
    $dispName = if ($metaInfo) { $metaInfo.DisplayName } else { $profFolder }
    $dispMail = if ($metaInfo -and $metaInfo.Email) { " [$($metaInfo.Email)]" } else { "" }

    P "=================================================================" "Yellow"
    P "  [$currIdx/$($targetProfiles.Count)] ЗАПУСК ПРОГРЕВА ПРОФИЛЯ:" "Yellow"
    P "  Папка:  $profFolder" "White"
    P "  Имя:    $dispName$dispMail" "Green"
    P "=================================================================" "Yellow"

    Get-Process -Name $bInfo.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 600

    $argsList = @(
        "--user-data-dir=`"$($bInfo.UserData)`"",
        "--profile-directory=`"$profFolder`"",
        "--start-maximized",
        "--disable-blink-features=AutomationControlled",
        "https://www.google.com"
    )

    $proc = Start-Process -FilePath $browserExe -ArgumentList $argsList -PassThru
    Start-Sleep -Seconds 4

    if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {
        [WinInputV5]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
    }
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 400

    $isFirstQuery = $true
    $taskStep = 1
    foreach ($item in $journey) {
        P "  [$taskStep/$($journey.Count)] $($item.Title)" "Cyan"

        if ($isFirstQuery) {
            $inputX = Get-Random -Min 480 -Max 680
            $inputY = Get-Random -Min 345 -Max 385
            [WinInputV5]::Click($inputX, $inputY)
            $isFirstQuery = $false
        } else {
            $topInputX = Get-Random -Min 240 -Max 450
            $topInputY = Get-Random -Min 125 -Max 145
            [WinInputV5]::Click($topInputX, $topInputY)
            Start-Sleep -Milliseconds 180
            [System.Windows.Forms.SendKeys]::SendWait("^a")
            Start-Sleep -Milliseconds 120
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds 180
        }

        P "      -> Ввод с опечаткой и исправлением: '$($item.TargetFull)'" "Gray"
        Type-ExperiencedHuman $item.TargetFull $item.TypoText $item.Correction
        Start-Sleep -Seconds 4

        for ($i = 0; $i -lt 3; $i++) {
            [WinInputV5]::ScrollSmooth(-180, 5)
            $curX = Get-Random -Min 380 -Max 720
            $curY = Get-Random -Min 280 -Max 480
            [WinInputV5]::MoveSmooth($curX, $curY, 450)
            Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
        }

        if ($item.OpenResult) {
            $linkX = Get-Random -Min 350 -Max 600
            $linkY = if ($item.IsCommercial) { Get-Random -Min 230 -Max 280 } else { Get-Random -Min 320 -Max 420 }
            [WinInputV5]::CtrlClick($linkX, $linkY)
            Start-Sleep -Milliseconds 900
            [System.Windows.Forms.SendKeys]::SendWait("^{TAB}")
            Start-Sleep -Seconds 3
            [WinInputV5]::ScrollSmooth(-220, 5)
            Start-Sleep -Seconds 1
            [System.Windows.Forms.SendKeys]::SendWait("^w")
            Start-Sleep -Milliseconds 600
        } else {
            [WinInputV5]::ScrollSmooth(250, 5)
            Start-Sleep -Milliseconds 400
        }

        $taskStep++
    }

    Get-Process -Name $bInfo.ProcessName -ErrorAction SilentlyContinue | ForEach-Object { $_.CloseMainWindow() } | Out-Null
    Start-Sleep -Seconds 2
    Get-Process -Name $bInfo.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1

    $currIdx++
}

# 5. Итоговый отчет с именами профилей
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

P ""
P "=================================================================" "Green"
P "     MULTI-PROFILE WARM-UP & TRUST REPORT v5.5                   " "Green"
P "=================================================================" "Green"
P "  Браузер:   $($bInfo.Name)" "White"
P "  Локация:   $($geo.City), $($geo.Region)" "White"
P ""

foreach ($pName in $targetProfiles) {
    $metaInfo = $allProfilesMeta[$pName]
    $dispName = if ($metaInfo) { $metaInfo.DisplayName } else { $pName }
    $dispMail = if ($metaInfo -and $metaInfo.Email) { " ($($metaInfo.Email))" } else { "" }

    $profPath = Join-Path $bInfo.UserData $pName
    $allDoms = @()
    $allDoms += Extract-DomainsFromBinary (Join-Path $profPath "Network\Cookies")
    $allDoms += Extract-DomainsFromBinary (Join-Path $profPath "Network\Cookies-wal")
    $allDoms += Extract-DomainsFromBinary (Join-Path $profPath "History")
    $uDoms = $allDoms | Select-Object -Unique | Sort-Object

    $gDoms = $uDoms | Where-Object { $_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
    $aDoms = $uDoms | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }

    P "  👤 Профиль: `"$dispName`"$dispMail [Папка: $pName]" "Cyan"
    P "     -> Нагуляно доменов: $($uDoms.Count) | Google Core: $($gDoms.Count) | Реклама: $($aDoms.Count)" "White"
    $status = if ($uDoms.Count -ge 20) { "HIGH TRUST (Tier 1: Ready)" } else { "MEDIUM TRUST" }
    P "     -> Статус:          [$status]" "Green"
    P ""
}

# Открытие страницы куков последнего профиля
Start-Process -FilePath $browserExe -ArgumentList @(
    "--user-data-dir=`"$($bInfo.UserData)`"",
    "--profile-directory=`"$($targetProfiles[-1])`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
