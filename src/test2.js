const max = 1000000000000n;
let i = 1n;
for(let s = 0n; s < max;){
    s += max/(100n*i**(1n/10n));
    i+=1n;
    console.log(s);
}

console.log(i);