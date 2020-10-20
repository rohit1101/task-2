export default function uniqueKey() {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0]
}
