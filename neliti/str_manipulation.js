/**
* @param {string} beginWord
* @param {string} endWord
* @param {string[]} wordList
* @return {string[][]}
*/

function dfs(word, endWord, result, nextWord, distance, path) {
    var neighbors = nextWord[word] || [];

    path.push(word);

    if (word === endWord) {
        result.push(Array.from(path));
    } else {
        for (var i = 0; i < neighbors.length; i++) {
            if (distance[word] + 1 === distance[neighbors[i]]) {
                dfs(neighbors[i], endWord, result, nextWord, distance, path);
            }
        }
    }

    path.pop();
};

function bfs(startWord, endWord, wordSet, nextWord, distance) {
    var queue = [];
    var findLast = false;
    var neighbors = [];
    var dis = 0;
    var word = '';
    var len = 0;
    var i = 0;

    queue.push(startWord);
    distance[startWord] = 0;

    while (len = queue.length) {
        findLast = false;

        for (i = 0; i < len; i++) {
            word = queue.shift();
            dis = distance[word];
            neighbors = nearNeighbour(word, wordSet);
            if (!nextWord[word]) nextWord[word] = [];

            for (var j = 0; j < neighbors.length; j++) {
                nextWord[word].push(neighbors[j]);

                if (distance[neighbors[j]] === undefined) {
                    distance[neighbors[j]] = dis + 1;

                    if (neighbors[j] === endWord) {
                        findLast = true;
                    } else {
                        queue.push(neighbors[j]);
                    }
                }
            }
        }
        if (findLast) break;
    }
};

function nearNeighbour(word, wordSet) {
    var start = 'a'.charCodeAt(0);
    var len = word.length;
    var str = '';
    var res = [];

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < 26; j++) {
            str = word.substr(0, i) + String.fromCharCode(j + start) + word.substr(i + 1);
            if (wordSet.has(str)) res.push(str);
        }
    }

    return res;
};

function shortTransform(startWord, endWord, words) {
    var wordSet = new Set(words);
    var nextWord = {};
    var distance = {};
    var result = [];

    bfs(startWord, endWord, wordSet, nextWord, distance);
    dfs(startWord, endWord, result, nextWord, distance, []);

    return result;
};


var startWord = "hit"
var endWord = "cog"
var words = ["hot","dot","dog","lot","log","cog"]

shortTransform(startWord, endWord, words)