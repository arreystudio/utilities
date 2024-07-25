// Digunakan untuk Toasting menggunakan Sweet Alert 2
// Jangan lupa untuk menambahkan file plugin SweetAlert2 nya

export const useReyToast = (ikon = 'error', judul = 'Terjadi kesalahan') => {
    const { $swal } = useNuxtApp()

    $swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', $swal.stopTimer)
            toast.addEventListener('mouseleave', $swal.resumeTimer)
        },
        // background: bg.value,
        // color: text.value,
        icon: ikon,
        title: judul
    })
}
