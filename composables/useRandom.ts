// Generate random string

export const useRandom = (panjang: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    function generateString() {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < panjang; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }

    var random_string = ref(generateString())
    return { random_string }
}
