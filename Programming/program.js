numoccurMap(); //find number of occurence of numbers in array
charOccurMap(); //charcter occurrence in a string using Map
charOccurObj(); //charcter occurrence in a string using object
getMissingNumber([1, 4, 6, 13, 11]); // get missing number from given array
remduplicatString("geeksforgeeks"); //remove duplicate from string;
remduplicatArray([1, 4, 6, 13, 11]);//remove duplicate from array using map
remduplicateArrayUsingSet([1, 4, 6,1,2,3, 13, 11]); //remove duplicate from array using set
checkPalindrome("hello"); //Program to find given string/number is palindrome or not
checkPalindrome(12345); //Program to find given string/number is palindrome or not
ValidAnagram("hello","hel"); //Valid Anagram (An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.)
isAnagramHash("hello","llohe"); //through hashtable/obj approach
fibonaccieNterms(3) //fibonacci upto n terms
fibonacciUptoN(5) // fibonacci upto certain number n
targetsum([1, 2, 3, 4, 5], 10);//Target sum of two no from array - Approach 1: Brute Force
twoSumTwoPassHassTable([1, 2, 3, 4, 5], 10) ////Target sum of two no from array - //Approach 2: Two-pass Hash Table (JS object)
twoSumOnepassHashTable([1, 2, 3, 4, 5], 10) ////Target sum of two no from array - //Approach 3: One-pass Hash Table
maxProfit([1, 2, 3, 4, 5])//Best to buy and sell stock

function numoccurMap() {
    let arr = [1, 2, 3, 4, 5, 6, 1, 2]
    console.log(`Given array: [${arr}]`)
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (!map.get(arr[i])) {
            map.set((arr[i]), 1)
        } else {
            map.set((arr[i]), map.get(arr[i]) + 1)
        }
    }

    let occ = {}
        for (const [key, value] of map.entries()) {
            occ[key] = value;
        }

        console.log(occ);
}
    function charOccurMap() {
        let str = "adfffsfp";
        console.log(`Given string: ${str}`)
        let map = new Map();
        for (let i = 0; i < str.length; i++) {
            if (!map.get(str.charAt(i))) {
                map.set(str.charAt(i), 1)
            } else {
                map.set(str.charAt(i), map.get(str.charAt(i)) + 1)
            }
        }

        let occ = {}
        for (const [key, value] of map.entries()) {
            occ[key] = value;
        }

        console.log(occ);
    }
    function charOccurObj() {
        let str = "adfffsfp";
        console.log(`Given String: ${str}`)
        let obj = {};

        for (let i = 0; i < str.length; i++) {
            if (!obj.hasOwnProperty(str.charAt(i))) {
                obj[str.charAt(i)] = 1;
            } else {
                obj[str.charAt(i)] = obj[str.charAt(i)] + 1;
            }
        }

        console.log(obj);
    }
    function getMissingNumber(arr) {
        let missingarr = []
        let maxNumber = Math.max(...arr);

        for (let i = 1; i <= maxNumber; i++) {
            if (arr.indexOf(i) === -1) {
                missingarr.push(i)

            }
        }
        console.log(missingarr)


    }
    function remduplicatString(str) {
        console.log(`Given String: ${str}`)
        let map = new Map();
        let stri = ""
        for (let i = 0; i < str.length; i++) {
            if (!map.get(str.charAt(i))) {
                map.set(str.charAt(i), 1)
                stri = stri.concat(str.charAt(i))
            }
        }
        console.log(`string without duplicate: ${stri}`)
    }
    function remduplicatArray(arr) {
        console.log("Given array: " + arr)
        let map = new Map();
        let outputArray = [];
        for (let i = 0; i <arr.length; i++) {
            if (!map.get(arr[i])) {
                map.set(arr[i], 1)
                outputArray.push(arr[i])
            }
        }
        console.log("output array: "+ outputArray)
    }
    function remduplicateArrayUsingSet(arr) {
        console.log("Given array: " + arr)
        let numbers = new Set(arr);
       // console.log(numbers); //Set(5) { 10, 20, 30, 40, 50 }
        console.log("output array: "+ [...numbers])
        //console.log("output array: "+ Array.from(numbers))
        //console.log(typeof numbers); // Object
    }
    function checkPalindrome(input) {
        console.log(`given input: ${input}`)
        var str = input.toString(); //console.log("str " + str)
        var arr = str.split(""); //console.log("arr " + arr)
        var arr2 = arr.reverse(); //console.log("arr2 " + arr2)
        var str2 = arr2.join(""); //console.log("str2 " + str2)
        if (str === str2) {
            console.log("palindrome")
        } else {
            console.log("not palindrome")
        }
    }

    function ValidAnagram(s,t) {
        console.log(`Given inputs: ${s} and ${t}`)
        var arr = s.split("")
        var arr2 = t.split("")
        arr.sort();
        arr2.sort();
        s = arr.join("")
        t = arr2.join("")
        if (s === t) {
            console.log("anagram");
        } else {
            console.log("not anagram")
        }
    }

    function isAnagramHash(s, t) {
        console.log(`Given inputs: ${s} and ${t}`)
        var isanagram = function(s,t){
            if (s.length != t.length) return false;
            const hashTable = {};
    
            for (let i = 0; i < s.length; i++) {
                if (!hashTable[s[i]]) {
                    hashTable[s[i]] = 0;
                }
                hashTable[s[i]]++;
            }
    
            for (let j = 0; j < t.length; j++) {
                if (!hashTable[t[j]]) {
                    return false;
                }
                hashTable[t[j]]--;
            }
    
            return true;
        }
        console.log(isanagram(s,t));
       
    };

    function fibonaccieNterms(num) {
       // var num = parseInt(prompt('Enter a positive number: '));
        var a = 0;
        var b = 1;
        var c;
        console.log(a)
        console.log(b)
        for (let i = 3; i <= num; i++) {
            c = a + b;
            a = b;
            b = c;
            console.log(c)
        }
    }

    function fibonacciUptoN(num) {
        //var num = parseInt(prompt('Enter a positive number: '));
        var a = 0;
        var b = 1;
        c = a + b;
        console.log(a)
        console.log(b)
        while (c <= num) {
            console.log(c)
            a = b;
            b = c;
            c = a + b;
        }

    }

    function targetsum(nums, target) {
        console.log(`Given array: ${nums} and target sum is ${target}`)
        
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    console.log(`target sum index is [${i},${j}]`)

                }
            }
        }
    };

    function twoSumTwoPassHassTable(nums, target) {
        console.log(`Given array: ${nums} and target sum is ${target}`)
        const indices = {};

        nums.forEach((item, index) => {
            indices[item] = index
        });

        for (let index = 0; index < nums.length; index++) {
            const complement = target - nums[index];

            if (indices[complement] !== undefined && indices[complement] !== index) {
                console.log(`target sum index is [${index},${indices[complement]}]`)
                return [index, indices[complement]]
            }
        }
    };

    function twoSumOnepassHashTable(nums, target) {
        console.log(`Given array: ${nums} and target sum is ${target}`)
        const indices = new Map();

        for (let index = 0; index < nums.length; index++) {
            const complement = target - nums[index];

            if (indices.has(complement)) {
                console.log(`target sum index is [${indices.get(complement)},${index}]`)
                return [indices.get(complement), index]

            }

            indices.set(nums[index], index)
        }
    };

    function maxProfit(prices) {
        var n = prices.length;
        let buy = prices[0], max_profit = 0;
        for (let i = 1; i < n; i++) {

            // Checking for lower buy value
            if (buy > prices[i])
                buy = prices[i];

            // Checking for higher profit
            else if (prices[i] - buy > max_profit)
                max_profit = prices[i] - buy;
        }
        return max_profit;
    };