"use strict";

const memory = require("./Memory");

let Memory = new memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = Memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of Memory");
    }
    Memory.copy(this.ptr, oldPtr, this.length);
    Memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return Memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    Memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    Memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}
Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  arr.pop();
  arr.pop();
  arr.pop();
  arr.pop();
  arr.pop();
  arr.pop();

  arr.push("tauhida");

  // console.log(arr.get(0));
}

// main();

// What is the length, capacity and memory address of your array?
// Array { length: 1, _capacity: 3, ptr: 0 }

// What is the length, capacity and memory address of your array?
// Array { length: 6, _capacity: 12, ptr: 3 }

// Explain the result of your program after adding the new lines of code.
// The length is increasing to represent the new values added. The capacity increases when the length is greater
// or equal to the previous capacity based on the size ratio. The pointer moves because it is not known
// if there is free space after the end of the array.

// What is the length, capacity, and address of your array? Explain the result of your program
// after adding the new lines of code.
// Array { length: 3, _capacity: 12, ptr: 3 }
// The length decreases by the amount of pop functions that ran.

// Print this 1 item that you just added. What is the result? Can you explain your result?
// The result is NaN. This is because the memory class is initiated by Float64Array, which contains
// numbers.

// What is the purpose of the _resize() function in your Array class?
// The resize function is there to increase capacity of the array when length
// is equal to max capacity. It is made to be a private method only to be accessed
// within the Array class.

// 5. URLify a string
// Runtime is O(n) because it iterates over each element in the input.
function deleteSpace(str) {
  const strArray = str.split("");
  const newArray = strArray.map(char => {
    if (char === " ") {
      char = "%20";
    }
    return char;
  });
  return newArray.join("");
}

// console.log(deleteSpace('tauhida parveen'));

// 6. Filtering an array
// Input: [1, 2, 3, 4, 5]
// Output: [5]
function filterArray(arr) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] < 5) {
      arr.splice(i, 1);
    } else {
      i++;
    }
  }
  return arr;
}
// console.log(filterArray([1, 2, 3, 4, 5]));

// 7. Max sum in the array
// Input: [-3, 4, 6, -3, 5, -2, 1]
// Output: 12

function sum(arr) {
  let maxDes = 0;
  let maxSeq = 0;
  for (let i = 0; i < arr.length; i++) {
    maxSeq = Math.max(0, maxSeq + arr[i]);
    maxDes = Math.max(maxDes, maxSeq);
  }
  return maxDes;
}

// console.log(sum([-3, 4, 6, -3, 5, -2, 1]));

// 8. Merge arrays
// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]
// while loop
function sortCombined(arr1, arr2) {
  let sorted = [];
  let i1 = 0;
  let i2 = 0;
  while (i1 < arr1.length && i2 < arr2.length) {
    if (arr1[i1] < arr2[i2]) {
      sorted.push(arr1[i1]);
      i1 ++;
    } else {
      sorted.push(arr2[i2]);
      i2 ++;
    }
  }
  return sorted;
}

console.log(sortCombined([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

// 9. Remove characters
// Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
// Output: 'Bttl f th Vwls: Hw vs. Grzny'

function RemoveCharacters(string, rem) {
  let dictionary = {};
  let modifiedString = "";
  for (let i = 0; i < rem.length; i++) {
    dictionary[rem[i]] = true;
  }
  for (let i = 0; i < string.length; i++) {
    if (!dictionary[string[i]]) {
      modifiedString += string[i];
    }
  }
  return modifiedString;
}
// console.log(
//   RemoveCharacters("Battle of the Vowels: Hawaii vs. Grozny", "aeiou")
// );

// 10. Products
// Input:[1, 3, 9, 4]
// Output:[108, 36, 12, 27]

function products(arr) {
  let totalProduct = 1;

  for (let i = 0; i < arr.length; i++) {
    totalProduct *= arr[i];
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = totalProduct / arr[i];
  }
  return arr;
}

// console.log(products([1, 3, 9, 4]));

// 11. 2D array
function twoD(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === 0) {
        arr[i] = 0;
        arr[i][j] = 0;
      }
    }
  }
  return arr;
}
