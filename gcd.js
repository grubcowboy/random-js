function gcd(a, b) {
    while (b) {
        var temp = b;
        b = a % b;
        a = temp;
    }
    console.log(a);
    return a;
}
gcd(1685, 1235);