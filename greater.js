function avg(a){
	var sum=0;
	a.forEach(function(a){sum+=a;});
	var avg=sum/a.length;
	console.log(Math.round(avg));
}

var scores = [90,98,89,100,100,86,94];
avg(scores);
