
function generate_all_expressions(exp, target) {
    var exp =  exp.toString().replace(/,/g, '');
    const len = exp.length,
        res = []

    dfs(1, exp[0])
     if(res.length !== 0) {
         return res.toString() + ' = ' + String(target)
     } else {
         return 'None'
     }

    // String concatenation much faster and code looks cleaner
    function dfs(i, slate) {
        if (i === len) {
            if (isValidExp(slate)) res.push(slate)
            return
        }

        dfs(i + 1, slate.slice(0) + exp[i])
        dfs(i + 1, slate.slice(0) + '-' + exp[i])
        dfs(i + 1, slate.slice(0) + '+' + exp[i])
    }


    function isValidExp(slate) {
        const nums = joinNums(slate),
            multiplied = minus(nums)

        // Addition
        const added = multiplied.reduce((acc, curr) => {
            if (!isNaN(Number(curr))) return acc + Number(curr)
            return acc
        }, 0)

        return added === target

        function joinNums(slate) {
            let j = 0,
                n = 0
            const res = []

            while (j < slate.length) {
                let temp = slate[j]
                j++

                while (j < slate.length && slate[j] !== '-' && slate[j] !== '+') {
                    temp += slate[j++]
                }

                res[n++] = temp
                res[n++] = slate[j++]
            }

            res.pop()
            
            return res
        }

        // substraction
        function minus(nums) {
            const res = []
            let i = 0

            while (i < nums.length) {
                if (nums[i] === '-') {
                    const prev = Number(res.pop())
                    res.push(prev - Number(nums[i + 1]))
                    i += 2
                } else {
                    res.push(nums[i++])
                }
            }
            return res
        }
    }
}

// Tests
let prev = Date.now()
console.log(generate_all_expressions([1,2,3], 6))
console.log((Date.now() - prev) / 1000)


// Time complexity of the algorithm is O(n) in the best case if integer is find and O(n^2) if the combination does not find the target integer