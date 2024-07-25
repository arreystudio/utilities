export const useWaktu = (iso: string = '0') => {

    // Jika parameter iso terisi, maka data waktu yang diambil sesuai dengan parameternya
    // Jika tidak terisi, maka waktu yang dikembalikan adalah waktu Local saat ini
    let waktu = new Date()
    if (iso !== '0') waktu = new Date(iso)

    // Mengembalikan nama hari dalam bahasa indonesia berdasar tanggal yang diberikan
    // Contoh return: "Senin"
    function getNamaHari() {
        let index_hari = waktu.getDay()
        return daftar_nama_hari[index_hari]
    }

    // Mengembalikan nama bulan dalam bahasa indonesia
    // Contoh return: "Januari"
    function getNamaBulan() {
        let index_bulan = waktu.getMonth()
        return daftar_nama_bulan[index_bulan]
    }

    // Mengembalikan tahun, contoh return: 2024
    function getTahun() {
        return waktu.getFullYear()
    }

    // Mengembalikan nomor bulan dalam 2 digit, contoh return: '03' untuk bulan Maret
    function getNomorBulan() {
        return waktu.getMonth() + 1 < 10 ? ("0" + (waktu.getMonth() + 1)) : waktu.getMonth() + 1
    }

    // Mengembalikan nomor tanggal dalam 2 digit, contoh return: '09' untuk tanggal sembilan
    function getNomorTanggal() {
        return waktu.getDate() < 10 ? ("0" + waktu.getDate()) : waktu.getDate()
    }

    // Mengembalikan nomor jam dalam 2 digit range 00-23, contoh return: '11' untuk jam 11
    function getNomorJam() {
        return waktu.getHours() < 10 ? ("0" + waktu.getHours()) : waktu.getHours()
    }

    // Mengembalikan nomor menit dalam 2 digit range 00-60, contoh return: '53' untuk menit ke 53
    function getNomorMenit() {
        return waktu.getMinutes() < 10 ? ("0" + waktu.getMinutes()) : waktu.getMinutes()
    }

    // Mengembalikan nomor detik dalam 2 digit range 00-60, contoh return: '43' untuk detik 43
    function getNomorDetik() {
        return waktu.getSeconds() < 10 ? ("0" + waktu.getSeconds()) : waktu.getSeconds()
    }

    // Mengembalikan teks timestamp seperti di database, contoh: '2024-05-13 14:56:12'
    function getTeksDbLengkap() {
        return getTahun() + "-" + getNomorBulan() + "-" + getNomorTanggal() + " " + getNomorJam() + ":" + getNomorMenit() + ":" + getNomorDetik()
    }

    // Mengembalikan teks tanggal seperti di database, contoh: '2024-05-13'
    function getTeksDbTanggal() {
        return getTahun() + "-" + getNomorBulan() + "-" + getNomorTanggal()
    }

    // Mengembalikan teks timestamp seperti di bahasa indonesia, contoh: '13 Maret 2024 15:30:12'
    function getTeksIndoLengkap() {
        return getNomorTanggal() + "-" + getNamaBulan() + "-" + getTahun() + " " + getNomorJam() + ":" + getNomorMenit() + ":" + getNomorDetik()
    }

    function getTeksIndoTanggal() {
        return getNomorTanggal() + " " + getNamaBulan() + " " + getTahun()
    }

    // Mengembalikan teks jam, dan menit, contoh: '14:56'
    function getTeksWaktu() {
        return getNomorJam() + ":" + getNomorMenit()
    }

    // Mengembalikan teks jam, menit dan detik, contoh: '14:56:13'
    function getTeksWaktuLengkap() {
        return getNomorJam() + ":" + getNomorMenit() + ":" + getNomorDetik()
    }

    function getUmur(tgl_lahir: string) {
        let hari_ini = useWaktu().getTeksDbTanggal()
        let umur_hari = getDifferenceInDays(hari_ini, tgl_lahir)
        let umur = Math.round(umur_hari / 365)
        return umur + 1
    }

    // Untuk mengecek apakah tanggal pada parameter pertama lebih besar daripada tanggal pada parameter kedua
    function isDateGreaterThan(d1: string, d2: string) {
        let date1 = new Date(d1)
        let date2 = new Date(d2)
        if (date1 > date2) return true
        return false
    }

    // Untuk mengecek berapa perbedaan jumlah hari antar 2 tanggal
    function getDifferenceInDays(d1: string, d2: string) {
        let date1 = new Date(d1)
        let date2 = new Date(d2)
        let Difference_In_Time = date2.getTime() - date1.getTime()
        let Difference_In_Days = (Math.round(Difference_In_Time / (1000 * 3600 * 24))) + 1
        return Difference_In_Days
    }

    function getTheDayBefore() {
        let kemarin = new Date(waktu.setDate(waktu.getDate() - 1))
        let tekskemarin = kemarin.getFullYear() + '-' + (kemarin.getMonth() + 1 < 10 ? ("0" + (kemarin.getMonth() + 1)) : kemarin.getMonth() + 1) + '-' + (kemarin.getDate() < 10 ? ("0" + kemarin.getDate()) : kemarin.getDate())
        return useWaktu(tekskemarin).getTeksIndoTanggal()
    }

    function getTheDayAfter() {
        let besok = new Date(waktu.setDate(waktu.getDate() + 1))
        let teksbesok = besok.getFullYear() + '-' + (besok.getMonth() + 1 < 10 ? ("0" + (besok.getMonth() + 1)) : besok.getMonth() + 1) + '-' + (besok.getDate() < 10 ? ("0" + besok.getDate()) : besok.getDate())
        return useWaktu(teksbesok).getTeksIndoTanggal()
    }

    function getPosisiAntarTanggal(tanggal_cek: string, tanggal_awal: string, tanggal_akhir: string) {
        let date_cek = new Date(tanggal_cek)
        let date_awal = new Date(tanggal_awal)
        let date_akhir = new Date(tanggal_akhir)
        if (date_cek >= date_awal && date_cek <= date_akhir) return 'antara'
        else if (date_cek < date_awal) return 'sebelum'
        else if (date_cek > date_akhir) return 'sesudah'
        else return 'error'
    }

    const daftar_nama_hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const daftar_nama_bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const daftar_nomor_tanggal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

    return { daftar_nama_hari, daftar_nama_bulan, daftar_nomor_tanggal, getNamaHari, getNamaBulan, getTahun, getNomorBulan, getNomorTanggal, getNomorJam, getNomorMenit, getNomorDetik, getTeksDbLengkap, getTeksDbTanggal, getTeksIndoLengkap, getTeksIndoTanggal, getTeksWaktu, getTeksWaktuLengkap, isDateGreaterThan, getDifferenceInDays, getTheDayBefore, getTheDayAfter, getPosisiAntarTanggal, getUmur }
}
