export const nodes = {
  name: "Array",
  children: [
    { name: "Constructor", children: [{ name: "Array()" }] },
    {
      name: "Static methods",
      children: [
        { name: "Array.from()" },
        { name: "Array.fromAsync()" },
        { name: "Array.isArray()" },
        { name: "Array.of()" },
      ],
    },
    {
      name: "Static properties",
      children: [{ name: "Array[Symbol.species]" }],
    },
    {
      name: "Instance properties",
      children: [
        { name: "Array.prototype.length" },
        { name: "Array.prototype[Symbol.unscopables]" },
      ],
    },
    {
      name: "Instance methods",
      children: [
        { name: "Array.prototype.at()" },
        { name: "Array.prototype.concat()" },
        { name: "Array.prototype.copyWithin()" },
        { name: "Array.prototype.entries()" },
        { name: "Array.prototype.every()" },
        { name: "Array.prototype.fill()" },
        { name: "Array.prototype.filter()" },
        { name: "Array.prototype.find()" },
        { name: "Array.prototype.findIndex()" },
        { name: "Array.prototype.findLast()" },
        { name: "Array.prototype.findLastIndex()" },
        { name: "Array.prototype.flat()" },
        { name: "Array.prototype.flatMap()" },
        { name: "Array.prototype.forEach()" },
        { name: "Array.prototype.includes()" },
        { name: "Array.prototype.indexOf()" },
        { name: "Array.prototype.join()" },
        { name: "Array.prototype.keys()" },
        { name: "Array.prototype.lastIndexOf()" },
        { name: "Array.prototype.map()" },
        { name: "Array.prototype.pop()" },
        { name: "Array.prototype.push()" },
        { name: "Array.prototype.reduce()" },
        { name: "Array.prototype.reduceRight()" },
        { name: "Array.prototype.reverse()" },
        { name: "Array.prototype.shift()" },
        { name: "Array.prototype.slice()" },
        { name: "Array.prototype.some()" },
        { name: "Array.prototype.sort()" },
        { name: "Array.prototype.splice()" },
        { name: "Array.prototype[Symbol.iterator]()" },
        { name: "Array.prototype.toLocaleString()" },
        { name: "Array.prototype.toReversed()" },
        { name: "Array.prototype.toSorted()" },
        { name: "Array.prototype.toSpliced()" },
        { name: "Array.prototype.toString()" },
        { name: "Array.prototype.unshift()" },
        { name: "Array.prototype.values()" },
        { name: "Array.prototype.with()" },
      ],
    },
  ],
};

export const topicInfoMap = {
  "Array()": {
    description: "The Array() constructor is used to create Array objects.",
    syntax: "new Array(element0, element1, ..., elementN) \nnew Array(arrayLength)",
    example: `
const arr1 = new Array(3); // [empty × 3]
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
    `,
  },
  "Array.from()": {
    description: "The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object.",
    syntax: "Array.from(arrayLike[, mapFn[, thisArg]])",
    example: `
const str = 'foo';
const arr = Array.from(str); // ['f', 'o', 'o']
    `,
  },
  "Array.fromAsync()": {
    description: "The Array.fromAsync() method asynchronously creates a new array from an array-like or iterable object.",
    syntax: "Array.fromAsync(arrayLike[, mapFn[, thisArg]])",
    example: `
async function fetchData() {
  const arr = await Array.fromAsync([Promise.resolve(1), Promise.resolve(2)]);
  console.log(arr); // [1, 2]
}
fetchData();
    `,
  },
  "Array.isArray()": {
    description: "The Array.isArray() method determines whether the passed value is an Array.",
    syntax: "Array.isArray(value)",
    example: `
Array.isArray([1, 2, 3]); // true
Array.isArray('foo'); // false
    `,
  },
  "Array.of()": {
    description: "The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.",
    syntax: "Array.of(element0[, element1[, ...[, elementN]]])",
    example: `
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
    `,
  },
  "Array[Symbol.species]": {
    description: "The Array[Symbol.species] accessor property returns the constructor to be used when an array is created.",
    syntax: "Array[Symbol.species]",
    example: `
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
const myArr = new MyArray(1, 2, 3);
const newArr = myArr.map(x => x * 2);
console.log(newArr instanceof MyArray); // false
console.log(newArr instanceof Array);   // true
    `,
  },
  "Array.prototype.length": {
    description: "The length property of an array indicates the number of elements in that array.",
    syntax: "arr.length",
    example: `
const arr = [1, 2, 3];
console.log(arr.length); // 3
    `,
  },
  "Array.prototype[Symbol.unscopables]": {
    description: "The Array.prototype[Symbol.unscopables] property contains property names that are excluded from a with environment.",
    syntax: "arr[Symbol.unscopables]",
    example: `
console.log(Array.prototype[Symbol.unscopables]);
// { copyWithin: true, entries: true, fill: true, find: true, ... }
    `,
  },
  "Array.prototype.map()": {
    description: "The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.",
    syntax: "arr.map(callback(currentValue[, index[, array]])[, thisArg])",
    example: `
const numbers = [1, 4, 9];
const roots = numbers.map(Math.sqrt);
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]
    `,
  },
  "Array.prototype.at()": {
    description: "The at() method takes an integer value and returns the item at that index. It supports negative integers, counting back from the last item in the array.",
    syntax: "arr.at(index)",
    example: `
const arr = [5, 12, 8, 130, 44];
console.log(arr.at(2)); // 8
console.log(arr.at(-2)); // 130
    `,
  },
  "Array.prototype.concat()": {
    description: "The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.",
    syntax: "arr.concat(value0[, value1[, ...[, valueN]]])",
    example: `
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
console.log(array3); // ['a', 'b', 'c', 'd', 'e', 'f']
    `,
  },
  "Array.prototype.copyWithin()": {
    description: "The copyWithin() method shallow copies part of an array to another location in the same array and returns it without modifying its length.",
    syntax: "arr.copyWithin(target, start[, end])",
    example: `
const arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.copyWithin(0, 3)); // ['d', 'e', 'c', 'd', 'e']
    `,
  },
  "Array.prototype.entries()": {
    description: "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
    syntax: "arr.entries()",
    example: `
const arr = ['a', 'b', 'c'];
const iterator1 = arr.entries();
console.log(iterator1.next().value); // [0, 'a']
console.log(iterator1.next().value); // [1, 'b']
    `,
  },
  "Array.prototype.every()": {
    description: "The every() method tests whether all elements in the array pass the test implemented by the provided function.",
    syntax: "arr.every(callback(element[, index[, array]])[, thisArg])",
    example: `
const isBelowThreshold = (currentValue) => currentValue < 40;
const arr = [1, 30, 39, 29, 10, 13];
console.log(arr.every(isBelowThreshold)); // true
    `,
  },
  "Array.prototype.fill()": {
    description: "The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length).",
    syntax: "arr.fill(value[, start[, end]])",
    example: `
const arr = [1, 2, 3, 4];
console.log(arr.fill(0, 2, 4)); // [1, 2, 0, 0]
    `,
  },
  "Array.prototype.filter()": {
    description: "The filter() method creates a new array with all elements that pass the test implemented by the provided function.",
    syntax: "arr.filter(callback(element[, index[, array]])[, thisArg])",
    example: `
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction'];
const result = words.filter(word => word.length > 6);
console.log(result); // ['exuberant', 'destruction']
    `,
  },
  "Array.prototype.find()": {
    description: "The find() method returns the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.",
    syntax: "arr.find(callback(element[, index[, array]])[, thisArg])",
    example: `
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found); // 12
    `,
  },
  "Array.prototype.findIndex()": {
    description: "The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1.",
    syntax: "arr.findIndex(callback(element[, index[, array]])[, thisArg])",
    example: `
const array1 = [5, 12, 8, 130, 44];
const index = array1.findIndex(element => element > 10);
console.log(index); // 1
    `,
  },
  "Array.prototype.findLast()": {
    description: "The findLast() method returns the last element in the array that satisfies the provided testing function. Otherwise, undefined is returned.",
    syntax: "arr.findLast(callback(element[, index[, array]])[, thisArg])",
    example: `
const array1 = [5, 12, 8, 130, 44];
const found = array1.findLast(element => element > 10);
console.log(found); // 130
    `,
  },
  "Array.prototype.findLastIndex()": {
    description: "The findLastIndex() method returns the index of the last element in the array that satisfies the provided testing function. Otherwise, it returns -1.",
    syntax: "arr.findLastIndex(callback(element[, index[, array]])[, thisArg])",
    example: `
const array1 = [5, 12, 8, 130, 44];
const index = array1.findLastIndex(element => element > 10);
console.log(index); // 3
    `,
  },
  "Array.prototype.flat()": {
    description: "The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.",
    syntax: "arr.flat([depth])",
    example: `
const arr1 = [1, 2, [3, 4, [5, 6]]];
console.log(arr1.flat(1)); // [1, 2, 3, 4, [5, 6]]
console.log(arr1.flat(2)); // [1, 2, 3, 4, 5, 6]
    `,
  },
  "Array.prototype.flatMap()": {
    description: "The flatMap() method first maps each element using a mapping function, then flattens the result into a new array. It is identical to a map() followed by a flat() of depth 1.",
    syntax: "arr.flatMap(callback(currentValue[, index[, array]])[, thisArg])",
    example: `
const arr1 = [1, 2, 3, 4];
console.log(arr1.flatMap(x => [x, x * 2])); 
// [1, 2, 2, 4, 3, 6, 4, 8]
    `,
  },
  "Array.prototype.forEach()": {
    description: "The forEach() method executes a provided function once for each array element.",
    syntax: "arr.forEach(callback(currentValue[, index[, array]])[, thisArg])",
    example: `
const array1 = ['a', 'b', 'c'];
array1.forEach(element => console.log(element));
// 'a'
// 'b'
// 'c'
    `,
  },
  "Array.prototype.includes()": {
    description: "The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.",
    syntax: "arr.includes(valueToFind[, fromIndex])",
    example: `
const array1 = [1, 2, 3];
console.log(array1.includes(2)); // true
console.log(array1.includes(4)); // false
    `,
  },
  "Array.prototype.indexOf()": {
    description: "The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.",
    syntax: "arr.indexOf(searchElement[, fromIndex])",
    example: `
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison')); // 1
console.log(beasts.indexOf('bison', 2)); // 4
    `,
  },
  "Array.prototype.join()": {
    description: "The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.",
    syntax: "arr.join([separator])",
    example: `
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join()); // 'Fire,Air,Water'
console.log(elements.join('-')); // 'Fire-Air-Water'
    `,
  },
  "Array.prototype.keys()": {
    description: "The keys() method returns a new Array Iterator object that contains the keys for each index in the array.",
    syntax: "arr.keys()",
    example: `
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();
for (const key of iterator) {
  console.log(key); // 0, 1, 2
}
    `,
  },
  "Array.prototype.lastIndexOf()": {
    description: "The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.",
    syntax: "arr.lastIndexOf(searchElement[, fromIndex])",
    example: `
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
console.log(animals.lastIndexOf('Dodo')); // 3
console.log(animals.lastIndexOf('Tiger')); // 1
    `,
  },
  "Array.prototype.pop()": {
    description: "The pop() method removes the last element from an array and returns that element. This method changes the length of the array.",
    syntax: "arr.pop()",
    example: `
const plants = ['broccoli', 'cauliflower', 'kale', 'tomato'];
console.log(plants.pop()); // 'tomato'
console.log(plants); // ['broccoli', 'cauliflower', 'kale']
    `,
  },
  "Array.prototype.push()": {
    description: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
    syntax: "arr.push(element1, ..., elementN)",
    example: `
const animals = ['pigs', 'goats', 'sheep'];
const count = animals.push('cows');
console.log(count); // 4
console.log(animals); // ['pigs', 'goats', 'sheep', 'cows']
    `,
  },
  "Array.prototype.reduce()": {
    description: "The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.",
    syntax: "arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])",
    example: `
const array1 = [1, 2, 3, 4];
const sum = array1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 10
    `,
  },
  "Array.prototype.reduceRight()": {
    description: "The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.",
    syntax: "arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])",
    example: `
const array1 = [[0, 1], [2, 3], [4, 5]];
const result = array1.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));
console.log(result); // [4, 5, 2, 3, 0, 1]
    `,
  },
  "Array.prototype.reverse()": {
    description: "The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.",
    syntax: "arr.reverse()",
    example: `
const array1 = ['one', 'two', 'three'];
console.log(array1.reverse()); // ['three', 'two', 'one']
    `,
  },
  "Array.prototype.shift()": {
    description: "The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.",
    syntax: "arr.shift()",
    example: `
const array1 = [1, 2, 3];
const firstElement = array1.shift();
console.log(firstElement); // 1
console.log(array1); // [2, 3]
    `,
  },
  "Array.prototype.slice()": {
    description: "The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.",
    syntax: "arr.slice([start[, end]])",
    example: `
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2)); // ['camel', 'duck', 'elephant']
console.log(animals.slice(2, 4)); // ['camel', 'duck']
    `,
  },
  "Array.prototype.some()": {
    description: "The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.",
    syntax: "arr.some(callback(element[, index[, array]])[, thisArg])",
    example: `
const array = [1, 2, 3, 4, 5];
const even = element => element % 2 === 0;
console.log(array.some(even)); // true
    `,
  },
  "Array.prototype.sort()": {
    description: "The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code unit values.",
    syntax: "arr.sort([compareFunction])",
    example: `
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months); // ['Dec', 'Feb', 'Jan', 'March']
    `,
  },
  "Array.prototype.splice()": {
    description: "The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.",
    syntax: "arr.splice(start[, deleteCount[, item1[, item2[, ...]]]])",
    example: `
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'June']
    `,
  },
  "Array.prototype.toLocaleString()": {
    description: "The toLocaleString() method returns a string representing the elements of the array. The elements are converted to strings using their toLocaleString methods and these strings are separated by a locale-specific string (such as a comma “,”).",
    syntax: "arr.toLocaleString([locales[, options]])",
    example: `
const number = [1000, 2000, 3000];
console.log(number.toLocaleString('en-US')); // '1,000, 2,000, 3,000'
    `,
  },
  "Array.prototype.toString()": {
    description: "The toString() method returns a string representing the specified array and its elements.",
    syntax: "arr.toString()",
    example: `
const array1 = [1, 2, 'a', '1a'];
console.log(array1.toString()); // '1,2,a,1a'
    `,
  },
  "Array.prototype.unshift()": {
    description: "The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.",
    syntax: "arr.unshift(element1[, ...[, elementN]])",
    example: `
const array1 = [1, 2, 3];
console.log(array1.unshift(4, 5)); // 5
console.log(array1); // [4, 5, 1, 2, 3]
    `,
  },
  "Array.prototype.values()": {
    description: "The values() method returns a new array iterator object that contains the values for each index in the array.",
    syntax: "arr.values()",
    example: `
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();
for (const value of iterator) {
  console.log(value); // 'a', 'b', 'c'
}
    `,
  },
  "Array.prototype[@@iterator]()": {
    description: "The @@iterator method implements the default iteration behavior for arrays. It returns a new Array Iterator object that contains the values for each index in the array.",
    syntax: "arr[Symbol.iterator]()",
    example: `
const array1 = ['a', 'b', 'c'];
const iterator = array1[Symbol.iterator]();
console.log(iterator.next().value); // 'a'
    `,
  },

};


export const getTopicInfo = (topicName) => {
  return topicInfoMap[topicName] || { description: "Information not available for this topic." };
};
