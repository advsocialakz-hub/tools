export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const validKey = env.AUTH_KEY || "akz2026";

    // Проверка ключа авторизации
    if (!key || key !== validKey) {
      return new Response("[-] 403 Forbidden: Invalid or missing authorization key.\nAccess Denied.\n", {
        status: 403,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store"
        }
      });
    }

    const v = (url.searchParams.get("v") || "").toLowerCase();
    const path = url.pathname.toLowerCase();

    // Параметры браузера и профилей
    const browserParam = url.searchParams.get("b") || url.searchParams.get("browser") || "Chrome";
    const profileParam = url.searchParams.get("p") || url.searchParams.get("profile") || url.searchParams.get("profiles") || "Default";

    let script = "";
    if (v === "audit" || path.includes("audit")) {
      script = `<#
=================================================================
 GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST SCORE AUDITOR v4.8
 - Profile Names & Account Emails Auto-Discovery (Local State)
 - Multi-Browser Audit: Chrome, Edge, Brave, Opera, Yandex
 - Non-Intrusive Locked File Reading (No Browser Close Required)
 - Real-Time Trust Scoring Engine (0 - 100 PTS)
 - Visual ASCII Distribution Graphs & Ecosystem Breakdown
 - Trust Classification: Trusted vs Untrusted Profile Verdict
 - Authorization Key Protected
=================================================================
#>

param(
    [Parameter(Mandatory=\$false)]
    [string]\$Key = "akz2026"
)

# Проверка ключа
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Render-Bar(\$value, \$max, \$width=20) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

function Read-LockedBinarySafe(\$filePath) {
    if (-not (Test-Path \$filePath)) { return \$null }
    \$tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "audit_" + [System.IO.Path]::GetRandomFileName())
    try {
        \$fs = [System.IO.File]::Open(\$filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        \$dest = [System.IO.File]::Create(\$tempCopy)
        \$fs.CopyTo(\$dest)
        \$fs.Close()
        \$dest.Close()
        \$bytes = [System.IO.File]::ReadAllBytes(\$tempCopy)
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$bytes
    } catch {
        Remove-Item -Path \$tempCopy -Force -ErrorAction SilentlyContinue
        return \$null
    }
}

function Extract-DomainsAndTags(\$bytes) {
    if (-not \$bytes -or \$bytes.Length -eq 0) { return @{ Domains = @(); Tags = @() } }
    \$text = [System.Text.Encoding]::ASCII.GetString(\$bytes)
    
    \$domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    \$matches = \$domRegex.Matches(\$text)
    \$domains = @()
    foreach (\$m in \$matches) {
        \$val = \$m.Value.Trim().ToLower()
        if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)\$')) {
            \$domains += \$val
        }
    }
    
    \$tags = @()
    if (\$text -match '(?i)__Secure-') { \$tags += "__Secure-Tokens" }
    if (\$text -match '(?i)CONSENT')   { \$tags += "Cookie-Consent" }
    if (\$text -match '(?i)NID')       { \$tags += "Google-NID" }
    if (\$text -match '(?i)AEC|SOCS')  { \$tags += "Google-AEC/SOCS" }
    if (\$text -match '(?i)IDE')       { \$tags += "DoubleClick-IDE" }
    if (\$text -match '(?i)SID|HSID')  { \$tags += "Google-Auth-SID" }

    return @{
        Domains = (\$domains | Select-Object -Unique);
        Tags    = (\$tags | Select-Object -Unique)
    }
}

function Get-BrowserProfilesMetadata(\$userDataPath) {
    \$meta = @{}
    \$localState = Join-Path \$userDataPath "Local State"
    if (Test-Path \$localState) {
        try {
            \$raw = [System.IO.File]::ReadAllText(\$localState)
            \$json = \$raw | ConvertFrom-Json
            if (\$json.profile -and \$json.profile.info_cache) {
                foreach (\$prop in \$json.profile.info_cache.PSObject.Properties) {
                    \$f = \$prop.Name
                    \$v = \$prop.Value
                    \$name = if (\$v.name) { \$v.name } else { \$f }
                    \$email = if (\$v.user_name) { \$v.user_name } else { "" }
                    \$meta[\$f] = [PSCustomObject]@{
                        Folder = \$f
                        DisplayName = \$name
                        Email = \$email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path \$userDataPath) {
        \$dirs = Get-ChildItem \$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
        foreach (\$d in \$dirs) {
            if (-not \$meta.ContainsKey(\$d.Name)) {
                \$meta[\$d.Name] = [PSCustomObject]@{
                    Folder = \$d.Name
                    DisplayName = \$d.Name
                    Email = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v4.8     " "Cyan"
P "   Automatic Profile Human-Names & Anti-Fraud Graph Analysis     " "DarkCyan"
P "=================================================================" "Cyan"
P ""

\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

P "[1/3] Поиск установленных браузеров и декодирование имён профилей..." "Yellow"
P "  -> Системный пользователь: \$activeUser" "Gray"

\$browserConfigs = @(
    @{
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data"
    },
    @{
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data"
    },
    @{
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data"
    },
    @{
        Name     = "Opera Stable";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable"
    }
)

\$profileCards = @()

foreach (\$b in \$browserConfigs) {
    if (-not (Test-Path \$b.UserData)) { continue }
    
    \$profilesMeta = Get-BrowserProfilesMetadata \$b.UserData
    
    foreach (\$k in \$profilesMeta.Keys) {
        \$meta = \$profilesMeta[\$k]
        \$profPath = Join-Path \$b.UserData \$meta.Folder
        \$profTitle = "\$(\$b.Name) :: \`"\$(\$meta.DisplayName)\`""
        if (\$meta.Email) { \$profTitle += " (\$(\$meta.Email))" }
        \$profTitle += " [Папка: \$(\$meta.Folder)]"

        \$cookieFiles = @(
            (Join-Path \$profPath "Network\\Cookies"),
            (Join-Path \$profPath "Network\\Cookies-wal"),
            (Join-Path \$profPath "Cookies"),
            (Join-Path \$profPath "Cookies-wal")
        )
        \$histFiles = @(
            (Join-Path \$profPath "History"),
            (Join-Path \$profPath "History-wal")
        )

        \$profDomains = @()
        \$profTags    = @()

        foreach (\$cf in \$cookieFiles) {
            \$bytes = Read-LockedBinarySafe \$cf
            if (\$bytes) {
                \$res = Extract-DomainsAndTags \$bytes
                \$profDomains += \$res.Domains
                \$profTags    += \$res.Tags
            }
        }

        \$histCount = 0
        foreach (\$hf in \$histFiles) {
            \$bytes = Read-LockedBinarySafe \$hf
            if (\$bytes) {
                \$res = Extract-DomainsAndTags \$bytes
                \$profDomains += \$res.Domains
                \$histCount += \$res.Domains.Count
            }
        }

        \$uniqueProfDomains = \$profDomains | Select-Object -Unique
        \$uniqueProfTags    = \$profTags | Select-Object -Unique

        \$googleDoms  = \$uniqueProfDomains | Where-Object { \$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
        \$adTrackers  = \$uniqueProfDomains | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing' }
        \$localDoms   = \$uniqueProfDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor' }
        \$lifestyle   = \$uniqueProfDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

        # Расчёт траста
        \$score = 0
        if (\$uniqueProfDomains.Count -gt 35)    { \$score += 25 }
        elseif (\$uniqueProfDomains.Count -gt 20) { \$score += 18 }
        elseif (\$uniqueProfDomains.Count -gt 8)  { \$score += 10 }
        elseif (\$uniqueProfDomains.Count -gt 0)  { \$score += 4 }

        if (\$googleDoms.Count -ge 5) { \$score += 15 }
        elseif (\$googleDoms.Count -ge 1) { \$score += 8 }
        if (\$uniqueProfTags -contains "Google-NID" -or \$uniqueProfTags -contains "Cookie-Consent") { \$score += 5 }
        if (\$uniqueProfTags -contains "__Secure-Tokens" -or \$uniqueProfTags -contains "Google-Auth-SID") { \$score += 5 }

        if (\$adTrackers.Count -ge 4) { \$score += 20 }
        elseif (\$adTrackers.Count -ge 1) { \$score += 12 }

        if (\$localDoms.Count -ge 3) { \$score += 12 }
        elseif (\$localDoms.Count -ge 1) { \$score += 6 }
        if (\$histCount -gt 15) { \$score += 8 }
        elseif (\$histCount -gt 3) { \$score += 4 }

        if (\$lifestyle.Count -ge 5) { \$score += 10 }
        elseif (\$lifestyle.Count -ge 1) { \$score += 5 }

        \$score = [Math]::Min(100, \$score)

        \$verdict = ""
        \$verdictColor = ""
        if (\$score -ge 75) {
            \$verdict = "🟢 ТРАСТОВЫЙ ПРОФИЛЬ (Tier 1: High Trust Organic Persona)"
            \$verdictColor = "Green"
        } elseif (\$score -ge 45) {
            \$verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется вход через YouTube)"
            \$verdictColor = "Yellow"
        } else {
            \$verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - риск запроса номера)"
            \$verdictColor = "Red"
        }

        \$profileCards += [PSCustomObject]@{
            Title       = \$profTitle;
            DisplayName = \$meta.DisplayName;
            Email       = \$meta.Email;
            Folder      = \$meta.Folder;
            Browser     = \$b.Name;
            TotalDoms   = \$uniqueProfDomains.Count;
            GoogleDoms  = \$googleDoms.Count;
            AdTrackers  = \$adTrackers.Count;
            LocalDoms   = \$localDoms.Count;
            Lifestyle   = \$lifestyle.Count;
            Tags        = \$uniqueProfTags;
            Score       = \$score;
            Verdict     = \$verdict;
            VerdictCol  = \$verdictColor;
            GoogleList  = \$googleDoms;
            AdList      = \$adTrackers;
            LocalList   = \$localDoms;
        }
    }
}

P "  -> Обнаружено профилей: \$(\$profileCards.Count)" "Green"
P ""

# 2. Вывод карточек
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА ПО ИМЕНАМ ПРОФИЛЕЙ:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach (\$card in \$profileCards) {
    P "👤 ПРОФИЛЬ: \$(\$card.Title)" "White"
    \$bar = Render-Bar \$card.Score 100 24
    P "   Индекс доверия:  \$bar (\$(\$card.Score) / 100 PTS)" "Cyan"
    P "   Статус:          \$(\$card.Verdict)" \$card.VerdictCol
    P ""
    P "   [+] ГРАФ ЭКОСИСТЕМЫ:" "Yellow"
    P "       ├── 🌐 Google Core:      \$(Render-Bar \$card.GoogleDoms 10 16) (\$(\$card.GoogleDoms) доменов)" "Gray"
    P "       ├── 🎯 Commercial/Ads:   \$(Render-Bar \$card.AdTrackers 6 16) (\$(\$card.AdTrackers) трекеров)" "Gray"
    P "       ├── 📍 Geo & Local:      \$(Render-Bar \$card.LocalDoms 6 16) (\$(\$card.LocalDoms) локаций)" "Gray"
    P "       └── 🍳 Lifestyle/DIY:    \$(Render-Bar \$card.Lifestyle 12 16) (\$(\$card.Lifestyle) сайтов)" "Gray"
    
    if (\$card.Tags.Count -gt 0) {
        P "   [✓] Маркеры безопасности: \$(\$card.Tags -join ' | ')" "DarkCyan"
    } else {
        P "   [-] Маркеры безопасности: НЕ ОБНАРУЖЕНЫ (чистый инкогнито)" "DarkRed"
    }
    P "-----------------------------------------------------------------" "Gray"
}

# 3. Итог
P "[3/3] СВОДНЫЙ ВЕРДИКТ ГОТОВНОСТИ:" "Yellow"
\$trustedOnes = \$profileCards | Where-Object { \$_.Score -ge 70 }
\$mediumOnes  = \$profileCards | Where-Object { \$_.Score -ge 45 -and \$_.Score -lt 70 }
\$bareOnes    = \$profileCards | Where-Object { \$_.Score -lt 45 }

if (\$trustedOnes) {
    P "  🟢 ГОТОВЫ К ВХОДУ В GOOGLE AI STUDIO (Трастовые):" "Green"
    foreach (\$tp in \$trustedOnes) {
        \$mail = if (\$tp.Email) { " <\$(\$tp.Email)>" } else { "" }
        P "     * \$(\$tp.Browser) -> \`"\$(\$tp.DisplayName)\`"\$mail [Папка: \$(\$tp.Folder)]" "Green"
    }
}
if (\$mediumOnes) {
    P "  🟡 ТРЕБУЮТ ВХОДА ЧЕРЕЗ YOUTUBE (Средний траст):" "Yellow"
    foreach (\$mp in \$mediumOnes) {
        \$mail = if (\$mp.Email) { " <\$(\$mp.Email)>" } else { "" }
        P "     * \$(\$mp.Browser) -> \`"\$(\$mp.DisplayName)\`"\$mail [Папка: \$(\$mp.Folder)]" "Yellow"
    }
}
if (\$bareOnes) {
    P "  🔴 НЕТРАСТОВЫЕ (Рекомендуется запустить прогрев):" "Red"
    foreach (\$bp in \$bareOnes) {
        P "     * \$(\$bp.Browser) -> \`"\$(\$bp.DisplayName)\`" [Папка: \$(\$bp.Folder)]" "Red"
    }
}

P "=================================================================" "Cyan"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
    } else if (v === "persona" || path.includes("persona")) {
      script = `<#
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
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Browser = "Chrome",
    [Parameter(Mandatory=\$false)] [string]\$Profiles = "Default"
)

# 1. Проверка лицензионного ключа
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

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

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Type-ExperiencedHuman([string]\$targetText, [string]\$typoText, [string]\$correction) {
    \$textToType = if (\$typoText) { \$typoText } else { \$targetText }
    foreach (\$ch in \$textToType.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 85)
        if ((Get-Random -Min 1 -Max 16) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220) }
    }
    if (\$typoText -and \$correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 340)
        \$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\$b = 0; \$b -lt \$backspacesCount; \$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 110)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 180)
        foreach (\$ch in \$correction.ToCharArray()) {
            \$c = [string]\$ch
            if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
            [System.Windows.Forms.SendKeys]::SendWait(\$c)
            Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 75)
        }
    }
    Start-Sleep -Milliseconds (Get-Random -Min 250 -Max 450)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}

# Функция извлечения реальных человеческих имен профилей из Local State
function Get-BrowserProfilesMetadata(\$userDataPath) {
    \$meta = @{}
    \$localState = Join-Path \$userDataPath "Local State"
    if (Test-Path \$localState) {
        try {
            \$raw = [System.IO.File]::ReadAllText(\$localState)
            \$json = \$raw | ConvertFrom-Json
            if (\$json.profile -and \$json.profile.info_cache) {
                foreach (\$prop in \$json.profile.info_cache.PSObject.Properties) {
                    \$f = \$prop.Name
                    \$v = \$prop.Value
                    \$name = if (\$v.name) { \$v.name } else { \$f }
                    \$email = if (\$v.user_name) { \$v.user_name } else { "" }
                    \$meta[\$f] = [PSCustomObject]@{
                        Folder = \$f
                        DisplayName = \$name
                        Email = \$email
                    }
                }
            }
        } catch {}
    }
    # Дополняем папками, если не было в Local State
    if (Test-Path \$userDataPath) {
        \$dirs = Get-ChildItem \$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
        foreach (\$d in \$dirs) {
            if (-not \$meta.ContainsKey(\$d.Name)) {
                \$meta[\$d.Name] = [PSCustomObject]@{
                    Folder = \$d.Name
                    DisplayName = \$d.Name
                    Email = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & MULTI-BROWSER/PROFILE ENGINE v5.5      " "Cyan"
P "  Real Profile Names Discovery & Precision Human Warm-Up         " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

\$browserCatalog = @{
    "chrome" = @{
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",
            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",
            "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"
        );
        ProcessName = "chrome"
    };
    "edge" = @{
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";
        ExePaths = @(
            "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",
            "\$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe"
        );
        ProcessName = "msedge"
    };
    "brave" = @{
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
            "\${env:ProgramFiles(x86)}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
        );
        ProcessName = "brave"
    };
    "opera" = @{
        Name     = "Opera Stable";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable";
        ExePaths = @(
            "\$env:LOCALAPPDATA\\Programs\\Opera\\launcher.exe",
            "\$env:ProgramFiles\\Opera\\launcher.exe",
            "\${env:ProgramFiles(x86)}\\Opera\\launcher.exe"
        );
        ProcessName = "opera"
    };
    "yandex" = @{
        Name     = "Yandex Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Yandex\\YandexBrowser\\User Data";
        ExePaths = @(
            "\$env:LOCALAPPDATA\\Yandex\\YandexBrowser\\Application\\browser.exe"
        );
        ProcessName = "browser"
    }
}

\$selectedBrowserKey = \$Browser.Trim().ToLower()
if (-not \$browserCatalog.ContainsKey(\$selectedBrowserKey)) { \$selectedBrowserKey = "chrome" }
\$bInfo = \$browserCatalog[\$selectedBrowserKey]

\$browserExe = \$null
foreach (\$p in \$bInfo.ExePaths) {
    if (Test-Path \$p) { \$browserExe = \$p; break }
}

if (-not \$browserExe) {
    P "[-] Браузер '\$(\$bInfo.Name)' не найден на системе!" "Red"
    return
}

# 3. Сканирование и вывод ВСЕХ найденных профилей с их именами
P "[1/5] Сканирование профилей браузера '\$(\$bInfo.Name)'..." "Yellow"
\$allProfilesMeta = Get-BrowserProfilesMetadata \$bInfo.UserData

P "  Найденные профили в системе:" "Cyan"
foreach (\$k in \$allProfilesMeta.Keys) {
    \$item = \$allProfilesMeta[\$k]
    \$emailInfo = if (\$item.Email) { " (Аккаунт: \$(\$item.Email))" } else { "" }
    P "   * Папка: [\$(\$item.Folder)] ➔ Имя: \`"\$(\$item.DisplayName)\`"\$emailInfo" "White"
}
P ""

# Выбор целевых профилей
\$targetProfiles = @()
if (\$Profiles -eq "all" -or \$Profiles -eq "*") {
    \$targetProfiles = @(\$allProfilesMeta.Keys)
} else {
    \$targetProfiles = \$Profiles.Split(',') | ForEach-Object { \$_.Trim() } | Where-Object { \$_ -ne "" }
}
if (\$targetProfiles.Count -eq 0) { \$targetProfiles = @("Default") }

# 4. Геолокация
\$geo = \$null
\$endpoints = @("http://ip-api.com/json/?fields=status,city,regionName,zip,isp,org,query", "https://ipwho.is/", "https://ipinfo.io/json")
foreach (\$url in \$endpoints) {
    try {
        \$resp = Invoke-RestMethod -Uri \$url -TimeoutSec 5 -ErrorAction Stop
        if (\$resp.city) {
            \$geo = [PSCustomObject]@{
                IP       = if (\$resp.query) { \$resp.query } elseif (\$resp.ip) { \$resp.ip } else { "130.12.47.191" }
                City     = \$resp.city
                Region   = if (\$resp.regionName) { \$resp.regionName } else { \$resp.region }
                ISP      = if (\$resp.isp) { \$resp.isp } elseif (\$resp.org) { \$resp.org } else { \$resp.connection.isp }
            }
            break
        }
    } catch {}
}
if (-not \$geo) {
    \$geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

\$city = \$geo.City

\$journey = @(
    @{
        Title        = "☕ Утренний кофе (опечатка 'cofee' -> 'coffee')";
        TypoText     = "best cofee sho";
        Correction   = "ffee shops in \$city open now";
        TargetFull   = "best coffee shops in \$city open now";
        OpenResult   = \$true;
        IsCommercial = \$false
    },
    @{
        Title        = "🍳 Рецепт ужина (опечатка 'patsa' -> 'pasta')";
        TypoText     = "easy 20 min garlic chiken pat";
        Correction   = "cken pasta recipe dinner";
        TargetFull   = "easy 20 min garlic chicken pasta recipe dinner";
        OpenResult   = \$true;
        IsCommercial = \$false
    },
    @{
        Title        = "🎯 Коммерческий интернет (захват спонсорских трекеров)";
        TypoText     = "best home fiber internet pla";
        Correction   = "ans in \$city reviews";
        TargetFull   = "best home fiber internet plans in \$city reviews";
        OpenResult   = \$true;
        IsCommercial = \$true
    }
)

# Прогрев каждого выбранного профиля
\$currIdx = 1
foreach (\$profFolder in \$targetProfiles) {
    \$metaInfo = \$allProfilesMeta[\$profFolder]
    \$dispName = if (\$metaInfo) { \$metaInfo.DisplayName } else { \$profFolder }
    \$dispMail = if (\$metaInfo -and \$metaInfo.Email) { " [\$(\$metaInfo.Email)]" } else { "" }

    P "=================================================================" "Yellow"
    P "  [\$currIdx/\$(\$targetProfiles.Count)] ЗАПУСК ПРОГРЕВА ПРОФИЛЯ:" "Yellow"
    P "  Папка:  \$profFolder" "White"
    P "  Имя:    \$dispName\$dispMail" "Green"
    P "=================================================================" "Yellow"

    Get-Process -Name \$bInfo.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 600

    \$argsList = @(
        "--user-data-dir=\`"\$(\$bInfo.UserData)\`"",
        "--profile-directory=\`"\$profFolder\`"",
        "--start-maximized",
        "--disable-blink-features=AutomationControlled",
        "https://www.google.com"
    )

    \$proc = Start-Process -FilePath \$browserExe -ArgumentList \$argsList -PassThru
    Start-Sleep -Seconds 4

    if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
        [WinInputV5]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
    }
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 400

    \$isFirstQuery = \$true
    \$taskStep = 1
    foreach (\$item in \$journey) {
        P "  [\$taskStep/\$(\$journey.Count)] \$(\$item.Title)" "Cyan"

        if (\$isFirstQuery) {
            \$inputX = Get-Random -Min 480 -Max 680
            \$inputY = Get-Random -Min 345 -Max 385
            [WinInputV5]::Click(\$inputX, \$inputY)
            \$isFirstQuery = \$false
        } else {
            \$topInputX = Get-Random -Min 240 -Max 450
            \$topInputY = Get-Random -Min 125 -Max 145
            [WinInputV5]::Click(\$topInputX, \$topInputY)
            Start-Sleep -Milliseconds 180
            [System.Windows.Forms.SendKeys]::SendWait("^a")
            Start-Sleep -Milliseconds 120
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds 180
        }

        P "      -> Ввод с опечаткой и исправлением: '\$(\$item.TargetFull)'" "Gray"
        Type-ExperiencedHuman \$item.TargetFull \$item.TypoText \$item.Correction
        Start-Sleep -Seconds 4

        for (\$i = 0; \$i -lt 3; \$i++) {
            [WinInputV5]::ScrollSmooth(-180, 5)
            \$curX = Get-Random -Min 380 -Max 720
            \$curY = Get-Random -Min 280 -Max 480
            [WinInputV5]::MoveSmooth(\$curX, \$curY, 450)
            Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
        }

        if (\$item.OpenResult) {
            \$linkX = Get-Random -Min 350 -Max 600
            \$linkY = if (\$item.IsCommercial) { Get-Random -Min 230 -Max 280 } else { Get-Random -Min 320 -Max 420 }
            [WinInputV5]::CtrlClick(\$linkX, \$linkY)
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

        \$taskStep++
    }

    Get-Process -Name \$bInfo.ProcessName -ErrorAction SilentlyContinue | ForEach-Object { \$_.CloseMainWindow() } | Out-Null
    Start-Sleep -Seconds 2
    Get-Process -Name \$bInfo.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1

    \$currIdx++
}

# 5. Итоговый отчет с именами профилей
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

P ""
P "=================================================================" "Green"
P "     MULTI-PROFILE WARM-UP & TRUST REPORT v5.5                   " "Green"
P "=================================================================" "Green"
P "  Браузер:   \$(\$bInfo.Name)" "White"
P "  Локация:   \$(\$geo.City), \$(\$geo.Region)" "White"
P ""

foreach (\$pName in \$targetProfiles) {
    \$metaInfo = \$allProfilesMeta[\$pName]
    \$dispName = if (\$metaInfo) { \$metaInfo.DisplayName } else { \$pName }
    \$dispMail = if (\$metaInfo -and \$metaInfo.Email) { " (\$(\$metaInfo.Email))" } else { "" }

    \$profPath = Join-Path \$bInfo.UserData \$pName
    \$allDoms = @()
    \$allDoms += Extract-DomainsFromBinary (Join-Path \$profPath "Network\\Cookies")
    \$allDoms += Extract-DomainsFromBinary (Join-Path \$profPath "Network\\Cookies-wal")
    \$allDoms += Extract-DomainsFromBinary (Join-Path \$profPath "History")
    \$uDoms = \$allDoms | Select-Object -Unique | Sort-Object

    \$gDoms = \$uDoms | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
    \$aDoms = \$uDoms | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }

    P "  👤 Профиль: \`"\$dispName\`"\$dispMail [Папка: \$pName]" "Cyan"
    P "     -> Нагуляно доменов: \$(\$uDoms.Count) | Google Core: \$(\$gDoms.Count) | Реклама: \$(\$aDoms.Count)" "White"
    \$status = if (\$uDoms.Count -ge 20) { "HIGH TRUST (Tier 1: Ready)" } else { "MEDIUM TRUST" }
    P "     -> Статус:          [\$status]" "Green"
    P ""
}

# Открытие страницы куков последнего профиля
Start-Process -FilePath \$browserExe -ArgumentList @(
    "--user-data-dir=\`"\$(\$bInfo.UserData)\`"",
    "--profile-directory=\`"\$(\$targetProfiles[-1])\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`;
      // Динамически внедряем выбранный браузер и профили
      if (url.searchParams.has("b") || url.searchParams.has("browser")) {
        script = script.replace(/\[string\]\$Browser\s*=\s*"[^"]*"/i, `[string]$Browser = "${browserParam}"`);
      }
      if (url.searchParams.has("p") || url.searchParams.has("profile") || url.searchParams.has("profiles")) {
        script = script.replace(/\[string\]\$Profiles\s*=\s*"[^"]*"/i, `[string]$Profiles = "${profileParam}"`);
      }
    } else {
      script = `<#
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
    }

    return new Response(script, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache, no-store, must-revalidate",
        "access-control-allow-origin": "*"
      }
    });
  }
};
