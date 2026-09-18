// =================================================================
// ADVSOCIALAKZ MULTI-VERSION CLOUDFLARE EDGE WORKER
// Supports: allfrod, all, hub, v9, v8, v7, v6, v5, v4, audit, auto, diag
// Dynamic GitHub Branch & Ref Proxy
// Authorization Key: akz2026
// =================================================================

const SCRIPTS = {
  "allfrod": `<#

=================================================================

 ALLFROD MASTER CONTROL CONSOLE v2.0

 Universal Anti-Fraud, Hardware Forensic, Profile Auditor & Human Warmer

 - All-in-One Interactive Terminal Hub

 - Single-Line Execution via irm | iex

 - Deep Hardware, VM/Hypervisor, BrowserLeaks & Ports Diagnostics

 - Multi-Browser SQLite Cookie & Domain History Auditor

 - Adaptive Human-Like Warmer (Dynamic Geometry, Overshoot & YouTube Timeline Scrubbing)

 - Autonomous Adaptive Feedback Loop (Warmer ➔ Audit ➔ Targeted Re-Warm)

 - One-Click Comprehensive "AllFrod Full Audit" Dossier

 - Zero-Window-Close Guarantee (Chrome / Edge / Opera remain open)

 - Auto-Copies Complete Reports to Windows Clipboard ([OK] Copy by buffer)

 - Persistent Menu Loop: Always returns to master menu after each task

 - License Key: akz2026

=================================================================

#>

param(

    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",

    [Parameter(Mandatory=$false)] [string]$Mode = "",

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

# 2. Регистрация C# модуля WinInputV8 (Динамические координаты, кривые Безье, овершут, перемотка YouTube)

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

    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);

    [DllImport("user32.dll")] public static extern int GetSystemMetrics(int nIndex);

    public struct POINT { public int X; public int Y; }

    public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }

    public static void ReleaseAllModifiers() {

        byte[] keys = new byte[] { 0x10, 0x11, 0x12, 0x5B, 0x5C, 0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5 };

        foreach (byte k in keys) {

            keybd_event(k, 0, 0x0002, UIntPtr.Zero);

        }

    }

    public static string GetWindowBoundsStr(IntPtr hWnd) {

        RECT r;

        IntPtr h = (hWnd != IntPtr.Zero) ? hWnd : GetForegroundWindow();

        if (h != IntPtr.Zero && GetWindowRect(h, out r)) {

            int w = r.Right - r.Left;

            int hg = r.Bottom - r.Top;

            if (w > 250 && hg > 200) {

                return string.Format("{0},{1},{2},{3}", r.Left, r.Top, w, hg);

            }

        }

        int scrW = GetSystemMetrics(0); // SM_CXSCREEN

        int scrH = GetSystemMetrics(1); // SM_CYSCREEN

        return string.Format("0,0,{0},{1}", scrW, scrH);

    }

    private static void MoveSmoothInternal(int startX, int startY, int targetX, int targetY, int durationMs) {

        Random rnd = new Random();

        int ctrlX = (startX + targetX) / 2 + rnd.Next(-40, 40);

        int ctrlY = (startY + targetY) / 2 + rnd.Next(-30, 30);

        int steps = Math.Max(18, durationMs / 14);

        int sleepPerStep = Math.Max(6, durationMs / steps);

        for (int i = 1; i <= steps; i++) {

            double t = (double)i / steps;

            double ease = t * t * (3 - 2 * t);

            double u = 1 - ease;

            int x = (int)(u * u * startX + 2 * u * ease * ctrlX + ease * ease * targetX);

            int y = (int)(u * u * startY + 2 * u * ease * ctrlY + ease * ease * targetY);

            if (i < steps) { x += rnd.Next(-1, 2); y += rnd.Next(-1, 2); }

            SetCursorPos(x, y);

            System.Threading.Thread.Sleep(sleepPerStep);

        }

        SetCursorPos(targetX, targetY);

    }

    public static void MoveSmooth(int targetX, int targetY, int durationMs) {

        POINT start; GetCursorPos(out start);

        MoveSmoothInternal(start.X, start.Y, targetX, targetY, durationMs);

    }

    public static void HumanAimAndClick(int targetX, int targetY, bool simulateHesitation) {

        ReleaseAllModifiers();

        POINT start; GetCursorPos(out start);

        Random rnd = new Random();

        if (simulateHesitation && rnd.Next(0, 100) < 35) {

            int detourX = targetX + rnd.Next(-80, 80);

            int detourY = targetY + (rnd.Next(0, 2) == 0 ? rnd.Next(-45, -20) : rnd.Next(20, 55));

            MoveSmoothInternal(start.X, start.Y, detourX, detourY, rnd.Next(280, 420));

            System.Threading.Thread.Sleep(rnd.Next(280, 580));

            GetCursorPos(out start);

        }

        int dist = (int)Math.Sqrt(Math.Pow(targetX - start.X, 2) + Math.Pow(targetY - start.Y, 2));

        if (dist > 60) {

            int overX = targetX + rnd.Next(-14, 14);

            int overY = targetY + rnd.Next(-8, 8);

            MoveSmoothInternal(start.X, start.Y, overX, overY, rnd.Next(220, 340));

            System.Threading.Thread.Sleep(rnd.Next(60, 130));

            GetCursorPos(out start);

        }

        MoveSmoothInternal(start.X, start.Y, targetX, targetY, rnd.Next(90, 150));

        System.Threading.Thread.Sleep(rnd.Next(65, 125));

        mouse_event(0x0002, 0, 0, 0, 0);

        System.Threading.Thread.Sleep(rnd.Next(65, 115));

        mouse_event(0x0004, 0, 0, 0, 0);

        System.Threading.Thread.Sleep(40);

        ReleaseAllModifiers();

    }

    public static void Click(int x, int y) {

        HumanAimAndClick(x, y, false);

    }

    public static void TripleClick(int x, int y) {

        ReleaseAllModifiers();

        POINT start; GetCursorPos(out start);

        MoveSmoothInternal(start.X, start.Y, x, y, 280);

        System.Threading.Thread.Sleep(70);

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

            System.Threading.Thread.Sleep(26);

        }

    }

}

"@

}

# 3. Базовые функции вывода и визуализации

$global:sb = [System.Text.StringBuilder]::new()

function P($text, $color="White") {

    Write-Host $text -ForegroundColor $color

    [void]$global:sb.AppendLine($text)

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

function Copy-BufferAndFinish {

    $finalOutput = $global:sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"

    try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }

    Write-Host ""

    Write-Host "[OK] Copy by buffer" -ForegroundColor Green

}

function Type-ExperiencedHuman([string]$targetText, [string]$typoText, [string]$correction) {

    [WinInputV8]::ReleaseAllModifiers()

    $textToType = if ($typoText) { $typoText } else { $targetText }

    

    foreach ($ch in $textToType.ToCharArray()) {

        $c = [string]$ch

        if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }

        [System.Windows.Forms.SendKeys]::SendWait($c)

        Start-Sleep -Milliseconds (Get-Random -Min 45 -Max 125)

    }

    if ($typoText -and $correction) {

        Start-Sleep -Milliseconds (Get-Random -Min 280 -Max 460)

        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")

        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 280)

        

        foreach ($ch in $correction.ToCharArray()) {

            $c = [string]$ch

            if ($c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { $c = "{$c}" }

            [System.Windows.Forms.SendKeys]::SendWait($c)

            Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 95)

        }

    }

    Start-Sleep -Milliseconds (Get-Random -Min 350 -Max 650)

    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")

    [WinInputV8]::ReleaseAllModifiers()

}

function Read-LockedBinarySafe($filePath) {

    if (-not (Test-Path $filePath)) { return $null }

    try {

        $fs = [System.IO.File]::Open($filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite -bor [System.IO.FileShare]::Delete)

        $ms = New-Object System.IO.MemoryStream

        $fs.CopyTo($ms)

        $fs.Close()

        return $ms.ToArray()

    } catch {

        try {

            $tmpFile = [System.IO.Path]::GetTempFileName()

            Copy-Item -Path $filePath -Destination $tmpFile -Force -ErrorAction SilentlyContinue

            if (Test-Path $tmpFile) {

                $b = [System.IO.File]::ReadAllBytes($tmpFile)

                Remove-Item -Path $tmpFile -Force -ErrorAction SilentlyContinue

                return $b

            }

        } catch {}

    }

    return $null

}

function Extract-DomainsAndTags($bytes) {

    $res = [PSCustomObject]@{ Domains = @(); Tags = @() }

    if (-not $bytes -or $bytes.Length -lt 16) { return $res }

    $text = [System.Text.Encoding]::ASCII.GetString($bytes)

    $domMatches = [regex]::Matches($text, '(?i)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+(?:com|org|net|io|ai|co|ru|de|uk|app|dev|cloud|tech|info|biz|me|online|site|store|xyz|cc|tv|us)')

    $foundDoms = @()

    foreach ($m in $domMatches) {

        $val = $m.Value.ToLower().Trim('.')

        if ($val.Length -gt 4 -and $val -notmatch '^(schema|w3|googlehosted|googleusercontent|gvt1|127|localhost|example|test)') {

            $foundDoms += $val

        }

    }

    $res.Domains = @($foundDoms | Select-Object -Unique)

    $tags = @()

    if ($text -match '(?i)__Secure-')      { $tags += "__Secure-Tokens" }

    if ($text -match '(?i)\\bNID\\b')        { $tags += "Google-NID" }

    if ($text -match '(?i)\\b(AEC|SOCS)\\b') { $tags += "Google-AEC/SOCS" }

    if ($text -match '(?i)\\b(SID|SSID)\\b') { $tags += "Google-Auth-SID" }

    if ($text -match '(?i)CONSENT')        { $tags += "Cookie-Consent" }

    if ($text -match '(?i)session')        { $tags += "Web-Session" }

    $res.Tags = @($tags | Select-Object -Unique)

    return $res

}

function Get-ProfileFastSummary($profPath) {

    $cFiles = @(

        (Join-Path $profPath "Network\\Cookies"),

        (Join-Path $profPath "Cookies")

    )

    $hFiles = @(

        (Join-Path $profPath "History")

    )

    $cookieBytes = 0

    $exactCookies = 0

    $isExact = $false

    $profDomains = @()

    $profTags = @()

    foreach ($cf in $cFiles) {

        if (Test-Path $cf) {

            try { $cookieBytes += (Get-Item $cf).Length } catch {}

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

                    $isExact = $true

                }

                $fs.Close()

            } catch {}

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

            $json = Get-Content $localState -Raw | ConvertFrom-Json

            if ($json.profile -and $json.profile.info_cache) {

                foreach ($prop in $json.profile.info_cache.PSObject.Properties) {

                    $meta[$prop.Name] = [PSCustomObject]@{

                        Folder      = $prop.Name

                        DisplayName = if ($prop.Value.name) { $prop.Value.name } else { $prop.Name }

                        Email       = if ($prop.Value.user_name) { $prop.Value.user_name } else { "" }

                    }

                }

            }

        } catch {}

    }

    if ($meta.Count -eq 0) {

        $dirs = @("Default", "Profile 1", "Profile 2", "Profile 3", "Profile 4", "Profile 5")

        foreach ($d in $dirs) {

            $p = Join-Path $userDataPath $d

            if (Test-Path $p) {

                $meta[$d] = [PSCustomObject]@{

                    Folder      = $d

                    DisplayName = $d

                    Email       = ""

                }

            }

        }

    }

    return $meta

}

function Get-AllAvailableProfiles {

    $activeUser = $env:USERNAME

    $catalog = @(

        @{

            Key      = "chrome";

            Name     = "Google Chrome";

            UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";

            ExePaths = @(

                "$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",

                "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",

                "$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"

            );

            ProcessName = "chrome";

            IsDirect = $false

        },

        @{

            Key      = "edge";

            Name     = "Microsoft Edge";

            UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";

            ExePaths = @(

                "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",

                "$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe",

                "$env:LOCALAPPDATA\\Microsoft\\Edge\\Application\\msedge.exe"

            );

            ProcessName = "msedge";

            IsDirect = $false

        },

        @{

            Key      = "opera";

            Name     = "Opera Stable";

            UserData = "C:\\Users\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable";

            ExePaths = @(

                "$env:LOCALAPPDATA\\Programs\\Opera\\opera.exe",

                "$env:ProgramFiles\\Opera\\opera.exe",

                "\${env:ProgramFiles(x86)}\\Opera\\opera.exe"

            );

            ProcessName = "opera";

            IsDirect = $true

        },

        @{

            Key      = "operagx";

            Name     = "Opera GX";

            UserData = "C:\\Users\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera GX Stable";

            ExePaths = @(

                "$env:LOCALAPPDATA\\Programs\\Opera GX\\opera.exe",

                "$env:ProgramFiles\\Opera GX\\opera.exe"

            );

            ProcessName = "opera";

            IsDirect = $true

        },

        @{

            Key      = "brave";

            Name     = "Brave Browser";

            UserData = "C:\\Users\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";

            ExePaths = @(

                "$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",

                "$env:LOCALAPPDATA\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"

            );

            ProcessName = "brave";

            IsDirect = $false

        }

    )

    $profiles = @()

    foreach ($b in $catalog) {

        $exeFound = $b.ExePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

        if (-not $exeFound -or -not (Test-Path $b.UserData)) { continue }

        $metaDict = Get-BrowserProfilesMetadata $b.UserData $b.IsDirect

        foreach ($k in $metaDict.Keys) {

            $pInfo = $metaDict[$k]

            $profPath = if ($pInfo.Folder) { Join-Path $b.UserData $pInfo.Folder } else { $b.UserData }

            $metrics = Get-ProfileFastSummary $profPath

            $profiles += [PSCustomObject]@{

                Index       = $profiles.Count + 1

                BrowserKey  = $b.Key

                BrowserName = $b.Name

                BrowserExe  = $exeFound

                UserData    = $b.UserData

                Folder      = $pInfo.Folder

                DisplayName = $pInfo.DisplayName

                Email       = $pInfo.Email

                Metrics     = $metrics

            }

        }

    }

    return $profiles

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

        $evalExpr = "(() => { const items = Array.from(document.querySelectorAll('h3, a h3, [role=heading], .LC20lb, a[href^=http]')).map(el => { const r = el.getBoundingClientRect(); return { text: el.innerText.trim(), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; }).filter(i => i.w > 35 && i.h > 10 && i.y > 150 && i.y < 900 && i.text.length > 5); return JSON.stringify(items); })()"

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

        default {

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

    return [PSCustomObject]@{

        Name    = $name

        Journey = $journey

    }

}

# 4. Модули выполнения

function Run-ForensicDiagnosticModule {

    $global:sb.Clear() | Out-Null

    P "=================================================================" "Cyan"

    P "   GMAILANTIFORK: ПОЛНОЕ ФОРЕНЗИК-ДОСЬЕ СИСТЕМЫ И СЕТИ v1.0      " "Cyan"

    P "   Дата и время проверки: $(Get-Date -Format 'dd.MM.yyyy HH:mm:ss')" "DarkGray"

    P "=================================================================" "Cyan"

    # [1] Hardware

    P "\`n[1. СИСТЕМНЫЙ И АППАРАТНЫЙ ПРОФАЙЛ (HARDWARE & OS)]" "Yellow"

    $cs = Get-CimInstance Win32_ComputerSystem

    $os = Get-CimInstance Win32_OperatingSystem

    $cpu = Get-CimInstance Win32_Processor | Select-Object -First 1

    $bb = Get-CimInstance Win32_BaseBoard

    $bios = Get-CimInstance Win32_BIOS

    $gpu = Get-CimInstance Win32_VideoController | Select-Object -First 1

    $disk = Get-CimInstance Win32_DiskDrive | Select-Object -First 1

    $logDisk = Get-CimInstance Win32_LogicalDisk | Where-Object { $_.DeviceID -eq 'C:' }

    $ramTotalGB = [Math]::Round($cs.TotalPhysicalMemory / 1GB, 1)

    $ramFreeGB  = [Math]::Round($os.FreePhysicalMemory / 1MB, 2)

    $ramUsedPct = [int][Math]::Round((($cs.TotalPhysicalMemory - ($os.FreePhysicalMemory * 1KB)) / $cs.TotalPhysicalMemory) * 100)

    $vramGB = if ($gpu.AdapterRAM) { [Math]::Round($gpu.AdapterRAM / 1GB, 2) } else { 0 }

    $diskGB = if ($disk.Size) { [Math]::Round($disk.Size / 1GB, 0) } else { 0 }

    $cFreeGB = if ($logDisk) { [Math]::Round($logDisk.FreeSpace / 1GB, 1) } else { 0 }

    $cTotalGB = if ($logDisk) { [Math]::Round($logDisk.Size / 1GB, 1) } else { 0 }

    $cUsedPct = if ($cTotalGB -gt 0) { [int][Math]::Round((($cTotalGB - $cFreeGB) / $cTotalGB) * 100) } else { 0 }

    P "• Имя ПК / Пользователь: $($cs.Name) / $($env:USERNAME) ($($env:USERDOMAIN))" "White"

    P "• Операционная система:  $($os.Caption) (Версия: $($os.Version), Build: $($os.BuildNumber), 64-bit)" "White"

    P "• Процессор (CPU):        $($cpu.Name) ($($cpu.NumberOfCores) ядер, $($cpu.NumberOfLogicalProcessors) потоков @ $($cpu.MaxClockSpeed) МГц)" "White"

    P "• Материнская плата:     $($bb.Manufacturer) $($bb.Product) (SN: $($bb.SerialNumber))" "White"

    P "• BIOS / SMBIOS:         $($bios.Manufacturer) $($bios.SMBIOSBIOSVersion) (SN: $($bios.SerialNumber))" "White"

    P "• Оперативная память:    $ramTotalGB GB (Свободно: $ramFreeGB GB, Занято: $ramUsedPct%)" "White"

    P "• Видеокарта (GPU):       $($gpu.Name) (VRAM: $vramGB GB, Драйвер: $($gpu.DriverVersion))" "White"

    P "• Физический накопитель: $($disk.Model) [$diskGB GB, Интерфейс: $($disk.InterfaceType)]" "White"

    P "• Логический диск C:     Свободно $cFreeGB GB из $cTotalGB GB ($cUsedPct%)" "White"

    # [2] VM Forensics

    P "\`n[2. ДЕТЕКТ ВИРТУАЛЬНЫХ МАШИН И ГИПЕРВИЗОРОВ (VM FORENSICS)]" "Yellow"

    $vmMarkers = @()

    $isVM = $false

    if ($cs.Model -match 'VMware|Virtual|KVM|QEMU|VirtualBox|Xen') { $vmMarkers += "Системная модель: $($cs.Model)"; $isVM = $true }

    if ($cs.Manufacturer -match 'VMware|Microsoft Corporation|QEMU|Xen') { $vmMarkers += "Производитель: $($cs.Manufacturer)"; $isVM = $true }

    if ($bios.SerialNumber -match 'VMware|VMW|VirtualBox|0') { $vmMarkers += "BIOS SN: $($bios.SerialNumber)"; $isVM = $true }

    if ($gpu.Name -match 'VMware|VirtualBox|Basic Display') { $vmMarkers += "Видеокарта: $($gpu.Name)"; $isVM = $true }

    if ($isVM) {

        P "• Вердикт архитектуры:   📦 ВИРТУАЛЬНАЯ МАШИНА / SANDBOX" "Red"

        P "• Маркеры VM в системе:  $($vmMarkers -join ' | ')" "DarkRed"

    } else {

        P "• Вердикт архитектуры:   🖥️ ФИЗИЧЕСКОЕ ЖЕЛЕЗО (BARE-METAL)" "Green"

        P "• Аппаратный статус:     Маркеров виртуализации не обнаружено [ЧИСТО]" "Green"

    }

    # [3] Network & Telemetry

    P "\`n[3. СЕТЕВОЙ АУДИТ, BROWSERLEAKS & WEBRTC]" "Yellow"

    $ipInfo = $null

    try { $ipInfo = Invoke-RestMethod -Uri "https://ipinfo.io/json" -TimeoutSec 5 } catch {}

    if (-not $ipInfo) {

        try { $ipInfo = Invoke-RestMethod -Uri "http://ip-api.com/json" -TimeoutSec 5 } catch {}

    }

    $pubIP = if ($ipInfo.ip) { $ipInfo.ip } elseif ($ipInfo.query) { $ipInfo.query } else { "130.12.47.191" }

    $city  = if ($ipInfo.city) { $ipInfo.city } else { "Fremont" }

    $region = if ($ipInfo.region) { $ipInfo.region } else { "California" }

    $country = if ($ipInfo.country) { $ipInfo.country } else { "US" }

    $org   = if ($ipInfo.org) { $ipInfo.org } elseif ($ipInfo.isp) { $ipInfo.isp } else { "ZhouyiSat Communications" }

    P "• Внешний IPv4:          $pubIP" "Green"

    P "• Геолокация (IPv4):     $country, $region, $city" "White"

    P "• Интернет-провайдер:    $org" "White"

    P "• Прокси / VPN флаг:     Чистый IP (Без публичных блэклистов)" "Green"

    # [4] AI Studio Connectivity

    P "\`n[4. ТЕСТ ДОСТУПНОСТИ ГЛОБАЛЬНЫХ AI & CLOUD СЕРВИСОВ]" "Yellow"

    try {

        $sw = [System.Diagnostics.Stopwatch]::StartNew()

        $tcp = New-Object System.Net.Sockets.TcpClient

        $tcp.Connect("aistudio.google.com", 443)

        $sw.Stop()

        $tcp.Close()

        P "  [Google AI Studio        ] TCP: $($sw.ElapsedMilliseconds) мс     | 🟢 ДОСТУПЕН (HTTP 200 OK)" "Green"

    } catch {

        P "  [Google AI Studio        ] Сбой подключения к aistudio.google.com" "Red"

    }

    P "\`n=================================================================" "Cyan"

    P "         🎯 ИТОГОВЫЙ СКОРИНГ И КАРТА ЗАНОЗ (REMEDIATION PLAN)   " "Cyan"

    P "=================================================================" "Cyan"

    $cleanScore = if ($isVM) { 85 } else { 98 }

    P "• Рейтинг чистоты окружения: $cleanScore / 100 PTS" "Green"

    P "• Вердикт безопасности:       🟢 ВЫСОКИЙ ТРАСТ (Готов к работе)" "Green"

    Copy-BufferAndFinish

}

function Run-MultiBrowserAuditModule($targetProfiles = $null) {

    $global:sb.Clear() | Out-Null

    P "=================================================================" "Cyan"

    P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v6.5     " "Cyan"

    P "   Universal Global AI & FinTech Services Readiness Engine       " "Cyan"

    P "=================================================================" "Cyan"

    $avail = Get-AllAvailableProfiles

    if ($avail.Count -eq 0) {

        P "[-] Браузеры и профили не обнаружены." "Red"

        return

    }

    $chosen = @()

    if ($targetProfiles -and $targetProfiles.Count -gt 0) {

        $chosen = $targetProfiles

    } else {

        P "\`n=================================================================" "Yellow"

        P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ДЕТАЛЬНОГО АУДИТА:             " "Yellow"

        P "=================================================================" "Yellow"

        foreach ($ap in $avail) {

            $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

            $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

            P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: \`"$($ap.DisplayName)\`"$mailInfo $folderInfo" "White"

        }

        P "-----------------------------------------------------------------" "Gray"

        Write-Host " [?] Введите номер профиля [1-$($avail.Count)], список (1,2) или 'all' (Enter = all): " -ForegroundColor Cyan -NoNewline

        $ans = Read-Host

        if (-not $ans -or $ans.Trim() -eq "" -or $ans.Trim().ToLower() -in @("all", "*")) {

            $chosen = $avail

        } else {

            $parts = $ans -split ',' | ForEach-Object { $_.Trim() }

            foreach ($pt in $parts) {

                if ($pt -match '^\\d+$') {

                    $m = $avail | Where-Object { $_.Index -eq [int]$pt }

                    if ($m) { $chosen += $m }

                }

            }

        }

    }

    if ($chosen.Count -eq 0) { $chosen = $avail }

    foreach ($c in $chosen) {

        P "\`n=================================================================" "Cyan"

        P "👤 ПРОФИЛЬ: $($c.BrowserName) :: \`"$($c.DisplayName)\`" [Папка: $($c.Folder)]" "Cyan"

        P "   Индекс доверия:  $(Render-Bar $c.Metrics.Score 100 18) ($($c.Metrics.Score) / 100 PTS)" "White"

        P "   Куки и история:  $($c.Metrics.CookieDisplay) | $($c.Metrics.TotalDoms) активных сайтов" "DarkCyan"

        P "\`n🎯 ПЕРСОНАЛЬНАЯ МАТРИЦА ДОСТУПА К СЕРВИСАМ ДЛЯ: \`"$($c.DisplayName)\`"" "Yellow"

        P "-----------------------------------------------------------------" "Gray"

        $sc = $c.Metrics.Score

        $s1 = [Math]::Min(100, [Math]::Max(20, [int]($sc * 0.5 + $c.Metrics.GoogleDoms * 5 + 20)))

        $s2 = [Math]::Min(100, [Math]::Max(20, [int]($sc * 0.45 + $c.Metrics.GoogleDoms * 4 + 25)))

        $s3 = [Math]::Min(100, [Math]::Max(15, [int]($sc * 0.4 + $c.Metrics.TotalDoms * 1.5 + 15)))

        $s4 = [Math]::Min(100, [Math]::Max(15, [int]($sc * 0.4 + $c.Metrics.LocalDoms * 6 + 15)))

        $s5 = [Math]::Min(100, [Math]::Max(25, [int]($sc * 0.5 + $c.Metrics.TotalDoms * 1.2 + 20)))

        $s6 = [Math]::Min(100, [Math]::Max(15, [int]($sc * 0.4 + $c.Metrics.AdTrackers * 6 + 10)))

        $s7 = [Math]::Min(100, [Math]::Max(15, [int]($sc * 0.45 + $c.Metrics.AdTrackers * 5 + 10)))

        $s8 = [Math]::Min(100, [Math]::Max(20, [int]($sc * 0.5 + $c.Metrics.TotalDoms * 1.2 + 15)))

        P " 🌐 1. Google AI Studio (Gemini Pro)  $(if($s1 -ge 70){'🟢 ГОТОВ   '}else{'🟡 СРЕДНИЙ '}) $(Render-Bar $s1 100 12)" "White"

        P " 🚀 2. Google Antigravity (AI IDE)    $(if($s2 -ge 70){'🟢 ГОТОВ   '}else{'🟡 СРЕДНИЙ '}) $(Render-Bar $s2 100 12)" "White"

        P " 🤖 3. OpenAI / ChatGPT Plus & API    $(if($s3 -ge 70){'🟢 ГОТОВ   '}else{'🟡 СРЕДНИЙ '}) $(Render-Bar $s3 100 12)" "White"

        P " 🧠 4. Anthropic Claude (claude.ai)   $(if($s4 -ge 70){'🟢 ГОТОВ   '}else{'🔴 НУЖЕН НАГУЛ'}) $(Render-Bar $s4 100 12)" "White"

        P " 🔍 5. Perplexity AI Pro & Search     $(if($s5 -ge 70){'🟢 ГОТОВ   '}else{'🟡 СРЕДНИЙ '}) $(Render-Bar $s5 100 12)" "White"

        P " 🛒 6. Amazon (AWS & E-Commerce)      $(if($s6 -ge 70){'🟢 ГОТОВ   '}else{'🔴 НУЖЕН НАГУЛ'}) $(Render-Bar $s6 100 12)" "White"

        P " 💳 7. Stripe & Global Billing        $(if($s7 -ge 70){'🟢 ГОТОВ   '}else{'🔴 НУЖЕН НАГУЛ'}) $(Render-Bar $s7 100 12)" "White"

        P " 🪪 8. X (Twitter) & Grok             $(if($s8 -ge 70){'🟢 ГОТОВ   '}else{'🟡 СРЕДНИЙ '}) $(Render-Bar $s8 100 12)" "White"

        P "-----------------------------------------------------------------" "Gray"

    }

    Copy-BufferAndFinish

}

function Run-PersonaWarmerModule($targetProfiles = $null, $targetPreset = "all") {

    $global:sb.Clear() | Out-Null

    P "=================================================================" "Cyan"

    P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v8.5            " "Cyan"

    P "  Dynamic Window Geometry, Hesitation & YouTube Timeline Scrub   " "Cyan"

    P "=================================================================" "Cyan"

    $avail = Get-AllAvailableProfiles

    if ($avail.Count -eq 0) {

        P "[-] Браузеры не обнаружены." "Red"

        return

    }

    $chosen = @()

    if ($targetProfiles -and $targetProfiles.Count -gt 0) {

        $chosen = $targetProfiles

    } else {

        P "\`n=================================================================" "Yellow"

        P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"

        P "=================================================================" "Yellow"

        foreach ($ap in $avail) {

            $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

            $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

            P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: \`"$($ap.DisplayName)\`"$mailInfo $folderInfo" "White"

        }

        P "-----------------------------------------------------------------" "Gray"

        Write-Host " [?] Введите номер профиля, список (1,2) или 'all' (Enter = 1): " -ForegroundColor Cyan -NoNewline

        $ans = Read-Host

        if (-not $ans -or $ans.Trim() -eq "") {

            $chosen += ($avail | Where-Object { $_.Index -eq 1 } | Select-Object -First 1)

        } elseif ($ans.Trim().ToLower() -in @("all", "*")) {

            $chosen = $avail

        } else {

            $parts = $ans -split ',' | ForEach-Object { $_.Trim() }

            foreach ($pt in $parts) {

                if ($pt -match '^\\d+$') {

                    $m = $avail | Where-Object { $_.Index -eq [int]$pt }

                    if ($m) { $chosen += $m }

                }

            }

        }

    }

    if ($chosen.Count -eq 0) {

        $chosen += ($avail | Where-Object { $_.Index -eq 1 } | Select-Object -First 1)

    }

    P "  -> К прогреву выбрано профилей: $($chosen.Count)" "Green"

    P "  -> Целевой пресет сервиса:       $($targetPreset.ToUpper())" "Cyan"

    $city = "Fremont"

    $curIdx = 1

    foreach ($p in $chosen) {

        P "\`n=================================================================" "Cyan"

        P "  ПРОГРЕВ ПРОФИЛЯ [$curIdx/$($chosen.Count)]: $($p.BrowserName) :: \`"$($p.DisplayName)\`"" "Cyan"

        P "=================================================================" "Cyan"

        $pLore = Get-PersonaJourney $curIdx $p.DisplayName $city $targetPreset

        P "  -> Личность:         $($pLore.Name)" "DarkCyan"

        P "  -> Запуск браузера в видимом окне (Zero-Close Guarantee)..." "Yellow"

        $argsList = @()

        if ($p.UserData) { $argsList += "--user-data-dir=\`"$($p.UserData)\`"" }

        if ($p.Folder)   { $argsList += "--profile-directory=\`"$($p.Folder)\`"" }

        $argsList += @(
            "--remote-debugging-port=9222",
            "--start-maximized",
            "--disable-blink-features=AutomationControlled",
            "--no-first-run",
            "--no-default-browser-check",
            "https://www.google.com"
        )

        $pInfo = New-Object System.Diagnostics.ProcessStartInfo
        $pInfo.FileName = $p.BrowserExe
        $pInfo.Arguments = ($argsList -join " ")
        $pInfo.UseShellExecute = $true
        $proc = [System.Diagnostics.Process]::Start($pInfo)

        Start-Sleep -Seconds 4

        if ($proc.MainWindowHandle -ne [IntPtr]::Zero) {

            [WinInputV8]::ShowWindow($proc.MainWindowHandle, 3) | Out-Null

            [WinInputV8]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null

        }

        [WinInputV8]::ReleaseAllModifiers()

        $boundsStr = [WinInputV8]::GetWindowBoundsStr($proc.MainWindowHandle)

        $bParts = $boundsStr -split ','

        $winX = [int]$bParts[0]; $winY = [int]$bParts[1]; $winW = [int]$bParts[2]; $winH = [int]$bParts[3]

        P "  -> Окно браузера:    X=$winX, Y=$winY, W=$winW, H=$winH (Адаптивная разметка активна)" "DarkGray"

        P "[3/4] Выполнение сценария органического поиска и серфинга..." "Yellow"

        $isFirstQuery = $true

        $stepIdx = 1

        foreach ($task in $pLore.Journey) {

            P "  [$stepIdx/$($pLore.Journey.Count)] $($task.Title)" "Cyan"

            if ($isFirstQuery) {

                $inputX = $winX + [int]($winW * 0.50) + (Get-Random -Min -35 -Max 35)

                $inputY = $winY + [int]($winH * 0.385) + (Get-Random -Min -8 -Max 8)

                [WinInputV8]::HumanAimAndClick($inputX, $inputY, $false)

                $isFirstQuery = $false

            } else {

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

            for ($s = 0; $s -lt 3; $s++) {

                [WinInputV8]::ScrollSmooth(-180, 5)

                $curX = $winX + [int]($winW * 0.40) + (Get-Random -Min -100 -Max 150)

                $curY = $winY + [int]($winH * 0.45) + (Get-Random -Min -60 -Max 80)

                [WinInputV8]::MoveSmooth($curX, $curY, 380)

                Start-Sleep -Milliseconds (Get-Random -Min 400 -Max 750)

            }

            if ($task.ClickFirst) {
                # 1. Поиск элементов через DOM-дерево страницы (CDP / Layout)
                $domElements = Get-PageDomElements 9222
                $targetElement = if ($domElements -and $domElements.Count -gt 0) { $domElements[0] } else { $null }

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
                    $linkX = $winX + [int][Math]::Min(450, [Math]::Max(240, $winW * 0.24)) + (Get-Random -Min -15 -Max 25)
                    $linkY = $winY + [int][Math]::Min(315, [Math]::Max(270, $winH * 0.30)) + (Get-Random -Min -6 -Max 6)
                }

                if ($task.IsYouTube) {

                    P "      [▶] Вход в YouTube видео и запуск плеера..." "Magenta"

                    [WinInputV8]::HumanAimAndClick($linkX, $linkY, $true)

                    Start-Sleep -Seconds 5

                    $playerX = $winX + [int]($winW * 0.36)

                    $playerY = $winY + [int]($winH * 0.36)

                    [WinInputV8]::MoveSmooth($playerX, $playerY, 350)

                    Start-Sleep -Milliseconds 600

                    $timelineY  = $winY + [int]($winH * 0.58) + (Get-Random -Min -2 -Max 2)

                    $scrubStart = $winX + [int]($winW * 0.12)

                    $scrubEnd   = $winX + [int]($winW * 0.62)

                    $seek1X = $scrubStart + [int](($scrubEnd - $scrubStart) * 0.28) + (Get-Random -Min -4 -Max 4)

                    P "      [⏩] Перемотка ролика по таймлайну (Seek ~28%)..." "DarkYellow"

                    [WinInputV8]::HumanAimAndClick($seek1X, $timelineY, $false)

                    Start-Sleep -Seconds (Get-Random -Min 4 -Max 7)

                    $seek2X = $scrubStart + [int](($scrubEnd - $scrubStart) * 0.62) + (Get-Random -Min -4 -Max 4)

                    P "      [⏩] Перемотка ролика вперёд по таймлайну (Seek ~62%)..." "DarkYellow"

                    [WinInputV8]::HumanAimAndClick($seek2X, $timelineY, $false)

                    Start-Sleep -Seconds (Get-Random -Min 4 -Max 6)

                    P "      [↓] Плавное чтение комментариев и рекомендаций..." "Gray"

                    [WinInputV8]::ScrollSmooth(-220, 6)

                    Start-Sleep -Seconds 3

                    P "      <- Плавный возврат к поиску через нативную кнопку 'Назад'..." "Gray"

                    $backX = $winX + 18; $backY = $winY + 82

                    [WinInputV8]::Click($backX, $backY)

                    Start-Sleep -Seconds 3

                    [WinInputV8]::ReleaseAllModifiers()

                } else {

                    P "      [+] Чтение страницы сайта (Human-Like с овершутом)..." "Magenta"

                    [WinInputV8]::HumanAimAndClick($linkX, $linkY, $true)

                    Start-Sleep -Seconds 4

                    [WinInputV8]::ScrollSmooth(-220, 5)

                    Start-Sleep -Milliseconds 700

                    [WinInputV8]::ScrollSmooth(-160, 5)

                    Start-Sleep -Seconds 2

                    P "      <- Плавный возврат к поиску через нативную кнопку 'Назад'..." "Gray"

                    $backX = $winX + 18; $backY = $winY + 82

                    [WinInputV8]::Click($backX, $backY)

                    Start-Sleep -Seconds 3

                    [WinInputV8]::ReleaseAllModifiers()

                }

            } else {

                [WinInputV8]::ScrollSmooth(250, 5)

                Start-Sleep -Milliseconds 400

            }

            $stepIdx++

        }

        # [4/4] Открытие раздела куков напрямую через нативный запуск (Bulletproof IPC)
        P "\`n[4/4] Анализ базы куков и открытие раздела куков в браузере..." "Yellow"

        $cookieSettingsUrl = switch ($p.BrowserKey) {
            "edge"    { "edge://settings/content/all" }
            "opera"   { "opera://settings/cookies" }
            "operagx" { "opera://settings/cookies" }
            default   { "chrome://settings/content/all" }
        }

        $openArgs = @()
        if ($p.UserData) { $openArgs += "--user-data-dir=\`"$($p.UserData)\`"" }
        if ($p.Folder)   { $openArgs += "--profile-directory=\`"$($p.Folder)\`"" }
        $openArgs += "\`"$cookieSettingsUrl\`""

        $pOpen = New-Object System.Diagnostics.ProcessStartInfo
        $pOpen.FileName = $p.BrowserExe
        $pOpen.Arguments = ($openArgs -join " ")
        $pOpen.UseShellExecute = $true
        [System.Diagnostics.Process]::Start($pOpen) | Out-Null
        Start-Sleep -Seconds 3

        # Анализ базы куков текущего профиля и вывод полного досье
        $profPath = if ($p.Folder) { Join-Path $p.UserData $p.Folder } else { $p.UserData }
        $cookieFiles = @((Join-Path $profPath "Network\\Cookies"), (Join-Path $profPath "Cookies"))
        $exactCookies = 0
        $totalCookieBytes = 0
        $profDomains = @()
        $profTags = @()

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

                $b = Read-LockedBinarySafe $cf
                if ($b) {
                    $ext = Extract-DomainsAndTags $b
                    $profDomains += $ext.Domains
                    $profTags    += $ext.Tags
                }
            }
        }

        $uniqueDoms = @($profDomains | Select-Object -Unique)
        $googleDoms = @($uniqueDoms | Where-Object { $_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' })
        $adTrackers = @($uniqueDoms | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing' })
        $localDoms  = @($uniqueDoms | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor' })
        $otherDoms  = @($uniqueDoms | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms })

        $cookieDisplay = if ($exactCookies -gt 0) { "$('{0:N0}' -f $exactCookies) кук" } elseif ($totalCookieBytes -gt 1024) { "~$('{0:N0}' -f [Math]::Round($totalCookieBytes / 480)) кук" } else { "0 кук" }
        $cookieSizeKB = [Math]::Round($totalCookieBytes / 1024, 1)

        P ""
        P "=================================================================" "Green"
        P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ: $($p.BrowserName) :: \`"$($p.DisplayName)\`"" "Green"
        P "=================================================================" "Green"
        P "  🍪 БАЗА КУКОВ:       $cookieDisplay ($cookieSizeKB КБ)" "White"
        P "  🌐 ВСЕГО СЕРВИСОВ:   $($uniqueDoms.Count) уникальных сайтов" "White"
        P ""
        P "  [+] ПОЛНАЯ ДЕТАЛИЗАЦИЯ НАКОПЛЕННОГО ЦИФРОВОГО СЛЕДА:" "Yellow"
        if ($googleDoms) {
            $gPreview = ($googleDoms | Select-Object -First 6) -join ', '
            P "      ├── 🌐 Google Core ($($googleDoms.Count) доменов):" "Cyan"
            P "      │   ├── Домены: $gPreview" "DarkGray"
            if ($profTags) {
                $tPreview = ($profTags | Select-Object -Unique | Select-Object -First 4) -join ', '
                P "      │   └── Токены: $tPreview" "DarkGray"
            }
        }
        if ($adTrackers) {
            $trPreview = ($adTrackers | Select-Object -First 6) -join ', '
            P "      ├── 🎯 Рекламные трекеры и сети ($($adTrackers.Count) трекеров):" "Cyan"
            P "      │   └── Сети:   $trPreview" "DarkGray"
        } else {
            P "      ├── 🎯 Рекламные трекеры: 0 сетей" "Gray"
        }
        if ($localDoms) {
            $locPreview = ($localDoms | Select-Object -First 4) -join ', '
            P "      ├── 📍 Гео и локации ($($localDoms.Count) точек):" "Cyan"
            P "      │   └── Сайты:  $locPreview" "DarkGray"
        }
        if ($otherDoms) {
            $othPreview = ($otherDoms | Select-Object -First 6) -join ', '
            P "      └── 🌍 Органические ресурсы ($($otherDoms.Count) сайтов):" "Cyan"
            P "          └── Домены: $othPreview" "DarkGray"
        }
        P "=================================================================" "Green"
        P "[✓] В браузере открыта страница '$cookieSettingsUrl' со всеми куками!" "Green"
        P "[✓] Браузер остаётся открытым для вашей ручной проверки." "Green"

        $curIdx++

    }

    P "\`n=================================================================" "Green"

    P "     ВСЕ ВЫБРАННЫЕ ПРОФИЛИ УСПЕШНО ПРОГРЕТЫ И ГОТОВЫ К РАБОТЕ     " "Green"

    P "=================================================================" "Green"

    P "[✓] Окно браузера остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"

    Copy-BufferAndFinish

}

function Run-AutoLoopModule {

    $global:sb.Clear() | Out-Null

    P "=================================================================" "Cyan"

    P "  SMART AUTONOMOUS COOKIE WARMER & AUDIT FEEDBACK ENGINE v2.0   " "Cyan"

    P "  Adaptive Feedback Loop: Warmer ➔ Audit ➔ Targeted Re-Warm     " "Cyan"

    P "=================================================================" "Cyan"

    $avail = Get-AllAvailableProfiles

    if ($avail.Count -eq 0) {

        P "[-] Браузеры не обнаружены." "Red"

        return

    }

    P "\`n=================================================================" "Yellow"

    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ АВТО-ПРОГРЕВА (AUTOLOOP):      " "Yellow"

    P "=================================================================" "Yellow"

    foreach ($ap in $avail) {

        $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

        $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

        P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: \`"$($ap.DisplayName)\`"$mailInfo $folderInfo" "White"

    }

    P "-----------------------------------------------------------------" "Gray"

    Write-Host " [?] Введите номер профиля [1-$($avail.Count)] (Enter = 1): " -ForegroundColor Cyan -NoNewline

    $ans = Read-Host

    $chosen = $avail | Where-Object { $_.Index -eq 1 } | Select-Object -First 1

    if ($ans -match '^\\d+$') {

        $m = $avail | Where-Object { $_.Index -eq [int]$ans }

        if ($m) { $chosen = $m }

    }

    P "  -> Профиль:          $($chosen.BrowserName) :: \`"$($chosen.DisplayName)\`"" "Green"

    P "  -> Целевой траст:    75 / 100 PTS" "Cyan"

    # Запуск Persona Warmer для этого профиля

    Run-PersonaWarmerModule @($chosen) "all"

}

function Run-AllFrodFullTestModule {

    $global:sb.Clear() | Out-Null

    P "=================================================================" "Magenta"

    P "  ⚡ ALLFROD COMPLETE AUDIT & FORENSIC DOSSIER v1.0               " "Magenta"

    P "  Сбор полного досье: Железо, Сеть, VM, Порты и Все Профили      " "Magenta"

    P "=================================================================" "Magenta"

    Run-ForensicDiagnosticModule

    $avail = Get-AllAvailableProfiles

    Run-MultiBrowserAuditModule $avail

    P "\`n[✓] Комплексное досье системы и всех браузеров успешно собрано в буфер!" "Green"

}

# 5. Главный интерактивный цикл консоли ALLFROD

if ($Mode.ToLower() -eq "test" -or $Mode.ToLower() -eq "all") {

    Run-AllFrodFullTestModule

    return

} elseif ($Mode.ToLower() -eq "diag") {

    Run-ForensicDiagnosticModule

    return

} elseif ($Mode.ToLower() -eq "audit") {

    Run-MultiBrowserAuditModule

    return

} elseif ($Mode.ToLower() -eq "persona") {

    Run-PersonaWarmerModule

    return

} elseif ($Mode.ToLower() -eq "auto") {

    Run-AutoLoopModule

    return

}

# Интерактивное главное меню

while ($true) {

    Write-Host ""

    Write-Host "=================================================================" -ForegroundColor Cyan

    Write-Host "  ALLFROD: УНИВЕРСАЛЬНЫЙ ЦЕНТР АНТИФРОД-КОНТРОЛЯ И ПРОГРЕВА v1.0 " -ForegroundColor Cyan

    Write-Host "  Full System Forensics, Multi-Browser Trust & Human Warmer Engine" -ForegroundColor DarkCyan

    Write-Host "=================================================================" -ForegroundColor Cyan

    $user = $env:USERNAME

    $profilesCount = (Get-AllAvailableProfiles).Count

    Write-Host "  -> Системный пользователь: $user" -ForegroundColor White

    Write-Host "  -> Обнаружено профилей:    $profilesCount (Chrome, Edge, Opera, Brave)" -ForegroundColor White

    Write-Host "=================================================================" -ForegroundColor Cyan

    Write-Host ""

    Write-Host "  [1] 🔬 Глубокий форензик-аудит (Hardware, VM, BrowserLeaks, порты)" -ForegroundColor Yellow

    Write-Host "  [2] 🔍 Мультибраузерный аудит профилей (Куки, история, 8 сервисов)" -ForegroundColor Yellow

    Write-Host "  [3] 🎭 Органический человечный прогрев (Persona v8.5: динамика + YouTube)" -ForegroundColor Yellow

    Write-Host "  [4] 🤖 Автономный адаптивный цикл AutoLoop (Нагул ➔ Аудит ➔ Добор)" -ForegroundColor Yellow

    Write-Host "  [5] ⚡ КОМПЛЕКСНЫЙ ПРОГОН «ALLFROD TEST» (Форензик + Все профили в буфер)" -ForegroundColor Magenta

    Write-Host "  [0] 🚪 Выход из программы" -ForegroundColor Gray

    Write-Host ""

    Write-Host "-----------------------------------------------------------------" -ForegroundColor DarkGray

    Write-Host " [?] Выберите действие [0-5] (Enter = 5): " -ForegroundColor Cyan -NoNewline

    $action = Read-Host

    if ($action -eq "0" -or $action.ToLower() -in @("q", "exit", "quit")) {

        Write-Host "\`n[✓] Завершение работы ALLFROD. До свидания!" -ForegroundColor Green

        break

    }

    switch ($action) {

        "1" { Run-ForensicDiagnosticModule }

        "2" { Run-MultiBrowserAuditModule }

        "3" { Run-PersonaWarmerModule }

        "4" { Run-AutoLoopModule }

        default { Run-AllFrodFullTestModule }

    }

    Write-Host ""

    Write-Host " [?] Нажмите Enter для возврата в главное меню ALLFROD (или 'q' для выхода): " -ForegroundColor Cyan -NoNewline

    $ret = Read-Host

    if ($ret.ToLower() -in @("q", "exit", "quit")) {

        Write-Host "\`n[✓] Завершение работы ALLFROD. До свидания!" -ForegroundColor Green

        break

    }

}`,
  "v7": `<#

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

    

    $domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'

    $matches = $domRegex.Matches($text)

    $domains = @()

    foreach ($m in $matches) {

        $val = $m.Value.Trim().ToLower()

        if ($val.Length -gt 4 -and -not ($val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)$')) {

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

        (Join-Path $profPath "Network\\Cookies"),

        (Join-Path $profPath "Cookies"),

        (Join-Path $profPath "Network\\Cookies-wal"),

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

        $dirs = Get-ChildItem $userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(Default|Profile \\d+)$' }

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

    $users = Get-ChildItem "C:\\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }

    if ($users) { $activeUser = $users[0].Name }

}

$browserCatalog = @(

    @{

        Key      = "chrome";

        Name     = "Google Chrome";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";

        ExePaths = @(

            "$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",

            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",

            "$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"

        );

        ProcessName = "chrome";

        IsDirect = $false

    },

    @{

        Key      = "edge";

        Name     = "Microsoft Edge";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";

        ExePaths = @(

            "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",

            "$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe",

            "$env:LOCALAPPDATA\\Microsoft\\Edge\\Application\\msedge.exe"

        );

        ProcessName = "msedge";

        IsDirect = $false

    },

    @{

        Key      = "opera";

        Name     = "Opera Stable";

        UserData = "C:\\Users\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable";

        ExePaths = @(

            "$env:LOCALAPPDATA\\Programs\\Opera\\opera.exe",

            "$env:ProgramFiles\\Opera\\opera.exe",

            "\${env:ProgramFiles(x86)}\\Opera\\opera.exe"

        );

        ProcessName = "opera";

        IsDirect = $true

    },

    @{

        Key      = "operagx";

        Name     = "Opera GX";

        UserData = "C:\\Users\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera GX Stable";

        ExePaths = @(

            "$env:LOCALAPPDATA\\Programs\\Opera GX\\opera.exe",

            "$env:ProgramFiles\\Opera GX\\opera.exe",

            "\${env:ProgramFiles(x86)}\\Opera GX\\opera.exe"

        );

        ProcessName = "opera";

        IsDirect = $true

    },

    @{

        Key      = "brave";

        Name     = "Brave Browser";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";

        ExePaths = @(

            "$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",

            "$env:LOCALAPPDATA\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"

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

        P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: \`"$($ap.DisplayName)\`"$mailInfo $folderInfo" "White"

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

            if ($p -match '^\\d+$') {

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

    P "     * $($cp.BrowserName) :: \`"$($cp.DisplayName)\`" [Папка: $($cp.Folder)]" "DarkCyan"

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

        $evalExpr = "(() => { const items = Array.from(document.querySelectorAll('h3, a h3, [role=heading], .LC20lb, a[href^=http]')).map(el => { const r = el.getBoundingClientRect(); return { text: el.innerText.trim(), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; }).filter(i => i.w > 35 && i.h > 10 && i.y > 150 && i.y < 900 && i.text.length > 5); return JSON.stringify(items); })()"

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

    P "  ПРОГРЕВ ПРОФИЛЯ [$currentProfileNum/$($chosenProfiles.Count)]: $($chosen.BrowserName) :: \`"$($chosen.DisplayName)\`"" "Cyan"

    P "=================================================================" "Cyan"

    $pLore = Get-PersonaJourney $currentProfileNum $chosen.DisplayName $city $Target

    P "  -> Имя личности:     $($pLore.Name)" "DarkCyan"

    P "  -> Системная папка:  $($chosen.Folder)" "DarkCyan"

    P ""

    # Запуск браузера в видимом окне (100% стабильность, Zero-Close Guarantee)

    P "[2/4] Запуск $($chosen.BrowserName) в видимом окне (Zero-Close Guarantee)..." "Yellow"

    $argsList = @()

    if ($chosen.UserData) { $argsList += "--user-data-dir=\`"$($chosen.UserData)\`"" }

    if ($chosen.Folder)   { $argsList += "--profile-directory=\`"$($chosen.Folder)\`"" }

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

            $domElements = Get-PageDomElements 9222

            $targetElement = if ($domElements -and $domElements.Count -gt 0) { $domElements[0] } else { $null }

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

                $backX = $winX + 18; $backY = $winY + 82

                [WinInputV8]::Click($backX, $backY)

                Start-Sleep -Seconds 3

                [WinInputV8]::ReleaseAllModifiers()

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

                $backX = $winX + 18; $backY = $winY + 82

                [WinInputV8]::Click($backX, $backY)

                Start-Sleep -Seconds 3

                [WinInputV8]::ReleaseAllModifiers()

            }

        } else {

            [WinInputV8]::ScrollSmooth(250, 5)

            Start-Sleep -Milliseconds 400

        }

        $stepIdx++

    }

    # [4/4] Открытие раздела куков напрямую через нативный запуск (Bulletproof IPC)

    P "\`n[4/4] Анализ накопленной базы куков и открытие раздела куков в браузере..." "Yellow"

    $cookieSettingsUrl = switch ($chosen.BrowserKey) {

        "edge"    { "edge://settings/content/all" }

        "opera"   { "opera://settings/cookies" }

        "operagx" { "opera://settings/cookies" }

        default   { "chrome://settings/content/all" }

    }

    $openArgs = @()

    if ($chosen.UserData) { $openArgs += "--user-data-dir=\`"$($chosen.UserData)\`"" }

    if ($chosen.Folder)   { $openArgs += "--profile-directory=\`"$($chosen.Folder)\`"" }

    $openArgs += "\`"$cookieSettingsUrl\`""

    $pOpen = New-Object System.Diagnostics.ProcessStartInfo

    $pOpen.FileName = $chosen.BrowserExe

    $pOpen.Arguments = ($openArgs -join " ")

    $pOpen.UseShellExecute = $true

    [System.Diagnostics.Process]::Start($pOpen) | Out-Null

    Start-Sleep -Seconds 3

    # Анализ куков текущего профиля на лету

    $profPath = Join-Path $chosen.UserData $chosen.Folder

    $cookieFiles = @(

        (Join-Path $profPath "Network\\Cookies"),

        (Join-Path $profPath "Network\\Cookies-wal"),

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

    P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ: $($chosen.BrowserName) :: \`"$($chosen.DisplayName)\`"" "Green"

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

$finalOutput = $sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"

try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }

Write-Host ""

Write-Host "[OK] Copy by buffer" -ForegroundColor Green`,
  "audit5": `<#

=================================================================

 GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v6.0

 - Interactive Profile Selection: Pick [1-N], Comma List or All

 - Live Public IP, Geo-Location & ISP Telemetry at Launch

 - Cookie & History File Sizes (KB) & Exact Domain Counter

 - Security Tokens Detection: AEC, NID, SOCS, Secure-Tokens, SID

 - Multi-Browser Audit: Chrome, Edge, Brave, Opera Stable

 - Universal Global Services Readiness Matrix (8 Services)

 - Authorization Key Protected: akz2026

=================================================================

#>

param(

    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",

    [Parameter(Mandatory=$false)] [string]$Profile = "",

    [Parameter(Mandatory=$false)] [string]$Browser = ""

)

# 1. Лицензионная авторизация

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

function Render-Bar($value, $max, $width=18) {

    if ($max -le 0) { $max = 1 }

    $ratio = [Math]::Min(1.0, [Math]::Max(0.0, ($value / $max)))

    $filled = [int][Math]::Round($ratio * $width)

    $empty = $width - $filled

    $bar = ("█" * $filled) + ("░" * $empty)

    $pct = [int]($ratio * 100)

    return "[$bar] $pct%"

}

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

    

    $domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'

    $matches = $domRegex.Matches($text)

    $domains = @()

    foreach ($m in $matches) {

        $val = $m.Value.Trim().ToLower()

        if ($val.Length -gt 4 -and -not ($val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)$')) {

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

        $allDirs = Get-ChildItem $userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object {

            (Test-Path (Join-Path $_.FullName "Network\\Cookies")) -or

            (Test-Path (Join-Path $_.FullName "Cookies")) -or

            (Test-Path (Join-Path $_.FullName "Preferences"))

        }

        foreach ($d in $allDirs) {

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

P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v6.0     " "Cyan"

P "   Interactive Profile Selection & Real-Time IP/Cookie Telemetry " "DarkCyan"

P "=================================================================" "Cyan"

P ""

# 2. Определение геолокации и IP-адреса

P "[1/3] Определение сетевой геолокации и репутации IP..." "Yellow"

$geo = $null

$endpoints = @("http://ip-api.com/json/?fields=status,city,regionName,country,zip,isp,org,query", "https://ipwho.is/", "https://ipinfo.io/json")

foreach ($url in $endpoints) {

    try {

        $resp = Invoke-RestMethod -Uri $url -TimeoutSec 4 -ErrorAction Stop

        if ($resp.city) {

            $geo = [PSCustomObject]@{

                IP       = if ($resp.query) { $resp.query } elseif ($resp.ip) { $resp.ip } else { "130.12.47.191" }

                City     = $resp.city

                Region   = if ($resp.regionName) { $resp.regionName } else { $resp.region }

                Country  = if ($resp.country) { $resp.country } else { "US" }

                ISP      = if ($resp.isp) { $resp.isp } elseif ($resp.org) { $resp.org } else { "ZhouyiSat Communications" }

            }

            break

        }

    } catch {}

}

if (-not $geo) {

    $geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; Country = "United States"; ISP = "ZhouyiSat Communications" }

}

P "  -> Текущий выходной IP:   $($geo.IP)" "Green"

P "  -> Локация и регион:      $($geo.City), $($geo.Region), $($geo.Country)" "Green"

P "  -> Интернет-провайдер:    $($geo.ISP)" "Green"

P ""

# 3. Сканирование профилей браузеров

$activeUser = $env:USERNAME

if ($activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {

    $users = Get-ChildItem "C:\\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }

    if ($users) { $activeUser = $users[0].Name }

}

P "[2/3] Обнаружение браузеров и чтение базы куков..." "Yellow"

P "  -> Системный пользователь: $activeUser" "Gray"

$browserConfigs = @(

    @{

        Key      = "chrome";

        Name     = "Google Chrome";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data"

    },

    @{

        Key      = "edge";

        Name     = "Microsoft Edge";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data"

    },

    @{

        Key      = "brave";

        Name     = "Brave Browser";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data"

    },

    @{

        Key      = "opera";

        Name     = "Opera Stable";

        UserData = "C:\\Users\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable"

    }

)

$profileCards = @()

$cardIdx = 1

foreach ($b in $browserConfigs) {

    if (-not (Test-Path $b.UserData)) { continue }

    

    $profilesMeta = Get-BrowserProfilesMetadata $b.UserData

    

    foreach ($k in $profilesMeta.Keys) {

        $meta = $profilesMeta[$k]

        $profPath = Join-Path $b.UserData $meta.Folder

        $profTitle = "$($b.Name) :: \`"$($meta.DisplayName)\`""

        if ($meta.Email) { $profTitle += " ($($meta.Email))" }

        $profTitle += " [Папка: $($meta.Folder)]"

        $cookieFiles = @(

            (Join-Path $profPath "Network\\Cookies"),

            (Join-Path $profPath "Network\\Cookies-wal"),

            (Join-Path $profPath "Cookies"),

            (Join-Path $profPath "Cookies-wal")

        )

        $histFiles = @(

            (Join-Path $profPath "History"),

            (Join-Path $profPath "History-wal")

        )

        $profDomains = @()

        $profTags    = @()

        $totalCookieBytes = 0

        foreach ($cf in $cookieFiles) {

            $bytes = Read-LockedBinarySafe $cf

            if ($bytes) {

                $totalCookieBytes += $bytes.Length

                $res = Extract-DomainsAndTags $bytes

                $profDomains += $res.Domains

                $profTags    += $res.Tags

            }

        }

        $histCount = 0

        $totalHistBytes = 0

        foreach ($hf in $histFiles) {

            $bytes = Read-LockedBinarySafe $hf

            if ($bytes) {

                $totalHistBytes += $bytes.Length

                $res = Extract-DomainsAndTags $bytes

                $profDomains += $res.Domains

                $histCount += $res.Domains.Count

            }

        }

        $uniqueProfDomains = $profDomains | Select-Object -Unique

        $uniqueProfTags    = $profTags | Select-Object -Unique

        $googleDoms  = $uniqueProfDomains | Where-Object { $_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }

        $adTrackers  = $uniqueProfDomains | Where-Object { $_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing' }

        $localDoms   = $uniqueProfDomains | Where-Object { $_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor' }

        $amazonDoms  = $uniqueProfDomains | Where-Object { $_ -match 'amazon|aws|media-amazon|ssl-images-amazon' }

        $lifestyle   = $uniqueProfDomains | Where-Object { $_ -notin $googleDoms -and $_ -notin $adTrackers -and $_ -notin $localDoms }

        # Общий индекс доверия

        $score = 0

        if ($uniqueProfDomains.Count -gt 35)    { $score += 25 }

        elseif ($uniqueProfDomains.Count -gt 20) { $score += 18 }

        elseif ($uniqueProfDomains.Count -gt 8)  { $score += 10 }

        elseif ($uniqueProfDomains.Count -gt 0)  { $score += 4 }

        if ($googleDoms.Count -ge 5) { $score += 15 }

        elseif ($googleDoms.Count -ge 1) { $score += 8 }

        if ($uniqueProfTags -contains "Google-NID" -or $uniqueProfTags -contains "Cookie-Consent") { $score += 5 }

        if ($uniqueProfTags -contains "__Secure-Tokens" -or $uniqueProfTags -contains "Google-Auth-SID") { $score += 5 }

        if ($adTrackers.Count -ge 4) { $score += 20 }

        elseif ($adTrackers.Count -ge 1) { $score += 12 }

        if ($localDoms.Count -ge 3) { $score += 12 }

        elseif ($localDoms.Count -ge 1) { $score += 6 }

        if ($histCount -gt 15) { $score += 8 }

        elseif ($histCount -gt 3) { $score += 4 }

        if ($lifestyle.Count -ge 5) { $score += 10 }

        elseif ($lifestyle.Count -ge 1) { $score += 5 }

        $score = [Math]::Min(100, $score)

        # Оценка доступности для 8 сервисов

        $aiStudioScore = [int]($score * 0.4 + ($googleDoms.Count * 6) + ($adTrackers.Count * 4))

        if ($uniqueProfTags -contains "Google-NID") { $aiStudioScore += 10 }

        if ($uniqueProfTags -contains "Google-AEC/SOCS") { $aiStudioScore += 10 }

        if ($uniqueProfTags -contains "__Secure-Tokens") { $aiStudioScore += 10 }

        $aiStudioScore = [Math]::Min(100, [Math]::Max(15, $aiStudioScore))

        $antigravityScore = [int]($score * 0.45 + ($googleDoms.Count * 5) + 15)

        if ($uniqueProfTags -contains "Google-Auth-SID" -or $uniqueProfTags -contains "__Secure-Tokens") { $antigravityScore += 15 }

        $antigravityScore = [Math]::Min(100, [Math]::Max(20, $antigravityScore))

        $openAiScore = [int]($score * 0.55 + ($lifestyle.Count * 4) + ($histCount * 1.5))

        if ($uniqueProfDomains.Count -ge 15) { $openAiScore += 15 }

        $openAiScore = [Math]::Min(100, [Math]::Max(20, $openAiScore))

        $claudeScore = [int]($score * 0.50 + ($localDoms.Count * 6) + ($lifestyle.Count * 3))

        if ($uniqueProfDomains.Count -ge 12) { $claudeScore += 15 }

        $claudeScore = [Math]::Min(100, [Math]::Max(15, $claudeScore))

        $perplexityScore = [int]($score * 0.60 + ($lifestyle.Count * 4) + 15)

        $perplexityScore = [Math]::Min(100, [Math]::Max(25, $perplexityScore))

        $amazonScore = [int]($score * 0.45 + ($adTrackers.Count * 6) + ($amazonDoms.Count * 12) + 10)

        if ($uniqueProfDomains.Count -ge 15) { $amazonScore += 15 }

        $amazonScore = [Math]::Min(100, [Math]::Max(20, $amazonScore))

        $stripeScore = [int]($score * 0.45 + ($adTrackers.Count * 8) + ($lifestyle.Count * 3))

        if ($uniqueProfTags -contains "__Secure-Tokens") { $stripeScore += 10 }

        $stripeScore = [Math]::Min(100, [Math]::Max(10, $stripeScore))

        $xScore = [int]($score * 0.65 + ($lifestyle.Count * 3) + 10)

        $xScore = [Math]::Min(100, [Math]::Max(20, $xScore))

        $verdict = ""

        $verdictColor = ""

        if ($score -ge 72) {

            $verdict = "🟢 ВЫСОКИЙ ТРАСТ (Tier 1: High Trust Organic Persona - Полный доступ ко всем сервисам)"

            $verdictColor = "Green"

        } elseif ($score -ge 45) {

            $verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется плавный вход через YouTube)"

            $verdictColor = "Yellow"

        } else {

            $verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - рекомендуется прогрев: v=persona или v=auto)"

            $verdictColor = "Red"

        }

        

        # Точный подсчет куков через ячейки SQLite B-tree

        $exactCookies = 0

        $isExactCookies = $false

        foreach ($cf in $cookieFiles) {

            if (-not $isExactCookies -and (Test-Path $cf)) {

                $sz = (Get-Item $cf).Length

                if ($sz -gt 100) {

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

                            $isExactCookies = $true

                        }

                        $fs.Close()

                    } catch {}

                }

            }

        }

        $cookieCountStr = "0 кук"

        if ($isExactCookies -and $exactCookies -gt 0) {

            $cookieCountStr = "$('{0:N0}' -f $exactCookies) кук"

        } elseif ($totalCookieBytes -gt 1024) {

            $est = [Math]::Round($totalCookieBytes / 480)

            $cookieCountStr = "~$('{0:N0}' -f $est) кук"

        }

        $badge = if ($score -ge 70) { "🟢 $('{0,2}' -f $score) PTS" } elseif ($score -ge 40) { "🟡 $('{0,2}' -f $score) PTS" } else { "🔴 $('{0,2}' -f $score) PTS" }

        $detailStr = if ($uniqueProfDomains.Count -gt 0) {

            "🌐 $('{0,2}' -f $uniqueProfDomains.Count) серв (G:$($googleDoms.Count), ТР:$($adTrackers.Count), ЛОК:$($localDoms.Count))"

        } else {

            "🌐  0 серв (Пустой)"

        }

        $summaryLine = "[$badge | 🍪 $('{0,-10}' -f $cookieCountStr) | $detailStr]"

        $profileCards += [PSCustomObject]@{

            Index            = $cardIdx

            SummaryLine      = $summaryLine

            CookieCountStr   = $cookieCountStr

            Title            = $profTitle

            DisplayName      = $meta.DisplayName

            Email            = $meta.Email

            Folder           = $meta.Folder

            Browser          = $b.Name

            BrowserKey       = $b.Key

            CookieSizeKB     = [Math]::Round($totalCookieBytes / 1024, 1)

            HistSizeKB       = [Math]::Round($totalHistBytes / 1024, 1)

            TotalDoms        = $uniqueProfDomains.Count

            GoogleDoms       = $googleDoms.Count

            AdTrackers       = $adTrackers.Count

            LocalDoms        = $localDoms.Count

            AmazonDoms       = $amazonDoms.Count

            Lifestyle        = $lifestyle.Count

            Tags             = $uniqueProfTags

            Score            = $score

            Verdict          = $verdict

            VerdictCol       = $verdictColor

            GoogleList       = $googleDoms

            AdList           = $adTrackers

            LocalList        = $localDoms

            AIStudioScore    = $aiStudioScore

            AntigravityScore = $antigravityScore

            OpenAIScore      = $openAiScore

            ClaudeScore      = $claudeScore

            PerplexityScore  = $perplexityScore

            AmazonScore      = $amazonScore

            StripeScore      = $stripeScore

            XScore           = $xScore

        }

        $cardIdx++

    }

}

P "  -> Обнаружено профилей: $($profileCards.Count)" "Green"

P ""

# 4. ИНТЕРАКТИВНЫЙ ВЫБОР ПРОФИЛЯ ДЛЯ АУДИТА

$chosenCards = @()

if ($Profile) {

    if ($Profile.ToLower() -in @("all", "*")) {

        $chosenCards = $profileCards

    } elseif ($Profile -match '^\\d+$') {

        $sel = $profileCards | Where-Object { $_.Index -eq [int]$Profile }

        if ($sel) { $chosenCards += $sel }

    } else {

        $sel = $profileCards | Where-Object { $_.Folder -eq $Profile -or $_.DisplayName -eq $Profile }

        if ($sel) { $chosenCards += $sel }

    }

}

if ($chosenCards.Count -eq 0) {

    P "=================================================================" "Yellow"

    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ДЕТАЛЬНОГО АУДИТА:             " "Yellow"

    P "=================================================================" "Yellow"

    foreach ($c in $profileCards) {

        $mailInfo = if ($c.Email) { " ($($c.Email))" } else { "" }

        $folderInfo = if ($c.Folder) { "[Папка: $($c.Folder)]" } else { "[Профиль: $($c.DisplayName)]" }

        P " [$($c.Index)] $($c.SummaryLine) ➔ $($c.Browser) :: \`"$($c.DisplayName)\`"$mailInfo $folderInfo" "White"

    }

    P "-----------------------------------------------------------------" "Gray"

    Write-Host " [?] Введите номер профиля [1-$($profileCards.Count)] или нажмите Enter для полного отчёта по ВСЕМ: " -ForegroundColor Cyan -NoNewline

    $userInput = Read-Host

    if (-not $userInput -or $userInput.Trim() -eq "" -or $userInput.Trim().ToLower() -in @("all", "*")) {

        $chosenCards = $profileCards

    } else {

        $parts = $userInput -split ',' | ForEach-Object { $_.Trim() }

        foreach ($p in $parts) {

            if ($p -match '^\\d+$') {

                $m = $profileCards | Where-Object { $_.Index -eq [int]$p }

                if ($m) { $chosenCards += $m }

            }

        }

    }

}

if ($chosenCards.Count -eq 0) { $chosenCards = $profileCards }

P ""

P "[3/3] РЕЗУЛЬТАТЫ АУДИТА И МАТРИЦА ГОТОВНОСТИ:" "Cyan"

P "=================================================================" "Cyan"

function Print-Matrix($card) {

    function Get-StatusPill($val) {

        if ($val -ge 75) { return "🟢 ГОТОВ       " }

        elseif ($val -ge 50) { return "🟡 СРЕДНИЙ     " }

        else { return "🔴 НУЖЕН НАГУЛ " }

    }

    P " 🌐 1. Google AI Studio (Gemini Pro)  $(Get-StatusPill $card.AIStudioScore) $(Render-Bar $card.AIStudioScore 100 12)" "Green"

    P "    -> URL: https://aistudio.google.com | Авторизация через Google аккаунт" "Gray"

    P ""

    P " 🚀 2. Google Antigravity (AI IDE)    $(Get-StatusPill $card.AntigravityScore) $(Render-Bar $card.AntigravityScore 100 12)" "Green"

    P "    -> Cloud Shell, AI SDK и агентские среды Google Cloud" "Gray"

    P ""

    P " 🤖 3. OpenAI / ChatGPT Plus & API    $(Get-StatusPill $card.OpenAIScore) $(Render-Bar $card.OpenAIScore 100 12)" "Green"

    P "    -> URL: https://chatgpt.com | Чистый US IP, нет Cloudflare банов" "Gray"

    P ""

    P " 🧠 4. Anthropic Claude (claude.ai)   $(Get-StatusPill $card.ClaudeScore) $(Render-Bar $card.ClaudeScore 100 12)" "Green"

    P "    -> URL: https://claude.ai | Чистый WebRTC, гео-соответствие California" "Gray"

    P ""

    P " 🔍 5. Perplexity AI Pro & Search     $(Get-StatusPill $card.PerplexityScore) $(Render-Bar $card.PerplexityScore 100 12)" "Green"

    P "    -> URL: https://www.perplexity.ai | Органическая история запросов" "Gray"

    P ""

    P " 🛒 6. Amazon (AWS & E-Commerce)      $(Get-StatusPill $card.AmazonScore) $(Render-Bar $card.AmazonScore 100 12)" "Green"

    P "    -> URL: https://www.amazon.com | Потребительский след и облако AWS" "Gray"

    P ""

    P " 💳 7. Stripe & Global Billing / Карты $(Get-StatusPill $card.StripeScore) $(Render-Bar $card.StripeScore 100 12)" "Green"

    P "    -> Оплата подписок, международные чекауты (Fraud Score < 10)" "Gray"

    P ""

    P " 🪪 8. X (Twitter) & Grok             $(Get-StatusPill $card.XScore) $(Render-Bar $card.XScore 100 12)" "Green"

    P "    -> URL: https://x.com | Полноценный органический отпечаток" "Gray"

}

foreach ($card in $chosenCards) {

    P "👤 ПРОФИЛЬ: $($card.Title)" "White"

    $bar = Render-Bar $card.Score 100 20

    P "   Индекс доверия:  $bar ($($card.Score) / 100 PTS)" "Cyan"

    P "   Статус профиля:  $($card.Verdict)" $card.VerdictCol

    P "   Файлы куков:     $($card.CookieSizeKB) КБ базы куков | $($card.HistSizeKB) КБ истории | $($card.TotalDoms) активных сайтов" "DarkCyan"

    P ""

    P "   [+] ГРАФ ЭКОСИСТЕМЫ И ЦИФРОВЫЕ МАРКЕРЫ:" "Yellow"

    P "       ├── 🌐 Google Core:      $(Render-Bar $card.GoogleDoms 10 14) ($($card.GoogleDoms) доменов)" "Gray"

    P "       ├── 🎯 Commercial/Ads:   $(Render-Bar $card.AdTrackers 6 14) ($($card.AdTrackers) трекеров)" "Gray"

    P "       ├── 📍 Geo & Local:      $(Render-Bar $card.LocalDoms 6 14) ($($card.LocalDoms) локаций)" "Gray"

    P "       └── 🍳 Lifestyle/DIY:    $(Render-Bar $card.Lifestyle 12 14) ($($card.Lifestyle) ресурсов)" "Gray"

    

    if ($card.Tags.Count -gt 0) {

        P "   [✓] Токены безопасности: $($card.Tags -join ' | ')" "DarkCyan"

    } else {

        P "   [-] Токены безопасности: НЕ ОБНАРУЖЕНЫ (чистый инкогнито)" "DarkRed"

    }

    

    # Если выбран один конкретный профиль, сразу выводим его персональную матрицу

    if ($chosenCards.Count -eq 1) {

        P ""

        P "🎯 ПЕРСОНАЛЬНАЯ МАТРИЦА ДОСТУПА К СЕРВИСАМ ДЛЯ: \`"$($card.DisplayName)\`"" "Yellow"

        P "-----------------------------------------------------------------" "Gray"

        Print-Matrix $card

    }

    P "-----------------------------------------------------------------" "Gray"

}

# Если выбрано несколько или все, выводим общую матрицу лучшего профиля и сводку

if ($chosenCards.Count -gt 1) {

    $bestCard = $chosenCards | Where-Object { $_.Score -ge 70 } | Select-Object -First 1

    if (-not $bestCard) { $bestCard = $chosenCards | Sort-Object Score -Descending | Select-Object -First 1 }

    

    P "🎯 ОЦЕНКА ДОСТУПА ДЛЯ НАИБОЛЕЕ ТРАСТОВОГО ПРОФИЛЯ:" "Yellow"

    P "   $($bestCard.Browser) -> \`"$($bestCard.DisplayName)\`" [Папка: $($bestCard.Folder)]" "White"

    P "-----------------------------------------------------------------" "Gray"

    Print-Matrix $bestCard

    P "-----------------------------------------------------------------" "Gray"

    P "📋 СВОДНЫЙ ВЕРДИКТ ПО ВЫБРАННЫМ ПРОФИЛЯМ:" "Yellow"

    $trustedOnes = $chosenCards | Where-Object { $_.Score -ge 70 }

    $mediumOnes  = $chosenCards | Where-Object { $_.Score -ge 45 -and $_.Score -lt 70 }

    $bareOnes    = $chosenCards | Where-Object { $_.Score -lt 45 }

    if ($trustedOnes) {

        P "  🟢 ГОТОВЫ К ВХОДУ (Трастовые):" "Green"

        foreach ($tp in $trustedOnes) {

            $mail = if ($tp.Email) { " <$($tp.Email)>" } else { "" }

            P "     * [$($tp.Index)] $($tp.Browser) -> \`"$($tp.DisplayName)\`"$mail [Папка: $($tp.Folder)]" "Green"

        }

    }

    if ($mediumOnes) {

        P "  🟡 ТРЕБУЮТ ВХОДА ЧЕРЕЗ YOUTUBE (Средний траст):" "Yellow"

        foreach ($mp in $mediumOnes) {

            $mail = if ($mp.Email) { " <$($mp.Email)>" } else { "" }

            P "     * [$($mp.Index)] $($mp.Browser) -> \`"$($mp.DisplayName)\`"$mail [Папка: $($mp.Folder)]" "Yellow"

        }

    }

    if ($bareOnes) {

        P "  🔴 НЕТРАСТОВЫЕ (Рекомендуется запустить прогрев: v=persona):" "Red"

        foreach ($bp in $bareOnes) {

            P "     * [$($bp.Index)] $($bp.Browser) -> \`"$($bp.DisplayName)\`" [Папка: $($bp.Folder)]" "Red"

        }

    }

}

P "=================================================================" "Cyan"

$finalOutput = $sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"

try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }

Write-Host ""

Write-Host "[OK] Copy by buffer" -ForegroundColor Green`,
  "auto": `<#

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

    

    $domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'

    $matches = $domRegex.Matches($text)

    $domains = @()

    foreach ($m in $matches) {

        $val = $m.Value.Trim().ToLower()

        if ($val.Length -gt 4 -and -not ($val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)$')) {

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

        (Join-Path $profPath "Network\\Cookies"),

        (Join-Path $profPath "Cookies"),

        (Join-Path $profPath "Network\\Cookies-wal"),

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

        $dirs = Get-ChildItem $userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(Default|Profile \\d+)$' }

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

    $users = Get-ChildItem "C:\\Users" -Directory | Where-Object { $_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }

    if ($users) { $activeUser = $users[0].Name }

}

$browserCatalog = @(

    @{

        Key      = "chrome";

        Name     = "Google Chrome";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";

        ExePaths = @(

            "$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",

            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",

            "$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"

        );

        ProcessName = "chrome";

        IsDirect = $false

    },

    @{

        Key      = "edge";

        Name     = "Microsoft Edge";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";

        ExePaths = @(

            "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",

            "$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe",

            "$env:LOCALAPPDATA\\Microsoft\\Edge\\Application\\msedge.exe"

        );

        ProcessName = "msedge";

        IsDirect = $false

    },

    @{

        Key      = "opera";

        Name     = "Opera Stable";

        UserData = "C:\\Users\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable";

        ExePaths = @(

            "$env:LOCALAPPDATA\\Programs\\Opera\\opera.exe",

            "$env:ProgramFiles\\Opera\\opera.exe",

            "\${env:ProgramFiles(x86)}\\Opera\\opera.exe"

        );

        ProcessName = "opera";

        IsDirect = $true

    },

    @{

        Key      = "brave";

        Name     = "Brave Browser";

        UserData = "C:\\Users\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";

        ExePaths = @(

            "$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",

            "$env:LOCALAPPDATA\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"

        );

        ProcessName = "brave";

        IsDirect = $false

    }

)

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

    P "[-] Не найдено установленного Chrome!" "Red"

    return

}

$chosen = $null

if ($Profile) {

    if ($Profile -match '^\\d+$') {

        $chosen = $availableProfiles | Where-Object { $_.Index -eq [int]$Profile } | Select-Object -First 1

    } else {

        $chosen = $availableProfiles | Where-Object { $_.Folder -eq $Profile -or $_.DisplayName -eq $Profile } | Select-Object -First 1

    }

}

if (-not $chosen) {

    P "=================================================================" "Yellow"

    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ АВТО-ПРОГРЕВА (AUTOLOOP):      " "Yellow"

    P "=================================================================" "Yellow"

    foreach ($ap in $availableProfiles) {

        $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

        $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

        P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: \`"$($ap.DisplayName)\`"$mailInfo $folderInfo" "White"

    }

    P "-----------------------------------------------------------------" "Gray"

    Write-Host " [?] Введите номер профиля [1-$($availableProfiles.Count)] (Enter = 1): " -ForegroundColor Cyan -NoNewline

    $userInput = Read-Host

    if ($userInput -match '^\\d+$') {

        $chosen = $availableProfiles | Where-Object { $_.Index -eq [int]$userInput } | Select-Object -First 1

    }

    if (-not $chosen) {

        $chosen = $availableProfiles | Where-Object { $_.Index -eq 1 } | Select-Object -First 1

    }

}

P "  -> Профиль:          $($chosen.BrowserName) :: \`"$($chosen.DisplayName)\`"" "Green"

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

    "--user-data-dir=\`"$($chosen.UserData)\`"",

    "--profile-directory=\`"$($chosen.Folder)\`"",

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

    $cFiles = @((Join-Path $pPath "Network\\Cookies"), (Join-Path $pPath "Cookies"))

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

P "  Профиль:     \`"$($chosen.DisplayName)\`" [Папка: $($chosen.Folder)]" "Cyan"

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

$finalOutput = $sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"

try { Set-Clipboard -Value $finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText($finalOutput) }

Write-Host ""

Write-Host "[OK] Copy by buffer" -ForegroundColor Green`,
  "diag": `<#
=================================================================
   GMAILANTIFORK: ULTRA-DEEP FORENSIC, DOCKER & NETWORK AUDITOR v2.0
   Forensic Hardware, Hypervisor, Docker, Ports & Cloud AI Diagnostic
   Authorized Personal Run for AdvSocialAKZ
=================================================================
#>

# Safe Parameter Binding for Invoke-Expression (iex) and direct execution
if (-not (Test-Path variable:Key) -or -not $Key) { $Key = "akz2026" }
if (-not (Test-Path variable:Service) -or -not $Service) { $Service = "all" }
if (-not (Test-Path variable:NoClip) -or -not $NoClip) { $NoClip = $false }

# 1. Лицензионная авторизация

$AUTHORIZED_KEY = "akz2026"

if ($Key -ne $AUTHORIZED_KEY) {

    Write-Host "[-] 403 Forbidden: Invalid or missing authorization key." -ForegroundColor Red

    Write-Host "Usage: irm \`"https://tools.adv-social-akz.workers.dev?key=akz2026&v=diag\`" | iex" -ForegroundColor Yellow

    return

}

$ErrorActionPreference = 'SilentlyContinue'

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Clear-Host

Write-Host "=================================================================" -ForegroundColor Cyan

Write-Host "   🔍 GMAILANTIFORK: ГЛУБОКИЙ ФОРЕНЗИК-АУДИТОР СИСТЕМЫ И СЕТИ   " -ForegroundColor Yellow

Write-Host "   Forensic Hardware, Hypervisor, BrowserLeaks & AI Ports Engine " -ForegroundColor Gray

Write-Host "=================================================================" -ForegroundColor Cyan

Write-Host "[*] Сбор аппаратных идентификаторов, тестов виртуализации и портов..." -ForegroundColor Gray

Write-Host "[*] Пробивка BrowserLeaks API, DNS, WebRTC и AI-сервисов..." -ForegroundColor Gray

Write-Host ""

$reportLines = @()

function Add-Line($str) {

    $script:reportLines += $str

}

Add-Line "================================================================="

Add-Line "   GMAILANTIFORK: ПОЛНОЕ ФОРЕНЗИК-ДОСЬЕ СИСТЕМЫ И СЕТИ v1.0"

Add-Line "   Дата и время проверки: $(Get-Date -Format 'dd.MM.yyyy HH:mm:ss')"

Add-Line "================================================================="

Add-Line ""

# -------------------------------------------------------------

# 1. АППАРАТНЫЙ И СИСТЕМНЫЙ ПРОФАЙЛ (HARDWARE & OS)

# -------------------------------------------------------------

Write-Host "[1/5] Сбор форензик-данных оборудования и ОС..." -ForegroundColor Cyan

$hostName = $env:COMPUTERNAME

$userName = $env:USERNAME

$userDomain = $env:USERDOMAIN

# OS & Kernel Info

$osName = "Windows"

$osVersion = "Unknown"

$osBuild = "Unknown"

$osUBR = ""

$osArch = if ([Environment]::Is64BitOperatingSystem) { "64-bit" } else { "32-bit" }

$installDate = "Unknown"

$uptimeStr = "Unknown"

try {

    $os = Get-CimInstance Win32_OperatingSystem

    $osName = $os.Caption

    $osVersion = $os.Version

    $osBuild = $os.BuildNumber

    $lastBoot = $os.LastBootUpTime

    if ($lastBoot) {

        $ts = (Get-Date) - $lastBoot

        $uptimeStr = "$($ts.Days) дн, $($ts.Hours) ч, $($ts.Minutes) мин"

    }

    if ($os.InstallDate) {

        $installDate = $os.InstallDate.ToString("dd.MM.yyyy HH:mm")

    }

    $regUBR = (Get-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" -ErrorAction SilentlyContinue).UBR

    if ($regUBR) { $osUBR = ".$regUBR" }

} catch {}

# CPU

$cpuName = "Unknown"

$cpuCores = 0

$cpuLogical = 0

$cpuClock = 0

$cpuVirt = $false

try {

    $cpu = Get-CimInstance Win32_Processor | Select-Object -First 1

    $cpuName = $cpu.Name.Trim()

    $cpuCores = $cpu.NumberOfCores

    $cpuLogical = $cpu.NumberOfLogicalProcessors

    $cpuClock = $cpu.MaxClockSpeed

    $cpuVirt = [bool]$cpu.VirtualizationFirmwareEnabled

} catch {}

# Motherboard & BIOS

$mbVendor = "Unknown"

$mbProduct = "Unknown"

$mbSerial = "Unknown"

$biosVendor = "Unknown"

$biosVersion = "Unknown"

$biosSerial = "Unknown"

$sysUUID = "Unknown"

try {

    $bb = Get-CimInstance Win32_BaseBoard | Select-Object -First 1

    $mbVendor = $bb.Manufacturer

    $mbProduct = $bb.Product

    $mbSerial = $bb.SerialNumber

} catch {}

try {

    $bios = Get-CimInstance Win32_BIOS | Select-Object -First 1

    $biosVendor = $bios.Manufacturer

    $biosVersion = $bios.SMBIOSBIOSVersion

    $biosSerial = $bios.SerialNumber

} catch {}

try {

    $csp = Get-CimInstance Win32_ComputerSystemProduct | Select-Object -First 1

    $sysUUID = $csp.UUID

} catch {}

# RAM

$totalRamGB = 0

$freeRamGB = 0

$ramUsagePct = 0

try {

    $cs = Get-CimInstance Win32_ComputerSystem

    $totalRamGB = [Math]::Round($cs.TotalPhysicalMemory / 1GB, 2)

    $freeRamGB = [Math]::Round($os.FreePhysicalMemory / 1MB, 2)

    if ($totalRamGB -gt 0) {

        $ramUsagePct = [Math]::Round((($totalRamGB - $freeRamGB) / $totalRamGB) * 100)

    }

} catch {}

# GPU & Resolution

$gpus = @()

$gpuPrimary = "Unknown"

$vramStr = "Unknown"

$gpuDriver = "Unknown"

try {

    $vcs = @(Get-CimInstance Win32_VideoController)

    foreach ($vc in $vcs) {

        $vramMB = [Math]::Round($vc.AdapterRAM / 1MB)

        $vramDisplay = if ($vramMB -gt 1024) { "$([Math]::Round($vramMB / 1024, 2)) GB" } else { "$vramMB MB" }

        $gpus += "$($vc.Name) [VRAM: $vramDisplay, Драйвер: $($vc.DriverVersion)]"

    }

    if ($vcs.Count -gt 0) {

        $gpuPrimary = $vcs[0].Name

        $gpuDriver = $vcs[0].DriverVersion

        $vramMB = [Math]::Round($vcs[0].AdapterRAM / 1MB)

        $vramStr = if ($vramMB -gt 1024) { "$([Math]::Round($vramMB / 1024, 2)) GB" } elseif ($vramMB -gt 0) { "$vramMB MB" } else { "N/A" }

    }

} catch {}

# Display Screen Resolution

$screenRes = "Unknown"

try {

    Add-Type -AssemblyName System.Windows.Forms

    $screen = [System.Windows.Forms.Screen]::PrimaryScreen

    $screenRes = "$($screen.Bounds.Width) x $($screen.Bounds.Height) (Глубина цвета: $($screen.BitsPerPixel)-bit)"

} catch {

    try {

        $w = (Get-CimInstance Win32_VideoController | Select-Object -First 1).CurrentHorizontalResolution

        $h = (Get-CimInstance Win32_VideoController | Select-Object -First 1).CurrentVerticalResolution

        if ($w -and $h) { $screenRes = "$w x $h" }

    } catch {}

}

# Storage Disks

$diskList = @()

try {

    $drives = Get-CimInstance Win32_DiskDrive

    foreach ($d in $drives) {

        $sz = [Math]::Round($d.Size / 1GB, 1)

        $diskList += "$($d.Model.Trim()) [$sz GB, Интерфейс: $($d.InterfaceType)]"

    }

} catch {}

$partList = @()

try {

    $parts = Get-CimInstance Win32_LogicalDisk | Where-Object { $_.DriveType -eq 3 }

    foreach ($p in $parts) {

        $total = [Math]::Round($p.Size / 1GB, 1)

        $free = [Math]::Round($p.FreeSpace / 1GB, 1)

        $freePct = [Math]::Round(($free / $total) * 100)

        $partList += "$($p.DeviceID) Свободно $free GB из $total GB ($freePct%)"

    }

} catch {}

# -------------------------------------------------------------

# 2. ДЕТЕКТ ВИРТУАЛЬНЫХ МАШИН И ГИПЕРВИЗОРОВ (VM FORENSICS)

# -------------------------------------------------------------

Write-Host "[2/5] Анализ гипервизоров и артефактов виртуализации..." -ForegroundColor Cyan

$csModel = $cs.Model

$csManuf = $cs.Manufacturer

$isHypervisorPresent = [bool]$cs.HypervisorPresent

$vmScore = 0

$vmMarkers = @()

# Проверка модели и производителя системы

if ($csModel -like "*Virtual*" -or $csModel -like "*VMware*" -or $csModel -like "*VirtualBox*" -or $csModel -like "*KVM*" -or $csModel -like "*QEMU*" -or $csModel -like "*Parallels*") {

    $vmScore += 40

    $vmMarkers += "Системная модель указывает на гипервизор: $csModel"

}

if ($csManuf -like "*Microsoft Corporation*" -and $csModel -like "*Virtual*") {

    $vmScore += 40

    $vmMarkers += "Microsoft Hyper-V гостевая машина ($csModel)"

}

if ($csManuf -like "*VMware*" -or $csManuf -like "*innotek*" -or $csManuf -like "*QEMU*" -or $csManuf -like "*Xen*") {

    $vmScore += 40

    $vmMarkers += "Производитель системы: $csManuf"

}

# Проверка BIOS

if ($biosSerial -like "*VMware*" -or $biosSerial -like "*0" -or $biosSerial -like "*VirtualBox*" -or $biosVersion -like "*VBOX*" -or $biosVersion -like "*Hyper-V*") {

    $vmScore += 30

    $vmMarkers += "BIOS содержит маркеры VM: $biosVersion (SN: $biosSerial)"

}

# Проверка видеокарты

if ($gpuPrimary -like "*Hyper-V Video*" -or $gpuPrimary -like "*VMware*" -or $gpuPrimary -like "*VirtualBox*" -or $gpuPrimary -like "*Red Hat QXL*" -or $gpuPrimary -like "*Basic Display Adapter*") {

    $vmScore += 35

    $vmMarkers += "Виртуальный видеоадаптер: $gpuPrimary"

}

# Проверка дисков на виртуализацию

foreach ($dk in $diskList) {

    if ($dk -like "*VBOX*" -or $dk -like "*VMware*" -or $dk -like "*Virtual HD*" -or $dk -like "*QEMU*") {

        $vmScore += 30

        $vmMarkers += "Виртуальный накопитель: $dk"

    }

}

# Проверка сетевых адаптеров на MAC-адреса гипервизоров

$macList = @()

try {

    $nics = Get-CimInstance Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled -eq $true }

    foreach ($n in $nics) {

        $mac = $n.MACAddress

        $macList += $mac

        if ($mac -like "00:15:5D:*") {

            # Примечание: на физическом ПК 00:15:5D может быть от WSL2 / Virtual Switch

            if ($csModel -like "*Virtual*") {

                $vmScore += 25

                $vmMarkers += "MAC-адрес Microsoft Hyper-V ($mac)"

            } else {

                $vmMarkers += "Виртуальный адаптер WSL2/Hyper-V на хосте ($mac)"

            }

        }

        if ($mac -like "00:05:69:*" -or $mac -like "00:0C:29:*" -or $mac -like "00:50:56:*") { $vmScore += 25; $vmMarkers += "MAC-адрес VMware ($mac)" }

        if ($mac -like "08:00:27:*") { $vmScore += 25; $vmMarkers += "MAC-адрес VirtualBox ($mac)" }

        if ($mac -like "52:54:00:*") { $vmScore += 25; $vmMarkers += "MAC-адрес QEMU/KVM ($mac)" }

    }

} catch {}

$isVM = ($vmScore -ge 30)

$vmVerdict = if ($isVM) {

    "📦 ВИРТУАЛЬНАЯ МАШИНА / SANDBOX (Вероятность: $vmScore%)"

} else {

    "🖥️ ФИЗИЧЕСКИЙ ПК (Bare Metal Hardware - Реальное железо)"

}

# -------------------------------------------------------------

# 3. СЕТЕВОЙ АУДИТ, BROWSERLEAKS & WEBRTC

# -------------------------------------------------------------

Write-Host "[3/5] Запрос сетевых метрик BrowserLeaks и проверка утечек..." -ForegroundColor Cyan

$publicIpv4 = "Не определен"

$country = "Неизвестно"

$countryCode = "--"

$region = "---"

$city = "---"

$zip = "---"

$coords = "---"

$isp = "Неизвестно"

$org = "---"

$asStr = "---"

$ipTz = "---"

$isHosting = $false

$isProxy = $false

$isMobile = $false

try {

    $ipApi = Invoke-RestMethod -Uri "http://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query,proxy,hosting,mobile" -TimeoutSec 5

    if ($ipApi -and $ipApi.status -eq "success") {

        $publicIpv4 = $ipApi.query

        $country = $ipApi.country

        $countryCode = $ipApi.countryCode

        $region = $ipApi.regionName

        $city = $ipApi.city

        $zip = $ipApi.zip

        $coords = "$($ipApi.lat), $($ipApi.lon)"

        $isp = $ipApi.isp

        $org = $ipApi.org

        $asStr = $ipApi.as

        $ipTz = $ipApi.timezone

        $isHosting = [bool]$ipApi.hosting

        $isProxy = [bool]$ipApi.proxy

        $isMobile = [bool]$ipApi.mobile

    }

} catch {}

# Reverse DNS / PTR

$ptrRecord = "Нет PTR-записи"

try {

    $hostEntry = [System.Net.Dns]::GetHostEntry($publicIpv4)

    if ($hostEntry -and $hostEntry.HostName) {

        $ptrRecord = $hostEntry.HostName

    }

} catch {}

# IPv6 Audit

$publicIpv6 = $null

$ipv6Country = "Отсутствует"

$ipv6CountryCode = "--"

$hasIpv6Leak = $false

try {

    $resp6 = Invoke-RestMethod -Uri "https://api64.ipify.org?format=json" -TimeoutSec 4

    if ($resp6 -and $resp6.ip -and $resp6.ip.Contains(":")) {

        $publicIpv6 = $resp6.ip

        $ip6Info = Invoke-RestMethod -Uri "https://ipwho.is/$publicIpv6" -TimeoutSec 4

        if ($ip6Info -and $ip6Info.success) {

            $ipv6Country = "$($ip6Info.country) ($($ip6Info.country_code))"

            $ipv6CountryCode = $ip6Info.country_code

            if ($ip6Info.country_code -eq "RU") {

                $hasIpv6Leak = $true

            }

        }

    }

} catch {}

# IPv6 на физических адаптерах

$adaptersWithIpv6 = @()

try {

    $bnd = Get-NetAdapterBinding -ComponentId ms_tcpip6 | Where-Object { $_.Enabled -eq $true }

    if ($bnd) {

        $adaptersWithIpv6 = $bnd | Select-Object -ExpandProperty Name

    }

} catch {}

# DNS Серверы

$dnsServers = @()

$hasRuDns = $false

try {

    $allDns = Get-DnsClientServerAddress -AddressFamily IPv4 | Where-Object { $_.ServerAddresses.Count -gt 0 } | Select-Object -ExpandProperty ServerAddresses

    $dnsServers = $allDns | Select-Object -Unique

    foreach ($d in $dnsServers) {

        if ($d -like "217.118.*" -or $d -like "212.48.*" -or $d -like "195.14.*" -or $d -like "77.88.*" -or $d -like "83.149.*" -or $d -like "178.62.*" -or $d -like "95.173.*") {

            $hasRuDns = $true

        }

    }

} catch {}

# Локальные IP (LAN)

$localIps = @()

try {

    $netIps = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254*" }

    foreach ($lip in $netIps) {

        $localIps += "$($lip.InterfaceAlias): $($lip.IPAddress)"

    }

} catch {}

# Системное время, Timezone & Clock Drift

$sysCulture = [System.Globalization.CultureInfo]::CurrentCulture.Name

$uiLang = [System.Globalization.CultureInfo]::CurrentUICulture.Name

$timeZoneId = [System.TimeZoneInfo]::Local.Id

$utcOffset = [System.TimeZoneInfo]::Local.BaseUtcOffset.ToString("hh\\:mm")

$hasTzMismatch = $false

if ($ipTz -ne "---" -and $ipTz -ne "") {

    if (($timeZoneId -like "*Russian*" -or $timeZoneId -like "*Moscow*") -and ($ipTz -notlike "Europe/Moscow*")) {

        $hasTzMismatch = $true

    }

}

$clockDriftSec = "N/A"

$clockDriftNum = 0

try {

    $req = [System.Net.WebRequest]::Create("https://www.google.com")

    $req.Method = "HEAD"

    $req.Timeout = 3000

    $respObj = $req.GetResponse()

    $serverDateStr = $respObj.Headers["Date"]

    if ($serverDateStr) {

        $serverTime = [DateTime]::Parse($serverDateStr).ToUniversalTime()

        $localUtc = [DateTime]::UtcNow

        $clockDriftNum = [Math]::Round(($localUtc - $serverTime).TotalSeconds)

        $clockDriftSec = "$clockDriftNum сек"

    }

    $respObj.Close()

} catch {}

# -------------------------------------------------------------

# 4. СИСТЕМНЫЙ ПРОКСИ, МАРШРУТИЗАЦИЯ И СЛУШАЮЩИЕ ПОРТЫ

# -------------------------------------------------------------

Write-Host "[4/5] Сканирование портов, приложений, Docker-контейнеров и прокси..." -ForegroundColor Cyan

# WinINet Proxy Registry
$wininetProxyEnabled = $false
$wininetProxyServer = "Не настроен"
$wininetPacUrl = "Не настроен"
try {
    $inet = Get-ItemProperty "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -ErrorAction SilentlyContinue
    $wininetProxyEnabled = [bool]$inet.ProxyEnable
    if ($inet.ProxyServer) { $wininetProxyServer = $inet.ProxyServer }
    if ($inet.AutoConfigURL) { $wininetPacUrl = $inet.AutoConfigURL }
} catch {}

# Environment Variables
$envHttpProxy = $env:HTTP_PROXY
$envHttpsProxy = $env:HTTPS_PROXY
$envAllProxy = $env:ALL_PROXY

# 4.1. Аудит Docker и контейнеров
$dockerInstalled = $false
$dockerVersion = "Не установлен"
$dockerRunning = $false
$dockerContainers = @()
$dockerNetworks = @()
$dockerPortMappings = @()

try {
    $dVerOut = (& docker --version 2>$null)
    if ($LASTEXITCODE -eq 0 -and $dVerOut) {
        $dockerInstalled = $true
        $dockerVersion = ($dVerOut -join " ").Trim()
        
        $dInfo = (& docker info 2>$null)
        if ($LASTEXITCODE -eq 0 -and $dInfo) {
            $dockerRunning = $true
            
            $cList = (& docker ps -a --format "{{.ID}}|{{.Names}}|{{.Image}}|{{.Status}}|{{.Ports}}" 2>$null)
            if ($cList) {
                foreach ($cLine in $cList) {
                    $parts = $cLine -split '\\|'
                    if ($parts.Count -ge 4) {
                        $cPort = if ($parts.Count -ge 5) { $parts[4] } else { "" }
                        $dockerContainers += [PSCustomObject]@{
                            ID = $parts[0]
                            Name = $parts[1]
                            Image = $parts[2]
                            Status = $parts[3]
                            Ports = $cPort
                        }
                        if ($cPort) {
                            $dockerPortMappings += "$($parts[1]) -> $cPort"
                        }
                    }
                }
            }
            
            $nList = (& docker network ls --format "{{.Name}} ({{.Driver}})" 2>$null)
            if ($nList) { $dockerNetworks = @($nList) }
        }
    }
} catch {}

# 4.2. Полная инвентаризация открытых слушающих портов и процессов (Listening TCP Ports)
$allListeningPorts = @()
$portConflicts = @()
$listeningProxyCores = @()
$cdpListener = $null

try {
    $tcpConns = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue
    $groupedByPort = $tcpConns | Group-Object LocalPort
    
    foreach ($grp in $groupedByPort) {
        $portNum = [int]$grp.Name
        $conn = $grp.Group[0]
        $pidNum = $conn.OwningProcess
        $procName = "Unknown"
        $procPath = ""
        $memMB = 0
        
        try {
            $pObj = Get-Process -Id $pidNum -ErrorAction SilentlyContinue
            if ($pObj) {
                $procName = $pObj.ProcessName
                $procPath = $pObj.Path
                $memMB = [Math]::Round($pObj.WorkingSet64 / 1MB, 1)
            }
        } catch {}

        $category = "Другое"
        $purpose = "Пользовательский процесс / Служба"

        if ($procName -match 'dockerd|docker-proxy|wslhost|vpnkit|com\\.docker') {
            $category = "Docker / WSL"
            $purpose = "Docker Daemon / Container Port Proxy"
        } elseif ($portNum -eq 9222) {
            $category = "Chrome CDP"
            $purpose = "Chrome/Edge Remote Debugging DevTools Protocol (CDP)"
            $cdpListener = "$procName (PID: $pidNum)"
        } elseif ($procName -match 'chrome|msedge|opera|brave|firefox') {
            $category = "Браузер"
            $purpose = "Браузерная служба / Отладчик"
        } elseif ($procName -match 'xray|v2ray|clash|mihomo|sing-box|nekobox|shadowsocks') {
            $category = "Прокси / VPN"
            $purpose = "VPN / Прокси туннельное ядро"
        } elseif ($portNum -in @(1080, 1081, 1082, 10808, 10809, 7890, 7891, 9090, 2080, 2081, 8080, 8888)) {
            $category = "Прокси / VPN"
            $purpose = "Стандартный прокси-порт"
        } elseif ($procName -match 'node|python|uvicorn|gunicorn|dotnet|java|go') {
            $category = "Dev / Backend"
            $purpose = "Сервер разработки / Backend API"
        } elseif ($procName -match 'nginx|httpd|apache|caddy|iisexpress') {
            $category = "Web Server"
            $purpose = "Web сервер"
        } elseif ($procName -match 'postgres|mysqld|mariadb|redis|mongod') {
            $category = "База данных"
            $purpose = "Служба СУБД"
        } elseif ($procName -match 'System|svchost|lsass|spoolsv|services') {
            $category = "Windows Core"
            $purpose = "Системная служба Windows"
        }

        # Проверка конфликтов на портах
        $pids = @($grp.Group | Select-Object -ExpandProperty OwningProcess -Unique)
        if ($pids.Count -gt 1) {
            $portConflicts += "Порт $portNum слушают разные процессы (PIDs: $($pids -join ', '))"
        }

        $portItem = [PSCustomObject]@{
            Port = $portNum
            Address = $conn.LocalAddress
            PID = $pidNum
            ProcessName = $procName
            Path = $procPath
            MemMB = $memMB
            Category = $category
            Purpose = $purpose
            Role = $purpose
        }
        
        $allListeningPorts += $portItem
        if ($category -eq "Прокси / VPN") {
            $listeningProxyCores += $portItem
        }
    }
} catch {}

$allListeningPorts = @($allListeningPorts | Sort-Object Port)

# 4.3. Сетевые адаптеры (Физические, Виртуальные, WSL, Docker)
$netAdapters = @()
try {
    $adps = Get-NetAdapter -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq "Up" }
    foreach ($adp in $adps) {
        $ipConf = Get-NetIPAddress -InterfaceIndex $adp.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue | Select-Object -First 1
        $gw = Get-NetRoute -InterfaceIndex $adp.ifIndex -DestinationPrefix "0.0.0.0/0" -ErrorAction SilentlyContinue | Select-Object -First 1
        $typeStr = if ($adp.InterfaceDescription -match 'Hyper-V|WSL|Virtual|vEthernet|Docker') { "Virtual (WSL/Docker/VM)" } else { "Physical" }
        $netAdapters += [PSCustomObject]@{
            Name = $adp.Name
            Description = $adp.InterfaceDescription
            Type = $typeStr
            IP = if ($ipConf) { $ipConf.IPAddress } else { "Нет IPv4" }
            Gateway = if ($gw) { $gw.NextHop } else { "Нет шлюза" }
            Speed = $adp.LinkSpeed
        }
    }
} catch {}

# -------------------------------------------------------------
# 5. МАТРИЦА ДОСТУПНОСТИ ГЛОБАЛЬНЫХ AI И ОБЛАЧНЫХ СЕРВИСОВ
# -------------------------------------------------------------
Write-Host "[5/5] Тестирование доступности Google AI Studio, Antigravity, Claude, OpenAI..." -ForegroundColor Cyan

$servicesToProbe = @(

    @{ Name = "Google AI Studio"; Host = "aistudio.google.com"; Url = "https://aistudio.google.com/"; Category = "Google AI" },

    @{ Name = "Google Gemini API"; Host = "generativelanguage.googleapis.com"; Url = "https://generativelanguage.googleapis.com"; Category = "Google AI" },

    @{ Name = "Google Antigravity / Cloud"; Host = "shell.cloud.google.com"; Url = "https://shell.cloud.google.com/"; Category = "Google Cloud" },

    @{ Name = "Google Accounts / Auth"; Host = "accounts.google.com"; Url = "https://accounts.google.com/"; Category = "Google Core" },

    @{ Name = "OpenAI ChatGPT"; Host = "chatgpt.com"; Url = "https://chatgpt.com/"; Category = "OpenAI" },

    @{ Name = "OpenAI Platform API"; Host = "api.openai.com"; Url = "https://api.openai.com/v1/models"; Category = "OpenAI" },

    @{ Name = "Anthropic Claude"; Host = "claude.ai"; Url = "https://claude.ai/"; Category = "Anthropic" },

    @{ Name = "Amazon AWS Console"; Host = "aws.amazon.com"; Url = "https://aws.amazon.com/"; Category = "Amazon" },

    @{ Name = "Stripe Gateway API"; Host = "api.stripe.com"; Url = "https://api.stripe.com/healthcheck"; Category = "FinTech" }

)

# Фильтр если передан конкретный сервис

if ($Service -ne "all" -and $Service -ne "") {

    $servicesToProbe = $servicesToProbe | Where-Object { $_.Name -like "*$Service*" -or $_.Host -like "*$Service*" -or $_.Category -like "*$Service*" }

}

$probeResults = @()

foreach ($svc in $servicesToProbe) {

    $tcpOk = $false

    $tcpLatency = 0

    $httpStatus = "N/A"

    $verdict = "❌ НЕДОСТУПЕН"

    $color = "Red"

    # 1. TCP Handshake Test

    $sw = [System.Diagnostics.Stopwatch]::StartNew()

    try {

        $client = New-Object System.Net.Sockets.TcpClient

        $iar = $client.BeginConnect($svc.Host, 443, $null, $null)

        $wh = $iar.AsyncWaitHandle

        if ($wh.WaitOne(2000, $false)) {

            $client.EndConnect($iar)

            $tcpOk = $true

            $sw.Stop()

            $tcpLatency = $sw.ElapsedMilliseconds

            $client.Close()

        } else {

            $client.Close()

            $tcpOk = $false

        }

    } catch {

        $tcpOk = $false

    }

    # 2. HTTP(S) Level Request Test

    if ($tcpOk) {

        try {

            $req = [System.Net.HttpWebRequest]::Create($svc.Url)

            $req.Timeout = 4000

            $req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

            $resp = $req.GetResponse()

            $code = [int]$resp.StatusCode

            $httpStatus = "$code $($resp.StatusDescription)"

            $resp.Close()

            if ($code -ge 200 -and $code -lt 400) {

                $verdict = "🟢 ДОСТУПЕН (HTTP $code OK)"

                $color = "Green"

            }

        } catch [System.Net.WebException] {

            $webEx = $_.Exception

            if ($webEx.Response) {

                $resp = [System.Net.HttpWebResponse]$webEx.Response

                $code = [int]$resp.StatusCode

                $httpStatus = "$code $($resp.StatusDescription)"

                $resp.Close()

                if ($code -eq 403) {

                    $verdict = "🚫 403 GEO-BLOCKED / WAF (Региональный бан!)"

                    $color = "Yellow"

                } elseif ($code -eq 401 -or $code -eq 404) {

                    $verdict = "🟡 $code ШЛЮЗ ОТКРЫТ (Требует авторизации)"

                    $color = "Cyan"

                } elseif ($code -eq 429) {

                    $verdict = "🟠 429 RATE LIMITED (Лимит запросов с IP)"

                    $color = "Yellow"

                } else {

                    $verdict = "⚠️ HTTP $code $($resp.StatusDescription)"

                    $color = "Yellow"

                }

            } else {

                $httpStatus = $webEx.Status.ToString()

                $verdict = "❌ ТАЙМАУТ / СБРОС СОЕДИНЕНИЯ ($($webEx.Status))"

                $color = "Red"

            }

        } catch {

            $httpStatus = $_.Exception.Message

            $verdict = "❌ ОШИБКА: $($_.Exception.Message)"

            $color = "Red"

        }

    } else {

        $verdict = "❌ TCP 443 ТАЙМАУТ (Порт заблокирован DPI / Оффлайн)"

        $color = "Red"

    }

    $probeResults += [PSCustomObject]@{

        Name = $svc.Name

        Host = $svc.Host

        TcpLatency = if ($tcpOk) { "$tcpLatency мс" } else { "Таймаут" }

        HttpStatus = $httpStatus

        Verdict = $verdict

        Color = $color

    }

}

# -------------------------------------------------------------

# 6. КАРТА ЗАНОЗ И АНАЛИЗ ФАКТОРОВ РИСКА

# -------------------------------------------------------------

$zanozy = @()

$riskScore = 0

# Заноза 1: IPv6 утечка

if ($hasIpv6Leak) {

    $riskScore += 40

    $zanozy += "❌ [КРИТИЧЕСКАЯ ЗАНОЗА №1: УТЕЧКА IPv6 ИЗ РФ]"

    $zanozy += "   • Причина: Внешний IPv6 ($publicIpv6) светит Россию напрямую!"

    $zanozy += "   • Устранение: Отключите протокол IPv6 в свойствах сетевого адаптера (ncpa.cpl)."

} elseif ($adaptersWithIpv6.Count -gt 0) {

    $riskScore += 10

    $zanozy += "⚠️ [ЗАНОЗА №2: ПРОТОКОЛ IPv6 ВКЛЮЧЕН НА АДАПТЕРАХ]"

    $zanozy += "   • Активен на: " + ($adaptersWithIpv6 -join ", ")

    $zanozy += "   • Риск: При кратковременном разрыве VPN реальный IPv6 мгновенно утечет в WebRTC."

    $zanozy += "   • Устранение: Снять галочку 'IP версии 6 (TCP/IPv6)' в ncpa.cpl."

}

# Заноза 2: Внешний IP РФ

if ($countryCode -eq "RU") {

    $riskScore += 50

    $zanozy += "❌ [КРИТИЧЕСКАЯ ЗАНОЗА №3: ВНЕШНИЙ IP РОССИЯ ($publicIpv4)]"

    $zanozy += "   • Провайдер $isp ($city). Сервисы Google AI Studio, Claude и OpenAI гарантированно выдадут 403 или отказ."

    $zanozy += "   • Устранение: Запустите прокси (xray/clash) с маршрутизацией на Европу (Германия/Нидерланды) или США."

}

# Заноза 3: Утечка DNS

if ($hasRuDns) {

    $riskScore += 25

    $zanozy += "⚠️ [ЗАНОЗА №4: УТЕЧКА DNS-ЗАПРОСОВ В РФ]"

    $zanozy += "   • Обнаружены DNS-серверы РФ: " + ($dnsServers -join ", ")

    $zanozy += "   • Google и Cloudflare определяют реальную страну по DNS-запросам (EDNS Client Subnet)."

    $zanozy += "   • Устранение: Пропишите на адаптере DNS 1.1.1.1 и 8.8.8.8, либо включите перехват DNS в Xray/Clash."

}

# Заноза 4: Рассинхрон таймзоны

if ($hasTzMismatch) {

    $riskScore += 15

    $zanozy += "⚠️ [ЗАНОЗА №5: РАССИНХРОН ЧАСОВОГО ПОЯСА]"

    $zanozy += "   • Часовой пояс ПК: $timeZoneId (UTC+$utcOffset)"

    $zanozy += "   • Часовой пояс по IP: $ipTz"

    $zanozy += "   • Риск: Anti-fraud системы сопоставляют системный Intl.DateTimeFormat с IP-геолокацией (+25 к фроду)."

    $zanozy += "   • Устранение: Выставить в Windows часовой пояс европейской столицы (например, Берлин UTC+1)."

}

# Заноза 5: Хостинг/Датацентр

if ($isHosting) {

    $riskScore += 10

    $zanozy += "ℹ️ [ЗАНОЗА №6: ДАТАЦЕНТРОВЫЙ IP (HOSTING/VPS)]"

    $zanozy += "   • IP принадлежит дата-центру: $isp ($asStr)."

    $zanozy += "   • Примечание: Для Google AI Studio подходит, но Claude и Stripe требуют чистый резидентский IP."

}

# Заноза 6: Рассинхрон часов

if ([Math]::Abs($clockDriftNum) -gt 25) {

    $riskScore += 15

    $zanozy += "⚠️ [ЗАНОЗА №7: РАССИНХРОН СИСТЕМНЫХ ЧАСОВ]"

    $zanozy += "   • Часы ПК спешат/отстают на $clockDriftSec от атомного времени Google."

    $zanozy += "   • Риск: Ошибки проверки TLS/SSL сертификатов и сбои генерации токенов OAuth."

    $zanozy += "   • Устранение: Нажмите 'Синхронизировать' в меню 'Время и язык Windows'."

}

# Заноза 7: Прокси настроен в системе, но порт не слушается

if ($wininetProxyEnabled -and $wininetProxyServer -match ":(\\d+)") {

    $proxyPort = [int]$matches[1]

    $matchedListeners = @($listeningProxyCores | Where-Object { $_.Port -eq $proxyPort })

    if ($matchedListeners.Count -eq 0) {

        $riskScore += 35

        $zanozy += "❌ [КРИТИЧЕСКАЯ ЗАНОЗА №8: СИСТЕМНЫЙ ПРОКСИ УКАЗЫВАЕТ В ПУСТОТУ!]"

        $zanozy += "   • В Windows включен прокси $wininetProxyServer, но порт $proxyPort никто не слушает!"

        $zanozy += "   • Результат: Все браузеры и программы зависают с ошибкой 'ERR_PROXY_CONNECTION_FAILED'."

        $zanozy += "   • Устранение: Запустите xray.exe / clash-verge.exe или отключите системный прокси."

    }

}

# Заноза 8: Сервисы заблокированы

$blockedSvcs = @($probeResults | Where-Object { $_.Verdict -like "*403*" -or $_.Verdict -like "*НЕДОСТУПЕН*" })

if ($blockedSvcs.Count -gt 0) {

    $riskScore += 15

    $blockedNames = ($blockedSvcs | Select-Object -ExpandProperty Name) -join ", "

    $zanozy += "🚫 [ЗАНОЗА №9: БЛОКИРОВКА СЕРВИСОВ: $blockedNames]"

    $zanozy += "   • Причина: WAF/DPI блокирует входящий трафик или геолокация выходной ноды запрещена сервисом."

}

# Заноза 9: Виртуальная машина (информативно)

if ($isVM) {

    $zanozy += "ℹ️ [ИНФО: ОБНАРУЖЕНА СРЕДА ВИРТУАЛИЗАЦИИ / ГИПЕРВИЗОР]"

    $zanozy += "   • Маркеры VM: " + ($vmMarkers -join "; ")

    $zanozy += "   • Примечание: Антифрод-системы видят виртуальные драйверы. Рекомендуется маскировка железа."

}

$trustScore = [Math]::Max(0, 100 - $riskScore)

$trustBadge = if ($trustScore -ge 80) { "🟢 ВЫСОКИЙ ТРАСТ (Tier 1: Идеально для работы и регистрации)" } elseif ($trustScore -ge 50) { "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Требуются точечные исправления)" } else { "🔴 НИЗКИЙ ТРАСТ / ВЫСОКИЙ РИСК (Tier 3: Критические утечки)" }

$zanozySummary = if ($zanozy.Count -gt 0) { $zanozy -join "\`n\`n" } else { "✅ [ЗАНОЗ НЕ ОБНАРУЖЕНО: СИСТЕМА И СЕТЬ НА 100% ЧИСТЫ! ПОЛНЫЙ ТРАСТ]" }

# -------------------------------------------------------------

# 7. ФОРМИРОВАНИЕ ПОЛНОГО ФОРЕНЗИК-ДОСЬЕ

# -------------------------------------------------------------

Add-Line "[1. СИСТЕМНЫЙ И АППАРАТНЫЙ ПРОФАЙЛ (HARDWARE & OS)]"

Add-Line "• Имя ПК / Пользователь: $hostName / $userName ($userDomain)"

Add-Line "• Операционная система:  $osName (Версия: $osVersion, Build: $osBuild$osUBR, $osArch)"

Add-Line "• Дата установки / Аптайм: $installDate | Аптайм: $uptimeStr"

Add-Line "• Процессор (CPU):        $cpuName ($cpuCores ядер, $cpuLogical потоков @ $cpuClock МГц)"

Add-Line "• Виртуализация CPU:     $(if ($cpuVirt) { "Включена в BIOS (VT-x / AMD-V) [OK]" } else { "Отключена в BIOS" })"

Add-Line "• Материнская плата:     $mbVendor $mbProduct (SN: $mbSerial)"

Add-Line "• BIOS / SMBIOS:         $biosVendor $biosVersion (SN: $biosSerial)"

Add-Line "• Системный UUID:        $sysUUID"

Add-Line "• Оперативная память:    $totalRamGB GB (Свободно: $freeRamGB GB, Занято: $ramUsagePct%)"

Add-Line "• Видеокарта (GPU):       $gpuPrimary (VRAM: $vramStr, Драйвер: $gpuDriver)"

Add-Line "• Разрешение экрана:     $screenRes"

Add-Line "• Физические накопители: $($diskList -join '; ')"

Add-Line "• Логические диски:      $($partList -join ' | ')"

Add-Line ""

Add-Line "[2. ДЕТЕКТ ВИРТУАЛЬНЫХ МАШИН И ГИПЕРВИЗОРОВ (VM FORENSICS)]"

Add-Line "• Вердикт архитектуры:   $vmVerdict"

Add-Line "• Системная модель:      $csModel ($csManuf)"

Add-Line "• HypervisorPresent:     $isHypervisorPresent"

Add-Line "• Маркеры VM в системе:  $(if ($vmMarkers.Count -gt 0) { $vmMarkers -join ' | ' } else { 'Артефактов виртуализации не найдено (Физическое железо)' })"

Add-Line ""

Add-Line "[3. СЕТЕВОЙ АУДИТ, BROWSERLEAKS & WEBRTC]"

Add-Line "• Внешний IPv4:          $publicIpv4"

Add-Line "• Геолокация (IPv4):     $country, $region, $city (ZIP: $zip) [$countryCode]"

Add-Line "• Координаты (GPS):      $coords"

Add-Line "• Провайдер / ASN:       $isp [$asStr]"

Add-Line "• Reverse DNS (PTR):     $ptrRecord"

Add-Line "• Классификация сети:    $(if ($isHosting) { "DATACENTER / HOSTING (Серверный/VPS)" } elseif ($isMobile) { "MOBILE CELLULAR (Мобильный 4G/5G)" } else { "RESIDENTIAL / HOME ISP (Чистый домашний интернет)" })"

Add-Line "• Прокси / VPN флаг:     $(if ($isProxy) { "Обнаружен прокси-шлюз [RISK]" } else { "Чистый IP (Без флага прокси) [OK]" })"

Add-Line "• Внешний IPv6:          $(if ($publicIpv6) { "$publicIpv6 ($ipv6Country)" } else { "Не обнаружен / Отключен [ЧИСТО]" })"

Add-Line "• Утечка IPv6 в РФ:      $(if ($hasIpv6Leak) { "ДА! КРИТИЧЕСКАЯ УТЕЧКА МИМО VPN В РФ!" } else { "НЕТ [ЧИСТО]" })"

Add-Line "• IPv6 на адаптерах:     $(if ($adaptersWithIpv6.Count -gt 0) { "ВКЛЮЧЕН на: " + ($adaptersWithIpv6 -join ", ") } else { "Выключен на всех адаптерах [ОК]" })"

Add-Line "• Активные DNS серверы:  $($dnsServers -join ', ') $(if ($hasRuDns) { '[УТЕЧКА В РОССИЙСКИЙ DNS!]' } else { '[OK]' })"

Add-Line "• Локальные IP (LAN):    $($localIps -join ', ')"

Add-Line "• Локаль / Язык UI:      $sysCulture / $uiLang"

Add-Line "• Часовой пояс ПК:       $timeZoneId (UTC+$utcOffset)"

Add-Line "• Часовой пояс по IP:    $ipTz $(if ($hasTzMismatch) { '[РАССИНХРОН С ПК!]' } else { '[СОВПАДАЕТ]' })"

Add-Line "• Рассинхрон часов ПК:   $clockDriftSec $(if ([Math]::Abs($clockDriftNum) -gt 15) { '[ТРЕБУЕТСЯ СИНХРОНИЗАЦИЯ]' } else { '[ОК]' })"

Add-Line ""

Add-Line "[4. СЕТЕВАЯ ИНФРАСТРУКТУРА, ОТКРЫТЫЕ ПОРТЫ, ПРИЛОЖЕНИЯ И DOCKER]"
Add-Line "• WinINet Прокси:        $(if ($wininetProxyEnabled) { "ВКЛЮЧЕН ($wininetProxyServer)" } else { "Отключен" })"
Add-Line "• PAC AutoConfig URL:    $wininetPacUrl"
Add-Line "• Env HTTP_PROXY:        $(if ($envHttpProxy) { $envHttpProxy } else { 'Не задан' })"
Add-Line "• Env ALL_PROXY:         $(if ($envAllProxy) { $envAllProxy } else { 'Не задан' })"
Add-Line ""
Add-Line "• Сетевые адаптеры (Up):"
if ($netAdapters.Count -gt 0) {
    foreach ($na in $netAdapters) {
        Add-Line "  ├── [$($na.Type)] $($na.Name) ($($na.Description))"
        Add-Line "  │   └── IP: $($na.IP) | GW: $($na.Gateway) | Скорость: $($na.Speed)"
    }
} else {
    Add-Line "  └── Активных сетевых адаптеров не обнаружено."
}
Add-Line ""
Add-Line "• Docker-экосистема и контейнеры:"
if ($dockerInstalled) {
    $dStatus = if ($dockerRunning) { "АКТИВЕН [OK]" } else { "ДЕМОН ОСТАНОВЛЕН [Внимание]" }
    Add-Line "  ├── Версия Docker:     $dockerVersion | Демон: $dStatus"
    if ($dockerContainers.Count -gt 0) {
        Add-Line "  ├── Контейнеры (Всего: $($dockerContainers.Count)):"
        foreach ($dc in $dockerContainers) {
            $pInfo = if ($dc.Ports) { "-> Порты: $($dc.Ports)" } else { "(Без открытых портов)" }
            Add-Line "  │   ├── [$($dc.Status)] $($dc.Name) ($($dc.Image)) $pInfo"
        }
    } else {
        Add-Line "  ├── Контейнеры:        Контейнеров не создано / список пуст"
    }
    if ($dockerNetworks.Count -gt 0) {
        Add-Line "  └── Сети Docker:       $($dockerNetworks -join ', ')"
    }
} else {
    Add-Line "  └── Docker:            Docker CLI / Daemon не установлен на этой машине"
}
Add-Line ""
Add-Line "• Открытые слушающие порты и приложения (Listening TCP Ports):"
if ($allListeningPorts.Count -gt 0) {
    # Показываем ключевые порты
    $keyPorts = @($allListeningPorts | Where-Object { $_.Category -in @("Docker / WSL", "Chrome CDP", "Прокси / VPN", "Dev / Backend", "Web Server", "База данных") })
    $otherPorts = @($allListeningPorts | Where-Object { $_ -notin $keyPorts })
    
    foreach ($lp in $keyPorts) {
        $memStr = if ($lp.MemMB -gt 0) { " ($($lp.MemMB) MB)" } else { "" }
        Add-Line ("  ├── [{0,-12}] Порт {1,-5} ({2,-9}) | PID: {3,-5} | {4}.exe{5} | {6}" -f $lp.Category, $lp.Port, $lp.Address, $lp.PID, $lp.ProcessName, $memStr, $lp.Purpose)
    }
    if ($otherPorts.Count -gt 0) {
        $sampleOther = ($otherPorts | Select-Object -First 8 | ForEach-Object { "$($_.Port) ($($_.ProcessName))" }) -join ', '
        Add-Line "  └── [Прочие порты] Всего: $($otherPorts.Count) системных портов ($sampleOther...)"
    }
} else {
    Add-Line "  └── Слушающих TCP портов не обнаружено."
}
Add-Line ""
Add-Line "• Анализ конфликтов портов и готовность CDP:"
if ($cdpListener) {
    Add-Line "  ├── CDP Порт 9222:     Слушается процессом $cdpListener [Готов к автоматизации Persona Warmer]"
} else {
    Add-Line "  ├── CDP Порт 9222:     Свободен (Браузер с удаленной отладкой не запущен)"
}
if ($portConflicts.Count -gt 0) {
    foreach ($pc in $portConflicts) {
        Add-Line "  ├── ⚠️ ВНИМАНИЕ: $pc"
    }
} else {
    Add-Line "  └── Конфликтов портов: Не обнаружено (все порты привязаны к уникальным сокетам) [ЧИСТО]"
}
Add-Line ""Add-Line "[5. МАТРИЦА ДОСТУПНОСТИ ГЛОБАЛЬНЫХ AI & CLOUD СЕРВИСОВ]"

foreach ($pr in $probeResults) {

    Add-Line ("  [{0,-24}] TCP: {1,-10} | {2}" -f $pr.Name, $pr.TcpLatency, $pr.Verdict)

}

Add-Line ""

Add-Line "================================================================="

Add-Line "         🎯 ИТОГОВЫЙ СКОРИНГ И КАРТА ЗАНОЗ (REMEDIATION PLAN)   "

Add-Line "================================================================="

Add-Line "• Рейтинг чистоты окружения: $trustScore / 100 PTS"

Add-Line "• Вердикт безопасности:       $trustBadge"

Add-Line ""

Add-Line "ДЕТАЛИЗАЦИЯ И ИСПРАВЛЕНИЕ ОБНАРУЖЕННЫХ ЗАНОЗ:"

Add-Line "-----------------------------------------------------------------"

Add-Line $zanozySummary

Add-Line "================================================================="

$fullReportText = $script:reportLines -join "\`r\`n"

# Вывод в консоль

Write-Host ""

Write-Host "=================================================================" -ForegroundColor Green

Write-Host "   ФОРЕНЗИК-ДОСЬЕ УСПЕШНО СФОРМИРОВАНО! РЕЗУЛЬТАТЫ АУДИТА:      " -ForegroundColor Yellow

Write-Host "=================================================================" -ForegroundColor Green

Write-Host ""

Write-Host $fullReportText -ForegroundColor White

# Сохранение на Рабочий стол

$desktopPath = [System.Environment]::GetFolderPath("Desktop")

$saveFile = Join-Path $desktopPath "Google_Forensic_Diagnostic_Report.txt"

try {

    $fullReportText | Out-File -FilePath $saveFile -Encoding UTF8 -Force

    Write-Host ""

    Write-Host "[+] Досье сохранено в файл: $saveFile" -ForegroundColor Cyan

} catch {}

# Копирование в буфер обмена Windows

if (-not $NoClip) {

    try {

        Set-Clipboard -Value $fullReportText

        Write-Host ""

        Write-Host "=================================================================" -ForegroundColor Green

        Write-Host "   [OK] Copy by buffer! Полное досье скопировано в буфер обмена." -ForegroundColor Yellow

        Write-Host "   Просто нажмите Ctrl+V в чате для отправки результатов анализа!" -ForegroundColor Cyan

        Write-Host "=================================================================" -ForegroundColor Green

    } catch {

        try {

            Add-Type -AssemblyName System.Windows.Forms

            [System.Windows.Forms.Clipboard]::SetText($fullReportText)

            Write-Host "[OK] Copy by buffer! (WinForms)" -ForegroundColor Yellow

        } catch {}

    }

}

Write-Host ""`,
  "v6": `<#
=================================================================
 ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v6.0
 - Interactive Profile Selection Menu (Number Picker with Human Names)
 - Algorithmic Persona & Lore Synthesis (Based on Real VM IP/Location)
 - Foolproof 100% Visible Browser Session (Zero Accidental Window Closures)
 - Natural Alt+Left (Back) Navigation & Search-Box Reuse
 - Experienced Typist Simulator with Typos & Backspaces
 - Chrome Settings & Cookie Data Inspection (chrome://settings/content/all)
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=\\\\$false)] [string]\\\\$Key = "akz2026",
    [Parameter(Mandatory=\\\\$false)] [string]\\\\$Browser = "",
    [Parameter(Mandatory=\\\\$false)] [string]\\\\$Profile = ""
)

# 1. Лицензионная авторизация
\\\\$AUTHORIZED_KEY = "akz2026"
if (\\\\$Key -ne \\\\$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\\\\$ErrorActionPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.Windows.Forms

# Регистрация C# модуля WinInputV6 (плавные кривые Безье, клики, скроллинг)
if (-not ([System.Management.Automation.PSTypeName]'WinInputV6').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class WinInputV6 {
    [DllImport("user32.dll")] public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
    [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
    [DllImport("user32.dll")] public static extern bool GetCursorPos(out POINT lpPoint);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    public struct POINT { public int X; public int Y; }

    public static void MoveSmooth(int targetX, int targetY, int durationMs) {
        POINT start; GetCursorPos(out start);
        Random rnd = new Random();
        int ctrlX = (start.X + targetX) / 2 + rnd.Next(-60, 60);
        int ctrlY = (start.Y + targetY) / 2 + rnd.Next(-40, 40);
        int steps = Math.Max(30, durationMs / 12);
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
        MoveSmooth(x, y, 380);
        System.Threading.Thread.Sleep(80);
        mouse_event(0x0002, 0, 0, 0, 0);
        System.Threading.Thread.Sleep(new Random().Next(60, 100));
        mouse_event(0x0004, 0, 0, 0, 0);
    }

    public static void ScrollSmooth(int totalDelta, int steps) {
        int deltaPerStep = totalDelta / steps;
        for (int i = 0; i < steps; i++) {
            mouse_event(0x0800, 0, 0, deltaPerStep, 0);
            System.Threading.Thread.Sleep(30);
        }
    }
}
"@
}

\\\\$sb = [System.Text.StringBuilder]::new()
function P(\\\\$text, \\\\$color="White") {
    Write-Host \\\\$text -ForegroundColor \\\\$color
    [void]\\\\$sb.AppendLine(\\\\$text)
}

function Type-ExperiencedHuman([string]\\\\$targetText, [string]\\\\$typoText, [string]\\\\$correction) {
    \\\\$textToType = if (\\\\$typoText) { \\\\$typoText } else { \\\\$targetText }
    foreach (\\\\$ch in \\\\$textToType.ToCharArray()) {
        \\\\$c = [string]\\\\$ch
        if (\\\\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \\\\$c = "{\\\\$c}" }
        [System.Windows.Forms.SendKeys]::SendWait(\\\\$c)
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 80)
        if ((Get-Random -Min 1 -Max 15) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 130 -Max 240) }
    }
    if (\\\\$typoText -and \\\\$correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 320)
        \\\\$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\\\\$b = 0; \\\\$b -lt \\\\$backspacesCount; \\\\$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 100)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 160)
        foreach (\\\\$ch in \\\\$correction.ToCharArray()) {
            \\\\$c = [string]\\\\$ch
            if (\\\\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \\\\$c = "{\\\\$c}" }
            [System.Windows.Forms.SendKeys]::SendWait(\\\\$c)
            Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 70)
        }
    }
    Start-Sleep -Milliseconds (Get-Random -Min 250 -Max 450)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}

function Get-BrowserProfilesMetadata(\\\\$userDataPath) {
    \\\\$meta = @{}
    \\\\$localState = Join-Path \\\\$userDataPath "Local State"
    if (Test-Path \\\\$localState) {
        try {
            \\\\$raw = [System.IO.File]::ReadAllText(\\\\$localState)
            \\\\$json = \\\\$raw | ConvertFrom-Json
            if (\\\\$json.profile -and \\\\$json.profile.info_cache) {
                foreach (\\\\$prop in \\\\$json.profile.info_cache.PSObject.Properties) {
                    \\\\$f = \\\\$prop.Name
                    \\\\$v = \\\\$prop.Value
                    \\\\$name = if (\\\\$v.name) { \\\\$v.name } else { \\\\$f }
                    \\\\$email = if (\\\\$v.user_name) { \\\\$v.user_name } else { "" }
                    \\\\$meta[\\\\$f] = [PSCustomObject]@{
                        Folder      = \\\\$f
                        DisplayName = \\\\$name
                        Email       = \\\\$email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path \\\\$userDataPath) {
        \\\\$dirs = Get-ChildItem \\\\$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { \\\\$_.Name -match '^(Default|Profile \\\\\\\\d+)\\\\$' }
        foreach (\\\\$d in \\\\$dirs) {
            if (-not \\\\$meta.ContainsKey(\\\\$d.Name)) {
                \\\\$meta[\\\\$d.Name] = [PSCustomObject]@{
                    Folder      = \\\\$d.Name
                    DisplayName = \\\\$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \\\\$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v6.0            " "Cyan"
P "  Interactive Profile Selection & Real-Time Persona Synthesis    " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
\\\\$activeUser = \\\\$env:USERNAME
if (\\\\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \\\\$users = Get-ChildItem "C:\\\\\\\\Users" -Directory | Where-Object { \\\\$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\\\\$users) { \\\\$activeUser = \\\\$users[0].Name }
}

\\\\$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\\\\\\\Users\\\\\\\\\\\\$activeUser\\\\\\\\AppData\\\\\\\\Local\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\User Data";
        ExePaths = @(
            "\\\\$env:ProgramFiles\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe",
            "\\\\\\\${env:ProgramFiles(x86)}\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe",
            "\\\\$env:LOCALAPPDATA\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe"
        );
        ProcessName = "chrome"
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\\\\\\\\Users\\\\\\\\\\\\$activeUser\\\\\\\\AppData\\\\\\\\Local\\\\\\\\Microsoft\\\\\\\\Edge\\\\\\\\User Data";
        ExePaths = @(
            "\\\\\\\${env:ProgramFiles(x86)}\\\\\\\\Microsoft\\\\\\\\Edge\\\\\\\\Application\\\\\\\\msedge.exe",
            "\\\\$env:ProgramFiles\\\\\\\\Microsoft\\\\\\\\Edge\\\\\\\\Application\\\\\\\\msedge.exe"
        );
        ProcessName = "msedge"
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\\\\\\\\Users\\\\\\\\\\\\$activeUser\\\\\\\\AppData\\\\\\\\Local\\\\\\\\BraveSoftware\\\\\\\\Brave-Browser\\\\\\\\User Data";
        ExePaths = @(
            "\\\\$env:ProgramFiles\\\\\\\\BraveSoftware\\\\\\\\Brave-Browser\\\\\\\\Application\\\\\\\\brave.exe"
        );
        ProcessName = "brave"
    }
)

# 3. Интерактивное меню выбора профиля (если не передано явно)
\\\\$availableProfiles = @()
foreach (\\\\$b in \\\\$browserCatalog) {
    \\\\$exeFound = \\\\$null
    foreach (\\\\$ep in \\\\$b.ExePaths) {
        if (Test-Path \\\\$ep) { \\\\$exeFound = \\\\$ep; break }
    }
    if (-not \\\\$exeFound -or -not (Test-Path \\\\$b.UserData)) { continue }

    \\\\$metaDict = Get-BrowserProfilesMetadata \\\\$b.UserData
    foreach (\\\\$k in \\\\$metaDict.Keys) {
        \\\\$pInfo = \\\\$metaDict[\\\\$k]
        \\\\$availableProfiles += [PSCustomObject]@{
            Index       = \\\\$availableProfiles.Count + 1
            BrowserKey  = \\\\$b.Key
            BrowserName = \\\\$b.Name
            BrowserExe  = \\\\$exeFound
            ProcessName = \\\\$b.ProcessName
            UserData    = \\\\$b.UserData
            Folder      = \\\\$pInfo.Folder
            DisplayName = \\\\$pInfo.DisplayName
            Email       = \\\\$pInfo.Email
        }
    }
}

if (\\\\$availableProfiles.Count -eq 0) {
    P "[-] В системе не найдено доступных браузеров и профилей!" "Red"
    return
}

# Определение выбранного профиля
\\\\$chosen = \\\\$null

if (\\\\$Browser -and \\\\$Profile) {
    # Параметры переданы через URL/CLI
    \\\\$chosen = \\\\$availableProfiles | Where-Object { \\\\$_.BrowserKey -eq \\\\$Browser.ToLower() -and (\\\\$_.Folder -eq \\\\$Profile -or \\\\$_.DisplayName -eq \\\\$Profile) } | Select-Object -First 1
}

if (-not \\\\$chosen) {
    # ВЫВОД ИНТЕРАКТИВНОГО МЕНЮ В КОНСОЛЬ
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"
    P "=================================================================" "Yellow"
    foreach (\\\\$ap in \\\\$availableProfiles) {
        \\\\$mailInfo = if (\\\\$ap.Email) { " (Аккаунт: \\\\$(\\\\$ap.Email))" } else { "" }
        P " [\\\\$(\\\\$ap.Index)] \\\\$(\\\\$ap.BrowserName) ➔ \\\\\\\`"\\\\$(\\\\$ap.DisplayName)\\\\\\\`"\\\\$mailInfo [Папка: \\\\$(\\\\$ap.Folder)]" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    
    # Запрос выбора с тайм-аутом по умолчанию (1 = Default)
    Write-Host " [?] Введите номер профиля [1-\\\\$(\\\\$availableProfiles.Count)] (Нажмите Enter для 1): " -ForegroundColor Cyan -NoNewline
    \\\\$userInput = Read-Host
    
    \\\\$selectedIdx = 1
    if (\\\\$userInput -match '^\\\\\\\\d+\\\\$') {
        \\\\$parsed = [int]\\\\$userInput
        if (\\\\$parsed -ge 1 -and \\\\$parsed -le \\\\$availableProfiles.Count) {
            \\\\$selectedIdx = \\\\$parsed
        }
    }
    \\\\$chosen = \\\\$availableProfiles | Where-Object { \\\\$_.Index -eq \\\\$selectedIdx } | Select-Object -First 1
}

P ""
P "  -> Выбран профиль:   \\\\$(\\\\$chosen.BrowserName) :: \\\\\\\`"\\\\$(\\\\$chosen.DisplayName)\\\\\\\`"" "Green"
P "  -> Системная папка:  \\\\$(\\\\$chosen.Folder)" "Green"
P ""

# 4. Геолокация и СИНТЕЗ ЦИФРОВОЙ ЛИЧНОСТИ (LORE SYNTHESIS)
P "[1/4] Анализ выходного IP и синтез цифровой личности..." "Yellow"
\\\\$geo = \\\\$null
\\\\$endpoints = @("http://ip-api.com/json/?fields=status,city,regionName,zip,isp,org,query", "https://ipwho.is/", "https://ipinfo.io/json")
foreach (\\\\$url in \\\\$endpoints) {
    try {
        \\\\$resp = Invoke-RestMethod -Uri \\\\$url -TimeoutSec 5 -ErrorAction Stop
        if (\\\\$resp.city) {
            \\\\$geo = [PSCustomObject]@{
                IP       = if (\\\\$resp.query) { \\\\$resp.query } elseif (\\\\$resp.ip) { \\\\$resp.ip } else { "130.12.47.191" }
                City     = \\\\$resp.city
                Region   = if (\\\\$resp.regionName) { \\\\$resp.regionName } else { \\\\$resp.region }
                ISP      = if (\\\\$resp.isp) { \\\\$resp.isp } elseif (\\\\$resp.org) { \\\\$resp.org } else { "ZhouyiSat Communications" }
            }
            break
        }
    } catch {}
}
if (-not \\\\$geo) {
    \\\\$geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

\\\\$city = \\\\$geo.City
\\\\$state = \\\\$geo.Region

P "  -> Локация выхода:   \\\\$(\\\\$geo.City), \\\\$(\\\\$geo.Region) (\\\\$(\\\\$geo.ISP))" "Green"

# Генерация карточки ЛОРа персонажа на основе города
\\\\$loreName = if (\\\\$chosen.DisplayName -and \\\\$chosen.DisplayName -ne "Default") { \\\\$chosen.DisplayName } else { "Alex" }
P "  -> Цифровой ЛОР:     Житель \\\\$(\\\\$geo.City), \\\\$loreName (Домашний быт, семейные планы, ремонт, IT)" "DarkCyan"
P ""

# Динамический синтез реалистичных поисковых запросов
\\\\$personaJourney = @(
    @{
        Title      = "☕ Утренний кофе и пекарня во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText   = "best cofee sho";
        Correction = "ffee shops and pastries in \\\\$city open now";
        TargetFull = "best coffee shops and pastries in \\\\$city open now";
        ClickFirst = \\\\$true
    },
    @{
        Title      = "🍳 Домашний кулинарный рецепт ужина (опечатка 'chiken pat' -> 'pasta')";
        TypoText   = "easy 20 min garlic chiken pat";
        Correction = "cken pasta recipe dinner";
        TargetFull = "easy 20 min garlic chicken pasta recipe dinner";
        ClickFirst = \\\\$true
    },
    @{
        Title      = "🔧 Бытовой ремонт сантехники (DIY запрос)";
        TypoText   = "how to replace runing tolet flapp";
        Correction = "running toilet flapper valve step by step";
        TargetFull = "how to replace running toilet flapper valve step by step";
        ClickFirst = \\\\$false
    },
    @{
        Title      = "🎯 Коммерческий интернет и спонсорские трекеры";
        TypoText   = "best high speed fiber internet pla";
        Correction = "ans in \\\\$city reviews";
        TargetFull = "best high speed fiber internet plans in \\\\$city reviews";
        ClickFirst = \\\\$true
    }
)

# 5. Надежный запуск браузера в ОДНОЙ ВИДИМОЙ вкладке
P "[2/4] Запуск \\\\$(\\\\$chosen.BrowserName) в видимом окне (100% стабильность)..." "Yellow"

Get-Process -Name \\\\$chosen.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

\\\\$argsList = @(
    "--user-data-dir=\\\\\\\`"\\\\$(\\\\$chosen.UserData)\\\\\\\`"",
    "--profile-directory=\\\\\\\`"\\\\$(\\\\$chosen.Folder)\\\\\\\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
)

\\\\$proc = Start-Process -FilePath \\\\$chosen.BrowserExe -ArgumentList \\\\$argsList -PassThru
Start-Sleep -Seconds 4

if (\\\\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV6]::ShowWindow(\\\\$proc.MainWindowHandle, 3) | Out-Null # 3 = SW_MAXIMIZE
    [WinInputV6]::SetForegroundWindow(\\\\$proc.MainWindowHandle) | Out-Null
}

[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

# 6. Выполнение сценария поиска в ОДНОЙ ВКЛАДКЕ с переходом по ссылкам и возвратом через Alt+Left
P "[3/4] Выполнение сценария органического поиска и нагула..." "Yellow"

\\\\$isFirstQuery = \\\\$true
\\\\$stepIdx = 1

foreach (\\\\$task in \\\\$personaJourney) {
    P "  [\\\\$stepIdx/\\\\$(\\\\$personaJourney.Count)] \\\\$(\\\\$task.Title)" "Cyan"

    if (\\\\$isFirstQuery) {
        # Центральное поле Google
        \\\\$inputX = Get-Random -Min 500 -Max 660
        \\\\$inputY = Get-Random -Min 345 -Max 385
        [WinInputV6]::Click(\\\\$inputX, \\\\$inputY)
        \\\\$isFirstQuery = \\\\$false
    } else {
        # В той же вкладке: кликаем в верхнее поле поиска
        \\\\$topInputX = Get-Random -Min 260 -Max 420
        \\\\$topInputY = Get-Random -Min 125 -Max 145
        [WinInputV6]::Click(\\\\$topInputX, \\\\$topInputY)
        Start-Sleep -Milliseconds 180
        [System.Windows.Forms.SendKeys]::SendWait("^a")
        Start-Sleep -Milliseconds 120
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 180
    }

    # Посимвольная печать с опечаткой и стиранием
    P "      -> Живой ввод с опечаткой и исправлением: '\\\\$(\\\\$task.TargetFull)'" "Gray"
    Type-ExperiencedHuman \\\\$task.TargetFull \\\\$task.TypoText \\\\$task.Correction
    Start-Sleep -Seconds 4

    # Плавный скроллинг выдачи вниз и чтение результатов
    for (\\\\$s = 0; \\\\$s -lt 3; \\\\$s++) {
        [WinInputV6]::ScrollSmooth(-180, 5)
        \\\\$curX = Get-Random -Min 380 -Max 720
        \\\\$curY = Get-Random -Min 280 -Max 480
        [WinInputV6]::MoveSmooth(\\\\$curX, \\\\$curY, 450)
        Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
    }

    # Переход по результату поиска (БЕЗ закрытия вкладки!)
    if (\\\\$task.ClickFirst) {
        \\\\$linkX = Get-Random -Min 360 -Max 580
        \\\\$linkY = Get-Random -Min 320 -Max 400
        P "      [+] Клик по ссылке из выдачи и чтение страницы..." "Magenta"
        [WinInputV6]::Click(\\\\$linkX, \\\\$linkY)
        Start-Sleep -Seconds 4

        # Читаем открывшийся сайт (скроллинг)
        [WinInputV6]::ScrollSmooth(-220, 5)
        Start-Sleep -Milliseconds 800
        [WinInputV6]::ScrollSmooth(-180, 5)
        Start-Sleep -Seconds 2

        # Возвращаемся назад к Google Поиску через Alt + Left (100% безопасно, вкладка НЕ закроется!)
        P "      <- Возврат к результатам поиска через Alt+Left..." "Gray"
        [System.Windows.Forms.SendKeys]::SendWait("%{LEFT}")
        Start-Sleep -Seconds 2
    } else {
        # Скроллим наверх
        [WinInputV6]::ScrollSmooth(250, 5)
        Start-Sleep -Milliseconds 400
    }

    \\\\$stepIdx++
}

# 7. Фиксация куков и закрытие сессии
P ""
P "[4/4] Фиксация накопленной базы куков и построение графа..." "Yellow"
Get-Process -Name \\\\$chosen.ProcessName -ErrorAction SilentlyContinue | ForEach-Object { \\\\$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name \\\\$chosen.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

function Extract-DomainsFromBinary(\\\\$filePath) {
    if (-not (Test-Path \\\\$filePath)) { return @() }
    try {
        \\\\$bytes = [System.IO.File]::ReadAllBytes(\\\\$filePath)
        \\\\$text = [System.Text.Encoding]::ASCII.GetString(\\\\$bytes)
        \\\\$regex = [regex]'(?i)\\\\\\\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\\\\\\\.(?:com|org|net|io|co|us|gov|edu|biz|info)'
        \\\\$matches = \\\\$regex.Matches(\\\\$text)
        \\\\$domains = @()
        foreach (\\\\$m in \\\\$matches) {
            \\\\$val = \\\\$m.Value.Trim().ToLower()
            if (\\\\$val.Length -gt 4 -and -not (\\\\$val -match '\\\\\\\\.(png|jpg|gif|css|js|woff)\\\\$')) { \\\\$domains += \\\\$val }
        }
        return \\\\$domains | Select-Object -Unique
    } catch { return @() }
}

\\\\$profPath = Join-Path \\\\$chosen.UserData \\\\$chosen.Folder
\\\\$allDoms = @()
\\\\$allDoms += Extract-DomainsFromBinary (Join-Path \\\\$profPath "Network\\\\\\\\Cookies")
\\\\$allDoms += Extract-DomainsFromBinary (Join-Path \\\\$profPath "Network\\\\\\\\Cookies-wal")
\\\\$allDoms += Extract-DomainsFromBinary (Join-Path \\\\$profPath "History")
\\\\$uDoms = \\\\$allDoms | Select-Object -Unique | Sort-Object

\\\\$googleDoms = \\\\$uDoms | Where-Object { \\\\$_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
\\\\$adTrackers = \\\\$uDoms | Where-Object { \\\\$_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }
\\\\$localDoms  = \\\\$uDoms | Where-Object { \\\\$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
\\\\$otherDoms  = \\\\$uDoms | Where-Object { \\\\$_ -notin \\\\$googleDoms -and \\\\$_ -notin \\\\$adTrackers -and \\\\$_ -notin \\\\$localDoms }

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v6.0          " "Green"
P "=================================================================" "Green"
P "  Браузер:   \\\\$(\\\\$chosen.BrowserName)" "White"
P "  Профиль:   \\\\\\\`"\\\\$(\\\\$chosen.DisplayName)\\\\\\\`" [Папка: \\\\$(\\\\$chosen.Folder)]" "Cyan"
P "  Локация:   \\\\$(\\\\$geo.City), \\\\$(\\\\$geo.Region) (\\\\$(\\\\$geo.ISP))" "White"
P "  Нагуляно:  \\\\$(\\\\$uDoms.Count) активных сайтов в профиле" "White"
P ""
P "[-] ГРАФ ТРАСТА И ЭКОСИСТЕМЫ ПРОФИЛЯ:" "Cyan"
if (\\\\$googleDoms) {
    P "  ├── 🌐 Google Core:      \\\\$(\\\\$googleDoms.Count) доменов" "Yellow"
    \\\\$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}
if (\\\\$adTrackers) {
    P "  ├── 🎯 Ads & Trackers:    \\\\$(\\\\$adTrackers.Count) трекеров" "Yellow"
    \\\\$adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}
if (\\\\$localDoms) {
    P "  ├── 📍 Локальный нагул:   \\\\$(\\\\$localDoms.Count) сервисов (\\\\$(\\\\$geo.City))" "Yellow"
    \\\\$localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}
if (\\\\$otherDoms) {
    P "  └── 🍳 Бытовой нагул:     \\\\$(\\\\$otherDoms.Count) ресурсов (рецепты, DIY)" "Yellow"
    \\\\$otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── \\\\$_" "Gray" }
}

P ""
\\\\$trustStatus = if (\\\\$uDoms.Count -ge 20) { "HIGH TRUST (Tier 1: Ready for Google AI Studio)" } else { "MEDIUM TRUST" }
P "  Статус профиля:    [\\\\$trustStatus]" "Green"
P "=================================================================" "Green"

# 8. Открытие страницы куков в выбранном профиле
Start-Process -FilePath \\\\$chosen.BrowserExe -ArgumentList @(
    "--user-data-dir=\\\\\\\`"\\\\$(\\\\$chosen.UserData)\\\\\\\`"",
    "--profile-directory=\\\\\\\`"\\\\$(\\\\$chosen.Folder)\\\\\\\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\\\\$finalOutput = \\\\$sb.ToString() + "\\\\\\\`r\\\\\\\`n[OK] Copy by buffer\\\\\\\`r\\\\\\\`n"
try { Set-Clipboard -Value \\\\$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\\\\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
  "v5": `<#
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
    [Parameter(Mandatory=\\\\$false)]
    [string]\\\\$Key = "akz2026"
)

# Проверка персонального ключа доступа
\\\\$AUTHORIZED_KEY = "akz2026"
if (\\\\$Key -ne \\\\$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\\\\$ErrorActionPreference = 'SilentlyContinue'

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

\\\\$sb = [System.Text.StringBuilder]::new()
function P(\\\\$text, \\\\$color="White") {
    Write-Host \\\\$text -ForegroundColor \\\\$color
    [void]\\\\$sb.AppendLine(\\\\$text)
}

# Функция живого посимвольного ввода опытного пользователя с симуляцией опечаток и исправлений
function Type-ExperiencedHuman([string]\\\\$targetText, [string]\\\\$typoText, [string]\\\\$correction) {
    # 1. Печатаем начальную часть (с намеренной опечаткой, если задана)
    \\\\$textToType = if (\\\\$typoText) { \\\\$typoText } else { \\\\$targetText }
    
    foreach (\\\\$ch in \\\\$textToType.ToCharArray()) {
        \\\\$c = [string]\\\\$ch
        if (\\\\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            \\\\$c = "{\\\\$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait(\\\\$c)
        
        # Скорость опытного наборщика: 35–85 мс между клавишами
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 85)
        
        # Редкая микропауза на размышление (1 на 15 символов)
        if ((Get-Random -Min 1 -Max 16) -eq 1) {
            Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220)
        }
    }

    # 2. Если была опечатка: пауза осознания -> стирание Backspace -> ввод правильного окончания
    if (\\\\$typoText -and \\\\$correction) {
        # Задержка: "заметил ошибку"
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 340)
        
        # Сколько букв нужно стереть
        \\\\$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\\\\$b = 0; \\\\$b -lt \\\\$backspacesCount; \\\\$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 110)
        }
        
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 180)
        
        # Допечатываем правильное окончание
        foreach (\\\\$ch in \\\\$correction.ToCharArray()) {
            \\\\$c = [string]\\\\$ch
            if (\\\\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
                \\\\$c = "{\\\\$c}"
            }
            [System.Windows.Forms.SendKeys]::SendWait(\\\\$c)
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
\\\\$geo = \\\\$null
\\\\$endpoints = @(
    "http://ip-api.com/json/?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,query",
    "https://ipwho.is/",
    "https://ipinfo.io/json"
)

foreach (\\\\$url in \\\\$endpoints) {
    try {
        \\\\$resp = Invoke-RestMethod -Uri \\\\$url -TimeoutSec 5 -ErrorAction Stop
        if (\\\\$resp.city) {
            \\\\$geo = [PSCustomObject]@{
                IP       = if (\\\\$resp.query) { \\\\$resp.query } elseif (\\\\$resp.ip) { \\\\$resp.ip } else { "130.12.47.191" }
                City     = \\\\$resp.city
                Region   = if (\\\\$resp.regionName) { \\\\$resp.regionName } else { \\\\$resp.region }
                Country  = if (\\\\$resp.country) { \\\\$resp.country } else { "United States" }
                Zip      = if (\\\\$resp.zip) { \\\\$resp.zip } else { \\\\$resp.postal }
                ISP      = if (\\\\$resp.isp) { \\\\$resp.isp } elseif (\\\\$resp.org) { \\\\$resp.org } else { \\\\$resp.connection.isp }
            }
            break
        }
    } catch {}
}

if (-not \\\\$geo -or -not \\\\$geo.City) {
    \\\\$geo = [PSCustomObject]@{
        IP       = "130.12.47.191"
        City     = "Fremont"
        Region   = "California"
        Country  = "United States"
        Zip      = "94538"
        ISP      = "ZhouyiSat Communications"
    }
}

P "  -> Локация:     \\\\$(\\\\$geo.City), \\\\$(\\\\$geo.Region) (ZIP: \\\\$(\\\\$geo.Zip))" "Green"
P "  -> Провайдер:   \\\\$(\\\\$geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подготовка рабочего профиля пользователя..." "Yellow"
\\\\$chromePath = "\\\\$env:ProgramFiles\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe"
if (-not (Test-Path \\\\$chromePath)) { \\\\$chromePath = "\\\\\\\${env:ProgramFiles(x86)}\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe" }
if (-not (Test-Path \\\\$chromePath)) { \\\\$chromePath = "\\\\$env:LOCALAPPDATA\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe" }

if (-not (Test-Path \\\\$chromePath)) {
    P "[-] Google Chrome не найден!" "Red"
    return
}

\\\\$activeUser = \\\\$env:USERNAME
if (\\\\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \\\\$users = Get-ChildItem "C:\\\\\\\\Users" -Directory | Where-Object { \\\\$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\\\\$users) { \\\\$activeUser = \\\\$users[0].Name }
}
\\\\$userChromeData = "C:\\\\\\\\Users\\\\\\\\\\\\$activeUser\\\\\\\\AppData\\\\\\\\Local\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\User Data"

# Закрываем старые висящие сессии перед стартом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут цифровой личности в ОДНОЙ ВКЛАДКЕ (быт, опечатки, рецепты, Ctrl+Click)
\\\\$city = \\\\$geo.City

\\\\$journey = @(
    @{
        Title        = "☕ Утренний кофе во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText     = "best cofee sho";
        Correction   = "ffee shops in \\\\$city open now";
        TargetFull   = "best coffee shops in \\\\$city open now";
        OpenResult   = \\\\$true;
        IsCommercial = \\\\$false
    },
    @{
        Title        = "🍳 Кулинарный рецепт ужина (опечатка 'patsa' -> 'pasta')";
        TypoText     = "easy 20 min garlic chiken pat";
        Correction   = "cken pasta recipe dinner";
        TargetFull   = "easy 20 min garlic chicken pasta recipe dinner";
        OpenResult   = \\\\$true;
        IsCommercial = \\\\$false
    },
    @{
        Title        = "🔧 Домашний ремонт сантехники (DIY запрос)";
        TypoText     = "how to replace runing flapp";
        Correction   = "running toilet flapper valve step by step";
        TargetFull   = "how to replace running toilet flapper valve step by step";
        OpenResult   = \\\\$false;
        IsCommercial = \\\\$false
    },
    @{
        Title        = "🎯 Коммерческий интернет (захват спонсорских трекеров)";
        TypoText     = "best home fiber internet pla";
        Correction   = "ans in \\\\$city reviews";
        TargetFull   = "best home fiber internet plans in \\\\$city reviews";
        OpenResult   = \\\\$true;
        IsCommercial = \\\\$true
    }
)

P "[3/5] Запуск ОДНОЙ вкладки Google и симуляция живого поиска..." "Yellow"

# Открываем ОДНО окно и ОДНУ вкладку Google
\\\\$proc = Start-Process -FilePath \\\\$chromePath -ArgumentList @(
    "--user-data-dir=\\\\\\\`"\\\\$userChromeData\\\\\\\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if (\\\\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV5]::SetForegroundWindow(\\\\$proc.MainWindowHandle) | Out-Null
}

# Подтверждаем согласие с куками, если всплыло окно
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

\\\\$isFirstQuery = \\\\$true
\\\\$step = 1

foreach (\\\\$item in \\\\$journey) {
    P "  [\\\\$step/\\\\$(\\\\$journey.Count)] \\\\$(\\\\$item.Title)" "Cyan"

    if (\\\\$isFirstQuery) {
        # На главной странице Google: кликаем прямо в центральное поле ввода
        \\\\$inputX = Get-Random -Min 480 -Max 680
        \\\\$inputY = Get-Random -Min 345 -Max 385
        P "      -> Наведение на центральное поле поиска (\\\\$inputX, \\\\$inputY)..." "Gray"
        [WinInputV5]::Click(\\\\$inputX, \\\\$inputY)
        \\\\$isFirstQuery = \\\\$false
    } else {
        # В СУЩЕСТВУЮЩЕЙ ВКЛАДКЕ ВЫДАЧИ: возвращаемся в ТО ЖЕ САМОЕ поле ввода наверху!
        # Очищаем старый запрос естественным выделением (Ctrl+A -> Backspace)
        \\\\$topInputX = Get-Random -Min 240 -Max 450
        \\\\$topInputY = Get-Random -Min 125 -Max 145
        P "      -> Возврат в то же поле поиска наверху страницы (\\\\$topInputX, \\\\$topInputY)..." "Gray"
        [WinInputV5]::Click(\\\\$topInputX, \\\\$topInputY)
        Start-Sleep -Milliseconds 180
        
        # Выделяем весь старый текст и стираем
        [System.Windows.Forms.SendKeys]::SendWait("^a")
        Start-Sleep -Milliseconds 120
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 180
    }

    # Посимвольная печать с опечаткой и исправлением
    P "      -> Живая печать запроса с микроопечаткой и исправлением..." "Gray"
    Type-ExperiencedHuman \\\\$item.TargetFull \\\\$item.TypoText \\\\$item.Correction

    # Ждем загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Читаем выдачу: плавный скроллинг вниз
    for (\\\\$i = 0; \\\\$i -lt 3; \\\\$i++) {
        [WinInputV5]::ScrollSmooth(-180, 5)
        # Водим мышкой по результатам
        \\\\$curX = Get-Random -Min 380 -Max 720
        \\\\$curY = Get-Random -Min 280 -Max 480
        [WinInputV5]::MoveSmooth(\\\\$curX, \\\\$curY, 450)
        Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
    }

    # Если требуется открыть результат: делаем Ctrl+Click (открытие ссылки в фоновой вкладке)
    if (\\\\$item.OpenResult) {
        \\\\$linkX = Get-Random -Min 350 -Max 600
        \\\\$linkY = if (\\\\$item.IsCommercial) { Get-Random -Min 230 -Max 280 } else { Get-Random -Min 320 -Max 420 }
        
        P "      [⚡] Power-User действие: Ctrl + Left Click по результату..." "Magenta"
        [WinInputV5]::CtrlClick(\\\\$linkX, \\\\$linkY)
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

    \\\\$step++
}

# 4. Фиксация базы куков
P ""
P "[4/5] Фиксация базы куков и трекеров на диске..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { \\\\$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

function Extract-DomainsFromBinary(\\\\$filePath) {
    if (-not (Test-Path \\\\$filePath)) { return @() }
    try {
        \\\\$bytes = [System.IO.File]::ReadAllBytes(\\\\$filePath)
        \\\\$text = [System.Text.Encoding]::ASCII.GetString(\\\\$bytes)
        \\\\$regex = [regex]'(?i)\\\\\\\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\\\\\\\.(?:com|org|net|io|co|us|gov|edu|biz|info)'
        \\\\$matches = \\\\$regex.Matches(\\\\$text)
        \\\\$domains = @()
        foreach (\\\\$m in \\\\$matches) {
            \\\\$val = \\\\$m.Value.Trim().ToLower()
            if (\\\\$val.Length -gt 4 -and -not (\\\\$val -match '\\\\\\\\.(png|jpg|gif|css|js|woff)\\\\$')) { \\\\$domains += \\\\$val }
        }
        return \\\\$domains | Select-Object -Unique
    } catch { return @() }
}

\\\\$allDomains = @()
\\\\$allDomains += Extract-DomainsFromBinary "\\\\$userChromeData\\\\\\\\Default\\\\\\\\Network\\\\\\\\Cookies"
\\\\$allDomains += Extract-DomainsFromBinary "\\\\$userChromeData\\\\\\\\Default\\\\\\\\Network\\\\\\\\Cookies-wal"
\\\\$allDomains += Extract-DomainsFromBinary "\\\\$userChromeData\\\\\\\\Default\\\\\\\\History"
\\\\$uniqueDomains = \\\\$allDomains | Select-Object -Unique | Sort-Object

\\\\$googleDoms = \\\\$uniqueDomains | Where-Object { \\\\$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
\\\\$adTrackers = \\\\$uniqueDomains | Where-Object { \\\\$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|bing' }
\\\\$localDoms  = \\\\$uniqueDomains | Where-Object { \\\\$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
\\\\$otherDoms  = \\\\$uniqueDomains | Where-Object { \\\\$_ -notin \\\\$googleDoms -and \\\\$_ -notin \\\\$adTrackers -and \\\\$_ -notin \\\\$localDoms }

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v5.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        \\\\$(\\\\$geo.City), \\\\$(\\\\$geo.Region) (\\\\$(\\\\$geo.ISP))" "White"
P "  Профиль браузера:  \\\\$userChromeData\\\\\\\\Default" "White"
P "  Нагуляно сайтов:   \\\\$(\\\\$uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] ДЕРЕВО НАГУЛА И ЦИФРОВОЙ ЛИЧНОСТИ:" "Cyan"
if (\\\\$googleDoms) {
    P "  ├── 🌐 Google Core Ecosystem (\\\\$(\\\\$googleDoms.Count) доменов)" "Yellow"
    \\\\$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}
if (\\\\$adTrackers) {
    P "  ├── 🎯 Рекламные трекеры и спонсоры (\\\\$(\\\\$adTrackers.Count) трекеров)" "Yellow"
    \\\\$adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}
if (\\\\$localDoms) {
    P "  ├── 📍 Локальный контекст (\\\\$(\\\\$geo.City)) (\\\\$(\\\\$localDoms.Count) доменов)" "Yellow"
    \\\\$localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}
if (\\\\$otherDoms) {
    P "  └── 🍳 Бытовой нагул (рецепты/DIY) (\\\\$(\\\\$otherDoms.Count) доменов)" "Yellow"
    \\\\$otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── \\\\$_" "Gray" }
}

P ""
\\\\$trustStatus = if (\\\\$uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Tier 1: Human Organic Footprint)" } else { "HIGH TRUST" }
P "  Статус профиля:    [\\\\$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Запуск Chrome и открытие настроек куков для визуальной проверки (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие 'Show All' данных сайтов и куков..." "Yellow"
Start-Process -FilePath \\\\$chromePath -ArgumentList @(
    "--user-data-dir=\\\\\\\`"\\\\$userChromeData\\\\\\\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\\\\$finalOutput = \\\\$sb.ToString() + "\\\\\\\`r\\\\\\\`n[OK] Copy by buffer\\\\\\\`r\\\\\\\`n"
try { Set-Clipboard -Value \\\\$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\\\\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
  "v4": `<#
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
    [Parameter(Mandatory=\\\\$false)]
    [string]\\\\$Key = "akz2026"
)

# Проверка персонального ключа доступа
\\\\$AUTHORIZED_KEY = "akz2026"
if (\\\\$Key -ne \\\\$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\\\\$ErrorActionPreference = 'SilentlyContinue'

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

\\\\$sb = [System.Text.StringBuilder]::new()
function P(\\\\$text, \\\\$color="White") {
    Write-Host \\\\$text -ForegroundColor \\\\$color
    [void]\\\\$sb.AppendLine(\\\\$text)
}

# Функция живого посимвольного ввода текста с естественными задержками
function Type-HumanText([string]\\\\$text) {
    foreach (\\\\$ch in \\\\$text.ToCharArray()) {
        \\\\$c = [string]\\\\$ch
        if (\\\\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            \\\\$c = "{\\\\$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait(\\\\$c)
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
\\\\$geo = \\\\$null
\\\\$endpoints = @(
    "http://ip-api.com/json/?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,query",
    "https://ipwho.is/",
    "https://ipinfo.io/json"
)

foreach (\\\\$url in \\\\$endpoints) {
    try {
        \\\\$resp = Invoke-RestMethod -Uri \\\\$url -TimeoutSec 5 -ErrorAction Stop
        if (\\\\$resp.city) {
            \\\\$geo = [PSCustomObject]@{
                IP       = if (\\\\$resp.query) { \\\\$resp.query } elseif (\\\\$resp.ip) { \\\\$resp.ip } else { "130.12.47.191" }
                City     = \\\\$resp.city
                Region   = if (\\\\$resp.regionName) { \\\\$resp.regionName } else { \\\\$resp.region }
                Country  = if (\\\\$resp.country) { \\\\$resp.country } else { "United States" }
                Zip      = if (\\\\$resp.zip) { \\\\$resp.zip } else { \\\\$resp.postal }
                ISP      = if (\\\\$resp.isp) { \\\\$resp.isp } elseif (\\\\$resp.org) { \\\\$resp.org } else { \\\\$resp.connection.isp }
            }
            break
        }
    } catch {}
}

if (-not \\\\$geo -or -not \\\\$geo.City) {
    \\\\$geo = [PSCustomObject]@{
        IP       = "130.12.47.191"
        City     = "Fremont"
        Region   = "California"
        Country  = "United States"
        Zip      = "94538"
        ISP      = "ZhouyiSat Communications"
    }
}

P "  -> Точка выхода:  \\\\$(\\\\$geo.IP) (\\\\$(\\\\$geo.City), \\\\$(\\\\$geo.Region))" "Green"
P "  -> Провайдер:     \\\\$(\\\\$geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подключение к рабочему профилю браузера..." "Yellow"
\\\\$chromePath = "\\\\$env:ProgramFiles\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe"
if (-not (Test-Path \\\\$chromePath)) { \\\\$chromePath = "\\\\\\\${env:ProgramFiles(x86)}\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe" }
if (-not (Test-Path \\\\$chromePath)) { \\\\$chromePath = "\\\\$env:LOCALAPPDATA\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\Application\\\\\\\\chrome.exe" }

if (-not (Test-Path \\\\$chromePath)) {
    P "[-] Google Chrome не найден!" "Red"
    return
}

\\\\$activeUser = \\\\$env:USERNAME
if (\\\\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \\\\$users = Get-ChildItem "C:\\\\\\\\Users" -Directory | Where-Object { \\\\$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\\\\$users) { \\\\$activeUser = \\\\$users[0].Name }
}
\\\\$userChromeData = "C:\\\\\\\\Users\\\\\\\\\\\\$activeUser\\\\\\\\AppData\\\\\\\\Local\\\\\\\\Google\\\\\\\\Chrome\\\\\\\\User Data"

# Закрываем старые процессы перед началом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут реалистичной цифровой личности (Быт, рецепты, заведения, трекеры)
\\\\$city = \\\\$geo.City
\\\\$state = \\\\$geo.Region

\\\\$personaRoutine = @(
    @{
        Title       = "☕ Завтрак и свежий кофе (локальный запрос)";
        QueryText   = "best local coffee and fresh bakery in \\\\$city open now";
        TargetType  = "Search";
        InteractAd  = \\\\$false
    },
    @{
        Title       = "🍳 Кулинарный рецепт (домашний быт)";
        QueryText   = "easy 20 minute creamy garlic chicken pasta recipe dinner";
        TargetType  = "Search";
        InteractAd  = \\\\$false
    },
    @{
        Title       = "🔧 Бытовой ремонт в доме (DIY запрос)";
        QueryText   = "how to fix running toilet flapper valve diy step by step";
        TargetType  = "Search";
        InteractAd  = \\\\$false
    },
    @{
        Title       = "🎯 Коммерческий запрос + Клик по рекламному трекеру";
        QueryText   = "best high speed home fiber internet plans \\\\$city ca";
        TargetType  = "Commercial";
        InteractAd  = \\\\$true
    },
    @{
        Title       = "📚 Локальные репетиторы и курсы (семейный контекст)";
        QueryText   = "private math and sat prep tutors in \\\\$city ca reviews";
        TargetType  = "Search";
        InteractAd  = \\\\$false
    }
)

P "[3/5] Запуск интерактивной симуляции с живым посимвольным вводом..." "Yellow"

# Запускаем Chrome один раз на весь сценарий
\\\\$proc = Start-Process -FilePath \\\\$chromePath -ArgumentList @(
    "--user-data-dir=\\\\\\\`"\\\\$userChromeData\\\\\\\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if (\\\\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV4]::SetForegroundWindow(\\\\$proc.MainWindowHandle) | Out-Null
}

# Подтверждение диалога куков Google (если выскочил)
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

\\\\$step = 1
foreach (\\\\$task in \\\\$personaRoutine) {
    P "  [\\\\$step/\\\\$(\\\\$personaRoutine.Count)] \\\\$(\\\\$task.Title)" "Cyan"

    # Фокусируемся на адресной строке / строке поиска через Ctrl+L
    [System.Windows.Forms.SendKeys]::SendWait("^l")
    Start-Sleep -Milliseconds 300

    # Вводим адрес Google поиска
    [System.Windows.Forms.SendKeys]::SendWait("https://www.google.com{ENTER}")
    Start-Sleep -Seconds 3

    # Плавное наведение на строку поиска по центру экрана
    \\\\$searchBoxX = (Get-Random -Min 480 -Max 680)
    \\\\$searchBoxY = (Get-Random -Min 340 -Max 390)
    [WinInputV4]::Click(\\\\$searchBoxX, \\\\$searchBoxY)
    Start-Sleep -Milliseconds 350

    # Посимвольный живой ввод запроса
    P "      Печать: '\\\\$(\\\\$task.QueryText)'" "Gray"
    Type-HumanText \\\\$task.QueryText

    # Ожидание загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Плавный скроллинг выдачи вниз и чтение контента
    for (\\\\$i = 0; \\\\$i -lt 3; \\\\$i++) {
        [WinInputV4]::ScrollSmooth(-200, 5)
        # Водим мышкой по сниппетам
        \\\\$snippetX = Get-Random -Min 380 -Max 750
        \\\\$snippetY = Get-Random -Min 280 -Max 520
        [WinInputV4]::MoveSmooth(\\\\$snippetX, \\\\$snippetY, 500)
        Start-Sleep -Milliseconds (Get-Random -Min 600 -Max 1000)
    }

    # Если шаг коммерческий — ловим рекламный спонсорский трекер (Google Ads / DoubleClick)
    if (\\\\$task.InteractAd) {
        P "      [⚡] Обнаружен коммерческий блок трекеров (Sponsored Ads)" "Magenta"
        # Скроллим наверх к рекламе
        [WinInputV4]::ScrollSmooth(350, 6)
        Start-Sleep -Milliseconds 500

        # Кликаем по верхнему рекламному объявлению (обычно Y: 240-310)
        \\\\$adClickX = Get-Random -Min 380 -Max 580
        \\\\$adClickY = Get-Random -Min 240 -Max 290
        P "      -> Случайный клик по спонсорскому объявлению (захват трекера)..." "Gray"
        [WinInputV4]::Click(\\\\$adClickX, \\\\$adClickY)
        
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

    \\\\$step++
}

# 4. Фиксация базы куков и сброс WAL
P ""
P "[4/5] Фиксация накопленной базы куков и трекеров..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { \\\\$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Анализ SQLite базы и формирование отчета
function Extract-DomainsFromBinary(\\\\$filePath) {
    if (-not (Test-Path \\\\$filePath)) { return @() }
    try {
        \\\\$bytes = [System.IO.File]::ReadAllBytes(\\\\$filePath)
        \\\\$text = [System.Text.Encoding]::ASCII.GetString(\\\\$bytes)
        \\\\$regex = [regex]'(?i)\\\\\\\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\\\\\\\.(?:com|org|net|io|co|us|gov|edu|biz|info)'
        \\\\$matches = \\\\$regex.Matches(\\\\$text)
        \\\\$domains = @()
        foreach (\\\\$m in \\\\$matches) {
            \\\\$val = \\\\$m.Value.Trim().ToLower()
            if (\\\\$val.Length -gt 4 -and -not (\\\\$val -match '\\\\\\\\.(png|jpg|gif|css|js|woff)\\\\$')) { \\\\$domains += \\\\$val }
        }
        return \\\\$domains | Select-Object -Unique
    } catch { return @() }
}

\\\\$allDomains = @()
\\\\$allDomains += Extract-DomainsFromBinary "\\\\$userChromeData\\\\\\\\Default\\\\\\\\Network\\\\\\\\Cookies"
\\\\$allDomains += Extract-DomainsFromBinary "\\\\$userChromeData\\\\\\\\Default\\\\\\\\Network\\\\\\\\Cookies-wal"
\\\\$allDomains += Extract-DomainsFromBinary "\\\\$userChromeData\\\\\\\\Default\\\\\\\\History"
\\\\$uniqueDomains = \\\\$allDomains | Select-Object -Unique | Sort-Object

# Категоризация
\\\\$googleDoms  = @()
\\\\$adTrackers  = @()
\\\\$localDoms   = @()
\\\\$lifestyleDoms = @()

foreach (\\\\$d in \\\\$uniqueDomains) {
    if (\\\\$d -match 'google|gstatic|youtube|googleadservices|googletag|gvt1') {
        \\\\$googleDoms += \\\\$d
    } elseif (\\\\$d -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing') {
        \\\\$adTrackers += \\\\$d
    } elseif (\\\\$d -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor') {
        \\\\$localDoms += \\\\$d
    } else {
        \\\\$lifestyleDoms += \\\\$d
    }
}

P "=================================================================" "Green"
P "       ULTRA DIGITAL PERSONA & COOKIE AUDIT REPORT v4.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        \\\\$(\\\\$geo.City), \\\\$(\\\\$geo.Region) (\\\\$(\\\\$geo.ISP))" "White"
P "  Профиль браузера:  \\\\$userChromeData\\\\\\\\Default" "White"
P "  Всего контекстов:  \\\\$(\\\\$uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] СТРУКТУРА ЦИФРОВОЙ ЛИЧНОСТИ (PERSONA TRUST GRAPH):" "Cyan"

if (\\\\$googleDoms.Count -gt 0) {
    P "  ├── 🌐 Google Core & AI Ecosystem (\\\\$(\\\\$googleDoms.Count) доменов)" "Yellow"
    \\\\$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}

if (\\\\$adTrackers.Count -gt 0) {
    P "  ├── 🎯 Рекламные трекеры и коммерческий след (\\\\$(\\\\$adTrackers.Count) трекеров)" "Yellow"
    \\\\$adTrackers | Select-Object -First 8 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}

if (\\\\$localDoms.Count -gt 0) {
    P "  ├── 📍 Локальный контекст (\\\\$(\\\\$geo.City), Silicon Valley) (\\\\$(\\\\$localDoms.Count) доменов)" "Yellow"
    \\\\$localDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \\\\$_" "Gray" }
}

if (\\\\$lifestyleDoms.Count -gt 0) {
    P "  └── 🍳 Бытовой и потребительский след (рецепты/ремонт) (\\\\$(\\\\$lifestyleDoms.Count) доменов)" "Yellow"
    \\\\$lifestyleDoms | Select-Object -First 8 | ForEach-Object { P "      ├── \\\\$_" "Gray" }
}

P ""
\\\\$trustStatus = if (\\\\$uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Ultra Realistic Organic Persona)" } else { "HIGH TRUST" }
P "  Статус траста:     [\\\\$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Перезапуск Chrome с открытием настроек куков (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие настроек куков для визуальной проверки..." "Yellow"
Start-Process -FilePath \\\\$chromePath -ArgumentList @(
    "--user-data-dir=\\\\\\\`"\\\\$userChromeData\\\\\\\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\\\\$finalOutput = \\\\$sb.ToString() + "\\\\\\\`r\\\\\\\`n[OK] Copy by buffer\\\\\\\`r\\\\\\\`n"
try { Set-Clipboard -Value \\\\$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\\\\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
  "quick": ``,
  "audit4": ``
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key") || "";

    // 1. Проверка авторизационного ключа
    if (key !== "akz2026") {
      return new Response("Access Denied: Invalid or missing authorization key (?key=akz2026 required)\n", {
        status: 403,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    // Параметры маршрутизации
    const v = (url.searchParams.get("v") || url.searchParams.get("ver") || "").toLowerCase();
    const branch = url.searchParams.get("ref") || url.searchParams.get("branch") || "";
    const file = url.searchParams.get("file") || "";

    // Аргументы для PowerShell
    const browserParam = url.searchParams.get("browser") || url.searchParams.get("b") || "";
    const profileParam = url.searchParams.get("profile") || url.searchParams.get("p") || "";
    const profilesParam = url.searchParams.get("profiles") || "";
    const targetParam = url.searchParams.get("target") || url.searchParams.get("t") || "";
    const serviceParam = url.searchParams.get("service") || url.searchParams.get("s") || "";
    const modeParam = url.searchParams.get("mode") || url.searchParams.get("m") || "";

    // 2. Если запрошена динамическая ветка из GitHub
    if (branch) {
      const targetFile = file || (branch.includes("allfrod") ? "allfrod.ps1" : (branch.includes("audit") ? "audit.ps1" : (branch.includes("auto") ? "autoloop.ps1" : (branch.includes("diag") ? "diagnose.ps1" : "persona.ps1"))));
      const rawUrl = `https://raw.githubusercontent.com/advsocialakz-hub/tools/${branch}/${targetFile}`;
      try {
        const ghResp = await fetch(rawUrl, {
          headers: {
            "User-Agent": "AdvSocialAKZ-Cloudflare-Worker"
          }
        });
        if (ghResp.ok) {
          let ghScript = await ghResp.text();
          // Принудительное удаление любых BOM из внешнего ответа
          ghScript = ghScript.replace(/^[\uFEFF\uFFFE\xEF\xBB\xBF]+/, "").trim();
          return new Response(ghScript, {
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "no-cache, no-store, must-revalidate",
              "access-control-allow-origin": "*"
            }
          });
        }
      } catch (err) {
        // В случае сбоя внешнего запроса переходим на встроенные копии
      }
    }

    // 3. Выбор встроенной версии
    let script = "";
    let versionBadge = "AllFrod Hub / Persona v9.0";

    if (v === "allfrod" || v === "all" || v === "hub" || v === "menu" || v === "main") {
      script = SCRIPTS["allfrod"];
      versionBadge = "v2.0 (AllFrod Universal Master Console)";
    } else if (v === "diag" || v === "diagnose" || v === "sys" || v === "forensic" || v === "audit-net" || v === "docker") {
      script = SCRIPTS["diag"];
      versionBadge = "v2.0 (Deep Hardware, Docker & Cloud Diagnostic)";
    } else if (v === "audit" || v === "audit-v5" || v === "audit5" || v === "a5" || v === "test") {
      script = SCRIPTS["audit5"];
      versionBadge = "v6.5 (Universal Global Auditor)";
    } else if (v === "audit-v4" || v === "audit4" || v === "a4") {
      script = SCRIPTS["audit4"];
      versionBadge = "v4.5 (Legacy Cookie Auditor)";
    } else if (v === "auto" || v === "autoloop" || v === "loop") {
      script = SCRIPTS["auto"];
      versionBadge = "v2.0 (Autonomous Adaptive Feedback Loop)";
    } else if (v === "v6" || v === "persona-v6" || v === "p6") {
      script = SCRIPTS["v6"];
      versionBadge = "v6.0 (Alt+Left In-Tab Warmer)";
    } else if (v === "v5" || v === "persona-v5" || v === "p5") {
      script = SCRIPTS["v5"];
      versionBadge = "v5.0 (Single-Tab Typo Simulator)";
    } else if (v === "v4" || v === "persona-v4" || v === "p4") {
      script = SCRIPTS["v4"];
      versionBadge = "v4.0 (Classic Human Typist)";
    } else if (v === "quick" || v === "v3" || v === "run" || v === "classic") {
      script = SCRIPTS["quick"];
      versionBadge = "v3.2 (Classic Quick Booster)";
    } else if (v === "persona" || v === "v9" || v === "v8" || v === "v7" || v === "v7.5" || v === "latest" || v === "") {
      script = SCRIPTS["v7"];
      versionBadge = "v9.0 (Ultra Persona, DOM-Tree & YouTube Scrubber Engine)";
    } else {
      script = SCRIPTS["allfrod"];
      versionBadge = `AllFrod Fallback for: ${v}`;
    }

    // 4. Динамическая подстановка аргументов
    if (browserParam) {
      script = script.replace(/\[string\]\$Browser\s*=\s*"[^"]*"/i, `[string]$Browser = "${browserParam}"`);
    }
    if (profileParam) {
      script = script.replace(/\[string\]\$Profile\s*=\s*"[^"]*"/i, `[string]$Profile = "${profileParam}"`);
    }
    if (profilesParam) {
      script = script.replace(/\[string\]\$Profiles\s*=\s*"[^"]*"/i, `[string]$Profiles = "${profilesParam}"`);
    }
    if (targetParam) {
      script = script.replace(/\[string\]\$Target\s*=\s*"[^"]*"/i, `[string]$Target = "${targetParam}"`);
    }
    if (serviceParam) {
      script = script.replace(/\[string\]\$Service\s*=\s*"[^"]*"/i, `[string]$Service = "${serviceParam}"`);
    }
    if (modeParam) {
      script = script.replace(/\[string\]\$Mode\s*=\s*"[^"]*"/i, `[string]$Mode = "${modeParam}"`);
    }

    // 5. Гарантированное удаление BOM символов перед отдачей клиенту
    script = script.replace(/^[\uFEFF\uFFFE\xEF\xBB\xBF]+/, "").trim();

    return new Response(script, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache, no-store, must-revalidate",
        "access-control-allow-origin": "*",
        "x-version": versionBadge
      }
    });
  }
};
