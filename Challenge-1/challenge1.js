const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function menu() {
    console.log("Silahkan pilih salah satu layanan dibawah ini : \n1. Tambah\n2. Kurang\n3. Kali\n4. Bagi\n\
5. Akar Kuadrat\n6. Luas Persegi\n7. Volume Kubus\n8. Volume Tabung")
}

function input(question) {
    return new Promise(resolve => {
        interface.question(question, data => {
            return resolve(Number(data))
        })
    })
}

async function tambah() {
    const data1 = await input('Masukkan data 1 : ')
    const data2 = await input('Masukkan data 2 : ')
    console.log(data1 + data2)
    interface.close()
}

async function kurang() {
    const data1 = await input('Masukkan data 1 : ')
    const data2 = await input('Masukkan data 2 : ')
    console.log(data1 - data2)
    interface.close()
}

async function kali() {
    const data1 = await input('Masukkan data 1 : ')
    const data2 = await input('Masukkan data 2 : ')
    console.log('Hasil : ' + data1 * data2)
    interface.close()
}

async function bagi() {
    const data1 = await input('Masukkan data 1 : ')
    const data2 = await input('Masukkan data 2 : ')
    console.log(data1 / data2)
    interface.close()
}

async function akarKuadrat() {
    const data = await input('Masukkan data : ')
    console.log(Math.sqrt(data))
    interface.close()
}

async function luasPersegi() {
    const data = await input('Masukkan panjang sisi : ')
    console.log('Luas persegi : ' + data ** 2)
    interface.close()
}

async function volKubus() {
    const data = await input('Masukkan panjang sisi kubus : ')
    console.log('Volume kubus : ' + data ** 3)
    interface.close()
}

async function volTabung() {
    const pi = 3.14
    const data1 = await input('Masukkan jari-jari : ')
    const data2 = await input('Masukkan tinggi : ')
    console.log('Volume tabung : ' + pi * data1 ** 2 * data2)
    interface.close()
}

async function main() {
    try {
        menu()
        let choice = await input('Pilihan : ')
        if (choice == 1) {
            tambah()
        } else if (choice == 2) {
            kurang()
        } else if (choice == 3) {
            kali()
        } else if (choice == 4) {
            bagi()
        } else if (choice == 5) {
            akarKuadrat()
        } else if (choice == 6) {
            luasPersegi()
        } else if (choice == 7) {
            volKubus()
        } else if (choice == 8) {
            volTabung()
        }
    }

    catch (err) {
        console.log(err)
    }
}

function luasLingkaran(pi = 3.14, r) {
    return pi * r ** 2
}

main()
