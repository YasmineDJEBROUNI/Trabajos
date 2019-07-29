var seqTable;

function QueueNode(val) {
    this.val = val;
    this.next = null;
  }
  
  function Queue() {
    this.head = null;
    this.tail = null;
  }
  
  Queue.prototype.enqueue = function(val) {
    var node = new QueueNode(val);
  
    if (this.head == null && this.tail == null) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail !== null) {
        this.tail.next = node;
        this.tail = node;
      } else {
        this.tail = node;
      }
    }
  };
  
  Queue.prototype.dequeue = function() {
    var node = this.head;
  
    if (node !== null) {
      this.head = this.head.next;
      return node.val;
    }
  
    return null;
  };



function Node(data_, eval_) 
{
    this.data = data_;
    this.eval = eval_;
}

function Tree(data) 
{
    var node = new Node(data, 0);
    this._root = node;
}

Node.prototype = {
    add: function(data) {
        var child = new Node(data, this, []);
        this.children.push(child);
    }
}

/**********************************/
	
function makeSpan(permut,d) {

var timeMachine =[];

var i,j,k;
// on cree le tableau bleu, contenant les lignes

        var  currentJob=[];

 for (i = 0; i < d; i++) {timeMachine[i]=0;}
	       
	        for (i = 0; i < permut.length; i++) {
                var currentJob = window.jobs[permut[i]];
                
                
	            timeMachine[0] += currentJob[0];
	            for (j = 1; j < timeMachine.length; j++) {
	                if (timeMachine[j] > timeMachine[j - 1]) {
	                    timeMachine[j] = timeMachine[j] + currentJob[j];
	                } else {
	                    timeMachine[j] = timeMachine[j - 1] + currentJob[j];
	                }
	            }
	        }
	       
  return timeMachine;
}

function lowerBoundPartiel(timeMachine,job,npermut) {

 
var i,j,k;
 

         
            for (j = 0; j < timeMachine.length; j++) {
	                for(i=0;i<npermut.length ;i++) 
	                	
	                	{if(npermut[i]!=job) timeMachine[j]+=window.jobs[npermut[i]][j];}
	            }
		    timeMachine[0]=window.jobs[job][0] + timeMachine[0];
		    for (j = 1; j < timeMachine.length; j++) {
                if (timeMachine[j] > timeMachine[j - 1]) {
                    timeMachine[j] = timeMachine[j] +  window.jobs[job][j];
                } else {
                    timeMachine[j] = timeMachine[j - 1] + window.jobs[job][j];
                }
            }
		     
		   
		    
		   return (timeMachine[timeMachine.length-1]);
}
/***************/
/*fonction d'évaluation*/
/* n:jobs d :machine*/
function lowerBoundNode(permut,n,d)
{
     var time = makeSpan(permut,d);
	       var i,minpart; 
	       var unused = [];
                for (i = 0; i < n; i++) if(permut.indexOf(i)=== -1) unused.push(i);
	        var min=lowerBoundPartiel(time,unused[0],unused);      
	        for ( i = 1; i < unused.length; i++) {
	        	time = makeSpan(permut,d);
	        	minpart=lowerBoundPartiel(time,unused[i],unused);
	            if( minpart < min){ min=minpart;}
	        }
	       return (min);
}
 
function copyTab(tab1)
{
	var i;
	var tab=[];
	for(i=0;i<tab1.length;i++)
	{
        tab[i]=tab1[i];
	}
	return (tab);
}
/*******************************/
/*branch function
return tab des noeud*/
function branchNode(node,n,d)
{
	    var tab=[];
        var i;
        var unused = [];
                for (var i = 0; i < n; i++) if(node.data.indexOf(i)=== -1) unused.push(i);
	        for ( i = 0; i < unused.length; i++) {
	        	tab[i]= new Node([], node, [], 0);
	        	tab[i].data=copyTab(node.data);
	        	tab[i].data[node.data.length]=unused[i];
	        	tab[i].eval=lowerBoundNode(tab[i].data,n,d);
	        }
	       
	        return (tab);
}
 
/*********************************/

/***** La methode pour choisir une methode de resolution ******/

function solveMethode(n,m) 
{     
        var time = solveBranchAndBound(n, m);	
        return time;
}


function solveBranchAndBound(n, d) {
    var next = 0;
    var tabv = [];
    var queue = new Queue();
    for(var i=0; i<n-1 ;i++ ) tabv.push(i);
    for(var i=0; i<n ;i++ ){
        var tabi = [];
        tabi.push(i);
        var node_ = new Node(tabi, lowerBoundNode(tabi, window.n, window.m));
        queue.enqueue(node_);
    }
    var result = {
        sequence : null,
        makespane : Infinity};
    
    var b_sup = lowerBoundNode(tabv, n, d);
    while (queue.head != null) 
    {
        var current = queue.dequeue();
         // verifier si une feuille
         if(current.data.length == n)
         {
             if(current.eval < result.makespane )
             {
                 b_sup = current.eval;
                 result.sequence = current.data;
                 result.makespane = current.eval;
                 console.log('meilleur'+result.makespane);
             }
         }
         else 
         // Si c'est pas la feuille donc on calcule l'evaluation si inf au sup donc un noeud actif
         {
             if(lowerBoundNode(current.data, n, d) <= b_sup)
             {
                var unused = [];
                for (var i = 0; i < n; i++) if(current.data.indexOf(i)=== -1) unused.push(i);
                for (var j = 0; j < unused.length; j++) {
                    var next = unused[j];
                    var tabe = [];
                    for(var k=0; k<current.data.length ; k++)
                    {
                        tabe.push(current.data[k]);
                    }
                    var pi = lowerBoundNode(tabe, n, d);
                    tabe.push(next);
                    var node_ = new Node(tabe, pi);
                    queue.enqueue(node_);
                }
             }
         }
    }
    for(var i=0; i<result.sequence.length; i++ ) result.sequence[i]+=1;

    alert('sequnce='+result.sequence+' , makespane='+result.makespane);
    seqTable = result.sequence;
    document.getElementById('seq').innerHTML = "<p>Séquence optimale :"+result.sequence+" </p>";
    //document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) :"+result.makespane+" ms </p>";
    var time = TimingSequence(result.sequence, n, d);
    var make = time[time.length-1][time[time.length-1].length-1].fin;
      document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) :"+make+" ms </p>";
    for(var i=0; i<time.length; i++ ) 
    {
    for(var j=0; j<time[i].length; j++){
       // alert('deb= '+time[i][j].deb+'fin= '+time[i][j].fin);
    }
    }
    return time;
}
function seqTab ()
{
  return seqTable;
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
