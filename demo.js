function sol(indiceH,valH,indiceM,valM,indiceT,valT)
{
	this.indiceH=indiceH;
	this.valH=valH;
	this.indiceM=indiceM;
	this.valM=valM;
	this.indiceT=indiceT;
	this.valT=valT;
	
}
function meilleur(instance)
{
var res,res2;
 
switch(instance)
{
	case '20_5_2.txt':
    res=meilleurQ(0);
    res2=meilleurT(0);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";   

  

	break;
	case '20_5_5.txt':
    res=meilleurQ(1);
    res2=meilleurT(1);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
 break;
	case '20_5_6.txt':
    res=meilleurQ(2);
    res2=meilleurT(2);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
	break;
	case '20_10_1.txt':
    res=meilleurQ(3);
    res2=meilleurT(3);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
	break;
	case '20_20_1.txt':
    res=meilleurQ(4);
    res2=meilleurT(4);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
	break;
 case '50_10_1.txt':
 res=meilleurQ(5);
 res2=meilleurT(5);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
	break;
case '50_20_1.txt':
res=meilleurQ(6);
res2=meilleurT(6);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
 break;
 	case '100_10_1.txt':
    res=meilleurQ(7);
    res2=meilleurT(7);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
	break;
 case '100_20_4.txt':
 res=meilleurQ(8);
 res2=meilleurT(8);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
 break;
 case '200_10_1.txt':
 res=meilleurQ(9);
 res2=meilleurT(9);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
break;
 case '200_20_9.txt':
 res=meilleurQ(10);
 res2=meilleurT(10);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
break;
 case '500_20_9.txt':
 res=meilleurQ(11);
 res2=meilleurT(11);
 document.getElementById('MHQ').innerHTML = "<p>La meilleure heuristique : "+corresp(res.indiceH)+"   Le makespan = "+res.valH+"</p>";
 document.getElementById('MMQ').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res.indiceM)+"   Le makespan = "+res.valM+"</p>"; 
 document.getElementById('MTQ').innerHTML = "<p>La meilleure Méthode:"+corresp(res.indiceT)+"   Le makespan = "+res.valT+"</p>";  
 document.getElementById('MHT').innerHTML = "<p>La meilleure heuristique : "+corresp(res2.indiceH)+"  Le temps = "+res2.valH+"</p>";
 document.getElementById('MMT').innerHTML = "<p>La meilleure Méthaheuristique : "+corresp(res2.indiceM)+"  Le temps = "+res2.valM+"</p>"; 
 document.getElementById('MTT').innerHTML = "<p>La meilleure Méthode: "+corresp(res2.indiceT)+"  Le temps = "+res2.valT+"</p>";
	break;




}
}

function corresp(numero)
{
	switch(numero)
	{
	case 0:
    return 'Palmer';
    break;
	case 1:
	return 'CDS';
	break;
	case 2:
	return 'NEH';
	break;
	case 3:
	return 'Johnson';
	break;
	case 4:
	return 'AG';
	break;
	case 5:
	return 'Réculer.S';
	break;
	case 6:
	return 'Recherche.T';
	break;
	}
}
function meilleurT (indice)
{
var min=Infinity;
var minH,inH,minM,inM;
minM=Infinity;
var inT=0;
for(var i=7;i<14;i++)
{
   if (eval[indice][i] < min) 
   {
   	min=eval[indice][i];
   	 
   	inT=i;
   }
   if(i > 10) 
   {
	   	if (eval[indice][i] < minM) 
	   {
	   	minM=eval[indice][i];
	   	 
	   	inM=i;
	   }
   	 
   }
   if(i==10) {inH=inT;minH=min;}
 

}

var resultat=new sol(inH-7,minH,inM-7,minM,inT-7,min);
return resultat;
}
function meilleurQ (indice)
{
var min=Infinity;
var minH,inH,minM,inM;
minM=Infinity;
var inT=0;
for(var i=0;i<7;i++)
{
   if (eval[indice][i] < min) 
   {
   	min=eval[indice][i];
   	 
   	inT=i;
   }
   if(i > 3) 
   {
	   	if (eval[indice][i] < minM) 
	   {
	   	minM=eval[indice][i];
	   	 
	   	inM=i;
	   }
   	 
   }
   if(i==3) {inH=inT;minH=min;}
 

}

var resultat=new sol(inH,minH,inM,minM,inT,min);
return resultat;
}
