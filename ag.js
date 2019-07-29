 var toolbox = 0;
// Create a toolbox
function ag( p_ij, nbJobs, popSizep, mutProbp, crossProbp, generationsp, selectionp, orderneh){
// Create parameters

toolbox = new Toolbox(p_ij, nbJobs);
var popSize = popSizep;
var mutProb = mutProbp;
var crossProb = crossProbp;
var generations = generationsp;
var selection = selectionp;
//alert("mut"+mutProb + "cross" + crossProb);
var breedFunction = function breedFunction(parentA, parentB)
        {
            var array=[];
            var result = [];
            var j, k;
            var sauvA = [];
            var sauvB = [];
            for(var i=0; i<parentB.length; i++)
            {
                array[i] = Math.round(Math.random());
               // alert(array[i]);
            }
             for(var i=0; i<parentB.length; i++)
            {
                if (array[i] == 0)
                {
                        j=i;
                    while(result.indexOf(parentA[j] )!=-1){
                        //sauvA.push(parentA[j])
                        j++;
                        if (j == parentB.length) j=0;
                    }
                    result[i] = parentA[j];
                }
                else {
                      j=i;
                    while(result.indexOf(parentB[j])!=-1){
                        j++;
                        if (j == parentB.length) j=0;
                    }
                    result[i] = parentB[j];


                }
            }

          //  alert(array+"   "+result);
        return(result);

        };

// Create genetic algorithm and evolve individuals
var gen = new GeneticAlgorithm(toolbox, popSize, mutProb, crossProb, breedFunction,selection, true, orderneh);
//alert("hee3");
 var t0 = performance.now();
var result = gen.evolve(generations);
 var t1 = performance.now();
 var t2 = t1 - t0;
var p = result.population;
/*for(var j=0; j<p.length; j++)
       alert(j+" fit   "+p[j].fitness+" indv  "+p[j].individual);*/

let fittestScore = result.population[0].fitness;
        var sum = 0;
        for (var i = 0; i < result.population.length; i++) {
            sum += result.population[i].fitness;
            
        }

       var average = (sum / result.population.length);
alert("Le makespan AG ="+fittestScore+", Le temps de recherche ="+t2+", la séquence "+result.population[0].individual );
return result.population[0].individual;
//console.log("Simple Array Example:", gen.evolve(generations));
//alert(gen.evolve(generations));

};



function Toolbox(p_ij, nbJobs) {
  //  this.p_ij = p_ij;
   // alert("h");
    this.nbMach = p_ij.length;
   // this.nbJobs = p_ij[ 0].length;
    this.genIndv = function genIndv()
    {
        //alert(nbJobs);
        var result=[];
        var elem = 0;
        for(var i =0; i<nbJobs; i++)
        {
            elem = Math.floor(Math.random()*nbJobs);
            while(result.indexOf(elem)!=-1 || isNaN(elem))
            {
                
               
                elem = Math.floor(Math.random()*nbJobs);
            }
            result[i] = elem;
        }
      // alert("ress")
        return result;

    };
    this.genPopulation = function(seq){
        return getAllPermutations(seq);
    }
    this.getFitness = function getFitness(indv) {
        let fitness = 0;
        fitness = makespan(indv.individual, p_ij, p_ij.length);
      //  alert(fitness);
        return fitness;
    };
    this.mutate = function(indiv) {
        let mutatedIndex = Math.floor(Math.random() * indiv.length);
        let mutatedIndex2 = Math.floor(Math.random() * indiv.length);
        var indv = [];
        for (var i=0; i<indiv.length; i++) indv[i] = indiv[i];
        var temp = indv[mutatedIndex] ;
        indv[mutatedIndex] = indv[mutatedIndex2];
        indv[mutatedIndex2] = temp;

        return indv;


    };

};

function makespan(my_seq, p_ij, nbm){
        var c_ij = [];
       // alert("jobs"+my_seq.length+"mach"+p_ij.length);
    for (var i =0; i< nbm; i++)
    {
        c_ij[i] =  new Array(my_seq.length+1);
        for (var j =0; j<my_seq.length+1; j++)
            {c_ij[i][j] = 0;}
    }
    
     for (var j =1; j<= my_seq.length; j++)
    {
        
        c_ij[0][j] = c_ij[0][j - 1] + p_ij[0][my_seq[j - 1]];
        

    }
    for(var i=1; i<=nbm-1; i++)
        for(var j =1; j<=my_seq.length; j++)
            {
            c_ij[i][j] = maxNEH(c_ij[i - 1][j], c_ij[i][j - 1]) + p_ij[i][my_seq[j - 1]];
             //alert(c_ij[i][j]);
             }
    //alert(c_ij[nbm - 1][my_seq.length]+"hell");
    //alert("what");
 return (c_ij[nbm - 1][my_seq.length]);
}

function maxNEH(a,b)
{
    if(a>b) return a;
    else return b;
}


function GeneticAlgorithm(toolbox, popSize, mutProb, crossProb, breedFunction, selectionp, verbose, orderneh) {

  
    checkConstructorVars(toolbox, popSize, mutProb, breedFunction);

    function checkConstructorVars(toolbox, popsize, mutProb, breedFunction) {
        if(toolbox === undefined) {
            alert("Toolbox must be defined");
        }

        if(popSize === undefined) {
            alert("Population size must be defined");
        }

        if (popSize <= 2) {
            alert("Population size must be greater than 2. Current size: ' + popSize");
        }

        if(mutProb === undefined) {
            alert("Mutability probability must be defined");
        }

        if(breedFunction === undefined) {
            alert("Breed function must be defined");
        }
    };

    this.evolve = function(generations) {

        let population = this.generatePopulation(toolbox.genIndv, popSize);

//alert("indi"+popSize+population.length);
        for (var i = 0; i < generations; i++) {
           
            population = this.getFitness(population, toolbox.getFitness, popSize);

            if (selectionp == 's') {
                population = this.sortByFitness(population, toolbox.getFitness);//sort
            }

            population = breed(population, toolbox.mutate, mutProb, crossProb, breedFunction);
           // if(i==1 || i==20 || i ==50 || i==70 || i==100 || i ==150) alert("generation"+i+" "+population[0].fitness);
        }
        population = this.getFitness(population, toolbox.getFitness, popSize);
        population = this.sortByFitness(population, toolbox.getFitness);
        if (verbose) printUpdate(population, generations);

        let results = getResults(population, toolbox.getFitness, generations);
        return results;
    };


    // Generate a population with the given individual 
    // generation strategy and population size
    this.generatePopulation = function(genIndv, popSize) {
        var pop = [];
       let indv1 = { individual: 0, fitness: 0 }
            indv1.individual = orderneh;
        pop.push(indv1);
        for (var i = 0; i < popSize; i++) {

            let indv = { individual: 0, fitness: 0 }
            indv.individual = genIndv();
            pop.push(indv);
        }

        return pop;
    };

    this.getFitness = function(population, getFitness,popSize) {
        for (var i = 0; i < popSize; i++){
            let indv = population[i];
            indv.fitness = getFitness(indv);
            population[i] = indv;
           // alert("fitn" +indv.fitness);
        }
        return population;
    }

    // Sort the population array
    this.sortByFitness = function(population, getFitness) {
        population.sort(function(a, b) {
            return (a.fitness - b.fitness) ;
        });
        return population;
    };

    // breed population and apply mutation if probability met
    function breed(population, mutate, mutProb, crossProb, breedFunction) {

        // Select best individuals and remove bottom half of population
        let breeders = Math.round(population.length / 2);
        let newPopulation = population.slice(0, breeders);
        let newPopT = population;
        let selected = [];
      //  alert("selection "+selectionp);
            if (selectionp =='t') {
                // Shuffle array
            var n = Math.round(population.length/5);
            if (n <2) n =2;

              while (newPopulation.length != population.length) {
                //alert("ok");
                newPopT = newPopT.sort(function() {
                  return .5 - Math.random();
                });
                // Get sub-array of first n elements after shuffled
                selected = newPopT.slice(0, n);
                //alert("hii2i"+selected);
               selected = selected.sort(function(a,b) {
                  return (a.fitness - b.fitness);
                });
                    let parentA = selected[0].individual;
                    let parentB = selected[1].individual;

                    // Create newborn
                    if (Math.random() <= crossProb) 
                    {
                        //alert("crossT");
                        let newborn = breedFunction(parentA, parentB);
                         if (Math.random() <= mutProb) {
                            //alert("mutateT");
                                newborn = mutate(newborn);
                            }
                            newPopulation.push({ individual: newborn });
                    }
                    else
                    {
                        //alert("rienT");
                        newPopulation.push({ individual: parentA });
                        if (newPopulation.length != population.length) newPopulation.push({ individual: parentB });
                        //alert("finiT");
                    }
                    // Mutate newborn

           
                   }

            }
        // Select parents
        else{
        while (newPopulation.length != population.length) {
            let parentAIndex = Math.floor(Math.random() * breeders);
            let parentBIndex = Math.floor(Math.random() * breeders);

            while (parentAIndex == parentBIndex) {
                parentBIndex = Math.floor(Math.random() * breeders);
            }

            let parentA = population[parentAIndex].individual;
            let parentB = population[parentBIndex].individual;

            // Create newborn
            if (Math.random() <= crossProb) 
            {
                //alert("cross");
                let newborn = breedFunction(parentA, parentB);
                 if (Math.random() <= mutProb) {
                    //alert("mutate");
                        newborn = mutate(newborn);
                    }
                    newPopulation.push({ individual: newborn });
            }
            else
            {
                //alert("rien");
                newPopulation.push({ individual: parentA });
                if (newPopulation.length != population.length) newPopulation.push({ individual: parentB });
                //alert("fini");
            }
            // Mutate newborn

           
        }
    }
        //alert("c bon");
        return newPopulation;
    };

    function getResults(population, getFitness, generations) {
        let results = {
            generations: generations,
            population: []
        };
        for (var i = 0; i < population.length; i++) {
            let indv = population[i];
            results.population.push(indv);
        }
        return results;
    };

    function printUpdate(population, generation) {
        let fittestScore = population[0].fitness;
        let sum = 0;
        for (var i = 0; i < population.length; i++) {
            sum += population[i].fitness;
        }
        let average = sum / population.length;
       // alert(generation + "Makespan: "+fittestScore+" sequence "+population[0].individual +" average "+ average );
    };

    

};
  //  this.goalFitness = Toolbox.fitnessMax;

 /*for(var j=0; j<population.length; j++)
       //alert(i+"   "+j+"    "+population[j].fitness+"   "+population[j].individual);*/
function Algorithms() {};

Algorithms.crossBreed = function(parentA, parentB) {
    // Select cutOff point and create newborn
    let cutOff = Math.floor(Math.random() * parentA.length);
    let newborn = parentA.slice(0, cutOff + 1);
    let parentBChrom = parentB.slice(cutOff + 1, parentB.length);

    for (var i = 0; i < parentBChrom.length; i++) {
        newborn.push(parentBChrom[i]);
    }
    return newborn;
};

function makespanAG(seq, p_ij, n){
    var i,j;
    Time = [];
    
    for(var k=0; k<n; k++) Time[k] = new Array();
    var elem = {
        deb : 0,
        fin : 0};
    elem.fin = elem.deb + p_ij[0][seq[0]];
    Time[0][0] = elem;
    for(i=1; i<n; i++)
    {
        var elem = {
            deb : 0,
            fin : 0
        };
        elem.deb = Time[i-1][0].fin;
        elem.fin = elem.deb + p_ij[i][seq[0]];
        Time[i][0] = elem;
    }
    for(j=1; j<seq.length; j++)
    {
        var elem = {
            deb : 0,
            fin : 0
        };
        elem.deb = Time[0][j-1].fin;
        elem.fin = elem.deb + p_ij[0][seq[j]];
        Time[0][j] = elem;
     //   alert("hi   "+Time[0][j].deb + "  "+ Time[0][j].fin);
        
    }
//alert("hi");
    for(var i=1; i<=n-1; i++){
        for(var j =1; j<seq.length; j++)
            {
            var elem = {
            deb : 0,
            fin : 0
        };
           if(Time[i-1][j].fin>Time[i][j-1].fin) elem.deb = Time[i-1][j].fin;
           else elem.deb = Time[i][j-1].fin;
          // elem.deb = maxNEH(Time[i-1][j].fin, Time[i][j-1].fin);
            elem.fin = elem.deb + p_ij[i][seq[j]];
          //  alert("hello   "+Time[i-1][j].fin + "  "+ Time[i][j-1].fin+"    "+maxNEH(Time[i-1][j].fin, Time[i][j-1].fin)+"    "+elem.deb);
            Time[i][j] = elem;
           

             }}

 return Time[n-1][seq.length -1].fin;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}