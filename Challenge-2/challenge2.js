const readline = require("readline")
const connection = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let arr = [], pass = [], remedial = []
let sum = 0

function input(question) {
    return new Promise(resolve => {
        connection.question(question, (data) => {
            return resolve(data)
        })
    })
}

let max = () => { return Math.max.apply(null, arr) }
let min = () => { return Math.min.apply(null, arr) }

let avg = () => {
    for (i in arr) {
        sum += arr[i]
    }
    return sum / arr.length
}

let passing = () => {
    arr.forEach((a) => {
        if (a >= 60) {
            pass.push(a)
        } else if (a < 60) {
            remedial.push(a)
        }
    })
}

let sorting = () => {
    let sorted = arr.sort((a, b) => { return a - b })
    return sorted.join(', ')
}

let showValue = () => {
    let val1 = arr.filter((x) => { return x === 90 })
    let val2 = arr.filter((x) => { return x === 100 })
    let val3 = val1.concat(val2)
    return val3.join(', ')
}

const result = () => {
    passing()
    console.log(`
Selesai memasukkan nilai
========================
Nilai tertinggi adalah : ${max()}
Nilai terendah adalah : ${min()}
Nilai rata-rata siswa : ${avg()}
Siswa lulus berjumlah : ${pass.length}
Siswa tidak lulus berjumlah : ${remedial.length}
Urutan nilai dari terendah ke tertinggi : ${sorting()}
Siswa bernilai nilai 90 dan 100 : ${showValue()}`)
}

async function main() {
    while (true) {
        let nilai = await input("\nInputkan nilai dan ketik 'q' jika sudah selesai : ")

        if (nilai === 'q') {
            result()
            connection.close()
            break
        } else if (isNaN(nilai)) {
            console.log('Harap masukkan angka!')
        } else {
            arr.push(+nilai)
            console.log(arr)
        }
    }
}

main()



