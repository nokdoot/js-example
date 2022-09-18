// gg
const solution = (orders, course) => {
  const set = new Set();
  orders.forEach((order) => set.add(order));
  notDuplicatedorders = Array.from(set);
  const answer = [];
  const length = orders.length;

  const orderCountOf = {};
  for (let i = 0; i < length; i++) {
    const order = orders[i];

    const comb = getCombinationsOfString(order);

    comb.map((set) => {
      const newCourse = set.join('');
      if (newCourse.length > 1) {
        if (!orderCountOf[newCourse]) orderCountOf[newCourse] = 0;
        orderCountOf[newCourse]++;
      }
    });

  }

  for (const newCourses of notDuplicatedorders) {
    if (course.includes(newCourses.length) && orderCountOf[newCourses] >= 2) {
      answer.push(newCourses);
    }
  }

  return answer.sort();
}

const getCombinationsOfString = (string) => {
  const chars = string.split('');
  return getCombinations(chars.sort());
}

function getCombinations(valuesArray)
{
  var combi = [];
  var temp = [];
  var slent = Math.pow(2, valuesArray.length);

  for (var i = 0; i < slent; i++)
  {
      temp = [];
      for (var j = 0; j < valuesArray.length; j++)
      {
          if ((i & Math.pow(2, j)))
          {
              temp.push(valuesArray[j]);
          }
      }
      if (temp.length > 0)
      {
          combi.push(temp);
      }
  }

  combi.sort((a, b) => a.length - b.length);
  return combi;
}

(() => {
  console.log(solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2,3,5]))
})()