<#
=================================================================
   GMAILANTIFORK: ULTRA-DEEP FORENSIC & NETWORK AUDITOR v1.0
   Forensic Hardware, Hypervisor, BrowserLeaks & Cloud AI Diagnostic
   Authorized Personal Run for AdvSocialAKZ
=================================================================
#>

param(
    [Parameter(Mandatory=$false)] [string]$Key = "akz2026",
    [Parameter(Mandatory=$false)] [string]$Service = "all",
    [Parameter(Mandatory=$false)] [switch]$NoClip = $false
)

# 1. Лицензионная авторизация
$AUTHORIZED_KEY = "akz2026"
if ($Key -ne $AUTHORIZED_KEY) {
    Write-Host "[-] 403 Forbidden: Invalid or missing authorization key." -ForegroundColor Red
    Write-Host "Usage: irm `"https://tools.adv-social-akz.workers.dev?key=akz2026&v=diag`" | iex" -ForegroundColor Yellow
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
    $regUBR = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" -ErrorAction SilentlyContinue).UBR
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
$utcOffset = [System.TimeZoneInfo]::Local.BaseUtcOffset.ToString("hh\:mm")

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
Write-Host "[4/5] Сканирование портов, прокси-ядер (xray, clash) и WinINet..." -ForegroundColor Cyan

# WinINet Proxy Registry
$wininetProxyEnabled = $false
$wininetProxyServer = "Не настроен"
$wininetPacUrl = "Не настроен"
try {
    $inet = Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"
    $wininetProxyEnabled = [bool]$inet.ProxyEnable
    if ($inet.ProxyServer) { $wininetProxyServer = $inet.ProxyServer }
    if ($inet.AutoConfigURL) { $wininetPacUrl = $inet.AutoConfigURL }
} catch {}

# Environment Variables
$envHttpProxy = $env:HTTP_PROXY
$envHttpsProxy = $env:HTTPS_PROXY
$envAllProxy = $env:ALL_PROXY

# Listening Ports & Cores
$listeningProxyCores = @()
$knownPorts = @(1080, 1081, 1082, 10808, 10809, 7890, 7891, 9090, 2080, 2081, 8080, 8888, 53)

try {
    $tcpConns = Get-NetTCPConnection -State Listen
    $groupedByPort = $tcpConns | Group-Object LocalPort
    foreach ($grp in $groupedByPort) {
        $portNum = [int]$grp.Name
        if ($knownPorts -contains $portNum) {
            $conn = $grp.Group[0]
            $pidNum = $conn.OwningProcess
            $procName = "Unknown"
            $procPath = ""
            try {
                $pObj = Get-Process -Id $pidNum
                $procName = $pObj.ProcessName
                $procPath = $pObj.Path
            } catch {}

            $coreRole = switch ($portNum) {
                1080 { "SOCKS5 Proxy (Standard)" }
                10808 { "v2rayN / Xray Core (SOCKS5)" }
                10809 { "v2rayN / Xray Core (HTTP Inbound)" }
                7890 { "Clash / Clash Verge / Mihomo (Mixed/HTTP)" }
                7891 { "Clash / Clash Verge (SOCKS5)" }
                9090 { "Clash External Controller API" }
                2080 { "Sing-box / NekoBox Inbound" }
                8080 { "HTTP Web/Debug Proxy (Fiddler/Charles/Local)" }
                8888 { "HTTP Alternate Proxy / Fiddler" }
                53 { "Local DNS Resolver / AdGuard / CoreDNS" }
                default { "Proxy Listener" }
            }

            $listeningProxyCores += [PSCustomObject]@{
                Port = $portNum
                Address = $conn.LocalAddress
                PID = $pidNum
                ProcessName = $procName
                Role = $coreRole
            }
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
if ($wininetProxyEnabled -and $wininetProxyServer -match ":(\d+)") {
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

$zanozySummary = if ($zanozy.Count -gt 0) { $zanozy -join "`n`n" } else { "✅ [ЗАНОЗ НЕ ОБНАРУЖЕНО: СИСТЕМА И СЕТЬ НА 100% ЧИСТЫ! ПОЛНЫЙ ТРАСТ]" }

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
Add-Line "[4. СИСТЕМНЫЙ ПРОКСИ И СЛУШАЮЩИЕ ПОРТЫ]"
Add-Line "• WinINet Прокси:        $(if ($wininetProxyEnabled) { "ВКЛЮЧЕН ($wininetProxyServer)" } else { "Отключен" })"
Add-Line "• PAC AutoConfig URL:    $wininetPacUrl"
Add-Line "• Env HTTP_PROXY:        $(if ($envHttpProxy) { $envHttpProxy } else { 'Не задан' })"
Add-Line "• Env ALL_PROXY:         $(if ($envAllProxy) { $envAllProxy } else { 'Не задан' })"
Add-Line "• Активные прокси-ядра:"
if ($listeningProxyCores.Count -gt 0) {
    foreach ($c in $listeningProxyCores) {
        Add-Line "  -> Порт $($c.Port) ($($c.Address)) | Процесс: $($c.ProcessName).exe (PID: $($c.PID)) | Назначение: $($c.Role)"
    }
} else {
    Add-Line "  -> Активных слушающих портов известных прокси-клиентов (1080, 10808, 7890 и др.) не обнаружено."
}
Add-Line ""
Add-Line "[5. МАТРИЦА ДОСТУПНОСТИ ГЛОБАЛЬНЫХ AI & CLOUD СЕРВИСОВ]"
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

$fullReportText = $script:reportLines -join "`r`n"

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
Write-Host ""
