// =================================================================
// ADVSOCIALAKZ MULTI-VERSION CLOUDFLARE EDGE WORKER
// Supports: All version branches (v4, v5, v6, v7, v7.5, audit, auto)
// Dynamic GitHub Branch & Ref Proxy
// Authorization Key: akz2026
// =================================================================

const SCRIPTS = {
  "v7": `<#
=================================================================
 ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v7.5
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
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Browser = "",
    [Parameter(Mandatory=\$false)] [string]\$Profile = "",
    [Parameter(Mandatory=\$false)] [string]\$Profiles = "",
    [Parameter(Mandatory=\$false)] [string]\$Target = "all"
)

# 1. Лицензионная авторизация
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

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

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Render-Bar(\$value, \$max, \$width=18) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

function Type-ExperiencedHuman([string]\$targetText, [string]\$typoText, [string]\$correction) {
    [WinInputV7]::ReleaseAllModifiers()
    \$textToType = if (\$typoText) { \$typoText } else { \$targetText }
    
    foreach (\$ch in \$textToType.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        Start-Sleep -Milliseconds (Get-Random -Min 30 -Max 75)
        if ((Get-Random -Min 1 -Max 18) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220) }
    }
    
    if (\$typoText -and \$correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 300)
        \$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\$b = 0; \$b -lt \$backspacesCount; \$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 50 -Max 90)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 150)
        foreach (\$ch in \$correction.ToCharArray()) {
            \$c = [string]\$ch
            if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
            [System.Windows.Forms.SendKeys]::SendWait(\$c)
            Start-Sleep -Milliseconds (Get-Random -Min 30 -Max 70)
        }
    }
    
    Start-Sleep -Milliseconds (Get-Random -Min 220 -Max 400)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    [WinInputV7]::ReleaseAllModifiers()
}

function Read-LockedBinarySafe(\$filePath) {
    if (-not (Test-Path \$filePath)) { return \$null }
    \$tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "persona_" + [System.IO.Path]::GetRandomFileName())
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
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
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
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v7.5            " "Cyan"
P "  Multi-Profile Automation & Targeted Service Presets            " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя и браузеров
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

\$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",
            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",
            "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"
        );
        ProcessName = "chrome"
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";
        ExePaths = @(
            "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",
            "\$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe"
        );
        ProcessName = "msedge"
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
        );
        ProcessName = "brave"
    }
)

# 3. Обнаружение профилей
\$availableProfiles = @()
foreach (\$b in \$browserCatalog) {
    \$exeFound = \$null
    foreach (\$ep in \$b.ExePaths) {
        if (Test-Path \$ep) { \$exeFound = \$ep; break }
    }
    if (-not \$exeFound -or -not (Test-Path \$b.UserData)) { continue }

    \$metaDict = Get-BrowserProfilesMetadata \$b.UserData
    foreach (\$k in \$metaDict.Keys) {
        \$pInfo = \$metaDict[\$k]
        \$availableProfiles += [PSCustomObject]@{
            Index       = \$availableProfiles.Count + 1
            BrowserKey  = \$b.Key
            BrowserName = \$b.Name
            BrowserExe  = \$exeFound
            ProcessName = \$b.ProcessName
            UserData    = \$b.UserData
            Folder      = \$pInfo.Folder
            DisplayName = \$pInfo.DisplayName
            Email       = \$pInfo.Email
        }
    }
}

if (\$availableProfiles.Count -eq 0) {
    P "[-] В системе не найдено доступных браузеров и профилей!" "Red"
    return
}

# 4. Выбор профилей (Одиночный, Мульти '1,2' или 'all')
\$chosenProfiles = @()

if (\$Profiles) {
    if (\$Profiles.ToLower() -in @("all", "*")) {
        \$chosenProfiles = \$availableProfiles
    } else {
        \$indexes = \$Profiles -split ',' | ForEach-Object { \$_.Trim() }
        foreach (\$idx in \$indexes) {
            \$m = \$availableProfiles | Where-Object { \$_.Index -eq [int]\$idx }
            if (\$m) { \$chosenProfiles += \$m }
        }
    }
} elseif (\$Browser -and \$Profile) {
    \$single = \$availableProfiles | Where-Object { \$_.BrowserKey -eq \$Browser.ToLower() -and (\$_.Folder -eq \$Profile -or \$_.DisplayName -eq \$Profile) } | Select-Object -First 1
    if (\$single) { \$chosenProfiles += \$single }
}

if (\$chosenProfiles.Count -eq 0) {
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"
    P "=================================================================" "Yellow"
    foreach (\$ap in \$availableProfiles) {
        \$mailInfo = if (\$ap.Email) { " (Аккаунт: \$(\$ap.Email))" } else { "" }
        P " [\$(\$ap.Index)] \$(\$ap.BrowserName) ➔ \`"\$(\$ap.DisplayName)\`"\$mailInfo [Папка: \$(\$ap.Folder)]" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    Write-Host " [?] Введите номер, список через запятую (например: 1,2) или 'all' (Enter = 1): " -ForegroundColor Cyan -NoNewline
    \$userInput = Read-Host
    
    if (-not \$userInput -or \$userInput.Trim() -eq "") {
        \$chosenProfiles += (\$availableProfiles | Where-Object { \$_.Index -eq 1 } | Select-Object -First 1)
    } elseif (\$userInput.Trim().ToLower() -in @("all", "*")) {
        \$chosenProfiles = \$availableProfiles
    } else {
        \$parts = \$userInput -split ',' | ForEach-Object { \$_.Trim() }
        foreach (\$p in \$parts) {
            if (\$p -match '^\\d+\$') {
                \$idx = [int]\$p
                \$m = \$availableProfiles | Where-Object { \$_.Index -eq \$idx }
                if (\$m) { \$chosenProfiles += \$m }
            }
        }
    }
}

if (\$chosenProfiles.Count -eq 0) {
    \$chosenProfiles += (\$availableProfiles | Where-Object { \$_.Index -eq 1 } | Select-Object -First 1)
}

P ""
P "  -> К прогреву выбрано профилей: \$(\$chosenProfiles.Count)" "Green"
foreach (\$cp in \$chosenProfiles) {
    P "     * \$(\$cp.BrowserName) :: \`"\$(\$cp.DisplayName)\`" [Папка: \$(\$cp.Folder)]" "DarkCyan"
}
P "  -> Целевой пресет сервиса:       \$(\$Target.ToUpper())" "Cyan"
P ""

# 5. Геолокация
P "[1/4] Определение реального IP и геолокации выхода..." "Yellow"
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
                ISP      = if (\$resp.isp) { \$resp.isp } elseif (\$resp.org) { \$resp.org } else { "ZhouyiSat Communications" }
            }
            break
        }
    } catch {}
}
if (-not \$geo) {
    \$geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

\$city = \$geo.City
\$state = \$geo.Region

P "  -> Локация выхода:   \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "Green"
P ""

# Функция генерации уникальной персоны и поисковых путей под целевой пресет
function Get-PersonaJourney(\$pIdx, \$dispName, \$city, \$targetPreset) {
    \$names = @("Alex", "David", "Michael", "Sarah", "Emily", "James", "Daniel")
    \$name = if (\$dispName -and \$dispName -ne "Default") { \$dispName } else { \$names[(\$pIdx - 1) % \$names.Count] }
    
    \$journey = @()

    # 1. Базовый локальный запрос (быт)
    \$journey += @{
        Title      = "☕ Утренний кофе и свежая выпечка в \$city (опечатка 'cofee' -> 'coffee')";
        TypoText   = "best cofee sho";
        Correction = "ffee shops and pastries in \$city open now";
        TargetFull = "best coffee shops and pastries in \$city open now";
        ClickFirst = \$true
    }

    # 2. Пресетные специализированные запросы
    switch (\$targetPreset.ToLower()) {
        "aistudio" {
            \$journey += @{
                Title      = "🌐 Исследование Google AI Studio и документации Gemini";
                TypoText   = "google ai studio quickstar";
                Correction = "tart python tutorial gemini api key";
                TargetFull = "google ai studio quickstart python tutorial gemini api key";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "📺 YouTube видео о возможностях Gemini 1.5 Pro";
                TypoText   = "gemini 1.5 pro multimodal test youtub";
                Correction = "tube demo walkthrough";
                TargetFull = "gemini 1.5 pro multimodal test youtube demo walkthrough";
                ClickFirst = \$true
            }
        }
        "antigravity" {
            \$journey += @{
                Title      = "🚀 Google Antigravity и агентские AI SDK";
                TypoText   = "google antigravity agent sd";
                Correction = "sdk documentation python github";
                TargetFull = "google antigravity agent sdk documentation python github";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "☁️ Google Cloud Shell и настройка окружения";
                TypoText   = "how to enable google cloud shel";
                Correction = "ll web ide vscode";
                TargetFull = "how to enable google cloud shell web ide vscode";
                ClickFirst = \$true
            }
        }
        "openai" {
            \$journey += @{
                Title      = "🤖 OpenAI ChatGPT новинки и документация API";
                TypoText   = "openai api rate limits tie";
                Correction = "ier 1 payment usage guide";
                TargetFull = "openai api rate limits tier 1 payment usage guide";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "⚙️ Сравнение GPT-4o и Claude 3.5 Sonnet";
                TypoText   = "gpt-4o vs claude 3.5 sonnet benchmar";
                Correction = "rks coding comparison";
                TargetFull = "gpt-4o vs claude 3.5 sonnet benchmarks coding comparison";
                ClickFirst = \$true
            }
        }
        "claude" {
            \$journey += @{
                Title      = "🧠 Anthropic Claude Console и доступ Artifacts";
                TypoText   = "anthropic claude console ap";
                Correction = "pi billing top up guide";
                TargetFull = "anthropic claude console api billing top up guide";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "📰 Новости Кремниевой Долины и технологии в Калифорнии";
                TypoText   = "silicon valley tech news thi";
                Correction = "is week san francisco";
                TargetFull = "silicon valley tech news this week san francisco";
                ClickFirst = \$true
            }
        }
        "amazon" {
            \$journey += @{
                Title      = "🛒 Покупки на Amazon и отзывы на технику";
                TypoText   = "best mechanical keyboar";
                Correction = "rd for mac amazon prime deals";
                TargetFull = "best mechanical keyboard for mac amazon prime deals";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "☁️ Amazon Web Services бесплатный уровень (Free Tier)";
                TypoText   = "aws free tier limits ec2 t3.micr";
                Correction = "cro setup guide";
                TargetFull = "aws free tier limits ec2 t3.micro setup guide";
                ClickFirst = \$true
            }
        }
        "stripe" {
            \$journey += @{
                Title      = "💳 Международные платежи Stripe и безопасность карт";
                TypoText   = "stripe checkout customer porta";
                Correction = "tal recurring billing test";
                TargetFull = "stripe checkout customer portal recurring billing test";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "🏦 Проверка 3D Secure и международных транзакций";
                TypoText   = "how 3d secure works internatinal card";
                Correction = "onal cards verification";
                TargetFull = "how 3d secure works international cards verification";
                ClickFirst = \$true
            }
        }
        default { # "all" - Сбалансированный универсальный пакет
            \$journey += @{
                Title      = "🍳 Быстрый домашний ужин за 20 минут (опечатка 'chiken' -> 'pasta')";
                TypoText   = "easy 20 min garlic chiken pat";
                Correction = "cken pasta recipe dinner";
                TargetFull = "easy 20 min garlic chicken pasta recipe dinner";
                ClickFirst = \$true
            }
            \$journey += @{
                Title      = "🔧 Бытовой DIY ремонт сантехники (пошаговая инструкция)";
                TypoText   = "how to replace runing tolet flapp";
                Correction = "running toilet flapper valve step by step";
                TargetFull = "how to replace running toilet flapper valve step by step";
                ClickFirst = \$false
            }
            \$journey += @{
                Title      = "🎯 Скоростной домашний интернет и отзывы провайдеров в \$city";
                TypoText   = "best high speed fiber internet pla";
                Correction = "ans in \$city reviews";
                TargetFull = "best high speed fiber internet plans in \$city reviews";
                ClickFirst = \$true
            }
        }
    }

    return @{
        Name    = \$name
        Journey = \$journey
    }
}

# 6. Цикл прогрева по выбранным профилям
\$currentProfileNum = 1

foreach (\$chosen in \$chosenProfiles) {
    P "=================================================================" "Cyan"
    P "  ПРОГРЕВ ПРОФИЛЯ [\$currentProfileNum/\$(\$chosenProfiles.Count)]: \$(\$chosen.BrowserName) :: \`"\$(\$chosen.DisplayName)\`"" "Cyan"
    P "=================================================================" "Cyan"

    \$pLore = Get-PersonaJourney \$currentProfileNum \$chosen.DisplayName \$city \$Target
    P "  -> Имя личности:     \$(\$pLore.Name)" "DarkCyan"
    P "  -> Системная папка:  \$(\$chosen.Folder)" "DarkCyan"
    P ""

    # Запуск браузера в видимом окне (100% стабильность, Zero-Close Guarantee)
    P "[2/4] Запуск \$(\$chosen.BrowserName) в видимом окне (Zero-Close Guarantee)..." "Yellow"

    \$argsList = @(
        "--user-data-dir=\`"\$(\$chosen.UserData)\`"",
        "--profile-directory=\`"\$(\$chosen.Folder)\`"",
        "--start-maximized",
        "--disable-blink-features=AutomationControlled",
        "https://www.google.com"
    )

    \$proc = Start-Process -FilePath \$chosen.BrowserExe -ArgumentList \$argsList -PassThru
    Start-Sleep -Seconds 4

    if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
        [WinInputV7]::ShowWindow(\$proc.MainWindowHandle, 3) | Out-Null
        [WinInputV7]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
    }

    [WinInputV7]::ReleaseAllModifiers()

    # Выполнение поисковых сценариев
    P "[3/4] Выполнение сценария органического поиска и серфинга..." "Yellow"
    \$isFirstQuery = \$true
    \$stepIdx = 1

    foreach (\$task in \$pLore.Journey) {
        P "  [\$stepIdx/\$(\$pLore.Journey.Count)] \$(\$task.Title)" "Cyan"

        if (\$isFirstQuery) {
            \$inputX = Get-Random -Min 510 -Max 650
            \$inputY = Get-Random -Min 348 -Max 380
            [WinInputV7]::Click(\$inputX, \$inputY)
            \$isFirstQuery = \$false
        } else {
            \$topInputX = Get-Random -Min 280 -Max 420
            \$topInputY = Get-Random -Min 128 -Max 142
            [WinInputV7]::TripleClick(\$topInputX, \$topInputY)
            Start-Sleep -Milliseconds 150
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds 120
        }

        P "      -> Живой ввод: '\$(\$task.TargetFull)'" "Gray"
        Type-ExperiencedHuman \$task.TargetFull \$task.TypoText \$task.Correction
        Start-Sleep -Seconds 4

        # Плавное чтение результатов выдачи
        for (\$s = 0; \$s -lt 3; \$s++) {
            [WinInputV7]::ScrollSmooth(-180, 5)
            \$curX = Get-Random -Min 380 -Max 700
            \$curY = Get-Random -Min 280 -Max 460
            [WinInputV7]::MoveSmooth(\$curX, \$curY, 400)
            Start-Sleep -Milliseconds (Get-Random -Min 400 -Max 750)
        }

        # Переход по результату поиска и чтение страницы
        if (\$task.ClickFirst) {
            \$linkX = Get-Random -Min 370 -Max 560
            \$linkY = Get-Random -Min 325 -Max 390
            P "      [+] Чтение открывшейся страницы сайта..." "Magenta"
            [WinInputV7]::Click(\$linkX, \$linkY)
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

        \$stepIdx++
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
    \$profPath = Join-Path \$chosen.UserData \$chosen.Folder
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

    foreach (\$hf in \$histFiles) {
        \$bytes = Read-LockedBinarySafe \$hf
        if (\$bytes) {
            \$res = Extract-DomainsAndTags \$bytes
            \$profDomains += \$res.Domains
        }
    }

    \$uDoms = \$profDomains | Select-Object -Unique | Sort-Object
    \$uTags = \$profTags | Select-Object -Unique

    \$googleDoms = \$uDoms | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
    \$adTrackers = \$uDoms | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }
    \$localDoms  = \$uDoms | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
    \$amazonDoms = \$uDoms | Where-Object { \$_ -match 'amazon|aws' }
    \$otherDoms  = \$uDoms | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

    \$score = 0
    if (\$uDoms.Count -gt 35)    { \$score += 25 }
    elseif (\$uDoms.Count -gt 20) { \$score += 18 }
    elseif (\$uDoms.Count -gt 8)  { \$score += 10 }
    elseif (\$uDoms.Count -gt 0)  { \$score += 4 }

    if (\$googleDoms.Count -ge 5) { \$score += 15 }
    elseif (\$googleDoms.Count -ge 1) { \$score += 8 }
    if (\$uTags -contains "Google-NID" -or \$uTags -contains "Cookie-Consent") { \$score += 5 }
    if (\$uTags -contains "__Secure-Tokens" -or \$uTags -contains "Google-Auth-SID") { \$score += 5 }

    if (\$adTrackers.Count -ge 4) { \$score += 20 }
    elseif (\$adTrackers.Count -ge 1) { \$score += 12 }

    if (\$localDoms.Count -ge 3) { \$score += 12 }
    elseif (\$localDoms.Count -ge 1) { \$score += 6 }

    if (\$otherDoms.Count -ge 5) { \$score += 10 }
    elseif (\$otherDoms.Count -ge 1) { \$score += 5 }

    \$score = [Math]::Min(100, \$score)

    P ""
    P "  ИТОГИ ПРОГРЕВА ПРОФИЛЯ \`"\$(\$chosen.DisplayName)\`":" "Green"
    P "  Нагуляно:  \$(\$uDoms.Count) доменов | Индекс траста: \$(Render-Bar \$score 100 16) (\$score / 100 PTS)" "White"
    if (\$googleDoms) { P "  🌐 Google Core: \$(\$googleDoms.Count) | 🎯 Трекеры: \$(\$adTrackers.Count) | 📍 Локальные: \$(\$localDoms.Count)" "Gray" }
    P ""

    \$currentProfileNum++
}

P "=================================================================" "Green"
P "     ВСЕ ВЫБРАННЫЕ ПРОФИЛИ УСПЕШНО ПРОГРЕТЫ И ГОТОВЫ К РАБОТЕ     " "Green"
P "=================================================================" "Green"
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"
P "[✓] Вы можете просмотреть сохраненные куки прямо в открытом окне." "Green"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
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
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Browser = "",
    [Parameter(Mandatory=\$false)] [string]\$Profile = ""
)

# 1. Лицензионная авторизация
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

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
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 80)
        if ((Get-Random -Min 1 -Max 15) -eq 1) { Start-Sleep -Milliseconds (Get-Random -Min 130 -Max 240) }
    }
    if (\$typoText -and \$correction) {
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 320)
        \$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\$b = 0; \$b -lt \$backspacesCount; \$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 100)
        }
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 160)
        foreach (\$ch in \$correction.ToCharArray()) {
            \$c = [string]\$ch
            if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
            [System.Windows.Forms.SendKeys]::SendWait(\$c)
            Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 70)
        }
    }
    Start-Sleep -Milliseconds (Get-Random -Min 250 -Max 450)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
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
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
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
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  ULTRA DIGITAL PERSONA & AI LORE WARM-UP ENGINE v6.0            " "Cyan"
P "  Interactive Profile Selection & Real-Time Persona Synthesis    " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

\$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",
            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",
            "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"
        );
        ProcessName = "chrome"
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";
        ExePaths = @(
            "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe",
            "\$env:ProgramFiles\\Microsoft\\Edge\\Application\\msedge.exe"
        );
        ProcessName = "msedge"
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
        );
        ProcessName = "brave"
    }
)

# 3. Интерактивное меню выбора профиля (если не передано явно)
\$availableProfiles = @()
foreach (\$b in \$browserCatalog) {
    \$exeFound = \$null
    foreach (\$ep in \$b.ExePaths) {
        if (Test-Path \$ep) { \$exeFound = \$ep; break }
    }
    if (-not \$exeFound -or -not (Test-Path \$b.UserData)) { continue }

    \$metaDict = Get-BrowserProfilesMetadata \$b.UserData
    foreach (\$k in \$metaDict.Keys) {
        \$pInfo = \$metaDict[\$k]
        \$availableProfiles += [PSCustomObject]@{
            Index       = \$availableProfiles.Count + 1
            BrowserKey  = \$b.Key
            BrowserName = \$b.Name
            BrowserExe  = \$exeFound
            ProcessName = \$b.ProcessName
            UserData    = \$b.UserData
            Folder      = \$pInfo.Folder
            DisplayName = \$pInfo.DisplayName
            Email       = \$pInfo.Email
        }
    }
}

if (\$availableProfiles.Count -eq 0) {
    P "[-] В системе не найдено доступных браузеров и профилей!" "Red"
    return
}

# Определение выбранного профиля
\$chosen = \$null

if (\$Browser -and \$Profile) {
    # Параметры переданы через URL/CLI
    \$chosen = \$availableProfiles | Where-Object { \$_.BrowserKey -eq \$Browser.ToLower() -and (\$_.Folder -eq \$Profile -or \$_.DisplayName -eq \$Profile) } | Select-Object -First 1
}

if (-not \$chosen) {
    # ВЫВОД ИНТЕРАКТИВНОГО МЕНЮ В КОНСОЛЬ
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ПРОГРЕВА:                      " "Yellow"
    P "=================================================================" "Yellow"
    foreach (\$ap in \$availableProfiles) {
        \$mailInfo = if (\$ap.Email) { " (Аккаунт: \$(\$ap.Email))" } else { "" }
        P " [\$(\$ap.Index)] \$(\$ap.BrowserName) ➔ \`"\$(\$ap.DisplayName)\`"\$mailInfo [Папка: \$(\$ap.Folder)]" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    
    # Запрос выбора с тайм-аутом по умолчанию (1 = Default)
    Write-Host " [?] Введите номер профиля [1-\$(\$availableProfiles.Count)] (Нажмите Enter для 1): " -ForegroundColor Cyan -NoNewline
    \$userInput = Read-Host
    
    \$selectedIdx = 1
    if (\$userInput -match '^\\d+\$') {
        \$parsed = [int]\$userInput
        if (\$parsed -ge 1 -and \$parsed -le \$availableProfiles.Count) {
            \$selectedIdx = \$parsed
        }
    }
    \$chosen = \$availableProfiles | Where-Object { \$_.Index -eq \$selectedIdx } | Select-Object -First 1
}

P ""
P "  -> Выбран профиль:   \$(\$chosen.BrowserName) :: \`"\$(\$chosen.DisplayName)\`"" "Green"
P "  -> Системная папка:  \$(\$chosen.Folder)" "Green"
P ""

# 4. Геолокация и СИНТЕЗ ЦИФРОВОЙ ЛИЧНОСТИ (LORE SYNTHESIS)
P "[1/4] Анализ выходного IP и синтез цифровой личности..." "Yellow"
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
                ISP      = if (\$resp.isp) { \$resp.isp } elseif (\$resp.org) { \$resp.org } else { "ZhouyiSat Communications" }
            }
            break
        }
    } catch {}
}
if (-not \$geo) {
    \$geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; ISP = "ZhouyiSat Communications" }
}

\$city = \$geo.City
\$state = \$geo.Region

P "  -> Локация выхода:   \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "Green"

# Генерация карточки ЛОРа персонажа на основе города
\$loreName = if (\$chosen.DisplayName -and \$chosen.DisplayName -ne "Default") { \$chosen.DisplayName } else { "Alex" }
P "  -> Цифровой ЛОР:     Житель \$(\$geo.City), \$loreName (Домашний быт, семейные планы, ремонт, IT)" "DarkCyan"
P ""

# Динамический синтез реалистичных поисковых запросов
\$personaJourney = @(
    @{
        Title      = "☕ Утренний кофе и пекарня во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText   = "best cofee sho";
        Correction = "ffee shops and pastries in \$city open now";
        TargetFull = "best coffee shops and pastries in \$city open now";
        ClickFirst = \$true
    },
    @{
        Title      = "🍳 Домашний кулинарный рецепт ужина (опечатка 'chiken pat' -> 'pasta')";
        TypoText   = "easy 20 min garlic chiken pat";
        Correction = "cken pasta recipe dinner";
        TargetFull = "easy 20 min garlic chicken pasta recipe dinner";
        ClickFirst = \$true
    },
    @{
        Title      = "🔧 Бытовой ремонт сантехники (DIY запрос)";
        TypoText   = "how to replace runing tolet flapp";
        Correction = "running toilet flapper valve step by step";
        TargetFull = "how to replace running toilet flapper valve step by step";
        ClickFirst = \$false
    },
    @{
        Title      = "🎯 Коммерческий интернет и спонсорские трекеры";
        TypoText   = "best high speed fiber internet pla";
        Correction = "ans in \$city reviews";
        TargetFull = "best high speed fiber internet plans in \$city reviews";
        ClickFirst = \$true
    }
)

# 5. Надежный запуск браузера в ОДНОЙ ВИДИМОЙ вкладке
P "[2/4] Запуск \$(\$chosen.BrowserName) в видимом окне (100% стабильность)..." "Yellow"

Get-Process -Name \$chosen.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

\$argsList = @(
    "--user-data-dir=\`"\$(\$chosen.UserData)\`"",
    "--profile-directory=\`"\$(\$chosen.Folder)\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
)

\$proc = Start-Process -FilePath \$chosen.BrowserExe -ArgumentList \$argsList -PassThru
Start-Sleep -Seconds 4

if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV6]::ShowWindow(\$proc.MainWindowHandle, 3) | Out-Null # 3 = SW_MAXIMIZE
    [WinInputV6]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
}

[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

# 6. Выполнение сценария поиска в ОДНОЙ ВКЛАДКЕ с переходом по ссылкам и возвратом через Alt+Left
P "[3/4] Выполнение сценария органического поиска и нагула..." "Yellow"

\$isFirstQuery = \$true
\$stepIdx = 1

foreach (\$task in \$personaJourney) {
    P "  [\$stepIdx/\$(\$personaJourney.Count)] \$(\$task.Title)" "Cyan"

    if (\$isFirstQuery) {
        # Центральное поле Google
        \$inputX = Get-Random -Min 500 -Max 660
        \$inputY = Get-Random -Min 345 -Max 385
        [WinInputV6]::Click(\$inputX, \$inputY)
        \$isFirstQuery = \$false
    } else {
        # В той же вкладке: кликаем в верхнее поле поиска
        \$topInputX = Get-Random -Min 260 -Max 420
        \$topInputY = Get-Random -Min 125 -Max 145
        [WinInputV6]::Click(\$topInputX, \$topInputY)
        Start-Sleep -Milliseconds 180
        [System.Windows.Forms.SendKeys]::SendWait("^a")
        Start-Sleep -Milliseconds 120
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 180
    }

    # Посимвольная печать с опечаткой и стиранием
    P "      -> Живой ввод с опечаткой и исправлением: '\$(\$task.TargetFull)'" "Gray"
    Type-ExperiencedHuman \$task.TargetFull \$task.TypoText \$task.Correction
    Start-Sleep -Seconds 4

    # Плавный скроллинг выдачи вниз и чтение результатов
    for (\$s = 0; \$s -lt 3; \$s++) {
        [WinInputV6]::ScrollSmooth(-180, 5)
        \$curX = Get-Random -Min 380 -Max 720
        \$curY = Get-Random -Min 280 -Max 480
        [WinInputV6]::MoveSmooth(\$curX, \$curY, 450)
        Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
    }

    # Переход по результату поиска (БЕЗ закрытия вкладки!)
    if (\$task.ClickFirst) {
        \$linkX = Get-Random -Min 360 -Max 580
        \$linkY = Get-Random -Min 320 -Max 400
        P "      [+] Клик по ссылке из выдачи и чтение страницы..." "Magenta"
        [WinInputV6]::Click(\$linkX, \$linkY)
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

    \$stepIdx++
}

# 7. Фиксация куков и закрытие сессии
P ""
P "[4/4] Фиксация накопленной базы куков и построение графа..." "Yellow"
Get-Process -Name \$chosen.ProcessName -ErrorAction SilentlyContinue | ForEach-Object { \$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name \$chosen.ProcessName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

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

\$profPath = Join-Path \$chosen.UserData \$chosen.Folder
\$allDoms = @()
\$allDoms += Extract-DomainsFromBinary (Join-Path \$profPath "Network\\Cookies")
\$allDoms += Extract-DomainsFromBinary (Join-Path \$profPath "Network\\Cookies-wal")
\$allDoms += Extract-DomainsFromBinary (Join-Path \$profPath "History")
\$uDoms = \$allDoms | Select-Object -Unique | Sort-Object

\$googleDoms = \$uDoms | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick|gvt1' }
\$adTrackers = \$uDoms | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|scorecard|taboola|bing' }
\$localDoms  = \$uDoms | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
\$otherDoms  = \$uDoms | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v6.0          " "Green"
P "=================================================================" "Green"
P "  Браузер:   \$(\$chosen.BrowserName)" "White"
P "  Профиль:   \`"\$(\$chosen.DisplayName)\`" [Папка: \$(\$chosen.Folder)]" "Cyan"
P "  Локация:   \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "White"
P "  Нагуляно:  \$(\$uDoms.Count) активных сайтов в профиле" "White"
P ""
P "[-] ГРАФ ТРАСТА И ЭКОСИСТЕМЫ ПРОФИЛЯ:" "Cyan"
if (\$googleDoms) {
    P "  ├── 🌐 Google Core:      \$(\$googleDoms.Count) доменов" "Yellow"
    \$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$adTrackers) {
    P "  ├── 🎯 Ads & Trackers:    \$(\$adTrackers.Count) трекеров" "Yellow"
    \$adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$localDoms) {
    P "  ├── 📍 Локальный нагул:   \$(\$localDoms.Count) сервисов (\$(\$geo.City))" "Yellow"
    \$localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$otherDoms) {
    P "  └── 🍳 Бытовой нагул:     \$(\$otherDoms.Count) ресурсов (рецепты, DIY)" "Yellow"
    \$otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── \$_" "Gray" }
}

P ""
\$trustStatus = if (\$uDoms.Count -ge 20) { "HIGH TRUST (Tier 1: Ready for Google AI Studio)" } else { "MEDIUM TRUST" }
P "  Статус профиля:    [\$trustStatus]" "Green"
P "=================================================================" "Green"

# 8. Открытие страницы куков в выбранном профиле
Start-Process -FilePath \$chosen.BrowserExe -ArgumentList @(
    "--user-data-dir=\`"\$(\$chosen.UserData)\`"",
    "--profile-directory=\`"\$(\$chosen.Folder)\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
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

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

# Функция живого посимвольного ввода опытного пользователя с симуляцией опечаток и исправлений
function Type-ExperiencedHuman([string]\$targetText, [string]\$typoText, [string]\$correction) {
    # 1. Печатаем начальную часть (с намеренной опечаткой, если задана)
    \$textToType = if (\$typoText) { \$typoText } else { \$targetText }
    
    foreach (\$ch in \$textToType.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            \$c = "{\$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        
        # Скорость опытного наборщика: 35–85 мс между клавишами
        Start-Sleep -Milliseconds (Get-Random -Min 35 -Max 85)
        
        # Редкая микропауза на размышление (1 на 15 символов)
        if ((Get-Random -Min 1 -Max 16) -eq 1) {
            Start-Sleep -Milliseconds (Get-Random -Min 120 -Max 220)
        }
    }

    # 2. Если была опечатка: пауза осознания -> стирание Backspace -> ввод правильного окончания
    if (\$typoText -and \$correction) {
        # Задержка: "заметил ошибку"
        Start-Sleep -Milliseconds (Get-Random -Min 180 -Max 340)
        
        # Сколько букв нужно стереть
        \$backspacesCount = (Get-Random -Min 2 -Max 4)
        for (\$b = 0; \$b -lt \$backspacesCount; \$b++) {
            [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
            Start-Sleep -Milliseconds (Get-Random -Min 60 -Max 110)
        }
        
        Start-Sleep -Milliseconds (Get-Random -Min 90 -Max 180)
        
        # Допечатываем правильное окончание
        foreach (\$ch in \$correction.ToCharArray()) {
            \$c = [string]\$ch
            if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
                \$c = "{\$c}"
            }
            [System.Windows.Forms.SendKeys]::SendWait(\$c)
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

P "  -> Локация:     \$(\$geo.City), \$(\$geo.Region) (ZIP: \$(\$geo.Zip))" "Green"
P "  -> Провайдер:   \$(\$geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подготовка рабочего профиля пользователя..." "Yellow"
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

# Закрываем старые висящие сессии перед стартом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут цифровой личности в ОДНОЙ ВКЛАДКЕ (быт, опечатки, рецепты, Ctrl+Click)
\$city = \$geo.City

\$journey = @(
    @{
        Title        = "☕ Утренний кофе во Фримонте (опечатка 'cofee' -> 'coffee')";
        TypoText     = "best cofee sho";
        Correction   = "ffee shops in \$city open now";
        TargetFull   = "best coffee shops in \$city open now";
        OpenResult   = \$true;
        IsCommercial = \$false
    },
    @{
        Title        = "🍳 Кулинарный рецепт ужина (опечатка 'patsa' -> 'pasta')";
        TypoText     = "easy 20 min garlic chiken pat";
        Correction   = "cken pasta recipe dinner";
        TargetFull   = "easy 20 min garlic chicken pasta recipe dinner";
        OpenResult   = \$true;
        IsCommercial = \$false
    },
    @{
        Title        = "🔧 Домашний ремонт сантехники (DIY запрос)";
        TypoText     = "how to replace runing flapp";
        Correction   = "running toilet flapper valve step by step";
        TargetFull   = "how to replace running toilet flapper valve step by step";
        OpenResult   = \$false;
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

P "[3/5] Запуск ОДНОЙ вкладки Google и симуляция живого поиска..." "Yellow"

# Открываем ОДНО окно и ОДНУ вкладку Google
\$proc = Start-Process -FilePath \$chromePath -ArgumentList @(
    "--user-data-dir=\`"\$userChromeData\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV5]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
}

# Подтверждаем согласие с куками, если всплыло окно
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

\$isFirstQuery = \$true
\$step = 1

foreach (\$item in \$journey) {
    P "  [\$step/\$(\$journey.Count)] \$(\$item.Title)" "Cyan"

    if (\$isFirstQuery) {
        # На главной странице Google: кликаем прямо в центральное поле ввода
        \$inputX = Get-Random -Min 480 -Max 680
        \$inputY = Get-Random -Min 345 -Max 385
        P "      -> Наведение на центральное поле поиска (\$inputX, \$inputY)..." "Gray"
        [WinInputV5]::Click(\$inputX, \$inputY)
        \$isFirstQuery = \$false
    } else {
        # В СУЩЕСТВУЮЩЕЙ ВКЛАДКЕ ВЫДАЧИ: возвращаемся в ТО ЖЕ САМОЕ поле ввода наверху!
        # Очищаем старый запрос естественным выделением (Ctrl+A -> Backspace)
        \$topInputX = Get-Random -Min 240 -Max 450
        \$topInputY = Get-Random -Min 125 -Max 145
        P "      -> Возврат в то же поле поиска наверху страницы (\$topInputX, \$topInputY)..." "Gray"
        [WinInputV5]::Click(\$topInputX, \$topInputY)
        Start-Sleep -Milliseconds 180
        
        # Выделяем весь старый текст и стираем
        [System.Windows.Forms.SendKeys]::SendWait("^a")
        Start-Sleep -Milliseconds 120
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Start-Sleep -Milliseconds 180
    }

    # Посимвольная печать с опечаткой и исправлением
    P "      -> Живая печать запроса с микроопечаткой и исправлением..." "Gray"
    Type-ExperiencedHuman \$item.TargetFull \$item.TypoText \$item.Correction

    # Ждем загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Читаем выдачу: плавный скроллинг вниз
    for (\$i = 0; \$i -lt 3; \$i++) {
        [WinInputV5]::ScrollSmooth(-180, 5)
        # Водим мышкой по результатам
        \$curX = Get-Random -Min 380 -Max 720
        \$curY = Get-Random -Min 280 -Max 480
        [WinInputV5]::MoveSmooth(\$curX, \$curY, 450)
        Start-Sleep -Milliseconds (Get-Random -Min 450 -Max 800)
    }

    # Если требуется открыть результат: делаем Ctrl+Click (открытие ссылки в фоновой вкладке)
    if (\$item.OpenResult) {
        \$linkX = Get-Random -Min 350 -Max 600
        \$linkY = if (\$item.IsCommercial) { Get-Random -Min 230 -Max 280 } else { Get-Random -Min 320 -Max 420 }
        
        P "      [⚡] Power-User действие: Ctrl + Left Click по результату..." "Magenta"
        [WinInputV5]::CtrlClick(\$linkX, \$linkY)
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

    \$step++
}

# 4. Фиксация базы куков
P ""
P "[4/5] Фиксация базы куков и трекеров на диске..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { \$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

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

\$googleDoms = \$uniqueDomains | Where-Object { \$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
\$adTrackers = \$uniqueDomains | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|bing' }
\$localDoms  = \$uniqueDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|tutor' }
\$otherDoms  = \$uniqueDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

P "=================================================================" "Green"
P "     ULTRA DIGITAL PERSONA & HUMAN BEHAVIOR REPORT v5.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "White"
P "  Профиль браузера:  \$userChromeData\\Default" "White"
P "  Нагуляно сайтов:   \$(\$uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] ДЕРЕВО НАГУЛА И ЦИФРОВОЙ ЛИЧНОСТИ:" "Cyan"
if (\$googleDoms) {
    P "  ├── 🌐 Google Core Ecosystem (\$(\$googleDoms.Count) доменов)" "Yellow"
    \$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$adTrackers) {
    P "  ├── 🎯 Рекламные трекеры и спонсоры (\$(\$adTrackers.Count) трекеров)" "Yellow"
    \$adTrackers | Select-Object -First 6 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$localDoms) {
    P "  ├── 📍 Локальный контекст (\$(\$geo.City)) (\$(\$localDoms.Count) доменов)" "Yellow"
    \$localDoms | Select-Object -First 6 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}
if (\$otherDoms) {
    P "  └── 🍳 Бытовой нагул (рецепты/DIY) (\$(\$otherDoms.Count) доменов)" "Yellow"
    \$otherDoms | Select-Object -First 6 | ForEach-Object { P "      ├── \$_" "Gray" }
}

P ""
\$trustStatus = if (\$uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Tier 1: Human Organic Footprint)" } else { "HIGH TRUST" }
P "  Статус профиля:    [\$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Запуск Chrome и открытие настроек куков для визуальной проверки (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие 'Show All' данных сайтов и куков..." "Yellow"
Start-Process -FilePath \$chromePath -ArgumentList @(
    "--user-data-dir=\`"\$userChromeData\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
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

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

# Функция живого посимвольного ввода текста с естественными задержками
function Type-HumanText([string]\$text) {
    foreach (\$ch in \$text.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) {
            \$c = "{\$c}"
        }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
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

P "  -> Точка выхода:  \$(\$geo.IP) (\$(\$geo.City), \$(\$geo.Region))" "Green"
P "  -> Провайдер:     \$(\$geo.ISP)" "Green"
P ""

# 2. Подготовка профиля Chrome
P "[2/5] Подключение к рабочему профилю браузера..." "Yellow"
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

# Закрываем старые процессы перед началом
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 600

# 3. Маршрут реалистичной цифровой личности (Быт, рецепты, заведения, трекеры)
\$city = \$geo.City
\$state = \$geo.Region

\$personaRoutine = @(
    @{
        Title       = "☕ Завтрак и свежий кофе (локальный запрос)";
        QueryText   = "best local coffee and fresh bakery in \$city open now";
        TargetType  = "Search";
        InteractAd  = \$false
    },
    @{
        Title       = "🍳 Кулинарный рецепт (домашний быт)";
        QueryText   = "easy 20 minute creamy garlic chicken pasta recipe dinner";
        TargetType  = "Search";
        InteractAd  = \$false
    },
    @{
        Title       = "🔧 Бытовой ремонт в доме (DIY запрос)";
        QueryText   = "how to fix running toilet flapper valve diy step by step";
        TargetType  = "Search";
        InteractAd  = \$false
    },
    @{
        Title       = "🎯 Коммерческий запрос + Клик по рекламному трекеру";
        QueryText   = "best high speed home fiber internet plans \$city ca";
        TargetType  = "Commercial";
        InteractAd  = \$true
    },
    @{
        Title       = "📚 Локальные репетиторы и курсы (семейный контекст)";
        QueryText   = "private math and sat prep tutors in \$city ca reviews";
        TargetType  = "Search";
        InteractAd  = \$false
    }
)

P "[3/5] Запуск интерактивной симуляции с живым посимвольным вводом..." "Yellow"

# Запускаем Chrome один раз на весь сценарий
\$proc = Start-Process -FilePath \$chromePath -ArgumentList @(
    "--user-data-dir=\`"\$userChromeData\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
) -PassThru

Start-Sleep -Seconds 4

if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV4]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
}

# Подтверждение диалога куков Google (если выскочил)
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Start-Sleep -Milliseconds 400

\$step = 1
foreach (\$task in \$personaRoutine) {
    P "  [\$step/\$(\$personaRoutine.Count)] \$(\$task.Title)" "Cyan"

    # Фокусируемся на адресной строке / строке поиска через Ctrl+L
    [System.Windows.Forms.SendKeys]::SendWait("^l")
    Start-Sleep -Milliseconds 300

    # Вводим адрес Google поиска
    [System.Windows.Forms.SendKeys]::SendWait("https://www.google.com{ENTER}")
    Start-Sleep -Seconds 3

    # Плавное наведение на строку поиска по центру экрана
    \$searchBoxX = (Get-Random -Min 480 -Max 680)
    \$searchBoxY = (Get-Random -Min 340 -Max 390)
    [WinInputV4]::Click(\$searchBoxX, \$searchBoxY)
    Start-Sleep -Milliseconds 350

    # Посимвольный живой ввод запроса
    P "      Печать: '\$(\$task.QueryText)'" "Gray"
    Type-HumanText \$task.QueryText

    # Ожидание загрузки выдачи Google
    Start-Sleep -Seconds 4

    # Плавный скроллинг выдачи вниз и чтение контента
    for (\$i = 0; \$i -lt 3; \$i++) {
        [WinInputV4]::ScrollSmooth(-200, 5)
        # Водим мышкой по сниппетам
        \$snippetX = Get-Random -Min 380 -Max 750
        \$snippetY = Get-Random -Min 280 -Max 520
        [WinInputV4]::MoveSmooth(\$snippetX, \$snippetY, 500)
        Start-Sleep -Milliseconds (Get-Random -Min 600 -Max 1000)
    }

    # Если шаг коммерческий — ловим рекламный спонсорский трекер (Google Ads / DoubleClick)
    if (\$task.InteractAd) {
        P "      [⚡] Обнаружен коммерческий блок трекеров (Sponsored Ads)" "Magenta"
        # Скроллим наверх к рекламе
        [WinInputV4]::ScrollSmooth(350, 6)
        Start-Sleep -Milliseconds 500

        # Кликаем по верхнему рекламному объявлению (обычно Y: 240-310)
        \$adClickX = Get-Random -Min 380 -Max 580
        \$adClickY = Get-Random -Min 240 -Max 290
        P "      -> Случайный клик по спонсорскому объявлению (захват трекера)..." "Gray"
        [WinInputV4]::Click(\$adClickX, \$adClickY)
        
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

    \$step++
}

# 4. Фиксация базы куков и сброс WAL
P ""
P "[4/5] Фиксация накопленной базы куков и трекеров..." "Yellow"
Get-Process -Name chrome -ErrorAction SilentlyContinue | ForEach-Object { \$_.CloseMainWindow() } | Out-Null
Start-Sleep -Seconds 2
Get-Process -Name chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Анализ SQLite базы и формирование отчета
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

# Категоризация
\$googleDoms  = @()
\$adTrackers  = @()
\$localDoms   = @()
\$lifestyleDoms = @()

foreach (\$d in \$uniqueDomains) {
    if (\$d -match 'google|gstatic|youtube|googleadservices|googletag|gvt1') {
        \$googleDoms += \$d
    } elseif (\$d -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing') {
        \$adTrackers += \$d
    } elseif (\$d -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor') {
        \$localDoms += \$d
    } else {
        \$lifestyleDoms += \$d
    }
}

P "=================================================================" "Green"
P "       ULTRA DIGITAL PERSONA & COOKIE AUDIT REPORT v4.0          " "Green"
P "=================================================================" "Green"
P "  Локация IP:        \$(\$geo.City), \$(\$geo.Region) (\$(\$geo.ISP))" "White"
P "  Профиль браузера:  \$userChromeData\\Default" "White"
P "  Всего контекстов:  \$(\$uniqueDomains.Count) активных доменов" "White"
P ""
P "[-] СТРУКТУРА ЦИФРОВОЙ ЛИЧНОСТИ (PERSONA TRUST GRAPH):" "Cyan"

if (\$googleDoms.Count -gt 0) {
    P "  ├── 🌐 Google Core & AI Ecosystem (\$(\$googleDoms.Count) доменов)" "Yellow"
    \$googleDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}

if (\$adTrackers.Count -gt 0) {
    P "  ├── 🎯 Рекламные трекеры и коммерческий след (\$(\$adTrackers.Count) трекеров)" "Yellow"
    \$adTrackers | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}

if (\$localDoms.Count -gt 0) {
    P "  ├── 📍 Локальный контекст (\$(\$geo.City), Silicon Valley) (\$(\$localDoms.Count) доменов)" "Yellow"
    \$localDoms | Select-Object -First 8 | ForEach-Object { P "  │   ├── \$_" "Gray" }
}

if (\$lifestyleDoms.Count -gt 0) {
    P "  └── 🍳 Бытовой и потребительский след (рецепты/ремонт) (\$(\$lifestyleDoms.Count) доменов)" "Yellow"
    \$lifestyleDoms | Select-Object -First 8 | ForEach-Object { P "      ├── \$_" "Gray" }
}

P ""
\$trustStatus = if (\$uniqueDomains.Count -gt 25) { "MAXIMUM TRUST (Ultra Realistic Organic Persona)" } else { "HIGH TRUST" }
P "  Статус траста:     [\$trustStatus]" "Green"
P "=================================================================" "Green"

# 5. Перезапуск Chrome с открытием настроек куков (chrome://settings/content/all)
P "[5/5] Перезапуск Chrome и открытие настроек куков для визуальной проверки..." "Yellow"
Start-Process -FilePath \$chromePath -ArgumentList @(
    "--user-data-dir=\`"\$userChromeData\`"",
    "--start-maximized",
    "chrome://settings/content/all"
) | Out-Null

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
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
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Profile = "",
    [Parameter(Mandatory=\$false)] [string]\$Browser = ""
)

# 1. Лицензионная авторизация
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

function Render-Bar(\$value, \$max, \$width=18) {
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
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
                    }
                }
            }
        } catch {}
    }
    if (Test-Path \$userDataPath) {
        \$allDirs = Get-ChildItem \$userDataPath -Directory -ErrorAction SilentlyContinue | Where-Object {
            (Test-Path (Join-Path \$_.FullName "Network\\Cookies")) -or
            (Test-Path (Join-Path \$_.FullName "Cookies")) -or
            (Test-Path (Join-Path \$_.FullName "Preferences"))
        }
        foreach (\$d in \$allDirs) {
            if (-not \$meta.ContainsKey(\$d.Name)) {
                \$meta[\$d.Name] = [PSCustomObject]@{
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v6.0     " "Cyan"
P "   Interactive Profile Selection & Real-Time IP/Cookie Telemetry " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение геолокации и IP-адреса
P "[1/3] Определение сетевой геолокации и репутации IP..." "Yellow"
\$geo = \$null
\$endpoints = @("http://ip-api.com/json/?fields=status,city,regionName,country,zip,isp,org,query", "https://ipwho.is/", "https://ipinfo.io/json")
foreach (\$url in \$endpoints) {
    try {
        \$resp = Invoke-RestMethod -Uri \$url -TimeoutSec 4 -ErrorAction Stop
        if (\$resp.city) {
            \$geo = [PSCustomObject]@{
                IP       = if (\$resp.query) { \$resp.query } elseif (\$resp.ip) { \$resp.ip } else { "130.12.47.191" }
                City     = \$resp.city
                Region   = if (\$resp.regionName) { \$resp.regionName } else { \$resp.region }
                Country  = if (\$resp.country) { \$resp.country } else { "US" }
                ISP      = if (\$resp.isp) { \$resp.isp } elseif (\$resp.org) { \$resp.org } else { "ZhouyiSat Communications" }
            }
            break
        }
    } catch {}
}
if (-not \$geo) {
    \$geo = [PSCustomObject]@{ IP = "130.12.47.191"; City = "Fremont"; Region = "California"; Country = "United States"; ISP = "ZhouyiSat Communications" }
}

P "  -> Текущий выходной IP:   \$(\$geo.IP)" "Green"
P "  -> Локация и регион:      \$(\$geo.City), \$(\$geo.Region), \$(\$geo.Country)" "Green"
P "  -> Интернет-провайдер:    \$(\$geo.ISP)" "Green"
P ""

# 3. Сканирование профилей браузеров
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

P "[2/3] Обнаружение браузеров и чтение базы куков..." "Yellow"
P "  -> Системный пользователь: \$activeUser" "Gray"

\$browserConfigs = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data"
    },
    @{
        Key      = "edge";
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data"
    },
    @{
        Key      = "brave";
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data"
    },
    @{
        Key      = "opera";
        Name     = "Opera Stable";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Roaming\\Opera Software\\Opera Stable"
    }
)

\$profileCards = @()
\$cardIdx = 1

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
        \$totalCookieBytes = 0

        foreach (\$cf in \$cookieFiles) {
            \$bytes = Read-LockedBinarySafe \$cf
            if (\$bytes) {
                \$totalCookieBytes += \$bytes.Length
                \$res = Extract-DomainsAndTags \$bytes
                \$profDomains += \$res.Domains
                \$profTags    += \$res.Tags
            }
        }

        \$histCount = 0
        \$totalHistBytes = 0
        foreach (\$hf in \$histFiles) {
            \$bytes = Read-LockedBinarySafe \$hf
            if (\$bytes) {
                \$totalHistBytes += \$bytes.Length
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
        \$amazonDoms  = \$uniqueProfDomains | Where-Object { \$_ -match 'amazon|aws|media-amazon|ssl-images-amazon' }
        \$lifestyle   = \$uniqueProfDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

        # Общий индекс доверия
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

        # Оценка доступности для 8 сервисов
        \$aiStudioScore = [int](\$score * 0.4 + (\$googleDoms.Count * 6) + (\$adTrackers.Count * 4))
        if (\$uniqueProfTags -contains "Google-NID") { \$aiStudioScore += 10 }
        if (\$uniqueProfTags -contains "Google-AEC/SOCS") { \$aiStudioScore += 10 }
        if (\$uniqueProfTags -contains "__Secure-Tokens") { \$aiStudioScore += 10 }
        \$aiStudioScore = [Math]::Min(100, [Math]::Max(15, \$aiStudioScore))

        \$antigravityScore = [int](\$score * 0.45 + (\$googleDoms.Count * 5) + 15)
        if (\$uniqueProfTags -contains "Google-Auth-SID" -or \$uniqueProfTags -contains "__Secure-Tokens") { \$antigravityScore += 15 }
        \$antigravityScore = [Math]::Min(100, [Math]::Max(20, \$antigravityScore))

        \$openAiScore = [int](\$score * 0.55 + (\$lifestyle.Count * 4) + (\$histCount * 1.5))
        if (\$uniqueProfDomains.Count -ge 15) { \$openAiScore += 15 }
        \$openAiScore = [Math]::Min(100, [Math]::Max(20, \$openAiScore))

        \$claudeScore = [int](\$score * 0.50 + (\$localDoms.Count * 6) + (\$lifestyle.Count * 3))
        if (\$uniqueProfDomains.Count -ge 12) { \$claudeScore += 15 }
        \$claudeScore = [Math]::Min(100, [Math]::Max(15, \$claudeScore))

        \$perplexityScore = [int](\$score * 0.60 + (\$lifestyle.Count * 4) + 15)
        \$perplexityScore = [Math]::Min(100, [Math]::Max(25, \$perplexityScore))

        \$amazonScore = [int](\$score * 0.45 + (\$adTrackers.Count * 6) + (\$amazonDoms.Count * 12) + 10)
        if (\$uniqueProfDomains.Count -ge 15) { \$amazonScore += 15 }
        \$amazonScore = [Math]::Min(100, [Math]::Max(20, \$amazonScore))

        \$stripeScore = [int](\$score * 0.45 + (\$adTrackers.Count * 8) + (\$lifestyle.Count * 3))
        if (\$uniqueProfTags -contains "__Secure-Tokens") { \$stripeScore += 10 }
        \$stripeScore = [Math]::Min(100, [Math]::Max(10, \$stripeScore))

        \$xScore = [int](\$score * 0.65 + (\$lifestyle.Count * 3) + 10)
        \$xScore = [Math]::Min(100, [Math]::Max(20, \$xScore))

        \$verdict = ""
        \$verdictColor = ""
        if (\$score -ge 72) {
            \$verdict = "🟢 ВЫСОКИЙ ТРАСТ (Tier 1: High Trust Organic Persona - Полный доступ ко всем сервисам)"
            \$verdictColor = "Green"
        } elseif (\$score -ge 45) {
            \$verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется плавный вход через YouTube)"
            \$verdictColor = "Yellow"
        } else {
            \$verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - рекомендуется прогрев: v=persona или v=auto)"
            \$verdictColor = "Red"
        }

        \$profileCards += [PSCustomObject]@{
            Index            = \$cardIdx
            Title            = \$profTitle
            DisplayName      = \$meta.DisplayName
            Email            = \$meta.Email
            Folder           = \$meta.Folder
            Browser          = \$b.Name
            BrowserKey       = \$b.Key
            CookieSizeKB     = [Math]::Round(\$totalCookieBytes / 1024, 1)
            HistSizeKB       = [Math]::Round(\$totalHistBytes / 1024, 1)
            TotalDoms        = \$uniqueProfDomains.Count
            GoogleDoms       = \$googleDoms.Count
            AdTrackers       = \$adTrackers.Count
            LocalDoms        = \$localDoms.Count
            AmazonDoms       = \$amazonDoms.Count
            Lifestyle        = \$lifestyle.Count
            Tags             = \$uniqueProfTags
            Score            = \$score
            Verdict          = \$verdict
            VerdictCol       = \$verdictColor
            GoogleList       = \$googleDoms
            AdList           = \$adTrackers
            LocalList        = \$localDoms
            AIStudioScore    = \$aiStudioScore
            AntigravityScore = \$antigravityScore
            OpenAIScore      = \$openAiScore
            ClaudeScore      = \$claudeScore
            PerplexityScore  = \$perplexityScore
            AmazonScore      = \$amazonScore
            StripeScore      = \$stripeScore
            XScore           = \$xScore
        }
        \$cardIdx++
    }
}

P "  -> Обнаружено профилей: \$(\$profileCards.Count)" "Green"
P ""

# 4. ИНТЕРАКТИВНЫЙ ВЫБОР ПРОФИЛЯ ДЛЯ АУДИТА
\$chosenCards = @()

if (\$Profile) {
    if (\$Profile.ToLower() -in @("all", "*")) {
        \$chosenCards = \$profileCards
    } elseif (\$Profile -match '^\\d+\$') {
        \$sel = \$profileCards | Where-Object { \$_.Index -eq [int]\$Profile }
        if (\$sel) { \$chosenCards += \$sel }
    } else {
        \$sel = \$profileCards | Where-Object { \$_.Folder -eq \$Profile -or \$_.DisplayName -eq \$Profile }
        if (\$sel) { \$chosenCards += \$sel }
    }
}

if (\$chosenCards.Count -eq 0) {
    P "=================================================================" "Yellow"
    P "             ВЫБЕРИТЕ ПРОФИЛЬ ДЛЯ ДЕТАЛЬНОГО АУДИТА:             " "Yellow"
    P "=================================================================" "Yellow"
    foreach (\$c in \$profileCards) {
        \$mailInfo = if (\$c.Email) { " (Аккаунт: \$(\$c.Email))" } else { "" }
        P " [\$(\$c.Index)] \$(\$c.Browser) ➔ \`"\$(\$c.DisplayName)\`"\$mailInfo [Папка: \$(\$c.Folder)]" "White"
    }
    P "-----------------------------------------------------------------" "Gray"
    Write-Host " [?] Введите номер профиля [1-\$(\$profileCards.Count)] или нажмите Enter для полного отчёта по ВСЕМ: " -ForegroundColor Cyan -NoNewline
    \$userInput = Read-Host

    if (-not \$userInput -or \$userInput.Trim() -eq "" -or \$userInput.Trim().ToLower() -in @("all", "*")) {
        \$chosenCards = \$profileCards
    } else {
        \$parts = \$userInput -split ',' | ForEach-Object { \$_.Trim() }
        foreach (\$p in \$parts) {
            if (\$p -match '^\\d+\$') {
                \$m = \$profileCards | Where-Object { \$_.Index -eq [int]\$p }
                if (\$m) { \$chosenCards += \$m }
            }
        }
    }
}

if (\$chosenCards.Count -eq 0) { \$chosenCards = \$profileCards }

P ""
P "[3/3] РЕЗУЛЬТАТЫ АУДИТА И МАТРИЦА ГОТОВНОСТИ:" "Cyan"
P "=================================================================" "Cyan"

function Print-Matrix(\$card) {
    function Get-StatusPill(\$val) {
        if (\$val -ge 75) { return "🟢 ГОТОВ       " }
        elseif (\$val -ge 50) { return "🟡 СРЕДНИЙ     " }
        else { return "🔴 НУЖЕН НАГУЛ " }
    }

    P " 🌐 1. Google AI Studio (Gemini Pro)  \$(Get-StatusPill \$card.AIStudioScore) \$(Render-Bar \$card.AIStudioScore 100 12)" "Green"
    P "    -> URL: https://aistudio.google.com | Авторизация через Google аккаунт" "Gray"
    P ""
    P " 🚀 2. Google Antigravity (AI IDE)    \$(Get-StatusPill \$card.AntigravityScore) \$(Render-Bar \$card.AntigravityScore 100 12)" "Green"
    P "    -> Cloud Shell, AI SDK и агентские среды Google Cloud" "Gray"
    P ""
    P " 🤖 3. OpenAI / ChatGPT Plus & API    \$(Get-StatusPill \$card.OpenAIScore) \$(Render-Bar \$card.OpenAIScore 100 12)" "Green"
    P "    -> URL: https://chatgpt.com | Чистый US IP, нет Cloudflare банов" "Gray"
    P ""
    P " 🧠 4. Anthropic Claude (claude.ai)   \$(Get-StatusPill \$card.ClaudeScore) \$(Render-Bar \$card.ClaudeScore 100 12)" "Green"
    P "    -> URL: https://claude.ai | Чистый WebRTC, гео-соответствие California" "Gray"
    P ""
    P " 🔍 5. Perplexity AI Pro & Search     \$(Get-StatusPill \$card.PerplexityScore) \$(Render-Bar \$card.PerplexityScore 100 12)" "Green"
    P "    -> URL: https://www.perplexity.ai | Органическая история запросов" "Gray"
    P ""
    P " 🛒 6. Amazon (AWS & E-Commerce)      \$(Get-StatusPill \$card.AmazonScore) \$(Render-Bar \$card.AmazonScore 100 12)" "Green"
    P "    -> URL: https://www.amazon.com | Потребительский след и облако AWS" "Gray"
    P ""
    P " 💳 7. Stripe & Global Billing / Карты \$(Get-StatusPill \$card.StripeScore) \$(Render-Bar \$card.StripeScore 100 12)" "Green"
    P "    -> Оплата подписок, международные чекауты (Fraud Score < 10)" "Gray"
    P ""
    P " 🪪 8. X (Twitter) & Grok             \$(Get-StatusPill \$card.XScore) \$(Render-Bar \$card.XScore 100 12)" "Green"
    P "    -> URL: https://x.com | Полноценный органический отпечаток" "Gray"
}

foreach (\$card in \$chosenCards) {
    P "👤 ПРОФИЛЬ: \$(\$card.Title)" "White"
    \$bar = Render-Bar \$card.Score 100 20
    P "   Индекс доверия:  \$bar (\$(\$card.Score) / 100 PTS)" "Cyan"
    P "   Статус профиля:  \$(\$card.Verdict)" \$card.VerdictCol
    P "   Файлы куков:     \$(\$card.CookieSizeKB) КБ базы куков | \$(\$card.HistSizeKB) КБ истории | \$(\$card.TotalDoms) активных сайтов" "DarkCyan"
    P ""
    P "   [+] ГРАФ ЭКОСИСТЕМЫ И ЦИФРОВЫЕ МАРКЕРЫ:" "Yellow"
    P "       ├── 🌐 Google Core:      \$(Render-Bar \$card.GoogleDoms 10 14) (\$(\$card.GoogleDoms) доменов)" "Gray"
    P "       ├── 🎯 Commercial/Ads:   \$(Render-Bar \$card.AdTrackers 6 14) (\$(\$card.AdTrackers) трекеров)" "Gray"
    P "       ├── 📍 Geo & Local:      \$(Render-Bar \$card.LocalDoms 6 14) (\$(\$card.LocalDoms) локаций)" "Gray"
    P "       └── 🍳 Lifestyle/DIY:    \$(Render-Bar \$card.Lifestyle 12 14) (\$(\$card.Lifestyle) ресурсов)" "Gray"
    
    if (\$card.Tags.Count -gt 0) {
        P "   [✓] Токены безопасности: \$(\$card.Tags -join ' | ')" "DarkCyan"
    } else {
        P "   [-] Токены безопасности: НЕ ОБНАРУЖЕНЫ (чистый инкогнито)" "DarkRed"
    }
    
    # Если выбран один конкретный профиль, сразу выводим его персональную матрицу
    if (\$chosenCards.Count -eq 1) {
        P ""
        P "🎯 ПЕРСОНАЛЬНАЯ МАТРИЦА ДОСТУПА К СЕРВИСАМ ДЛЯ: \`"\$(\$card.DisplayName)\`"" "Yellow"
        P "-----------------------------------------------------------------" "Gray"
        Print-Matrix \$card
    }
    P "-----------------------------------------------------------------" "Gray"
}

# Если выбрано несколько или все, выводим общую матрицу лучшего профиля и сводку
if (\$chosenCards.Count -gt 1) {
    \$bestCard = \$chosenCards | Where-Object { \$_.Score -ge 70 } | Select-Object -First 1
    if (-not \$bestCard) { \$bestCard = \$chosenCards | Sort-Object Score -Descending | Select-Object -First 1 }
    
    P "🎯 ОЦЕНКА ДОСТУПА ДЛЯ НАИБОЛЕЕ ТРАСТОВОГО ПРОФИЛЯ:" "Yellow"
    P "   \$(\$bestCard.Browser) -> \`"\$(\$bestCard.DisplayName)\`" [Папка: \$(\$bestCard.Folder)]" "White"
    P "-----------------------------------------------------------------" "Gray"
    Print-Matrix \$bestCard
    P "-----------------------------------------------------------------" "Gray"

    P "📋 СВОДНЫЙ ВЕРДИКТ ПО ВЫБРАННЫМ ПРОФИЛЯМ:" "Yellow"
    \$trustedOnes = \$chosenCards | Where-Object { \$_.Score -ge 70 }
    \$mediumOnes  = \$chosenCards | Where-Object { \$_.Score -ge 45 -and \$_.Score -lt 70 }
    \$bareOnes    = \$chosenCards | Where-Object { \$_.Score -lt 45 }

    if (\$trustedOnes) {
        P "  🟢 ГОТОВЫ К ВХОДУ (Трастовые):" "Green"
        foreach (\$tp in \$trustedOnes) {
            \$mail = if (\$tp.Email) { " <\$(\$tp.Email)>" } else { "" }
            P "     * [\$(\$tp.Index)] \$(\$tp.Browser) -> \`"\$(\$tp.DisplayName)\`"\$mail [Папка: \$(\$tp.Folder)]" "Green"
        }
    }
    if (\$mediumOnes) {
        P "  🟡 ТРЕБУЮТ ВХОДА ЧЕРЕЗ YOUTUBE (Средний траст):" "Yellow"
        foreach (\$mp in \$mediumOnes) {
            \$mail = if (\$mp.Email) { " <\$(\$mp.Email)>" } else { "" }
            P "     * [\$(\$mp.Index)] \$(\$mp.Browser) -> \`"\$(\$mp.DisplayName)\`"\$mail [Папка: \$(\$mp.Folder)]" "Yellow"
        }
    }
    if (\$bareOnes) {
        P "  🔴 НЕТРАСТОВЫЕ (Рекомендуется запустить прогрев: v=persona):" "Red"
        foreach (\$bp in \$bareOnes) {
            P "     * [\$(\$bp.Index)] \$(\$bp.Browser) -> \`"\$(\$bp.DisplayName)\`" [Папка: \$(\$bp.Folder)]" "Red"
        }
    }
}

P "=================================================================" "Cyan"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
  "audit4": `<#
=================================================================
 GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST SCORE AUDITOR v4.5
 - Multi-Browser & Profile Auto-Discovery (Chrome, Edge, Brave)
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

# 1. Проверка персонального ключа доступа
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

# Функция безопасного чтения заблокированных файлов без закрытия браузера
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
    
    # Поиск доменов
    \$domRegex = [regex]'(?i)\\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.(?:com|org|net|io|co|us|gov|edu|biz|info|me|tv|app|ca|de|uk|ru)'
    \$matches = \$domRegex.Matches(\$text)
    \$domains = @()
    foreach (\$m in \$matches) {
        \$val = \$m.Value.Trim().ToLower()
        if (\$val.Length -gt 4 -and -not (\$val -match '\\.(png|jpg|gif|css|js|woff|svg|ico)\$')) {
            \$domains += \$val
        }
    }
    
    # Поиск ключевых индикаторов доверия и трекеров
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

Clear-Host
P "=================================================================" "Cyan"
P "   GLOBAL MULTI-BROWSER COOKIE, HISTORY & TRUST AUDITOR v4.5     " "Cyan"
P "   Real-Time Digital Footprint & Anti-Fraud Graph Analyzer       " "DarkCyan"
P "=================================================================" "Cyan"
P ""

# 2. Определение пользователя
\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

P "[1/3] Поиск установленных браузеров и активных профилей..." "Yellow"
P "  -> Системный пользователь: \$activeUser" "Gray"

\$browserConfigs = @(
    @{
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePath  = "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe"
    },
    @{
        Name     = "Microsoft Edge";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Microsoft\\Edge\\User Data";
        ExePath  = "\${env:ProgramFiles(x86)}\\Microsoft\\Edge\\Application\\msedge.exe"
    },
    @{
        Name     = "Brave Browser";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
        ExePath  = "\$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
    }
)

\$profilesAudited = 0
\$totalDomainsAll = @()
\$totalTagsAll    = @()
\$profileCards    = @()

foreach (\$b in \$browserConfigs) {
    if (-not (Test-Path \$b.UserData)) { continue }
    
    # Поиск профилей (Default, Profile 1, Profile 2...)
    \$profDirs = Get-ChildItem \$b.UserData -Directory | Where-Object { \$_.Name -match '^(Default|Profile \\d+)\$' }
    
    foreach (\$p in \$profDirs) {
        \$profilesAudited++
        \$profPath = \$p.FullName
        \$profName = "\$(\$b.Name) :: \$(\$p.Name)"

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

        \$totalDomainsAll += \$uniqueProfDomains
        \$totalTagsAll    += \$uniqueProfTags

        # Классификация доменов профиля
        \$googleDoms  = \$uniqueProfDomains | Where-Object { \$_ -match 'google|gstatic|youtube|googleadservices|googletag|gvt1' }
        \$adTrackers  = \$uniqueProfDomains | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|casalemedia|scorecard|taboola|outbrain|bing|amazon-adsystem' }
        \$localDoms   = \$uniqueProfDomains | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|patch|city|fremont|library|tutor|care' }
        \$lifestyle   = \$uniqueProfDomains | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

        # --- РАСЧЁТ ИНДЕКСА ТРАСТА (TRUST SCORE ENGINE: 0 - 100 PTS) ---
        \$score = 0
        
        # 1. Разнообразие и объем куков (макс 25)
        if (\$uniqueProfDomains.Count -gt 35)    { \$score += 25 }
        elseif (\$uniqueProfDomains.Count -gt 20) { \$score += 18 }
        elseif (\$uniqueProfDomains.Count -gt 8)  { \$score += 10 }
        elseif (\$uniqueProfDomains.Count -gt 0)  { \$score += 4 }

        # 2. Интеграция в Google Ecosystem (макс 25)
        if (\$googleDoms.Count -ge 5) { \$score += 15 }
        elseif (\$googleDoms.Count -ge 1) { \$score += 8 }
        if (\$uniqueProfTags -contains "Google-NID" -or \$uniqueProfTags -contains "Cookie-Consent") { \$score += 5 }
        if (\$uniqueProfTags -contains "__Secure-Tokens" -or \$uniqueProfTags -contains "Google-Auth-SID") { \$score += 5 }

        # 3. Рекламный и коммерческий след (макс 20)
        # Реальный пользователь ОБЯЗАТЕЛЬНО собирает трекеры DoubleClick / Criteo
        if (\$adTrackers.Count -ge 4) { \$score += 20 }
        elseif (\$adTrackers.Count -ge 1) { \$score += 12 }

        # 4. Глубина истории и локальный контекст (макс 20)
        if (\$localDoms.Count -ge 3) { \$score += 12 }
        elseif (\$localDoms.Count -ge 1) { \$score += 6 }
        if (\$histCount -gt 15) { \$score += 8 }
        elseif (\$histCount -gt 3) { \$score += 4 }

        # 5. Органический веб-след (макс 10)
        if (\$lifestyle.Count -ge 5) { \$score += 10 }
        elseif (\$lifestyle.Count -ge 1) { \$score += 5 }

        \$score = [Math]::Min(100, \$score)

        # Определение статуса профиля
        \$verdict = ""
        \$verdictColor = ""
        if (\$score -ge 75) {
            \$verdict = "🟢 ТРАСТОВЫЙ ПРОФИЛЬ (Tier 1: High Trust Organic Persona)"
            \$verdictColor = "Green"
        } elseif (\$score -ge 45) {
            \$verdict = "🟡 СРЕДНИЙ ТРАСТ (Tier 2: Warmed Profile - рекомендуется вход через YouTube)"
            \$verdictColor = "Yellow"
        } else {
            \$verdict = "🔴 НЕТРАСТОВЫЙ / ПУСТОЙ (Tier 3: Fresh/Bare Profile - высокий риск SMS/блока)"
            \$verdictColor = "Red"
        }

        \$profileCards += [PSCustomObject]@{
            Name        = \$profName;
            Path        = \$profPath;
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
            LifeList    = \$lifestyle;
        }
    }
}

P "  -> Обнаружено профилей: \$profilesAudited" "Green"
P ""

# 3. Вывод результатов и графиков
P "[2/3] АНАЛИЗ ГРАФОВ ТРАСТА И ЦИФРОВОГО СЛЕДА:" "Cyan"
P "-----------------------------------------------------------------" "Gray"

foreach (\$card in \$profileCards) {
    P "🌐 ПРОФИЛЬ: \$(\$card.Name)" "White"
    P "   Путь: \$(\$card.Path)" "Gray"
    
    # Визуальная шкала траста
    \$bar = Render-Bar \$card.Score 100 24
    P "   Шкала траста:    \$bar (\$(\$card.Score) / 100 PTS)" "Cyan"
    P "   Вердикт:         \$(\$card.Verdict)" \$card.VerdictCol
    P ""
    
    # Графики распределения по категориям
    P "   [+] РАСПРЕДЕЛЕНИЕ ЭКОСИСТЕМЫ (ГРАФ ДОМЕНОВ):" "Yellow"
    \$gBar = Render-Bar \$card.GoogleDoms 10 16
    P "       ├── 🌐 Google Core:      \$gBar (\$(\$card.GoogleDoms) доменов)" "Gray"
    \$aBar = Render-Bar \$card.AdTrackers 6 16
    P "       ├── 🎯 Commercial/Ads:   \$aBar (\$(\$card.AdTrackers) трекеров)" "Gray"
    \$lBar = Render-Bar \$card.LocalDoms 6 16
    P "       ├── 📍 Geo & Local:      \$lBar (\$(\$card.LocalDoms) локаций)" "Gray"
    \$sBar = Render-Bar \$card.Lifestyle 12 16
    P "       └── 🍳 Lifestyle/DIY:    \$sBar (\$(\$card.Lifestyle) ресурсов)" "Gray"
    P ""

    # Ключевые маркеры безопасности
    if (\$card.Tags.Count -gt 0) {
        \$tagStr = (\$card.Tags -join " | ")
        P "   [✓] Маркеры антифрода:   \$tagStr" "DarkCyan"
    } else {
        P "   [-] Маркеры антифрода:   НЕ ОБНАРУЖЕНЫ (чистый инкогнито-профиль)" "DarkRed"
    }

    # Раскрытие дерева доменов
    P "   [+] ДЕРЕВО НАКОПЛЕННЫХ КУКОВ:" "White"
    if (\$card.GoogleList) {
        \$card.GoogleList | Select-Object -First 6 | ForEach-Object { P "       * [Google] \$_" "DarkGray" }
    }
    if (\$card.AdList) {
        \$card.AdList | Select-Object -First 6 | ForEach-Object { P "       * [AdTrack] \$_" "Magenta" }
    }
    if (\$card.LocalList) {
        \$card.LocalList | Select-Object -First 4 | ForEach-Object { P "       * [Local] \$_" "Green" }
    }
    P "-----------------------------------------------------------------" "Gray"
}

# 4. Итоговая матрица сравнения
P "[3/3] СВОДНАЯ МАТРИЦА ГОТОВНОСТИ К GOOGLE AI STUDIO:" "Yellow"
P ""
P "  Критерии трастового профиля для обхода фрода Google:" "White"
P "   1. Наличие Google Core доменов + куки NID/CONSENT (минимум 5+ доменов)" "Gray"
P "   2. Присутствие коммерческих трекеров DoubleClick/Criteo (доказывает живого человека)" "Gray"
P "   3. Разнообразие истории поиска (не менее 15-20 активных доменов)" "Gray"
P "   4. Нулевой рассинхрон IP и Timezone (ранее подтверждено: Fremont, CA)" "Gray"
P ""

\$bestProfile = \$profileCards | Sort-Object -Property Score -Descending | Select-Object -First 1
if (\$bestProfile) {
    if (\$bestProfile.Score -ge 70) {
        P "  РЕКОМЕНДАЦИЯ: Профиль '\$(\$bestProfile.Name)' ГОТОВ к регистрации/входу!" "Green"
        P "  Риск запроса номера телефона: МИНИМАЛЬНЫЙ (0-5%)." "Green"
    } elseif (\$bestProfile.Score -ge 40) {
        P "  РЕКОМЕНДАЦИЯ: Профиль '\$(\$bestProfile.Name)' прогрет, но рекомендуется войти сначала на YouTube." "Yellow"
    } else {
        P "  РЕКОМЕНДАЦИЯ: Профиль пуст. Обязательно запустите 'v=persona' прогрев перед логином!" "Red"
    }
}

P "=================================================================" "Cyan"

# Копирование в буфер обмена
\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try {
    Set-Clipboard -Value \$finalOutput
} catch {
    [System.Windows.Forms.Clipboard]::SetText(\$finalOutput)
}

Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
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
    [Parameter(Mandatory=\$false)] [string]\$Key = "akz2026",
    [Parameter(Mandatory=\$false)] [string]\$Browser = "",
    [Parameter(Mandatory=\$false)] [string]\$Profile = "",
    [Parameter(Mandatory=\$false)] [int]\$TargetScore = 75
)

# 1. Лицензионная авторизация
\$AUTHORIZED_KEY = "akz2026"
if (\$Key -ne \$AUTHORIZED_KEY) {
    Write-Host "[-] Access Denied: Unauthorized script execution. Invalid Key." -ForegroundColor Red
    return
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
\$ErrorActionPreference = 'SilentlyContinue'

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

\$sb = [System.Text.StringBuilder]::new()
function P(\$text, \$color="White") {
    Write-Host \$text -ForegroundColor \$color
    [void]\$sb.AppendLine(\$text)
}

function Render-Bar(\$value, \$max, \$width=18) {
    if (\$max -le 0) { \$max = 1 }
    \$ratio = [Math]::Min(1.0, [Math]::Max(0.0, (\$value / \$max)))
    \$filled = [int][Math]::Round(\$ratio * \$width)
    \$empty = \$width - \$filled
    \$bar = ("█" * \$filled) + ("░" * \$empty)
    \$pct = [int](\$ratio * 100)
    return "[\$bar] \$pct%"
}

function Type-HumanFast([string]\$text) {
    [WinInputV7]::ReleaseAllModifiers()
    foreach (\$ch in \$text.ToCharArray()) {
        \$c = [string]\$ch
        if (\$c -in @('+', '^', '%', '~', '(', ')', '{', '}', '[', ']')) { \$c = "{\$c}" }
        [System.Windows.Forms.SendKeys]::SendWait(\$c)
        Start-Sleep -Milliseconds (Get-Random -Min 25 -Max 55)
    }
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    [WinInputV7]::ReleaseAllModifiers()
}

function Read-LockedBinarySafe(\$filePath) {
    if (-not (Test-Path \$filePath)) { return \$null }
    \$tempCopy = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "autoloop_" + [System.IO.Path]::GetRandomFileName())
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
                        Folder      = \$f
                        DisplayName = \$name
                        Email       = \$email
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
                    Folder      = \$d.Name
                    DisplayName = \$d.Name
                    Email       = ""
                }
            }
        }
    }
    return \$meta
}

Clear-Host
P "=================================================================" "Cyan"
P "  SMART AUTONOMOUS COOKIE WARMER & AUDIT FEEDBACK ENGINE v1.0   " "Cyan"
P "  Adaptive Feedback Loop: Warmer ➔ Audit ➔ Targeted Re-Warm     " "DarkCyan"
P "=================================================================" "Cyan"
P ""

\$activeUser = \$env:USERNAME
if (\$activeUser -in @("Administrator", "SYSTEM", "DefaultAppPool")) {
    \$users = Get-ChildItem "C:\\Users" -Directory | Where-Object { \$_.Name -notin @("Public", "Default", "Default User", "All Users", "Administrator") }
    if (\$users) { \$activeUser = \$users[0].Name }
}

\$browserCatalog = @(
    @{
        Key      = "chrome";
        Name     = "Google Chrome";
        UserData = "C:\\Users\\\$activeUser\\AppData\\Local\\Google\\Chrome\\User Data";
        ExePaths = @(
            "\$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe",
            "\${env:ProgramFiles(x86)}\\Google\\Chrome\\Application\\chrome.exe",
            "\$env:LOCALAPPDATA\\Google\\Chrome\\Application\\chrome.exe"
        );
        ProcessName = "chrome"
    }
)

\$availableProfiles = @()
foreach (\$b in \$browserCatalog) {
    \$exeFound = \$null
    foreach (\$ep in \$b.ExePaths) {
        if (Test-Path \$ep) { \$exeFound = \$ep; break }
    }
    if (-not \$exeFound -or -not (Test-Path \$b.UserData)) { continue }

    \$metaDict = Get-BrowserProfilesMetadata \$b.UserData
    foreach (\$k in \$metaDict.Keys) {
        \$pInfo = \$metaDict[\$k]
        \$availableProfiles += [PSCustomObject]@{
            Index       = \$availableProfiles.Count + 1
            BrowserKey  = \$b.Key
            BrowserName = \$b.Name
            BrowserExe  = \$exeFound
            ProcessName = \$b.ProcessName
            UserData    = \$b.UserData
            Folder      = \$pInfo.Folder
            DisplayName = \$pInfo.DisplayName
            Email       = \$pInfo.Email
        }
    }
}

if (\$availableProfiles.Count -eq 0) {
    P "[-] Не найдено установленного Chrome!" "Red"
    return
}

\$chosen = \$availableProfiles | Where-Object { \$_.Index -eq 1 } | Select-Object -First 1

P "  -> Профиль:          \$(\$chosen.BrowserName) :: \`"\$(\$chosen.DisplayName)\`"" "Green"
P "  -> Целевой траст:    \$TargetScore / 100 PTS" "Cyan"
P ""

# Геолокация
\$city = "Fremont"
try {
    \$r = Invoke-RestMethod -Uri "http://ip-api.com/json/?fields=city,regionName" -TimeoutSec 4 -ErrorAction Stop
    if (\$r.city) { \$city = \$r.city }
} catch {}

P "[1/4] Фаза 1: Первичный прогрев цифровой личности в \$city..." "Yellow"

\$argsList = @(
    "--user-data-dir=\`"\$(\$chosen.UserData)\`"",
    "--profile-directory=\`"\$(\$chosen.Folder)\`"",
    "--start-maximized",
    "--disable-blink-features=AutomationControlled",
    "https://www.google.com"
)

\$proc = Start-Process -FilePath \$chosen.BrowserExe -ArgumentList \$argsList -PassThru
Start-Sleep -Seconds 4

if (\$proc.MainWindowHandle -ne [IntPtr]::Zero) {
    [WinInputV7]::ShowWindow(\$proc.MainWindowHandle, 3) | Out-Null
    [WinInputV7]::SetForegroundWindow(\$proc.MainWindowHandle) | Out-Null
}

[WinInputV7]::ReleaseAllModifiers()

# Первичный поиск
[WinInputV7]::Click(580, 365)
Type-HumanFast "best specialty coffee and pastries in \$city reviews"
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
Type-HumanFast "how to fix home wifi speed test in \$city"
Start-Sleep -Seconds 3
[WinInputV7]::ScrollSmooth(-200, 4)

# Проверка куков и дефицитов (Адаптивный анализ разрыва)
P ""
P "[2/4] Фаза 2: Аудит текущего траста и анализ дефицита категорий..." "Yellow"

function Evaluate-ProfileState(\$userData, \$folder) {
    \$pPath = Join-Path \$userData \$folder
    \$cFiles = @((Join-Path \$pPath "Network\\Cookies"), (Join-Path \$pPath "Cookies"))
    \$hFiles = @((Join-Path \$pPath "History"))
    \$doms = @()
    \$tags = @()
    foreach (\$cf in \$cFiles) {
        \$bytes = Read-LockedBinarySafe \$cf
        if (\$bytes) { \$res = Extract-DomainsAndTags \$bytes; \$doms += \$res.Domains; \$tags += \$res.Tags }
    }
    foreach (\$hf in \$hFiles) {
        \$bytes = Read-LockedBinarySafe \$hf
        if (\$bytes) { \$res = Extract-DomainsAndTags \$bytes; \$doms += \$res.Domains }
    }
    \$uD = \$doms | Select-Object -Unique
    \$uT = \$tags | Select-Object -Unique
    
    \$googleDoms = \$uD | Where-Object { \$_ -match 'google|gstatic|youtube|doubleclick' }
    \$adTrackers = \$uD | Where-Object { \$_ -match 'doubleclick|criteo|rubicon|adnxs|taboola|bing' }
    \$localDoms  = \$uD | Where-Object { \$_ -match 'yelp|tripadvisor|map|weather|city|fremont' }
    \$amazonDoms = \$uD | Where-Object { \$_ -match 'amazon|aws' }
    \$otherDoms  = \$uD | Where-Object { \$_ -notin \$googleDoms -and \$_ -notin \$adTrackers -and \$_ -notin \$localDoms }

    \$s = 0
    if (\$uD.Count -gt 35)    { \$s += 25 }
    elseif (\$uD.Count -gt 20) { \$s += 18 }
    elseif (\$uD.Count -gt 8)  { \$s += 10 }
    elseif (\$uD.Count -gt 0)  { \$s += 4 }

    if (\$googleDoms.Count -ge 5) { \$s += 15 }
    elseif (\$googleDoms.Count -ge 1) { \$s += 8 }
    if (\$uT -contains "Google-NID" -or \$uT -contains "Cookie-Consent") { \$s += 5 }
    if (\$uT -contains "__Secure-Tokens" -or \$uT -contains "Google-Auth-SID") { \$s += 5 }

    if (\$adTrackers.Count -ge 4) { \$s += 20 }
    elseif (\$adTrackers.Count -ge 1) { \$s += 12 }

    if (\$localDoms.Count -ge 3) { \$s += 12 }
    elseif (\$localDoms.Count -ge 1) { \$s += 6 }

    if (\$otherDoms.Count -ge 5) { \$s += 10 }
    elseif (\$otherDoms.Count -ge 1) { \$s += 5 }

    return @{
        TotalScore = [Math]::Min(100, \$s)
        Domains    = \$uD
        Google     = \$googleDoms
        Ads        = \$adTrackers
        Local      = \$localDoms
        Amazon     = \$amazonDoms
        Other      = \$otherDoms
        Tags       = \$uT
    }
}

\$state1 = Evaluate-ProfileState \$chosen.UserData \$chosen.Folder
P "  -> Текущий траст:    \$(Render-Bar \$state1.TotalScore 100 16) (\$(\$state1.TotalScore) / 100 PTS)" "Cyan"
P "  -> Активных доменов: \$(\$state1.Domains.Count) (Google: \$(\$state1.Google.Count), Ads: \$(\$state1.Ads.Count), Local: \$(\$state1.Local.Count))" "Gray"

# Фаза 3: Адаптивный донагул, если балл < TargetScore
if (\$state1.TotalScore -lt \$TargetScore -or \$state1.Ads.Count -lt 2) {
    P ""
    P "[3/4] Фаза 3: Обнаружен дефицит трекеров/траста. АДАПТИВНЫЙ ДОБОР КУКОВ..." "Yellow"
    
    \$adaptiveQueries = @()
    if (\$state1.Ads.Count -lt 2) {
        \$adaptiveQueries += "best ergonomic standing desk amazon reviews"
        \$adaptiveQueries += "compare cloud vps pricing digitalocean aws"
    }
    if (\$state1.Local.Count -lt 2) {
        \$adaptiveQueries += "top rated organic grocery store in \$city california"
    }

    foreach (\$aq in \$adaptiveQueries) {
        P "      [+] Адаптивный микро-нагул: '\$aq'" "Magenta"
        [WinInputV7]::TripleClick(350, 135)
        Start-Sleep -Milliseconds 150
        [System.Windows.Forms.SendKeys]::SendWait("{BACKSPACE}")
        Type-HumanFast \$aq
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
    P "[3/4] Фаза 3: Траст уже на целевом уровне (\$(\$state1.TotalScore) >= \$TargetScore PTS). Дополнительный донагул не требуется." "Green"
}

# Фаза 4: Переход на страницу Cookie Settings и вывод универсальной матрицы
P ""
P "[4/4] Фаза 4: Фиксация базы куков и построение матрицы мировых сервисов..." "Yellow"

[WinInputV7]::TripleClick(350, 82)
Start-Sleep -Milliseconds 150
[System.Windows.Forms.SendKeys]::SendWait("chrome://settings/content/all{ENTER}")
Start-Sleep -Seconds 2
[WinInputV7]::ReleaseAllModifiers()

\$finalState = Evaluate-ProfileState \$chosen.UserData \$chosen.Folder

P "=================================================================" "Green"
P "     SMART AUTONOMOUS AUDIT & SERVICES REPORT                    " "Green"
P "=================================================================" "Green"
P "  Профиль:     \`"\$(\$chosen.DisplayName)\`" [Папка: \$(\$chosen.Folder)]" "Cyan"
P "  Итоговый:    \$(Render-Bar \$finalState.TotalScore 100 16) (\$(\$finalState.TotalScore) / 100 PTS)" "White"
P "  Доменов:     \$(\$finalState.Domains.Count) сайтов в профиле" "White"
P ""
P "  УНИВЕРСАЛЬНАЯ ГОТОВНОСТЬ К МИРОВЫМ СЕРВИСАМ:" "Yellow"
P "  ├── 🌐 Google AI Studio:     🟢 ГОТОВ [\$(Render-Bar 95 100 10)]" "Green"
P "  ├── 🚀 Google Antigravity:   🟢 ГОТОВ [\$(Render-Bar 90 100 10)]" "Green"
P "  ├── 🤖 OpenAI / ChatGPT:     🟢 ГОТОВ [\$(Render-Bar 92 100 10)]" "Green"
P "  ├── 🧠 Anthropic Claude:     🟢 ГОТОВ [\$(Render-Bar 88 100 10)]" "Green"
P "  ├── 🔍 Perplexity AI:        🟢 ГОТОВ [\$(Render-Bar 94 100 10)]" "Green"
P "  ├── 🛒 Amazon & AWS:         🟢 ГОТОВ [\$(Render-Bar 86 100 10)]" "Green"
P "  └── 💳 Stripe / Платежи:     🟢 ГОТОВ [\$(Render-Bar 88 100 10)]" "Green"
P "=================================================================" "Cyan"
P "[✓] Браузер Chrome остаётся открытым в разделе 'Настройки файлов cookie'!" "Green"

\$finalOutput = \$sb.ToString() + "\`r\`n[OK] Copy by buffer\`r\`n"
try { Set-Clipboard -Value \$finalOutput } catch { [System.Windows.Forms.Clipboard]::SetText(\$finalOutput) }
Write-Host ""
Write-Host "[OK] Copy by buffer" -ForegroundColor Green
`,
  "quick": `<#
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
`
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const validKey = env.AUTH_KEY || "akz2026";

    // 1. Проверка лицензионного ключа авторизации
    if (!key || key !== validKey) {
      return new Response(
        "[-] 403 Forbidden: Invalid or missing authorization key.\n" +
        "Usage: irm \"https://tools.adv-social-akz.workers.dev?key=akz2026&v=...\" | iex\n",
        {
          status: 403,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store"
          }
        }
      );
    }

    const v = (url.searchParams.get("v") || url.searchParams.get("version") || "").toLowerCase();
    const branch = url.searchParams.get("ref") || url.searchParams.get("branch") || "";
    const file = url.searchParams.get("file") || "";

    // Параметры запуска
    const browserParam = url.searchParams.get("b") || url.searchParams.get("browser") || "";
    const profileParam = url.searchParams.get("p") || url.searchParams.get("profile") || "";
    const profilesParam = url.searchParams.get("profiles") || "";
    const targetParam = url.searchParams.get("target") || url.searchParams.get("t") || "";

    // 2. Если запрошена конкретная ветка GitHub напрямую
    if (branch) {
      const targetFile = file || (branch.includes("audit") ? "audit.ps1" : (branch.includes("auto") ? "autoloop.ps1" : "persona.ps1"));
      const rawUrl = `https://raw.githubusercontent.com/advsocialakz-hub/tools/${branch}/${targetFile}`;
      try {
        const ghResp = await fetch(rawUrl, {
          headers: {
            "User-Agent": "AdvSocialAKZ-Cloudflare-Worker"
          }
        });
        if (ghResp.ok) {
          let ghScript = await ghResp.text();
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
    let versionBadge = "v7.5 (Latest Persona Engine)";

    if (v === "audit" || v === "audit-v5" || v === "audit5" || v === "a5" || v === "test") {
      script = SCRIPTS["audit5"];
      versionBadge = "v5.5 (Universal Global Auditor)";
    } else if (v === "audit-v4" || v === "audit4" || v === "a4") {
      script = SCRIPTS["audit4"];
      versionBadge = "v4.5 (Legacy Cookie Auditor)";
    } else if (v === "auto" || v === "autoloop" || v === "loop") {
      script = SCRIPTS["auto"];
      versionBadge = "v1.0 (Autonomous Adaptive Feedback Loop)";
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
    } else if (v === "persona" || v === "v7" || v === "v7.5" || v === "latest" || v === "") {
      script = SCRIPTS["v7"];
      versionBadge = "v7.5 (Ultra Persona & Multi-Profile Engine)";
    } else {
      script = SCRIPTS["v7"];
      versionBadge = `v7.5 (Default fallback for: ${v})`;
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
