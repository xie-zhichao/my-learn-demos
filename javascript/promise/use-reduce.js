/**
 * 利用reduce串行执行promise
 * @param {promise} tasks 
 */
function start(tasks) {
	var result = [];
	return tasks.reduce((accumulator, item, index) => {
    return accumulator.then(res => {
      result.push(res);
      return index == tasks.length - 1 ? item.then(res => { result.push(res); return result; }) : item;
    });
	}, Promise.resolve(0));
}

function delay(time) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve(time);
		}, time);
	});
}

start([delay(3000), delay(2000), delay(1000)]).then(res => {
	console.log(res); // [0, 3000, 2000, 1000]
});