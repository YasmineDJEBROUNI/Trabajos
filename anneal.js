var jobs_number ;
var machines_number;
var current = [];
var best = [];
var best_cost = 0;
var times;
/*var times = [[1 ,5 ,2 ,8],
	[8 ,2 ,3 ,9],
	[2 ,5 ,7 ,8],
	[4 ,4 ,8 ,6],
	[5 ,1 ,7 ,7],
	[6 ,8 ,7 ,4],
	[9 ,4 ,2 ,1],
	[5 ,9 ,7 ,3]];*/


function start_RS(times_, seq_opt)
{
					current = [];
					best = [];
					best_cost = 0;
					times = times_;
					jobs_number = times.length;
					machines_number = times[0].length;
					init(seq_opt);
}

function randomFloat(n)
{
	return (Math.random()*n);
}

function randomInt(n)
{
	return Math.floor(Math.random()*(n));
}

function randomInteger(a,b)
{
	return Math.floor(Math.random()*(b-a)+a);
}

function deep_copy(array, to)
{
	var i = array.length;
	while(i--)
	{
		to[i] = array[i];
	}
}


function SwitchPosition(sequence, i, j)
{
	var neighbor = [];
	deep_copy(sequence, neighbor);
	while(i != j)
	{
		var t = neighbor[j];
		neighbor[j] = neighbor[i];
		neighbor[i] = t;

		i = (i+1) % jobs_number;
		if (i == j)
			break;
		j = (j-1+jobs_number) % jobs_number;
	}
	return neighbor;
}

function acceptanceProbability(current_cost, neighbor_cost)
{
	if(neighbor_cost < current_cost)
		return 1;
	return Math.exp((current_cost - neighbor_cost)/window.temprature);
}

function getCost(seq, times)
{
    var job_count = times.length;
    var machine_count = times[0].length;
    var arr = []
    var makespan = []

    for (var i = 0; i < job_count +1; i++)
	{ 
	 for(var j=0; j<machine_count +1; j++)
		{
	 	arr[j] = 0;
		}
	    makespan[i] = arr;
        arr = [];
	}

	for(var i=0; i<job_count; i++) 
		{
		var job = seq[i];
		for (var machine=0; machine<machine_count; machine++)
			{
			    makespan[i + 1][machine + 1] = Math.max(makespan[i][machine + 1], makespan[i + 1][machine]) + times[job - 1][machine];
			}
        }
    
    return makespan[job_count][machine_count];

}

function init(seq_opt1)
{
	var t1 = performance.now();
	//generation de la solution S0 à partir d'une heuristique (dans ce cas CDS)
	current = seq_opt1;
	//generation de la solution S0 d'une manière aléatoire
	/*var i = 0;
	while(i<jobs_number)
	{
		var r = Math.floor(Math.random()*jobs_number)+1;
		if(current.indexOf(r)==-1) 
		{
			current[i] = r;
			i++;
		}
	}*/
	deep_copy(current, best);
	best_cost = getCost(best, times);
	solve_anneal();
	var t2 = performance.now();
	alert("makespan = "+best_cost+" sequence = "+best+" perfermance = "+(t2-t1)+" ms");
}

function solve_anneal()
{
	alert("tem p ="+window.temprature+" zero  = "+window.NB_iter);
	while(window.temprature>1e-4)
	{
		for(var i=0; i<window.NB_iter; i++)
		{
		var current_cost = getCost(current, times);
		var k = randomInt(jobs_number);
		var l = (k+1+ randomInt(jobs_number - 2)) % jobs_number;
		if(k > l)
		{
			var tmp = k;
			k = l;
			l = tmp;
		}
		var neighbor = SwitchPosition(current, k, l);
		var neighbor_cost = getCost(neighbor, times);
		if(Math.random() < acceptanceProbability(current_cost, neighbor_cost))
		{
			//alert("yes1");
			deep_copy(neighbor, current);
			current_cost = getCost(current, times);
		}
		if(current_cost < best_cost)
		{
			deep_copy(current, best);
			best_cost = current_cost;
		}
	}
		window.temprature *= window.COOLING_RATE;
	}
}


