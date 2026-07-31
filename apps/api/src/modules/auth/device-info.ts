export interface DeviceInfo {
  userAgent?: string
  ipAddress?: string
  deviceName?: string
}

const BROWSER_PATTERNS: [RegExp, string][] = [
  [/Chrome/i, 'Chrome'],
  [/Firefox/i, 'Firefox'],
  [/Safari/i, 'Safari'],
  [/Edg/i, 'Edge'],
  [/Opera|OPR/i, 'Opera'],
  [/MSIE|Trident/i, 'Internet Explorer'],
]

const OS_PATTERNS: [RegExp, string][] = [
  [/Windows/i, 'Windows'],
  [/Mac OS X|Macintosh/i, 'macOS'],
  [/iPhone|iPad|iPod/i, 'iOS'],
  [/Android/i, 'Android'],
  [/Linux/i, 'Linux'],
]

export function parseDeviceInfo(userAgent?: string, ipAddress?: string): DeviceInfo {
  if (!userAgent) {
    return { userAgent, ipAddress, deviceName: undefined }
  }

  const browser =
    BROWSER_PATTERNS.find(([pattern]) => pattern.test(userAgent))?.[1] ?? 'Unknown browser'
  const os = OS_PATTERNS.find(([pattern]) => pattern.test(userAgent))?.[1] ?? 'Unknown OS'

  return {
    userAgent,
    ipAddress,
    deviceName: `${browser} on ${os}`,
  }
}
