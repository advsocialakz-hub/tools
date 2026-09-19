<#
=================================================================
  VM FORENSIC TIMELINE & LEAK AUDITOR v1.0
  Deep Post-Reboot Execution, Network Profile & Socket Forensic Engine
=================================================================
#>

[CmdletBinding()]
param()

$Host.UI.RawUI.ForegroundColor = 'White'
$Host.UI.RawUI.BackgroundColor = 'Black'
Clear-Host

function Print-Banner {
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host "   🕵️  VM FORENSIC TIMELINE & POST-BOOT LEAK DETECTOR v1.0      " -ForegroundColor Green
    Write-Host "   Хронологический срез запуска, сети, портов и утечки кук       " -ForegroundColor Yellow
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host ""
}

Print-Banner

# 1. Время включения и аптайм
Write-Host "⏳ [1. СТАРТ СИСТЕМЫ И ЯДРА WINDOWS]" -ForegroundColor Cyan
$os = Get-CimInstance Win32_OperatingSystem
$bootTime = $os.LastBootUpTime
$uptime = (Get-Date) - $bootTime
Write-Host ("  • Время загрузки ОС (Boot Time):  {0:yyyy-MM-dd HH:mm:ss}" -f $bootTime) -ForegroundColor White
Write-Host ("  • Текущее системное время:       {0:yyyy-MM-dd HH:mm:ss}" -f (Get-Date)) -ForegroundColor White
Write-Host ("  • Аптайм системы:                {0} ч. {1} мин. {2} сек." -f [int]$uptime.TotalHours, $uptime.Minutes, $uptime.Seconds) -ForegroundColor Gray

# Проверка события 6005 (EventLog started)
try {
    $evtBoot = Get-WinEvent -FilterHashtable @{LogName='System'; Id=6005} -MaxEvents 1 -ErrorAction SilentlyContinue
    if ($evtBoot) {
        Write-Host ("  • Служба журналов запущена:      {0:HH:mm:ss}" -f $evtBoot.TimeCreated) -ForegroundColor Gray
    }
} catch {}

Write-Host ""

# 2. Хронология сетевых подключений (NetworkProfile)
Write-Host "🌐 [2. ХРОНОЛОГИЯ ПОДКЛЮЧЕНИЙ СЕТИ (NETWORK PROFILE)]" -ForegroundColor Cyan
$netEvents = @()
try {
    $rawNet = Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-NetworkProfile/Operational'; Id=10000,10001} -MaxEvents 30 -ErrorAction SilentlyContinue | Sort-Object TimeCreated
    foreach ($ne in $rawNet) {
        $type = if ($ne.Id -eq 10000) { "ПОДКЛЮЧЕНО" } else { "ОТКЛЮЧЕНО" }
        $color = if ($ne.Id -eq 10000) { "Green" } else { "Red" }
        # Извлекаем имя сети из сообщения
        $nameMatch = [regex]::Match($ne.Message, "Имя: (.*)|Name: (.*)")
        $netName = if ($nameMatch.Success) { ($nameMatch.Groups[1].Value + $nameMatch.Groups[2].Value).Trim() } else { "Сетевой интерфейс" }
        Write-Host ("  [{0:HH:mm:ss}] [{1,-11}] {2}" -f $ne.TimeCreated, $type, $netName) -ForegroundColor $color
        $netEvents += [PSCustomObject]@{ Time = $ne.TimeCreated; Type = $type; Name = $netName }
    }
} catch {
    Write-Host "  • Журнал NetworkProfile пуст или отключен." -ForegroundColor Gray
}

if ($netEvents.Count -eq 0) {
    Write-Host "  • Активных записей сетевых переключений не найдено." -ForegroundColor Gray
}

Write-Host ""

# 3. Хронология запуска ключевых процессов (Chrome vs Amnezia)
Write-Host "⏱️ [3. ТАЙМИНГ ЗАПУСКА ПРОЦЕССОВ (CHROME vs AMNEZIA/VPN)]" -ForegroundColor Cyan

# А. Из текущей памяти (Get-Process)
$activeProcs = Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -match "chrome|amnezia|wireguard|anydesk|openvpn" }
$procStarts = @()

foreach ($p in $activeProcs) {
    try {
        if ($p.StartTime) {
            $procStarts += [PSCustomObject]@{
                Name = $p.ProcessName
                PID = $p.Id
                StartTime = $p.StartTime
                Source = "Память (Active)"
            }
        }
    } catch {}
}

# Б. Из папки Prefetch (точный запуск исполняемых файлов)
$prefetchPath = "$env:SystemRoot\Prefetch"
if (Test-Path $prefetchPath) {
    $pfFiles = Get-ChildItem -Path $prefetchPath -Filter "*.pf" -ErrorAction SilentlyContinue | Where-Object { $_.Name -match "CHROME|AMNEZIA|WIRE|ANYDESK" }
    foreach ($pf in $pfFiles) {
        $procStarts += [PSCustomObject]@{
            Name = ($pf.Name -split "-")[0]
            PID = "-"
            StartTime = $pf.LastWriteTime
            Source = "Prefetch (Диск)"
        }
    }
}

$procStarts = $procStarts | Sort-Object StartTime

if ($procStarts.Count -gt 0) {
    $firstChrome = $procStarts | Where-Object { $_.Name -match "chrome" } | Select-Object -First 1
    $firstVpn = $procStarts | Where-Object { $_.Name -match "amnezia|wireguard|openvpn" } | Select-Object -First 1

    foreach ($ps in $procStarts) {
        $pColor = if ($ps.Name -match "chrome") { "Yellow" } elseif ($ps.Name -match "amnezia|wireguard") { "Cyan" } else { "White" }
        Write-Host ("  [{0:HH:mm:ss}] {1,-18} (PID: {2,-5}) -> {3}" -f $ps.StartTime, $ps.Name, $ps.PID, $ps.Source) -ForegroundColor $pColor
    }

    Write-Host ""
    Write-Host "🔍 [МАТЕМАТИЧЕСКИЙ РАСЧЕТ УТЕЧКИ (LEAK DELTA)]:" -ForegroundColor Yellow
    if ($firstChrome -and $firstVpn) {
        $delta = $firstVpn.StartTime - $firstChrome.StartTime
        if ($delta.TotalSeconds -gt 0) {
            Write-Host ("  ❌ КРИТИЧЕСКАЯ УТЕЧКА: Chrome запустился РАНЬШЕ VPN на {0} сек.!" -f [Math]::Round($delta.TotalSeconds, 1)) -ForegroundColor Red
            Write-Host "  В течение этого времени браузер успел обратиться к серверам Google через незащищенную сеть!" -ForegroundColor Red
        } else {
            Write-Host ("  🟢 VPN запустился раньше или одновременно с Chrome (Дельта: {0} сек.)" -f [Math]::Abs([Math]::Round($delta.TotalSeconds, 1))) -ForegroundColor Green
        }
    } elseif ($firstChrome -and -not $firstVpn) {
        Write-Host "  ⚠️ Chrome был запущен, но следов запуска VPN не обнаружено в логах!" -ForegroundColor Yellow
    }
} else {
    Write-Host "  • Информации о времени старта процессов в логах не обнаружено." -ForegroundColor Gray
}

Write-Host ""

# 4. Текущие активные сокеты и порты (Established Connections)
Write-Host "🔌 [4. АКТИВНЫЕ СОЕДИНЕНИЯ И ПОРТЫ (ESTABLISHED SOCKETS)]" -ForegroundColor Cyan
try {
    $conns = Get-NetTCPConnection -State Established -ErrorAction SilentlyContinue
    if ($conns) {
        $grouped = @{}
        foreach ($c in $conns) {
            $pName = "System"
            try {
                $pr = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
                if ($pr) { $pName = $pr.ProcessName }
            } catch {}

            # Фильтруем важные для нас процессы
            $isTarget = $pName -match "chrome|amnezia|wireguard|anydesk|antigravity"
            $color = if ($pName -match "chrome") { "Yellow" } elseif ($pName -match "amnezia|wireguard") { "Cyan" } elseif ($pName -match "anydesk") { "Magenta" } else { "Gray" }

            if ($isTarget -or $c.RemotePort -in @(80, 443, 8080, 8443, 51820)) {
                Write-Host ("  • [{0,-12}] {1,-15}:{2,-5} -> {3,-15}:{4,-5} (PID: {5})" -f $pName, $c.LocalAddress, $c.LocalPort, $c.RemoteAddress, $c.RemotePort, $c.OwningProcess) -ForegroundColor $color
            }
        }
    } else {
        Write-Host "  • Активных внешних соединений не обнаружено." -ForegroundColor Gray
    }
} catch {
    Write-Host "  • Ошибка чтения таблицы TCP сокетов." -ForegroundColor Gray
}

Write-Host ""

# 5. Кэш DNS-запросов (Что браузер успел запросить)
Write-Host "📡 [5. ДИАГНОСТИКА DNS-КЭША (ЗАПРОСЫ К СЕРВЕРАМ GOOGLE)]" -ForegroundColor Cyan
try {
    $dnsCache = Get-DnsClientCache -ErrorAction SilentlyContinue | Where-Object { $_.Entry -match "google|gemini|gstatic|aistudio|amnezia|anydesk" }
    if ($dnsCache) {
        $uniqueEntries = $dnsCache | Select-Object -Unique Entry, Data
        foreach ($dns in $uniqueEntries) {
            Write-Host ("  • Домен: {0,-35} -> IP: {1}" -f $dns.Entry, $dns.Data) -ForegroundColor White
        }
    } else {
        Write-Host "  • Кэш DNS чист или запросы к целевым серверам отсутствуют." -ForegroundColor Gray
    }
} catch {
    Write-Host "  • Не удалось считать DNS Client Cache." -ForegroundColor Gray
}

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "  [OK] Аудит хронологии завершен. Нажмите любую клавишу для выхода..." -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan
