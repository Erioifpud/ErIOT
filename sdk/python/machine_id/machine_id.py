# Convert from https://github.com/automation-stack/node-machine-id
# OSX 10.14 passed

import platform
import os
import sys
import re
import hashlib


def isWindowsProcessMixedOrNativeArchitecture():
    if 'win32' not in platform.system():
        return ''
    if 'ia32' in platform.architecture() and 'PROCESSOR_ARCHITEW6432' in os.environ:
        return 'mixed'
    return 'native'


def expose(result):
    platform = sys.platform
    if platform.startswith('darwin'):
        temp = result.split('IOPlatformUUID')[1].split('\n')[0]
        return re.sub(r'\=|\s+|\"', '', temp).lower()
    elif platform.startswith('win32'):
        temp = result.split('REG_SZ')[1]
        return re.sub(r'\r+|\n+|\s+', '', temp).lower()
    elif platform.startswith('linux'):
        return re.sub(r'\r+|\n+|\s+', '', result).lower()
    elif platform.startswith('freebsd'):
        return re.sub(r'\r+|\n+|\s+', '', result).lower()
    else:
        raise Exception('Unsupported platform: {}'.format(platform))


def hash(guid):
    return hashlib.sha256(guid.encode("utf-8")).hexdigest()

win32RegBinPath = {
    'native': '%windir%\System32',
    'mixed': '%windir%\sysnative\cmd.exe /c %windir%\System32'
}

guid = {
    'darwin': 'ioreg -rd1 -c IOPlatformExpertDevice',
    'win32': '{}\\REG ' +
    'QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography ' +
    '/v MachineGuid'.format(
            win32RegBinPath.get(isWindowsProcessMixedOrNativeArchitecture())),
    'linux': '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
    'freebsd': 'kenv -q smbios.system.uuid'
}


def machineId(original):
    result = os.popen(guid[sys.platform])
    id = expose(result.read())
    return id if original else hash(id)
