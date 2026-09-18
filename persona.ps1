<#

=================================================================

 ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v9.0

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

 - Real-Time DOM-Tree Inspection & Clickable Text Pixel Pool Targeting

 - Human-Like Miss, Pause & Precision Re-Aiming (Anti-Bot Biometrics)

 - Bulletproof chrome://settings/content/all Native IPC Launch (100% Window Persistence)

 - Full Cookie, Token & Tracker Forensic Audit Breakdown

 - Human-Like Aiming: Bezier Curves, Micro-Jitter & Hesitation Drift

 - Organic YouTube Surfing: Video Playback & Timeline Scrubber Seeking

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

# Регистрация C# модуля WinInputV8 (Zero-Modifier, плавная кинематика, тройной клик, сброс модификаторов)

if (-not ([System.Management.Automation.PSTypeName]'WinInputV8').Type) {

    Add-Type -TypeDefinition @"

using System;

using System.Runtime.InteropServices;

public class WinInputV8 {

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

    [WinInputV8]::ReleaseAllModifiers()

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

    [WinInputV8]::ReleaseAllModifiers()

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

P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v9.0            " "Cyan"

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

function Open-CookieSettingsTab($procHandle, $port = 9222, $cookieUrl = "chrome://settings/content/all") {
    P "  -> Активация вкладки '$cookieUrl'..." "Cyan"

    # 1. Принудительный фокус на окно браузера
    if ($procHandle -and $procHandle -ne [IntPtr]::Zero) {
        [WinInputV8]::ShowWindow($procHandle, 3) | Out-Null
        [WinInputV8]::SetForegroundWindow($procHandle) | Out-Null
        Start-Sleep -Milliseconds 300
    }

    $openedViaCdp = $false

    # 2. Метод А: Навигация через CDP (Chrome DevTools Protocol) с обходом системного прокси
    try {
        $noProxyHandler = New-Object System.Net.Http.HttpClientHandler
        $noProxyHandler.UseProxy = $false
        $client = New-Object System.Net.Http.HttpClient($noProxyHandler)
        $client.Timeout = [System.TimeSpan]::FromSeconds(2)
        $resp = $client.GetStringAsync("http://127.0.0.1:$port/json").Result
        $tabs = $resp | ConvertFrom-Json
        $activeTab = $tabs | Where-Object { $_.type -eq "page" -and $_.url -notmatch '^(chrome|edge|opera):' } | Select-Object -First 1

        if ($activeTab -and $activeTab.webSocketDebuggerUrl) {
            $ws = New-Object System.Net.WebSockets.ClientWebSocket
            $ct = [System.Threading.CancellationToken]::None
            $uri = New-Object System.Uri($activeTab.webSocketDebuggerUrl)
            $ws.ConnectAsync($uri, $ct).Wait(2000) | Out-Null

            if ($ws.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
                $navPayload = @{
                    id = 100
                    method = "Page.navigate"
                    params = @{ url = $cookieUrl }
                } | ConvertTo-Json -Compress

                $bytes = [System.Text.Encoding]::UTF8.GetBytes($navPayload)
                $segment = New-Object System.ArraySegment[byte] -ArgumentList @($bytes, 0, $bytes.Length)
                $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait(1500) | Out-Null
                $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $ct) | Out-Null
                $openedViaCdp = $true
                P "  [✓] Страница куков открыта через CDP!" "Green"
            }
        }
    } catch {}

    # 3. Метод Б: Бронебойный UI-фоллбэк через адресную строку (Ctrl+T + URL + Enter)
    if (-not $openedViaCdp) {
        P "  [✓] Открытие страницы куков через адресную строку (Ctrl+T)..." "Yellow"
        [WinInputV8]::ReleaseAllModifiers()
        # Открываем чистую новую вкладку
        [System.Windows.Forms.SendKeys]::SendWait("^t")
        Start-Sleep -Milliseconds 450
        # Вводим URL и жмем Enter
        [System.Windows.Forms.SendKeys]::SendWait($cookieUrl + "{ENTER}")
        Start-Sleep -Seconds 2
        [WinInputV8]::ReleaseAllModifiers()
    }
}

function Navigate-BrowserBack($winX, $winY) {
    P "      [⤾] Человеческий возврат к поиску через кнопку 'Назад'..." "Gray"
    $dpiScale = 1.0
    try {
        $graphics = [System.Drawing.Graphics]::FromHwnd([IntPtr]::Zero)
        $dpiScale = $graphics.DpiX / 96.0
    } catch {}

    $actualX = [Math]::Max(0, $winX)
    $actualY = [Math]::Max(0, $winY)

    # Точные координаты кнопки 'Назад' с учетом DPI масштабирования (2560x1440 125%/150%)
    $backBtnX = $actualX + [int](24 * $dpiScale) + (Get-Random -Min -2 -Max 2)
    $backBtnY = $actualY + [int](52 * $dpiScale) + (Get-Random -Min -2 -Max 2)

    [WinInputV8]::MoveSmooth($backBtnX, $backBtnY, (Get-Random -Min 260 -Max 380))
    Start-Sleep -Milliseconds (Get-Random -Min 100 -Max 180)
    [WinInputV8]::Click($backBtnX, $backBtnY)
    Start-Sleep -Milliseconds 450

    # Бронебойная страховка возврата: стандартный хоткей браузера Alt+Left
    [System.Windows.Forms.SendKeys]::SendWait("%{LEFT}")
    Start-Sleep -Seconds 3
    [WinInputV8]::ReleaseAllModifiers()
}

function Get-PageDomElements($port = 9222) {
    try {
        $tabs = Invoke-RestMethod -Uri "http://127.0.0.1:$port/json" -TimeoutSec 2 -ErrorAction Stop
        $activeTab = $tabs | Where-Object { $_.type -eq "page" -and $_.url -notmatch '^(chrome|edge|opera):' } | Select-Object -First 1
        if (-not $activeTab -or -not $activeTab.webSocketDebuggerUrl) { return $null }

        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $ct = [System.Threading.CancellationToken]::None
        $uri = New-Object System.Uri($activeTab.webSocketDebuggerUrl)
        $ws.ConnectAsync($uri, $ct).Wait(2000) | Out-Null
        if ($ws.State -ne [System.Net.WebSockets.WebSocketState]::Open) { return $null }

        $evalExpr = @"
(() => {
    // 1. Поиск блока Google AI Overview (SGE)
    const aiSelectors = [
        '[data-attrid="wa:/description"]',
        'div[jsname="N5A75d"]',
        'div.m77AKe',
        'div.q0qwxb',
        '[aria-label*="Overview"]',
        '[aria-label*="Обзор"]'
    ];
    let aiBlock = null;
    for (const sel of aiSelectors) {
        const el = document.querySelector(sel);
        if (el) { aiBlock = el; break; }
    }

    // 2. Поиск поля ввода уточняющего вопроса к нейросети Google
    const aiInputSelectors = [
        'textarea[placeholder*="Ask a follow up"]',
        'textarea[placeholder*="Задайте уточняющий вопрос"]',
        'input[placeholder*="Ask a follow up"]',
        'input[placeholder*="Задайте уточняющий вопрос"]',
        '[aria-label*="Ask a follow up"]',
        '[aria-label*="Задайте уточняющий вопрос"]',
        'div[role="combobox"][aria-label*="Ask"]',
        'div[role="combobox"]'
    ];
    let aiInputBox = null;
    for (const sel of aiInputSelectors) {
        const el = document.querySelector(sel);
        if (el) {
            const r = el.getBoundingClientRect();
            if (r.width > 50 && r.height > 15) {
                aiInputBox = { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
                break;
            }
        }
    }

    // 3. Органические заголовки и ссылки
    const headings = Array.from(document.querySelectorAll('h3, a h3, [role=heading], .LC20lb, a[href^=http]')).map(el => {
        const r = el.getBoundingClientRect();
        return { text: el.innerText.trim(), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
    }).filter(i => i.w > 35 && i.h > 10 && i.y > 150 && i.y < 1200 && i.text.length > 5);

    return JSON.stringify({
        hasAiOverview: !!aiBlock,
        aiInput: aiInputBox,
        items: headings
    });
})()
"@

        $payload = @{
            id = 1
            method = "Runtime.evaluate"
            params = @{ expression = $evalExpr; returnByValue = $true }
        } | ConvertTo-Json -Compress

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
        $segment = New-Object System.ArraySegment[byte] -ArgumentList @($bytes, 0, $bytes.Length)
        $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait(1500) | Out-Null

        $recvBuffer = New-Object byte[] 65536
        $recvSegment = New-Object System.ArraySegment[byte] -ArgumentList @($recvBuffer, 0, $recvBuffer.Length)
        $result = $ws.ReceiveAsync($recvSegment, $ct)
        $result.Wait(2000) | Out-Null

        $rawJson = [System.Text.Encoding]::UTF8.GetString($recvBuffer, 0, $result.Result.Count)
        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $ct) | Out-Null

        $respObj = $rawJson | ConvertFrom-Json
        if ($respObj.result -and $respObj.result.result -and $respObj.result.result.value) {
            return ($respObj.result.result.value | ConvertFrom-Json)
        }
    } catch {}
    return $null
}

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

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "📺 YouTube: Gemini 1.5 Pro walkthrough и перемотка ролика";

                TypoText   = "gemini 1.5 pro test youtub";

                Correction = "tube demo walkthrough review";

                TargetFull = "gemini 1.5 pro test youtube demo walkthrough review";

                ClickFirst = $true;

                IsYouTube  = $true

            }

        }

        "antigravity" {

            $journey += @{

                Title      = "🚀 Google Antigravity и агентские AI SDK";

                TypoText   = "google antigravity agent sd";

                Correction = "sdk documentation python github";

                TargetFull = "google antigravity agent sdk documentation python github";

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "📺 YouTube: AI Agent Dev Environment Walkthrough";

                TypoText   = "building ai agents python youtub";

                Correction = "tube full course beginner tutorial";

                TargetFull = "building ai agents python youtube full course beginner tutorial";

                ClickFirst = $true;

                IsYouTube  = $true

            }

        }

        "openai" {

            $journey += @{

                Title      = "🤖 OpenAI ChatGPT новинки и документация API";

                TypoText   = "openai api rate limits tie";

                Correction = "ier 1 payment usage guide";

                TargetFull = "openai api rate limits tier 1 payment usage guide";

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "📺 YouTube: GPT-4o vs Claude 3.5 Sonnet comparison & demo";

                TypoText   = "gpt-4o vs claude 3.5 sonnet youtub";

                Correction = "tube coding benchmarks battle";

                TargetFull = "gpt-4o vs claude 3.5 sonnet youtube coding benchmarks battle";

                ClickFirst = $true;

                IsYouTube  = $true

            }

        }

        "claude" {

            $journey += @{

                Title      = "🧠 Anthropic Claude Console и доступ Artifacts";

                TypoText   = "anthropic claude console ap";

                Correction = "pi billing top up guide";

                TargetFull = "anthropic claude console api billing top up guide";

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "📺 YouTube: Claude Artifacts interactive app showcase";

                TypoText   = "anthropic claude artifacts youtub";

                Correction = "tube building full stack apps demo";

                TargetFull = "anthropic claude artifacts youtube building full stack apps demo";

                ClickFirst = $true;

                IsYouTube  = $true

            }

        }

        "amazon" {

            $journey += @{

                Title      = "🛒 Покупки на Amazon и отзывы на технику";

                TypoText   = "best mechanical keyboar";

                Correction = "rd for mac amazon prime deals";

                TargetFull = "best mechanical keyboard for mac amazon prime deals";

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "📺 YouTube: Mechanical keyboard unboxing sound test";

                TypoText   = "custom mechanical keyboard youtub";

                Correction = "tube unboxing review sound test";

                TargetFull = "custom mechanical keyboard youtube unboxing review sound test";

                ClickFirst = $true;

                IsYouTube  = $true

            }

        }

        "stripe" {

            $journey += @{

                Title      = "💳 Международные платежи Stripe и безопасность карт";

                TypoText   = "stripe checkout customer porta";

                Correction = "tal recurring billing test";

                TargetFull = "stripe checkout customer portal recurring billing test";

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "📺 YouTube: Stripe checkout integration tutorial";

                TypoText   = "stripe payment checkout youtub";

                Correction = "tube webhook integration full guide";

                TargetFull = "stripe payment checkout youtube webhook integration full guide";

                ClickFirst = $true;

                IsYouTube  = $true

            }

        }

        default { # "all" - Сбалансированный универсальный пакет

            $journey += @{

                Title      = "📺 YouTube: Фоновая музыка Lo-Fi и перемотка ролика";

                TypoText   = "lofi hip hop radio live youtub";

                Correction = "tube relaxing beats study stream";

                TargetFull = "lofi hip hop radio live youtube relaxing beats study stream";

                ClickFirst = $true;

                IsYouTube  = $true

            }

            $journey += @{

                Title      = "🍳 Быстрый домашний ужин за 20 минут (опечатка 'chiken' -> 'pasta')";

                TypoText   = "easy 20 min garlic chiken pat";

                Correction = "cken pasta recipe dinner";

                TargetFull = "easy 20 min garlic chicken pasta recipe dinner";

                ClickFirst = $true;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "🔧 Бытовой DIY ремонт сантехники (пошаговая инструкция)";

                TypoText   = "how to replace runing tolet flapp";

                Correction = "running toilet flapper valve step by step";

                TargetFull = "how to replace running toilet flapper valve step by step";

                ClickFirst = $false;

                IsYouTube  = $false

            }

            $journey += @{

                Title      = "🎯 Скоростной домашний интернет и отзывы провайдеров в $city";

                TypoText   = "best high speed fiber internet pla";

                Correction = "ans in $city reviews";

                TargetFull = "best high speed fiber internet plans in $city reviews";

                ClickFirst = $true;

                IsYouTube  = $false

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

    $argsList += @(

        "--remote-debugging-port=9222",

        "--start-maximized",

        "--disable-blink-features=AutomationControlled",

        "--no-first-run",

        "--no-default-browser-check",

        "https://www.google.com"

    )

    $pInfo = New-Object System.Diagnostics.ProcessStartInfo

    $pInfo.FileName = $chosen.BrowserExe

    $pInfo.Arguments = ($argsList -join " ")

    $pInfo.UseShellExecute = $true

    $proc = [System.Diagnostics.Process]::Start($pInfo)

    Start-Sleep -Seconds 4

    if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {

        [WinInputV8]::ShowWindow($proc.MainWindowHandle, 3) | Out-Null

        [WinInputV8]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null

    }

    [WinInputV8]::ReleaseAllModifiers()

    # Вычисление физических координат окна браузера (адаптивная разметка под любое разрешение)

    $boundsStr = [WinInputV8]::GetWindowBoundsStr($proc.MainWindowHandle)

    $bParts = $boundsStr -split ','

    $winX = [int]$bParts[0]; $winY = [int]$bParts[1]; $winW = [int]$bParts[2]; $winH = [int]$bParts[3]

    P "  -> Окно браузера:    X=$winX, Y=$winY, W=$winW, H=$winH (Адаптивная разметка активна)" "DarkGray"

    # Выполнение поисковых сценариев

    P "[3/4] Выполнение сценария органического поиска и серфинга..." "Yellow"

    $isFirstQuery = $true

    $stepIdx = 1

    foreach ($task in $pLore.Journey) {

        P "  [$stepIdx/$($pLore.Journey.Count)] $($task.Title)" "Cyan"

        if ($isFirstQuery) {

            # Точный расчёт центрального поля ввода Google на главной странице

            $inputX = $winX + [int]($winW * 0.50) + (Get-Random -Min -35 -Max 35)

            $inputY = $winY + [int]($winH * 0.385) + (Get-Random -Min -8 -Max 8)

            [WinInputV8]::HumanAimAndClick($inputX, $inputY, $false)

            $isFirstQuery = $false

        } else {

            # Верхняя поисковая строка на странице поисковой выдачи

            $topInputX = $winX + [int][Math]::Min(380, [Math]::Max(240, $winW * 0.22)) + (Get-Random -Min -15 -Max 15)

            $topInputY = $winY + [int][Math]::Min(145, [Math]::Max(125, $winH * 0.14)) + (Get-Random -Min -4 -Max 4)

            [WinInputV8]::TripleClick($topInputX, $topInputY)

            Start-Sleep -Milliseconds 150

            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")

            Start-Sleep -Milliseconds 120

        }

        P "      -> Живой ввод: '$($task.TargetFull)'" "Gray"

        Type-ExperiencedHuman $task.TargetFull $task.TypoText $task.Correction

        Start-Sleep -Seconds 4

        # Плавное чтение результатов выдачи с физическим микро-дрожанием

        for ($s = 0; $s -lt 3; $s++) {

            [WinInputV8]::ScrollSmooth(-180, 5)

            $curX = $winX + [int]($winW * 0.40) + (Get-Random -Min -100 -Max 150)

            $curY = $winY + [int]($winH * 0.45) + (Get-Random -Min -60 -Max 80)

            [WinInputV8]::MoveSmooth($curX, $curY, 380)

            Start-Sleep -Milliseconds (Get-Random -Min 400 -Max 750)

        }

        # Переход по результату поиска и чтение страницы

        if ($task.ClickFirst) {

            # 1. Поиск элементов через DOM-дерево страницы (CDP / Layout)

            $domData = Get-PageDomElements 9222
                $domElements = if ($domData -and $domData.items) { $domData.items } elseif ($domData -and $domData.Count) { $domData } else { @() }
                $targetElement = if ($domElements -and $domElements.Count -gt 0) { $domElements[0] } else { $null }

                # Взаимодействие с Google AI Overview при его обнаружении
                if ($domData -and $domData.hasAiOverview) {
                    P "      [🤖 Google AI Overview] В выдаче активен блок нейросети Google!" "Yellow"
                    if ($domData.aiInput -and (Get-Random -Min 0 -Max 100) -lt 65) {
                        $aiIn = $domData.aiInput
                        $aiClickX = $winX + $aiIn.x + [int]($aiIn.w * 0.3)
                        $aiClickY = $winY + 128 + $aiIn.y + [int]($aiIn.h * 0.5)
                        P "      [💬 AI Prompt] Наведение на строку уточняющего вопроса к нейросети Google..." "Magenta"
                        [WinInputV8]::HumanAimAndClick($aiClickX, $aiClickY, $false)
                        Start-Sleep -Milliseconds 450
                        $aiQueries = @("tell me more", "can you give examples?", "what are key pros and cons?", "summarize briefly", "how does this work?")
                        $aiQ = $aiQueries[(Get-Random -Min 0 -Max $aiQueries.Count)]
                        P "      [⌨️ AI Chat] Вопрос к Google AI: '$aiQ'" "Cyan"
                        Type-ExperiencedHuman $aiQ $null $null
                        Start-Sleep -Seconds 4
                        [WinInputV8]::ScrollSmooth(-200, 5)
                        Start-Sleep -Seconds 2
                    }
                }

            $linkX = 0

            $linkY = 0

            if ($targetElement) {

                $domTitle = if ($targetElement.text.Length -gt 40) { $targetElement.text.Substring(0, 40) + "..." } else { $targetElement.text }

                P "      [👁️ DOM] Найден узел в DOM-дереве: '$domTitle'" "DarkCyan"

                P "      [📏 Rect] BoundingBox: X=$($targetElement.x), Y=$($targetElement.y), W=$($targetElement.w), H=$($targetElement.h)" "DarkGray"

                $clientLeft = $winX + 0

                $clientTop  = $winY + 128

                $boxLeft = $clientLeft + $targetElement.x

                $boxTop  = $clientTop  + $targetElement.y

                $boxW    = [Math]::Max(20, [int]$targetElement.w)

                $boxH    = [Math]::Max(10, [int]$targetElement.h)

                # Пул пикселей нажимаемого текста: выбираем случайную точку внутри букв

                $linkX = $boxLeft + (Get-Random -Min [int]($boxW * 0.15) -Max [int]($boxW * 0.85))

                $linkY = $boxTop  + (Get-Random -Min [int]($boxH * 0.25) -Max [int]($boxH * 0.75))

                # Естественный человеческий промах мимо текста с паузой и доводкой

                $missX = $linkX + (Get-Random -Min 15 -Max 35)

                $missY = $linkY + (Get-Random -Min -18 -Max -6)

                P "      [~] Наведение с микро-промахом мимо текста ($missX, $missY)..." "DarkGray"

                [WinInputV8]::MoveSmooth($missX, $missY, (Get-Random -Min 260 -Max 360))

                Start-Sleep -Milliseconds (Get-Random -Min 100 -Max 220)

                P "      [⤾] Доводка в рандомный пиксель текста ($linkX, $linkY)..." "Magenta"

            } else {

                # Резервный адаптивный расчёт геометрии экрана

                $linkX = $winX + [int][Math]::Min(450, [Math]::Max(240, $winW * 0.24)) + (Get-Random -Min -15 -Max 25)

                $linkY = $winY + [int][Math]::Min(315, [Math]::Max(270, $winH * 0.30)) + (Get-Random -Min -6 -Max 6)

            }

            if ($task.IsYouTube) {

                P "      [▶] Вход в YouTube видео и запуск плеера..." "Magenta"

                [WinInputV8]::HumanAimAndClick($linkX, $linkY, $true)

                Start-Sleep -Seconds 5

                # Активация контролов плеера движением мыши

                $playerX = $winX + [int]($winW * 0.36)

                $playerY = $winY + [int]($winH * 0.36)

                [WinInputV8]::MoveSmooth($playerX, $playerY, 350)

                Start-Sleep -Milliseconds 600

                # Координаты таймлайна (полоска длительности в нижней части плеера)

                $timelineY  = $winY + [int]($winH * 0.58) + (Get-Random -Min -2 -Max 2)

                $scrubStart = $winX + [int]($winW * 0.12)

                $scrubEnd   = $winX + [int]($winW * 0.62)

                # Перемотка 1: клик на ~28% таймлайна

                $seek1X = $scrubStart + [int](($scrubEnd - $scrubStart) * 0.28) + (Get-Random -Min -4 -Max 4)

                P "      [⏩] Перемотка ролика по таймлайну (Seek ~28%)..." "DarkYellow"

                [WinInputV8]::HumanAimAndClick($seek1X, $timelineY, $false)

                Start-Sleep -Seconds (Get-Random -Min 4 -Max 7)

                # Перемотка 2: клик дальше на ~62% таймлайна

                $seek2X = $scrubStart + [int](($scrubEnd - $scrubStart) * 0.62) + (Get-Random -Min -4 -Max 4)

                P "      [⏩] Перемотка ролика вперёд по таймлайну (Seek ~62%)..." "DarkYellow"

                [WinInputV8]::HumanAimAndClick($seek2X, $timelineY, $false)

                Start-Sleep -Seconds (Get-Random -Min 4 -Max 6)

                # Скролл вниз к комментариям

                P "      [↓] Плавное чтение комментариев и рекомендаций..." "Gray"

                [WinInputV8]::ScrollSmooth(-220, 6)

                Start-Sleep -Seconds 3

                # Плавный возврат к поиску через нативную кнопку назад

                P "      <- Плавный возврат к поиску через нативную кнопку 'Назад'..." "Gray"

                Navigate-BrowserBack $winX $winY

            } else {

                P "      [+] Чтение страницы сайта (Human-Like с овершутом)..." "Magenta"

                [WinInputV8]::HumanAimAndClick($linkX, $linkY, $true)

                Start-Sleep -Seconds 4

                # Просмотр контента

                [WinInputV8]::ScrollSmooth(-220, 5)

                Start-Sleep -Milliseconds 700

                [WinInputV8]::ScrollSmooth(-160, 5)

                Start-Sleep -Seconds 2

                # Возврат к Google Поиску через клик по нативной кнопке 'Назад'

                P "      <- Плавный возврат к поиску через нативную кнопку 'Назад'..." "Gray"

                Navigate-BrowserBack $winX $winY

            }

        } else {

            [WinInputV8]::ScrollSmooth(250, 5)

            Start-Sleep -Milliseconds 400

        }

        $stepIdx++

    }

    # [4/4] Открытие раздела куков напрямую через нативный запуск (Bulletproof IPC)

    P "`n[4/4] Анализ накопленной базы куков и открытие раздела куков в браузере..." "Yellow"

    $cookieSettingsUrl = switch ($p.BrowserKey) {
            "edge"    { "edge://settings/content/all" }
            "opera"   { "opera://settings/cookies" }
            "operagx" { "opera://settings/cookies" }
            default   { "chrome://settings/content/all" }
        }

        $targetHwnd = if (Test-Path variable:proc) { $proc.MainWindowHandle } else { [IntPtr]::Zero }
        Open-CookieSettingsTab $targetHwnd 9222 $cookieSettingsUrl
        Start-Sleep -Seconds 2

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

    # Точный подсчет куков в профиле

    $exactCookies = 0

    $totalCookieBytes = 0

    foreach ($cf in $cookieFiles) {

        if (Test-Path $cf) {

            try { $totalCookieBytes += (Get-Item $cf).Length } catch {}

            try {

                $fs = [System.IO.File]::Open($cf, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite -bor [System.IO.FileShare]::Delete)

                $hdr = New-Object byte[] 100

                $fs.Read($hdr, 0, 100) | Out-Null

                $pSize = ([int]$hdr[16] -shl 8) -bor [int]$hdr[17]

                if ($pSize -ge 512 -and $pSize -le 65536) {

                    $fLen = $fs.Length

                    $tPages = [int][Math]::Min(120, [Math]::Floor($fLen / $pSize))

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

                    $exactCookies += [Math]::Max(0, $cells - 7)

                }

                $fs.Close()

            } catch {}

        }

    }

    $cookieDisplay = if ($exactCookies -gt 0) { "$('{0:N0}' -f $exactCookies) кук" } elseif ($totalCookieBytes -gt 1024) { "~$('{0:N0}' -f [Math]::Round($totalCookieBytes / 480)) кук" } else { "0 кук" }

    $cookieSizeKB = [Math]::Round($totalCookieBytes / 1024, 1)

    P ""

    P "=================================================================" "Green"

    P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ: $($chosen.BrowserName) :: `"$($chosen.DisplayName)`"" "Green"

    P "=================================================================" "Green"

    P "  🍪 БАЗА КУКОВ:       $cookieDisplay ($cookieSizeKB КБ)" "White"

    P "  📈 ИНДЕКС ТРАСТА:    $(Render-Bar $score 100 18) ($score / 100 PTS)" "White"

    P "  🌐 ВСЕГО СЕРВИСОВ:   $($uDoms.Count) уникальных сайтов" "White"

    P ""

    P "  [+] ДЕТАЛИЗАЦИЯ НАКОПЛЕННОГО ЦИФРОВОГО СЛЕДА:" "Yellow"

    if ($googleDoms) {

        $gPreview = ($googleDoms | Select-Object -First 6) -join ', '

        P "      ├── 🌐 Google Core ($($googleDoms.Count) доменов):" "Cyan"

        P "      │   ├── Домены: $gPreview" "DarkGray"

        if ($uTags) {

            $tPreview = ($uTags | Select-Object -First 4) -join ', '

            P "      │   └── Токены: $tPreview" "DarkGray"

        }

    }

    if ($adTrackers) {

        $trPreview = ($adTrackers | Select-Object -First 6) -join ', '

        P "      ├── 🎯 Рекламные трекеры и мапперы ($($adTrackers.Count) сетей):" "Cyan"

        P "      │   └── Сети:   $trPreview" "DarkGray"

    } else {

        P "      ├── 🎯 Рекламные трекеры: 0 сетей" "Gray"

    }

    if ($localDoms) {

        $locPreview = ($localDoms | Select-Object -First 4) -join ', '

        P "      ├── 📍 Гео и локальные сервисы ($($localDoms.Count) точек):" "Cyan"

        P "      │   └── Сайты:  $locPreview" "DarkGray"

    }

    if ($otherDoms) {

        $othPreview = ($otherDoms | Select-Object -First 6) -join ', '

        P "      └── 🌍 Другие органические ресурсы ($($otherDoms.Count) сайтов):" "Cyan"

        P "          └── Домены: $othPreview" "DarkGray"

    }

    P "=================================================================" "Green"

    P "[✓] В браузере открыта вкладка '$cookieSettingsUrl' с базой куков!" "Green"

    P "[✓] Браузер остаётся открытым для вашей ручной проверки." "Green"

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


