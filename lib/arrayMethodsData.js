// arrayMethodsData.ts

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
      children: [
        { name: "Array[Symbol.species]" },
      ],
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
  // Add more topics as needed...
};

export const getTopicInfo = (topicName) => {
  return topicInfoMap[topicName] || { description: "Information not available for this topic." };
};
