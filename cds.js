
function cds(times)
{
    var t0 = performance.now();
    var jobs_count = times.length;
    var machine_count = times[0].length;
    var sum = 0;
    var perms = [];
    var times_merged = [];

    for(var i=0; i<times.length; i++)
       {  
          for(var j=0; j<times[i].length; j++) 
          {sum = sum + times[i][j];
          }
	      times_merged[i] = [0,sum];
	}


    for(var i=0; i<machine_count-1; i++)
	{
		for(var k=0; k<jobs_count; k++)
		{
		    times_merged[k][0] += times[k][i];
		    times_merged[k][1] -= times[k][i];
		}
        perms.push(john(times_merged));
	}   

    var ar = makespanCDS(perms[0], times);
    var indice = 0;
    var min = ar;
    for(var k=1; k<perms.length; k++)
    {
        var ar = makespanCDS(perms[k], times); 
        if(ar<=min) 
        {
            min = ar;
            indice = k;
        }
    }
     
    var t1 = performance.now();
    alert("la perfermance = "+(t1-t0)+"ms ,la sequence = "+perms[indice]+" ,le makespanCDS = "+min);
    document.getElementById('seq').innerHTML = "<p>Séquence optimale :"+perms[indice]+" </p>";
    //document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespanCDSe) :"+result.makespanCDSe+" ms </p>";
    var time = TimingSequence(perms[indice], jobs_count, machine_count);
   // var make = time[time.length-1][time[time.length-1].length-1].fin;
      document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespanCDSe) :"+min+" ms </p>";
	return perms[indice];
}


function makespanCDS(perm , times)
{
    var job_count = perm.length;
    var machine_count = times[0].length;
    var arr = []
    var makespanCDS = []

    for (var i = 0; i < job_count +1; i++)
	{ 
	 for(var j=0; j<machine_count +1; j++)
		{
	 	arr[j] = 0;
		}
	    makespanCDS[i] = arr;
        arr = [];
	}

	for(var i=0; i<job_count; i++) 
		{
		var job = perm[i];
		for (var machine=0; machine<machine_count; machine++)
			{
			    makespanCDS[i + 1][machine + 1] = Math.max(makespanCDS[i][machine + 1], makespanCDS[i + 1][machine]) + times[job - 1][machine];
			}
        }
    
    return makespanCDS[job_count][machine_count];

}

function john(times)
{
    var job_count = times.length;
    var job_ids = [];
    for (var i=0; i<job_count; i++) {job_ids[i]=i+1;}
    var l1 = [];
    var l2 = [];
    var a3 = [];
    for(var i=0; i<job_ids.length; i++)
    {
        var ih = []
        ih[0] = job_ids[i]
        ih[1] = times[i];
        a3[i] = ih;
    } 
    
    var a4 = [];
    a4 = a3.sort(function(a,b) {
         var l = Math.min(...a[1]);
                 var r = Math.min(...b[1]);
                 if(l>r)
		 return 1;
		else if(l<r)
		 return -1;
		else 
         return 0;});
        for(var i=0; i<a4.length; i++)
        {
        var job_id = (a4[i])[0];
        var job_times = (a4[i])[1];
        if (job_times[0] < job_times[1])
            l1.push(job_id);
        else
            l2.splice(0,0,job_id);//insérer toujours à la tete
	    }
    
    return l1.concat(l2);
}




 function TimingSequence(seq, n, d)
{
    //seq contient la les ids de jobs ou bien la sequence optimale, c'est un tableau d'entier
    //Timing une matrice ou les lignes c'est un index ordonné pour la séquence optimale, par exemple
    //l'elem qui se trouve dans la case [1][2] c'est les date deb et fin de job de l'index 1 dans le tableau seq dans la
    //3eme machine (psq on commence par 0)
    //cette fonction return cette matrice 
    //si tu veux preciser quel jobs, tu peux mettre le tableau seq global ou bien return (seq et Time) dans une structure de donnés
    var i,j;
    Time = [];
    for(var k=0; k<n; k++) Time[k] = new Array();
    var elem = {
        deb : 0,
        fin : 0};
    elem.fin = elem.deb + window.jobs[0][0];
    Time[0][0] = elem;
    for(i=1; i<n; i++)
    {
        var elem = {
            deb : 0,
            fin : 0
        };
        elem.deb = Time[i-1][0].fin;
        elem.fin = elem.deb + window.jobs[seq[i]-1][0];
        Time[i][0] = elem;
    }
    for(j=1; j<d; j++)
    {
        var elem = {
            deb : 0,
            fin : 0
        };
        elem.deb = Time[0][j-1].fin;
        elem.fin = elem.deb + window.jobs[0][j];
        Time[0][j] = elem;
    }
     
    for(i = 1; i<n; i++)
    {
        for(j = 1; j<d; j++ )
        {
            var elem = {
                deb : 0,
                fin : 0
            };
            if(Time[i][j-1].fin >= Time[i-1][j].fin)
            {
                elem.deb = Time[i][j-1].fin;
                elem.fin = elem.deb + window.jobs[seq[i]-1][j];
            }
            else {
                elem.deb = Time[i-1][j].fin;
                elem.fin = elem.deb + window.jobs[seq[i]-1][j];
            }
            Time[i][j] = elem;
        }
    }
    return Time;
}