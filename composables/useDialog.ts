// Dialog konfirmasi jika ingin melakukan suatu hal tertentu
// Jangan lupa tambahkan plugin SweetAlert2
// Penggunaan:
// async function logout() {
//     useDialog('info', 'Peringatan', 'Apakah anda yakin ingin keluar?').then(async (result) => {
//         if (result.isConfirmed) {
//             try {
//                 const rey  = await useApiFetch('/logout', { method: 'post' })
//                 useReyToast('success', 'Berhasil keluar')
//                 navigateTo('/')
//             } catch(e) {
//                 useNotify('error', 'Error', 'Gagal melakukan logout')
//             }
//         }
//     })
// }

export const useReyDialog = (ikon = 'question', judul = 'Apakah anda yakin?', teks = 'Aksi mungkin tidak bisa dibatalkan') => {
    const { $swal } = useNuxtApp()
    let hasil = false

    return $swal.fire({
        title: judul,
        text: teks,
        icon: ikon,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        // confirmButtonColor: '#10B981',
        cancelButtonText: 'Batal'
    })
}
