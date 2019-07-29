var seqTable;
var A = [m], B=[m];
function johnson(){
// n = ligne, m = colonne
var  l=1, M = [m];
var x= [m], y = [m],t= [m], k =[m], resultat =[m];

for (var  i=1; i<=m; i++)
{  
        M[i] = [n];
        A[i] = [n];
        B[i] =[n];
       
 }

 for (var i=0; i<m; i++)
 for ( var j=0; j<n; j++)
    M[i+1][j+1]= jobs[i][j];


for (var i=1; i<=m; i++ )
{
    x[i] =0;
    y[i] = 0;
    t[i] = 0;
    k[i] = 0;
}

console.log("Les éléments de x");
for (var j=1; j<=m; j++)
 for ( var i=1; i<=n-1; i++) 
    x[j]=x[j]+M[j][i];


for (var j=1; j<=m; j++) 
    for (var i=2; i<=n; i++) 
         y[j]=y[j]+M[j][i];


for (var j=1; j<=m; j++) 
      k[j]=x[j]/y[j];
   



while (l<m+1)
{
    
    var mini = Math.min(...k);
    for (var j=1; j<=m; j++) 
    {   
        if (mini==k[j])
        {
            t[l]=j;
            l=l+1;
            k[j]=k[j]+Math.max(...k);
        } 

    }
}


A[1][1]=M[t[1]][1];
B[1][1] =0;
for (var i=2; i<=n; i++)
 {
    A[1][i]=M[t[1]][i]+A[1][i-1];
    B[1][i] = A[1][i] - M[t[1]][i];
}
for (var j=2; j<=m; j++)//(j=2:n)
{
    A[j][1]=M[t[j]][1]+A[j-1][1];
    B[j][1] = A[j][1] - M[t[j]][1];
    for (var i=2; i<=n; i++) //(i=2:m)
     {
      
        d=Math.max(A[j][i-1],A[j-1][i]);
        A[j][i] = M[t[j]][i]+d;
        B[j][i] = A[j][i] - M[t[j]][i];
     }  
}
c=A[m][n];



for (var i=0;i<m; i++)
     resultat[i]= t[i+1];
 

 seqTable = resultat;

 document.getElementById('seq').innerHTML = "<p>Séquence optimale :"+resultat+" </p>";
 document.getElementById('make').innerHTML = "<p>Temps d'éxécution (makespane) :"+c+" ms </p>";
 
 var time = TimingJohnson(resultat, m, n);
 
 
 return time;
}

function TimingJohnson(seq, m, d)
{
    
    
    var Time = [m];
    for(var k=0; k<m; k++) Time[k] = [d];

 
    for(var i=0; i<m; i++)
        for (var j=0; j<d; j++ )
        {
            var elem = {
                deb : 0,
                fin : 0
            };
            elem.deb = B[i+1][j+1];
            elem.fin = A[i+1][j+1];
            
           
            Time [i][j]= elem;
        }
   
    return Time;
}