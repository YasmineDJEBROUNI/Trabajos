var R = [];
function seqTabPD()
{
  return R;
}

function solveProgDyn (n,m){

var nbreJob= n;
var nbreMachine = m;

var   matrice2 = [2], resultat = [nbreJob];
var debExecA = [nbreJob], debExecB = [nbreJob], debExecC = [nbreJob];
var finExecA = [nbreJob], finExecB = [nbreJob], finExecC = [nbreJob];
var tpsMachine = [nbreJob], cmpt =0;
var exec = {
  tpsDebut :0,
  tpsFin : 0
};




for (var i = 0; i<2; i++) matrice2[i]= [nbreJob];//construie matrice pour 2 machines


if (nbreMachine ==2)
{
    
    for (var i=0; i<nbreMachine; i++)
        for (var j=0; j <nbreJob; j++)
          matrice2[i][j]= window.jobs[j][i];
   
    var pos1=-1, pos2=-1, tete=0, queue=nbreJob-1, utilise = [nbreJob];
    var   matrice = [nbreMachine];
       
    //construire un tableau de booléens, tq si Utilisé [k]==1 alors lors de la recherche du minimum dans la matrice2, le job numéro k n'est pas pris en considération
    for (var k=0; k<nbreJob; k++) utilise[k] = 0;


    for(var i =0; i<nbreJob; i++) tpsMachine[i] = [nbreMachine];
 
    //Construire le tableau final 'Résultat' qui contiendra l'ordannoncement des jobs
    while (tete<=queue)
    { 
             
        min = 10000000000;
        i=0; j=0;
        // Celle boucle imbriquée cherche le minimum de la matrice2 
        while (i<2)
        { 
                 
            while(j<nbreJob)
                {
                   if (min>=matrice2[i][j] && utilise[j]==0) { min = matrice2[i][j]; pos1=i; pos2 =j;  }
                      j++;
                }
                i++;
                j=0;
        }
              
        //Si le min appartient à la machine 1 alors on le place à l'entête du tableau résultat
        if (pos1==0) { resultat[tete] = pos2; tete +=1; utilise[pos2] =1; }
        //Sinon, s'il appartient à la machine 2 alors, on le place à la fin du tab résultat
        else if(pos1==1){ resultat[queue] =pos2; queue-=1; utilise[pos2] =1;}
      
        
     }
      
     
    //Affichage du tableau Résultat qui contient la réponse finale
    
     for (var k = 0; k< resultat.length; k ++) R[k] = resultat[k] +1;
    document.getElementById('seq').innerHTML = "<p>Séquence optimale :"+R+" </p>";

  
    for (var i =0; i<nbreJob; i++)
    {
        var indice = resultat[i]; 
        
       
        debExecA[i] = cmpt;
        finExecA[i] = debExecA[i]+matrice2[0][indice];
        cmpt = finExecA[i];
        exec = { tpsDebut:  debExecA[i], 
                tpsFin : finExecA[i]} ; 
        
        tpsMachine[i][0] =exec;
               //alert(i + "0" + tpsMachine[i][0].tpsDebut + "   "+ tpsMachine[i][0].tpsFin )   ;
        if (i==0) debExecB[i] = finExecA[i];
        else debExecB[i] = Math.max(finExecA[i], finExecB[i-1]); 
        finExecB[i] = debExecB[i] + matrice2[1][indice];
        exec = { tpsDebut:  debExecB[i], 
                 tpsFin : finExecB[i]} ; 
        
        tpsMachine[i][1] = exec;
        //alert(i + "0" + tpsMachine[i][1].tpsDebut + "   "+ tpsMachine[i][1].tpsFin )   ;
         
       
    }
     document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) : "+tpsMachine[tpsMachine.length-1][tpsMachine[tpsMachine.length-1].length-1].tpsFin+" ms</p>";
 
}
        

else if(nbreMachine == 3)
{
  
    var matrice = [nbreMachine];
    for (var i = 0; i<nbreMachine; i++) matrice[i]= [nbreJob]; //construire matrice pourr 3 machines
  
    for (var i=0; i<nbreMachine; i++)
        for (var j=0; j <nbreJob; j++)
          matrice[i][j]= window.jobs[j][i];
    
  
    // Vérifier la condition de Johnson = minA >= maxB ou bien minC >= maxB 
    if( (Math.min(...matrice[0])>=Math.max(...matrice[1])) || (Math.min(...matrice[2])>=Math.max(...matrice[1])))  // Cond vérifiée 
    {
    
  
          //faire la sommation pour travailler avec 2 machines uniquement
          ind = 0;
          for (var l = 0; l<2; l++)
              { 
                  for (var k = 0; k<nbreJob; k++)
                      matrice2[l][k]= matrice[ind][k]+matrice[1][k];
                     
                  ind = 2;
              }
    
    
    
      
              
      var pos1=-1, pos2=-1, tete=0, queue=nbreJob-1, utilise = [nbreJob];
       
      //construire un tableau de booléens, tq si Utilisé [k]==1 alors lors de la recherche du minimum dans la matrice2, le job numéro k n'est pas pris en considération
      for (var k=0; k<nbreJob; k++) utilise[k] = 0;
  
      //Construire le tableau final 'Résultat' qui contiendra l'ordannoncement des jobs
      while (tete<=queue)
      { 
         
          min = 10000000000;
          i=0; j=0;
          // Celle boucle imbriquée cherche le minimum de la matrice2 
          while (i<2)
          { 
             
              while(j<nbreJob)
              {
                  if (min>=matrice2[i][j] && utilise[j]==0) { min = matrice2[i][j]; pos1=i; pos2 =j;  }
                  j++;
              }
              i++;
              j=0;
          }
        
          //Si le min appartient à la machine 1 alors on le place à l'entête du tableau résultat
          if (pos1==0) { resultat[tete] = pos2; tete +=1; utilise[pos2] =1; }
          //Sinon, s'il appartient à la machine 2 alors, on le place à la fin du tab résultat
          else if(pos1==1){ resultat[queue] =pos2; queue-=1; utilise[pos2] =1;}
    
      }
  
     //Affichage du tableau Résultat qui contient la réponse finale
    
       for (var k = 0; k< resultat.length; k ++) R[k] = resultat[k] +1;
      document.getElementById('seq').innerHTML = "<p>Séquence optimale :"+R+" </p>";
    
      for(var i =0; i<nbreJob; i++) tpsMachine[i] = [nbreMachine];
      for (var i =0; i<nbreJob; i++)
      {
          var indice = resultat[i]; 
          
         
          debExecA[i] = cmpt;
          finExecA[i] = debExecA[i]+matrice[0][indice];
          cmpt = finExecA[i];
          exec = { tpsDebut:  debExecA[i], 
                  tpsFin : finExecA[i]} ; 
          
          tpsMachine[i][0] =exec;
                 //alert(i + "   0  " + tpsMachine[i][0].tpsDebut + "   "+ tpsMachine[i][0].tpsFin )   ;   
         
          if (i==0) debExecB[i] = finExecA[i];
          else debExecB[i] = Math.max(finExecA[i],finExecB[i-1]); 
          finExecB[i] = debExecB[i] + matrice[1][indice];
          exec = { tpsDebut:  debExecB[i], 
                   tpsFin : finExecB[i]} ; 
          
          tpsMachine[i][1] = exec;
          //alert(i + "    1   " + tpsMachine[i][1].tpsDebut + "   "+ tpsMachine[i][1].tpsFin )   ;
         
          if (i==0) debExecC[i] = finExecB[i];
          else debExecC[i] = Math.max(finExecB[i],finExecC[i-1]); 

          finExecC[i] = debExecC[i] + matrice[2][indice];
          exec = { tpsDebut:  debExecC[i], 
                   tpsFin : finExecC[i]} ; 
          tpsMachine[i][2] = exec;
         // alert(i + "    2   " + tpsMachine[i][2].tpsDebut + "   "+ tpsMachine[i][2].tpsFin )   ;
      }
     
      
      document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) : "+tpsMachine[tpsMachine.length-1][tpsMachine[tpsMachine.length-1].length-1].tpsFin+" ms</p>";
      
    }else {alert("Sorry but we can't execute the Jonhson algorithm"); return 3;}
   
   
} else {alert("Désolée mais l'algorithme de Johnson ne peut pas s'exécuter sur un nombre de machine supérieur à 3"); return 3;}
   return tpsMachine;
}