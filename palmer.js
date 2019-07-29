var seqTable;

function palmer() {
var t0 = performance.now();
var t =new Array(m).fill(0);
var s =new Array(m).fill(0);
var i,j,l=0,d,k=1;
 
 
            for (i = 0; i < m; i++) {
                k=1;
                for ( j = 0; j < n; j++) {
                    s[i]=s[i]-(n-(2*k-1))*jobs[i][j];
                    k++;

                }
            }
           // alert(s);
           var maxi;
          while(l<m)
          {
            maxi=Math.max(...s);
            //alert(s);
            
           for(i=0;i<m;i++)
           {
           // alert(maxi);
           // alert(s[i]);
             if(maxi ==s[i])
             {
                t[l]=i;
                l++;
               // alert(l);
                if(s[i]>0) s[i]=Math.min(...s)-s[i];
                else s[i]=Math.min(...s)+s[i];
             }

           }
          }
          
    for(var i=0; i<t.length; i++ ) t[i]+=1;

  //  alert('sequnce='+t);
   seqTable = t;
    document.getElementById('seq').innerHTML = "<p>Séquence optimale :"+t+" </p>";
    //document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) :"+result.makespane+" ms </p>";
    var time = TimingSequence(t, m, n);
    var make = time[time.length-1][time[time.length-1].length-1].fin;
    document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) :"+make+" ms </p>";
    var t1 = performance.now();
    alert("time ="+(t1-t0)+"Makespan="+make)
    return time;
}
 function TimingSequence(seq, m, d)
{
    //seq contient la les ids de jobs ou bien la sequence optimale, c'est un tableau d'entier
    //Timing une matrice ou les lignes c'est un index ordonné pour la séquence optimale, par exemple
    //l'elem qui se trouve dans la case [1][2] c'est les date deb et fin de job de l'index 1 dans le tableau seq dans la
    //3eme machine (psq on commence par 0)
    //cette fonction return cette matrice 
    //si tu veux preciser quel jobs, tu peux mettre le tableau seq global ou bien return (seq et Time) dans une structure de donnés
    var i,j;
    Time = [];
    for(var k=0; k<m; k++) Time[k] = new Array();
    var elem = {
        deb : 0,
        fin : 0};
    elem.fin = elem.deb + window.jobs[0][0];
    Time[0][0] = elem;
    for(i=1; i<m; i++)
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
    for(i = 1; i<m; i++)
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