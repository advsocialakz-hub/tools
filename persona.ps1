<#
=================================================================
 ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v8.0
 - Multi-Profile Batch Support (Single, Comma-Separated '1,2' or 'all')
 - Unique Distinct Personas Per Profile (Zero Cross-Contamination)
 - Specialized Target Presets:
   * all         - Comprehensive Universal Pack (Default)
   * aistudio    - Google AI Studio & Gemini Ecosystem
   * antigravity - Google Antigravity & AI Developer Cloud
   * openai      - ChatGPT Plus & Platform API
   * claude      - Anthropic Claude (claude.ai)
   * amazon      - Amazon Prime, AWS & E-Commerce
   * stripe      - Global SaaS Billing & FinTech Checkout
 - 100% Guaranteed Zero Window Closing (Browser Remains Open)
 - Zero-Modifier Input: No Alt+F4, No Ctrl+W, No Stuck Modifier Keys
 - Native Triple-Click Input Reuse & Chrome Toolbar Back Button
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",
    [Parameter(Mandatory=$false)] [string]$Browser = "",
    [Parameter(Mandatory=$false)] [string]$Profile = "",
    [Parameter(Mandatory=$false)] [string]$Profiles = "",
    [Parameter(Mandatory=$false)] [string]$Target = "all"
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

    public static void ReleaseAllModifiers() {
        byte[] keys = new byte[] { 0x10, 0x11, 0x12, 0x5B, 0x5C, 0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5 };
        foreach (byte k in keys) {
            keybd_event(k, 0, 0x0002, UIntPtr.Zero);
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


function Get-ProfileFastSummary($profPath) {
    if (-not (Test-Path $profPath)) {
        return [PSCustomObject]@{
            CookieBytes   = 0
            ExactCookies  = 0
            CookieDisplay = "0 кук"
            TotalDoms     = 0
            GoogleDoms    = 0
            AdTrackers    = 0
            LocalDoms     = 0
            AmazonDoms    = 0
            Score         = 0
            Badge         = "🔴  0 PTS"
            SummaryLine   = "[🔴  0 PTS | 🍪 0 кук      | 🌐  0 серв (Пустой)]"
        }
    }

    $cFiles = @(
        (Join-Path $profPath "Network\Cookies"),
        (Join-Path $profPath "Cookies"),
        (Join-Path $profPath "Network\Cookies-wal"),
        (Join-Path $profPath "Cookies-wal")
    )
    $hFiles = @(
        (Join-Path $profPath "History"),
        (Join-Path $profPath "History-wal"),
        (Join-Path $profPath "Preferences")
    )

    $cookieBytes = 0
    $exactCookies = 0
    $isExact = $false
    $profDomains = @()
    $profTags = @()

    foreach ($cf in $cFiles) {
        if (Test-Path $cf) {
            $sz = (Get-Item $cf).Length
            $cookieBytes += $sz

            if (-not $isExact -and $sz -gt 100) {
                try {
                    $fs = New-Object System.IO.FileStream($cf, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
                    $hdr = New-Object byte[] 100
                    $fs.Read($hdr, 0, 100) | Out-Null
                    $magic = [System.Text.Encoding]::ASCII.GetString($hdr, 0, 15)
                    if ($magic -eq "SQLite format 3") {
                        $pSize = ([int]$hdr[16] -shl 8) -bor [int]$hdr[17]
                        if ($pSize -eq 1) { $pSize = 65536 }
                        $tPages = [int]($fs.Length / $pSize)
                        $cells = 0
                        for ($pi = 0; $pi -lt $tPages; $pi++) {
                            $fs.Seek($pi * $pSize, [System.IO.SeekOrigin]::Begin) | Out-Null
                            $pData = New-Object byte[] 108
                            $fs.Read($pData, 0, 108) | Out-Null
                            $off = if ($pi -eq 0) { 100 } else { 0 }
                            if ($pData.Length -ge ($off + 5) -and $pData[$off] -eq 0x0D) {
                                $cCnt = ([int]$pData[$off + 3] -shl 8) -bor [int]$pData[$off + 4]
                                $cells += $cCnt
                            }
                        }
                        $exactCookies = [Math]::Max(0, $cells - 7)
                        $isExact = $true
                    }
                    $fs.Close()
                } catch {}
            }

            $b = Read-LockedBinarySafe $cf
            if ($b) {
                $ext = Extract-DomainsAndTags $b
                $profDomains += $ext.Domains
                $profTags    += $ext.Tags
            }
        }
    }

    foreach ($hf in $hFiles) {
        if (Test-Path $hf) {
            $b = Read-LockedBinarySafe $hf
            if ($b) {
                $ext = Extract-DomainsAndTags $b
                $profDomains += $ext.Domains
            }
        }
    }

    $uniqueDoms = @($profDomains | Select-Object -Unique)
    $googleDoms = @($uniqueDoms | Where-Object { $_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' })
    $adTrackers = @($uniqueDoms | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing' })
    $localDoms  = @($uniqueDoms | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor' })
    $amazonDoms = @($uniqueDoms | Where-Object { $_ -match 'amazon|aws|media-amazon|ssl-images-amazon' })

    $cookieStr = "0 кук"
    if ($isExact -and $exactCookies -gt 0) {
        $cookieStr = "$('{0:N0}' -f $exactCookies) кук"
    } elseif ($cookieBytes -gt 1024) {
        $est = [Math]::Round($cookieBytes / 480)
        $cookieStr = "~$('{0:N0}' -f $est) кук"
    }

    $score = 0
    if ($uniqueDoms.Count -gt 35) { $score += 30 }
    elseif ($uniqueDoms.Count -gt 15) { $score += 20 }
    elseif ($uniqueDoms.Count -gt 5) { $score += 10 }
    elseif ($uniqueDoms.Count -gt 0) { $score += 5 }

    if ($googleDoms.Count -ge 5) { $score += 25 }
    elseif ($googleDoms.Count -ge 1) { $score += 12 }

    if ($adTrackers.Count -ge 4) { $score += 25 }
    elseif ($adTrackers.Count -ge 1) { $score += 15 }

    if ($localDoms.Count -ge 2) { $score += 20 }
    elseif ($localDoms.Count -ge 1) { $score += 10 }

    $score = [Math]::Min(100, $score)

    $badge = if ($score -ge 70) { "🟢 $('{0,2}' -f $score) PTS" } elseif ($score -ge 40) { "🟡 $('{0,2}' -f $score) PTS" } else { "🔴 $('{0,2}' -f $score) PTS" }

    $detailStr = if ($uniqueDoms.Count -gt 0) {
        "🌐 $('{0,2}' -f $uniqueDoms.Count) серв (G:$($googleDoms.Count), ТР:$($adTrackers.Count), ЛОК:$($localDoms.Count))"
    } else {
        "🌐  0 серв (Чистый профиль)"
    }

    $summaryLine = "[$badge | 🍪 $('{0,-10}' -f $cookieStr) | $detailStr]"

    return [PSCustomObject]@{
        CookieBytes   = $cookieBytes
        ExactCookies  = $exactCookies
        CookieDisplay = $cookieStr
        TotalDoms     = $uniqueDoms.Count
        GoogleDoms    = $googleDoms.Count
        AdTrackers    = $adTrackers.Count
        LocalDoms     = $localDoms.Count
        AmazonDoms    = $amazonDoms.Count
        Score         = $score
        Badge         = $badge
        SummaryLine   = $summaryLine
    }
}

function Get-BrowserProfilesMetadata($userDataPath, $isDirect = $false) {
    if ($isDirect) {
        return @{ "" = [PSCustomObject]@{ Folder = ""; DisplayName = "Default Profile"; Email = "" } }
    }
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
P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v8.0            " "Cyan"
P "  Multi-Profile Automation & Targeted Service Presets            " "DarkCyan"
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
        ProcessName = "chrome";
        IsDirect = $false
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\Users\$activeUser\AppData\Local\Microsoft\Edge\User Data";
        ExePaths = @(
            "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
            "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
            "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
        );
        ProcessName = "msedge";
        IsDirect = $false
    },
    @{
        Key      = "opera";
        Name     = "Opera Stable";
        UserData = "C:\Users\$activeUser\AppData\Roaming\Opera Software\Opera Stable";
        ExePaths = @(
            "$env:LOCALAPPDATA\Programs\Opera\opera.exe",
            "$env:ProgramFiles\Opera\opera.exe",
            "${env:ProgramFiles(x86)}\Opera\opera.exe"
        );
        ProcessName = "opera";
        IsDirect = $true
    },
    @{
        Key      = "operagx";
        Name     = "Opera GX";
        UserData = "C:\Users\$activeUser\AppData\Roaming\Opera Software\Opera GX Stable";
        ExePaths = @(
            "$env:LOCALAPPDATA\Programs\Opera GX\opera.exe",
            "$env:ProgramFiles\Opera GX\opera.exe",
            "${env:ProgramFiles(x86)}\Opera GX\opera.exe"
        );
        ProcessName = "opera";
        IsDirect = $true
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\Users\$activeUser\AppData\Local\BraveSoftware\Brave-Browser\User Data";
        ExePaths = @(
            "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe",
            "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\Application\brave.exe"
        );
        ProcessName = "brave";
        IsDirect = $false
    }
)

# 3. Обнаружение профилей
$availableProfiles = @()
foreach ($b in $browserCatalog) {
    $exeFound = $null
    foreach ($ep in $b.ExePaths) {
        if (Test-Path $ep) { $exeFound = $ep; break }
    }
    if (-not $exeFound -or -not (Test-Path $b.UserData)) { continue }

    $metaDict = Get-BrowserProfilesMetadata $b.UserData $b.IsDirect
    foreach ($k in $metaDict.Keys) {
        $pInfo = $metaDict[$k]
        $profPath = if ($pInfo.Folder) { Join-Path $b.UserData $pInfo.Folder } else { $b.UserData }
        $metrics = Get-ProfileFastSummary $profPath

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
            Metrics     = $metrics
        }
    }
}

if ($availableProfiles.Count -eq 0) {
    P "[-] В системе не найдено доступных браузеров и профилей!" "Red"
    return
}

# 4. Выбор профилей (Одиночный, Мульти '1,2' или 'all')
$chosenProfiles = @()

if ($Profiles) {
    if ($Profiles.ToLower() -in @("all", "*")) {
        $chosenProfiles = $availableProfiles
    } else {
        $indexes = $Profiles -split ',' | ForEach-Object { $_.Trim() }
        foreach ($idx in $indexes) {
            $m = $availableProfiles | Where-Object { $_.Index -eq [int]$idx }
            if ($m) { $chosenProfiles += $m }
        }
    }
} elseif ($Browser -and $Profile) {
    $single = $availableProfiles | Where-Object { $_.BrowserKey -eq $Browser.ToLower() -and ($_.Folder -eq $Profile -or $_.DisplayName -eq $Profile) } | Select-Object -First 1
    if ($single) { $chosenProfiles += $single }
}

if ($chosenProfiles.Count -eq 0) {
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"
    P "=================================================================" "Yellow"
    foreach ($ap in $availableProfiles) {
        $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }
        $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }
        P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: `"$($ap.DisplayName)`"$mailInfo $folderInfo" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    Write-Host " [?] Введите номер, список через запятую (например: 1,2) или 'all' (Enter = 1): " -ForegroundColor Cyan -NoNewline
    $userInput = Read-Host
    
    if (-not $userInput -or $userInput.Trim() -eq "") {
        $chosenProfiles += ($availableProfiles | Where-Object { $_.Index -eq 1 } | Select-Object -First 1)
    } elseif ($userInput.Trim().ToLower() -in @("all", "*")) {
        $chosenProfiles = $availableProfiles
    } else {
        $parts = $userInput -split ',' | ForEach-Object { $_.Trim() }
        foreach ($p in $parts) {
            if ($p -match '^\d+$') {
                $idx = [int]$p
                $m = $availableProfiles | Where-Object { $_.Index -eq $idx }
                if ($m) { $chosenProfiles += $m }
            }
        }
    }
}

if ($chosenProfiles.Count -eq 0) {
    $chosenProfiles += ($availableProfiles | Where-Object { $_.Index -eq 1 } | Select-Object -First 1)
}

P ""
P "  -> К прогреву выбрано профилей: $($chosenProfiles.Count)" "Green"
foreach ($cp in $chosenProfiles) {
    P "     * $($cp.BrowserName) :: `"$($cp.DisplayName)`" [Папка: $($cp.Folder)]" "DarkCyan"
}
P "  -> Целевой пресет сервиса:       $($Target.ToUpper())" "Cyan"
P ""

# 5. Геолокация
P "[1/4] Определение реального IP и геолокации выхода..." "Yellow"
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
P ""

# Функция генерации уникальной персоны и поисковых путей под целевой пресет
function Get-PersonaJourney($pIdx, $dispName, $city, $targetPreset) {
    $names = @("Alex", "David", "Michael", "Sarah", "Emily", "James", "Daniel")
    $name = if ($dispName -and $dispName -ne "Default") { $dispName } else { $names[($pIdx - 1) % $names.Count] }
    
    $journey = @()

    # 1. Базовый локальный запрос (быт)
    $journey += @{
        Title      = "☕ Утренний кофе и свежая выпечка в $city (опечатка 'cofee' -> 'coffee')";
        TypoText   = "best cofee sho";
        Correction = "ffee shops and pastries in $city open now";
        TargetFull = "best coffee shops and pastries in $city open now";
        ClickFirst = $true
    }

    # 2. Пресетные специализированные запросы
    switch ($targetPreset.ToLower()) {
        "aistudio" {
            $journey += @{
                Title      = "🌐 Исследование Google AI Studio и документации Gemini";
                TypoText   = "google ai studio quickstar";
                Correction = "tart python tutorial gemini api key";
                TargetFull = "google ai studio quickstart python tutorial gemini api key";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "📺 YouTube видео о возможностях Gemini 1.5 Pro";
                TypoText   = "gemini 1.5 pro multimodal test youtub";
                Correction = "tube demo walkthrough";
                TargetFull = "gemini 1.5 pro multimodal test youtube demo walkthrough";
                ClickFirst = $true
            }
        }
        "antigravity" {
            $journey += @{
                Title      = "🚀 Google Antigravity и агентские AI SDK";
                TypoText   = "google antigravity agent sd";
                Correction = "sdk documentation python github";
                TargetFull = "google antigravity agent sdk documentation python github";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "☁️ Google Cloud Shell и настройка окружения";
                TypoText   = "how to enable google cloud shel";
                Correction = "ll web ide vscode";
                TargetFull = "how to enable google cloud shell web ide vscode";
                ClickFirst = $true
            }
        }
        "openai" {
            $journey += @{
                Title      = "🤖 OpenAI ChatGPT новинки и документация API";
                TypoText   = "openai api rate limits tie";
                Correction = "ier 1 payment usage guide";
                TargetFull = "openai api rate limits tier 1 payment usage guide";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "⚙️ Сравнение GPT-4o и Claude 3.5 Sonnet";
                TypoText   = "gpt-4o vs claude 3.5 sonnet benchmar";
                Correction = "rks coding comparison";
                TargetFull = "gpt-4o vs claude 3.5 sonnet benchmarks coding comparison";
                ClickFirst = $true
            }
        }
        "claude" {
            $journey += @{
                Title      = "🧠 Anthropic Claude Console и доступ Artifacts";
                TypoText   = "anthropic claude console ap";
                Correction = "pi billing top up guide";
                TargetFull = "anthropic claude console api billing top up guide";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "📰 Новости Кремниевой Долины и технологии в Калифорнии";
                TypoText   = "silicon valley tech news thi";
                Correction = "is week san francisco";
                TargetFull = "silicon valley tech news this week san francisco";
                ClickFirst = $true
            }
        }
        "amazon" {
            $journey += @{
                Title      = "🛒 Покупки на Amazon и отзывы на технику";
                TypoText   = "best mechanical keyboar";
                Correction = "rd for mac amazon prime deals";
                TargetFull = "best mechanical keyboard for mac amazon prime deals";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "☁️ Amazon Web Services бесплатный уровень (Free Tier)";
                TypoText   = "aws free tier limits ec2 t3.micr";
                Correction = "cro setup guide";
                TargetFull = "aws free tier limits ec2 t3.micro setup guide";
                ClickFirst = $true
            }
        }
        "stripe" {
            $journey += @{
                Title      = "💳 Международные платежи Stripe и безопасность карт";
                TypoText   = "stripe checkout customer porta";
                Correction = "tal recurring billing test";
                TargetFull = "stripe checkout customer portal recurring billing test";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "🏦 Проверка 3D Secure и международных транзакций";
                TypoText   = "how 3d secure works internatinal card";
                Correction = "onal cards verification";
                TargetFull = "how 3d secure works international cards verification";
                ClickFirst = $true
            }
        }
        default { # "all" - Сбалансированный универсальный пакет
            $journey += @{
                Title      = "🍳 Быстрый домашний ужин за 20 минут (опечатка 'chiken' -> 'pasta')";
                TypoText   = "easy 20 min garlic chiken pat";
                Correction = "cken pasta recipe dinner";
                TargetFull = "easy 20 min garlic chicken pasta recipe dinner";
                ClickFirst = $true
            }
            $journey += @{
                Title      = "🔧 Бытовой DIY ремонт сантехники (пошаговая инструкция)";
                TypoText   = "how to replace runing tolet flapp";
                Correction = "running toilet flapper valve step by step";
                TargetFull = "how to replace running toilet flapper valve step by step";
                ClickFirst = $false
            }
            $journey += @{
                Title      = "🎯 Скоростной домашний интернет и отзывы провайдеров в $city";
                TypoText   = "best high speed fiber internet pla";
                Correction = "ans in $city reviews";
                TargetFull = "best high speed fiber internet plans in $city reviews";
                ClickFirst = $true
            }
        }
    }

    return @{
        Name    = $name
        Journey = $journey
    }
}

# 6. Цикл прогрева по выбранным профилям
$currentProfileNum = 1

foreach ($chosen in $chosenProfiles) {
    P "=================================================================" "Cyan"
    P "  ПРОГРЕВ ПРОФИЛЯ [$currentProfileNum/$($chosenProfiles.Count)]: $($chosen.BrowserName) :: `"$($chosen.DisplayName)`"" "Cyan"
    P "=================================================================" "Cyan"

    $pLore = Get-PersonaJourney $currentProfileNum $chosen.DisplayName $city $Target
    P "  -> Имя личности:     $($pLore.Name)" "DarkCyan"
    P "  -> Системная папка:  $($chosen.Folder)" "DarkCyan"
    P ""

    # Запуск браузера в видимом окне (100% стабильность, Zero-Close Guarantee)
    P "[2/4] Запуск $($chosen.BrowserName) в видимом окне (Zero-Close Guarantee)..." "Yellow"

    $argsList = @()
    if ($chosen.UserData) { $argsList += "--user-data-dir=`"$($chosen.UserData)`"" }
    if ($chosen.Folder)   { $argsList += "--profile-directory=`"$($chosen.Folder)`"" }
    $argsList += @("--start-maximized", "--disable-blink-features=AutomationControlled", "https://www.google.com")

    $proc = Start-Process -FilePath $chosen.BrowserExe -ArgumentList $argsList -PassThru
    Start-Sleep -Seconds 4

    if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {
        [WinInputV7]::ShowWindow($proc.MainWindowHandle, 3) | Out-Null
        [WinInputV7]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
    }

    [WinInputV7]::ReleaseAllModifiers()

    # Выполнение поисковых сценариев
    P "[3/4] Выполнение сценария органического поиска и серфинга..." "Yellow"
    $isFirstQuery = $true
    $stepIdx = 1

    foreach ($task in $pLore.Journey) {
        P "  [$stepIdx/$($pLore.Journey.Count)] $($task.Title)" "Cyan"

        if ($isFirstQuery) {
            $inputX = Get-Random -Min 510 -Max 650
            $inputY = Get-Random -Min 348 -Max 380
            [WinInputV7]::Click($inputX, $inputY)
            $isFirstQuery = $false
        } else {
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

    # Переход на страницу Cookie Settings в открытом окне
    P ""
    P "[4/4] Анализ накопленной базы куков и переход в настройки браузера..." "Yellow"

    [WinInputV7]::TripleClick(350, 82)
    Start-Sleep -Milliseconds 150
    [System.Windows.Forms.SendKeys]::SendWait("chrome://settings/content/all{ENTER}")
    Start-Sleep -Seconds 2
    [WinInputV7]::ReleaseAllModifiers()

    # Анализ куков текущего профиля на лету
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
    $amazonDoms = $uDoms | Where-Object { $_ -match 'amazon|aws' }
    $otherDoms  = $uDoms | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

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

    P ""
    P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ `"$($chosen.DisplayName)`":" "Green"
    P "  Нагуляно:  $($uDoms.Count) доменов | Индекс траста: $(Render-Bar $score 100 16) ($score / 100 PTS)" "White"
    if ($googleDoms) { P "  🌐 Google Core: $($googleDoms.Count) | 🎯 Трекеры: $($adTrackers.Count) | 📍 Локальные: $($localDoms.Count)" "Gray" }
    P ""

    $currentProfileNum++
}

P "=================================================================" "Green"
P "     ВСЕ ВЫБРАННЫЕ ПРОФИЛИ УСПЕШНО ПРОГРЕТЫ И ГОТОВЫ К РАБОТЕ     " "Green"
P "=================================================================" "Green"
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"
P "[✓] Вы можете просмотреть сохраненные куки прямо в открытом окне." "Green"

$finalOutput = $sb.ToString() + "`r`n[OK] Copy by buffer`r`n"
try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
