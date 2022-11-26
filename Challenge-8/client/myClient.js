const VAPID_PUBLIC_KEY = 'BI87GsEtUQQ82gv2HbVMmpi1baAXbjI-T-wbX0i8jw7hGNY1KB1DdPkekytwBdWY4ear-TqGzMl97mtjWwh9kJ0'

async function register() {
    try {
        // register service worker
        const register = await navigator.serviceWorker.register('./worker.js', { scope: '/auth/' })

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: VAPID_PUBLIC_KEY
        })

        // save subscription data in server
        await fetch('/notif-subscribe', {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(permission)
    } catch (err) {
        console.log(err)
    }
}
register()