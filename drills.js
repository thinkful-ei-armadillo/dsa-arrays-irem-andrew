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
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 5) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
console.log(filterArray([1, 2, 3, 4, 5]));
