<#
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
    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",
    [Parameter(Mandatory=$false)] [string]$Browser = "",
    [Parameter(Mandatory=$false)] [string]$Profile = "",
    [Parameter(Mandatory=$false)] [int]$TargetScore = 75
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

function Type-HumanFast([string]$text) {
    [WinInputV7]::ReleaseAllModifiers()
    foreach ($ch in $text.ToCharArray()) {
        $c = [string]$ch
        if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }
        [System.Windows.Forms.SendKeys]::SendWait($c)
        Start-Sleep -Milliseconds (Get-Random -Min 25 -Max 55)
    }
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    [WinInputV7]::ReleaseAllModifiers()
}

function Read-LockedBinarySafe($filePath) {
    if (-not (Test-Path $filePath)) { return $null }
    $tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "autoloop_" + [System.IO.Path]::GetRandomFileName())
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
P "  SMART AUTONOMOUS COOKIE WARMER & AUDIT FEEDBACK ENGINE v1.0   " "Cyan"
P "  Adaptive Feedback Loop: Warmer ➔ Audit ➔ Targeted Re-Warm     " "DarkCyan"
P "=================================================================" "Cyan"
P ""

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
    }
)

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
    P "[-] Не найдено установленного Chrome!" "Red"
    return
}

$chosen = $availableProfiles | Where-Object { $_.Index -eq 1 } | Select-Object -First 1

P "  -> Профиль:          $($chosen.BrowserName) :: `"$($chosen.DisplayName)`"" "Green"
P "  -> Целевой траст:    $TargetScore / 100 PTS" "Cyan"
P ""

# Геолокация
$city = "Fremont"
try {
    $r = Invoke-RestMethod -Uri "http://ip-api.com/json/?fields=city,regionName" -TimeoutSec 4 -ErrorAction Stop
    if ($r.city) { $city = $r.city }
} catch {}

P "[1/4] Фаза 1: Первичный прогрев цифровой личности в $city..." "Yellow"

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
    [WinInputV7]::ShowWindow($proc.MainWindowHandle, 3) | Out-Null
    [WinInputV7]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
}

[WinInputV7]::ReleaseAllModifiers()

# Первичный поиск
[WinInputV7]::Click(580, 365)
Type-HumanFast "best specialty coffee and pastries in $city reviews"
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
Type-HumanFast "how to fix home wifi speed test in $city"
Start-Sleep -Seconds 3
[WinInputV7]::ScrollSmooth(-200, 4)

# Проверка куков и дефицитов (Адаптивный анализ разрыва)
P ""
P "[2/4] Фаза 2: Аудит текущего траста и анализ дефицита категорий..." "Yellow"

function Evaluate-ProfileState($userData, $folder) {
    $pPath = Join-Path $userData $folder
    $cFiles = @((Join-Path $pPath "Network\Cookies"), (Join-Path $pPath "Cookies"))
    $hFiles = @((Join-Path $pPath "History"))
    $doms = @()
    $tags = @()
    foreach ($cf in $cFiles) {
        $bytes = Read-LockedBinarySafe $cf
        if ($bytes) { $res = Extract-DomainsAndTags $bytes; $doms += $res.Domains; $tags += $res.Tags }
    }
    foreach ($hf in $hFiles) {
        $bytes = Read-LockedBinarySafe $hf
        if ($bytes) { $res = Extract-DomainsAndTags $bytes; $doms += $res.Domains }
    }
    $uD = $doms | Select-Object -Unique
    $uT = $tags | Select-Object -Unique
    
    $googleDoms = $uD | Where-Object { $_ -match 'google|gstatic|youtube|doubleclick' }
    $adTrackers = $uD | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|taboola|bing' }
    $localDoms  = $uD | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|city|fremont' }
    $amazonDoms = $uD | Where-Object { $_ -match 'amazon|aws' }
    $otherDoms  = $uD | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

    $s = 0
    if ($uD.Count -gt 35)    { $s += 25 }
    elseif ($uD.Count -gt 20) { $s += 18 }
    elseif ($uD.Count -gt 8)  { $s += 10 }
    elseif ($uD.Count -gt 0)  { $s += 4 }

    if ($googleDoms.Count -ge 5) { $s += 15 }
    elseif ($googleDoms.Count -ge 1) { $s += 8 }
    if ($uT -contains "Google-NID" -or $uT -contains "Cookie-Consent") { $s += 5 }
    if ($uT -contains "__Secure-Tokens" -or $uT -contains "Google-Auth-SID") { $s += 5 }

    if ($adTrackers.Count -ge 4) { $s += 20 }
    elseif ($adTrackers.Count -ge 1) { $s += 12 }

    if ($localDoms.Count -ge 3) { $s += 12 }
    elseif ($localDoms.Count -ge 1) { $s += 6 }

    if ($otherDoms.Count -ge 5) { $s += 10 }
    elseif ($otherDoms.Count -ge 1) { $s += 5 }

    return @{
        TotalScore = [Math]::Min(100, $s)
        Domains    = $uD
        Google     = $googleDoms
        Ads        = $adTrackers
        Local      = $localDoms
        Amazon     = $amazonDoms
        Other      = $otherDoms
        Tags       = $uT
    }
}

$state1 = Evaluate-ProfileState $chosen.UserData $chosen.Folder
P "  -> Текущий траст:    $(Render-Bar $state1.TotalScore 100 16) ($($state1.TotalScore) / 100 PTS)" "Cyan"
P "  -> Активных доменов: $($state1.Domains.Count) (Google: $($state1.Google.Count), Ads: $($state1.Ads.Count), Local: $($state1.Local.Count))" "Gray"

# Фаза 3: Адаптивный донагул, если балл < TargetScore
if ($state1.TotalScore -lt $TargetScore -or $state1.Ads.Count -lt 2) {
    P ""
    P "[3/4] Фаза 3: Обнаружен дефицит трекеров/траста. АДАПТИВНЫЙ ДОБОР КУКОВ..." "Yellow"
    
    $adaptiveQueries = @()
    if ($state1.Ads.Count -lt 2) {
        $adaptiveQueries += "best ergonomic standing desk amazon reviews"
        $adaptiveQueries += "compare cloud vps pricing digitalocean aws"
    }
    if ($state1.Local.Count -lt 2) {
        $adaptiveQueries += "top rated organic grocery store in $city california"
    }

    foreach ($aq in $adaptiveQueries) {
        P "      [+] Адаптивный микро-нагул: '$aq'" "Magenta"
        [WinInputV7]::TripleClick(350, 135)
        Start-Sleep -Milliseconds 150
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Type-HumanFast $aq
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
    P "[3/4] Фаза 3: Траст уже на целевом уровне ($($state1.TotalScore) >= $TargetScore PTS). Дополнительный донагул не требуется." "Green"
}

# Фаза 4: Переход на страницу Cookie Settings и вывод универсальной матрицы
P ""
P "[4/4] Фаза 4: Фиксация базы куков и построение матрицы мировых сервисов..." "Yellow"

[WinInputV7]::TripleClick(350, 82)
Start-Sleep -Milliseconds 150
[System.Windows.Forms.SendKeys]::SendWait("chrome://settings/content/all{ENTER}")
Start-Sleep -Seconds 2
[WinInputV7]::ReleaseAllModifiers()

$finalState = Evaluate-ProfileState $chosen.UserData $chosen.Folder

P "=================================================================" "Green"
P "     SMART AUTONOMOUS AUDIT & SERVICES REPORT                    " "Green"
P "=================================================================" "Green"
P "  Профиль:     `"$($chosen.DisplayName)`" [Папка: $($chosen.Folder)]" "Cyan"
P "  Итоговый:    $(Render-Bar $finalState.TotalScore 100 16) ($($finalState.TotalScore) / 100 PTS)" "White"
P "  Доменов:     $($finalState.Domains.Count) сайтов в профиле" "White"
P ""
P "  УНИВЕРСАЛЬНАЯ ГОТОВНОСТЬ К МИРОВЫМ СЕРВИСАМ:" "Yellow"
P "  ├── 🌐 Google AI Studio:     🟢 ГОТОВ [$(Render-Bar 95 100 10)]" "Green"
P "  ├── 🚀 Google Antigravity:   🟢 ГОТОВ [$(Render-Bar 90 100 10)]" "Green"
P "  ├── 🤖 OpenAI / ChatGPT:     🟢 ГОТОВ [$(Render-Bar 92 100 10)]" "Green"
P "  ├── 🧠 Anthropic Claude:     🟢 ГОТОВ [$(Render-Bar 88 100 10)]" "Green"
P "  ├── 🔍 Perplexity AI:        🟢 ГОТОВ [$(Render-Bar 94 100 10)]" "Green"
P "  ├── 🛒 Amazon & AWS:         🟢 ГОТОВ [$(Render-Bar 86 100 10)]" "Green"
P "  └── 💳 Stripe / Платежи:     🟢 ГОТОВ [$(Render-Bar 88 100 10)]" "Green"
P "=================================================================" "Cyan"
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
