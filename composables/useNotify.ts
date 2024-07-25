// Digunakan untuk memberikan notifikasi besar di tengah
// Jangan lupa tambahkan file plugin SweetAlert2

export const useNotify = (ikon = 'info', judul = 'Mohon Maaf', teks = 'Fitur ini dalam pengembangan') => {
    const { $swal } = useNuxtApp()

    $swal.fire({
        title: judul,
        text: teks,
        icon: ikon,
        confirmButtonText: 'Oke',
        // confirmButtonColor: '#10B981',
        // background: bg.value,
        // color: text.value
    })
}
