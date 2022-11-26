const VAPID_PUBLIC_KEY = 'BI87GsEtUQQ82gv2HbVMmpi1baAXbjI-T-wbX0i8jw7hGNY1KB1DdPkekytwBdWY4ear-TqGzMl97mtjWwh9kJ0'

// perizinan notif
async function notifPermit() {
    return new Promise(async resolve => {
        resolve(await Notification.requestPermission())
    })
}

// cek serviceWorker support
function isServiceWorkerSupported() {
    if ('serviceWorker' in navigator) return true
    return false
}

async function permission() {
    try {
        if (isServiceWorkerSupported) {
            let permission = Notification.permission

            if (permission === 'default') {
                permission = await notifPermit()
            }

            if (permission === 'denied') {
                return console.log('notification access denied!')
            }

            console.log(permission)
        }
    } catch (err) {
        console.log(err)
    }
}

permission()