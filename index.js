// input: [1, 1, 0, 1, 1]
// output: [0, 1, 1, 1, 1]
function sort(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 1){
            arr.push(arr[i])
            arr.splice(i, 1)
            console.log(arr)
        }
    }
    return arr
}
console.log(sort([1, 1, 0, 1, 1]));