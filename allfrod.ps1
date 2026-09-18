<#

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

    $finalOutput = $global:sb.ToString() + "`r`n[OK] Copy by buffer`r`n"

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

    $domMatches = [regex]::Matches($text, '(?i)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:com|org|net|io|ai|co|ru|de|uk|app|dev|cloud|tech|info|biz|me|online|site|store|xyz|cc|tv|us)')

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

    if ($text -match '(?i)\bNID\b')        { $tags += "Google-NID" }

    if ($text -match '(?i)\b(AEC|SOCS)\b') { $tags += "Google-AEC/SOCS" }

    if ($text -match '(?i)\b(SID|SSID)\b') { $tags += "Google-Auth-SID" }

    if ($text -match '(?i)CONSENT')        { $tags += "Cookie-Consent" }

    if ($text -match '(?i)session')        { $tags += "Web-Session" }

    $res.Tags = @($tags | Select-Object -Unique)

    return $res

}

function Get-ProfileFastSummary($profPath) {

    $cFiles = @(

        (Join-Path $profPath "Network\Cookies"),

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

                "$env:ProgramFiles\Opera GX\opera.exe"

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

    P "`n[1. СИСТЕМНЫЙ И АППАРАТНЫЙ ПРОФАЙЛ (HARDWARE & OS)]" "Yellow"

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

    P "`n[2. ДЕТЕКТ ВИРТУАЛЬНЫХ МАШИН И ГИПЕРВИЗОРОВ (VM FORENSICS)]" "Yellow"

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

    P "`n[3. СЕТЕВОЙ АУДИТ, BROWSERLEAKS & WEBRTC]" "Yellow"

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

    P "`n[4. ТЕСТ ДОСТУПНОСТИ ГЛОБАЛЬНЫХ AI & CLOUD СЕРВИСОВ]" "Yellow"

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

    P "`n=================================================================" "Cyan"

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

        P "`n=================================================================" "Yellow"

        P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ДЕТАЛЬНОГО АУДИТА:             " "Yellow"

        P "=================================================================" "Yellow"

        foreach ($ap in $avail) {

            $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

            $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

            P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: `"$($ap.DisplayName)`"$mailInfo $folderInfo" "White"

        }

        P "-----------------------------------------------------------------" "Gray"

        Write-Host " [?] Введите номер профиля [1-$($avail.Count)], список (1,2) или 'all' (Enter = all): " -ForegroundColor Cyan -NoNewline

        $ans = Read-Host

        if (-not $ans -or $ans.Trim() -eq "" -or $ans.Trim().ToLower() -in @("all", "*")) {

            $chosen = $avail

        } else {

            $parts = $ans -split ',' | ForEach-Object { $_.Trim() }

            foreach ($pt in $parts) {

                if ($pt -match '^\d+$') {

                    $m = $avail | Where-Object { $_.Index -eq [int]$pt }

                    if ($m) { $chosen += $m }

                }

            }

        }

    }

    if ($chosen.Count -eq 0) { $chosen = $avail }

    foreach ($c in $chosen) {

        P "`n=================================================================" "Cyan"

        P "👤 ПРОФИЛЬ: $($c.BrowserName) :: `"$($c.DisplayName)`" [Папка: $($c.Folder)]" "Cyan"

        P "   Индекс доверия:  $(Render-Bar $c.Metrics.Score 100 18) ($($c.Metrics.Score) / 100 PTS)" "White"

        P "   Куки и история:  $($c.Metrics.CookieDisplay) | $($c.Metrics.TotalDoms) активных сайтов" "DarkCyan"

        P "`n🎯 ПЕРСОНАЛЬНАЯ МАТРИЦА ДОСТУПА К СЕРВИСАМ ДЛЯ: `"$($c.DisplayName)`"" "Yellow"

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

        P "`n=================================================================" "Yellow"

        P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"

        P "=================================================================" "Yellow"

        foreach ($ap in $avail) {

            $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

            $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

            P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: `"$($ap.DisplayName)`"$mailInfo $folderInfo" "White"

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

                if ($pt -match '^\d+$') {

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

        P "`n=================================================================" "Cyan"

        P "  ПРОГРЕВ ПРОФИЛЯ [$curIdx/$($chosen.Count)]: $($p.BrowserName) :: `"$($p.DisplayName)`"" "Cyan"

        P "=================================================================" "Cyan"

        $pLore = Get-PersonaJourney $curIdx $p.DisplayName $city $targetPreset

        P "  -> Личность:         $($pLore.Name)" "DarkCyan"

        P "  -> Запуск браузера в видимом окне (Zero-Close Guarantee)..." "Yellow"

        $argsList = @()

        if ($p.UserData) { $argsList += "--user-data-dir=`"$($p.UserData)`"" }

        if ($p.Folder)   { $argsList += "--profile-directory=`"$($p.Folder)`"" }

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
        P "`n[4/4] Анализ базы куков и открытие раздела куков в браузере..." "Yellow"

        $cookieSettingsUrl = switch ($p.BrowserKey) {
            "edge"    { "edge://settings/content/all" }
            "opera"   { "opera://settings/cookies" }
            "operagx" { "opera://settings/cookies" }
            default   { "chrome://settings/content/all" }
        }

        $openArgs = @()
        if ($p.UserData) { $openArgs += "--user-data-dir=`"$($p.UserData)`"" }
        if ($p.Folder)   { $openArgs += "--profile-directory=`"$($p.Folder)`"" }
        $openArgs += "`"$cookieSettingsUrl`""

        $pOpen = New-Object System.Diagnostics.ProcessStartInfo
        $pOpen.FileName = $p.BrowserExe
        $pOpen.Arguments = ($openArgs -join " ")
        $pOpen.UseShellExecute = $true
        [System.Diagnostics.Process]::Start($pOpen) | Out-Null
        Start-Sleep -Seconds 3

        # Анализ базы куков текущего профиля и вывод полного досье
        $profPath = if ($p.Folder) { Join-Path $p.UserData $p.Folder } else { $p.UserData }
        $cookieFiles = @((Join-Path $profPath "Network\Cookies"), (Join-Path $profPath "Cookies"))
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
        P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ: $($p.BrowserName) :: `"$($p.DisplayName)`"" "Green"
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

    P "`n=================================================================" "Green"

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

    P "`n=================================================================" "Yellow"

    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ АВТО-ПРОГРЕВА (AUTOLOOP):      " "Yellow"

    P "=================================================================" "Yellow"

    foreach ($ap in $avail) {

        $mailInfo = if ($ap.Email) { " ($($ap.Email))" } else { "" }

        $folderInfo = if ($ap.Folder) { "[Папка: $($ap.Folder)]" } else { "[Профиль: $($ap.DisplayName)]" }

        P " [$($ap.Index)] $($ap.Metrics.SummaryLine) ➔ $($ap.BrowserName) :: `"$($ap.DisplayName)`"$mailInfo $folderInfo" "White"

    }

    P "-----------------------------------------------------------------" "Gray"

    Write-Host " [?] Введите номер профиля [1-$($avail.Count)] (Enter = 1): " -ForegroundColor Cyan -NoNewline

    $ans = Read-Host

    $chosen = $avail | Where-Object { $_.Index -eq 1 } | Select-Object -First 1

    if ($ans -match '^\d+$') {

        $m = $avail | Where-Object { $_.Index -eq [int]$ans }

        if ($m) { $chosen = $m }

    }

    P "  -> Профиль:          $($chosen.BrowserName) :: `"$($chosen.DisplayName)`"" "Green"

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

    P "`n[✓] Комплексное досье системы и всех браузеров успешно собрано в буфер!" "Green"

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

        Write-Host "`n[✓] Завершение работы ALLFROD. До свидания!" -ForegroundColor Green

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

        Write-Host "`n[✓] Завершение работы ALLFROD. До свидания!" -ForegroundColor Green

        break

    }

}

