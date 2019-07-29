
var termine = [n], debut = [n];

var tabuList ;
function searchTabu(nbreIter, listSize) {

      // n = ligne, machine, m = colonne
      
    var seqBest = new Array(m).fill(0);
    var seq = new Array(m).fill(0);
    var cpt=0, tps, tpsBest, indList=0, indDebut=0;
   
    tabuList = new Array(listSize);
  
    for (var  i=0; i<n; i++)
    {          
        termine[i] = [m];
        debut[i] =[m];       
    }

    for (var i=0; i<m; i++)
    {
        
        seqBest[i]=seqRT[i];
        seq[i]= seqRT[i]; // seqBest Initiale
    }

    for (var i=0; i<listSize; i++)
    {
       tabuList[i] = new Array(m);
    }
   var t0 = performance.now();
    for (var i=0; i<m; i++)    
             tabuList[indList][i]=seq[i]; 
               
    indList = indList +1;

    tpsBest = calculTps(seqBest, n,m);    
    var trouve = true;
    while (cpt<nbreIter)
    { 
      

       while (trouve)
       
       {

           index1=getRandomIntInclusive (0,m-1) ;
           index2=getRandomIntInclusive(0, m-1) ;
           
           if (index2==index1) index2=getRandomIntInclusive(0, n-1) ;
           
           seq = permut(seq, index1, index2);

           trouve = checkList (seq);        
           
       }

       trouve = true;    
        
         
        for (var i=0; i<m; i++)    
             tabuList[indList][i]=seq[i]; 
               
      

        indList = indList +1;
        if (indList >= listSize) indList =0;

        tps = calculTps(seq, n,m);
       
        if (tps<tpsBest)
         {
            for(var i=0; i<m; i++) seqBest[i] = seq[i];
           
            tpsBest = tps;
           
         }   


        cpt = cpt +1; 
                                                              

    }
    var t1=performance.now();
 
 
    return seqBest;
   
}
  function calculTps (t, n,m){
 
    var tpsExec, d;
  
    termine[0][0]=M[0][t[0]];    
    debut[0][0] =0;
    for (var i=1; i<n; i++)
    {
        termine[i][0]=M[i][t[0]]+termine[i-1][0];
        debut[i][0] = termine[i][0] - M[i][t[0]];
       
    }

  
    for (var j=1; j<m; j++)
    {
        
        termine[0][j]=M[0][t[j]]+termine[0][j-1];
        debut[0][j] = termine[0][j] - M[0][t[j]];
        for (var i=1; i<n; i++) 
        {
            
            d=Math.max(termine[i-1][j],termine[i][j-1]);
            termine[i][j] = M[i][t[j]]+d;
            debut[i][j] = termine[i][j] - M[i][t[j]];
        }  
    
    }
    tpsExec = termine[n-1][m-1];
    
    return tpsExec;
  }

  function permut(t, index1, index2){
      var inter  = t[index1];
      t[index1]= t[index2];
      t[index2] = inter;
      return t;
  }

  function checkList( t){
    var trouve = false;
   
    var i=0, j=0, cpt=0;
    
    while (i< tabuList.length && trouve==false)
    {
        
        while(j<n )
        { 
            if (tabuList[i][j]==t[j]) cpt++;
            ;
            j++
        }

        i++; 
        j=0;
        if( cpt==n ) trouve=true;
        cpt=0;
       
    }
    
    return trouve;
    
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
  function Timing(seq, m, d)
{
  
    calculTps (seq, m,d);
    
    var Time = [m];
    for(var k=0; k<m; k++) Time[k] = [d];

   
    for(var i=0; i<m; i++)
        for (var j=0; j<d; j++ )
        {
            var elem = {
                deb : 0,
                fin : 0
            };
           
            
            elem.deb = debut[i][j];
            elem.fin = termine[i][j];
            
           
            Time [i][j]= elem;
        } 
   
    return Time;
}

 
 