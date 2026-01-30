
function Task(title , priority){ 
    this.id = Date.now() ; 
     this.title = title ;
     this.priority = priority ;
     this.completed = false ;  
}




Task.prototype.storeValue= function(){
        console.log(`Task: ${this.title} with priority: ${this.priority} is stored.`) ;
}   
// const task1 = new Task('Complete Assignment' , 'High') ;
// const task2 = new Task('Grocery Shopping' , 'Medium') ;
// task1.storeValue() ;
// task2.storeValue() ;

Task.prototype.getInfo = function(){
      console.log(`Task Info - ID: ${this.id}, Title: ${this.title}, Priority: ${this.priority}, Completed: ${this.completed}`) ;
}
// // // task 1.1 completed 
// // // now for task 1.2 

// Task.prototype.markComplete = function(){
//       this.completed = true ;  
//       console.log(`task instance is ${this.title}`) ; 
//       return this ; 
// }

// Task.prototype.updatePriority = function(newPriority){
//       this.priority = newPriority ;  
//       console.log(`task instance is ${this.title} with updated priority: ${this.priority}`) ;
      
//       // here i am validating the priority 
//       if(!(this.priority === 'High' || this.priority === 'Medium' || this.priority === 'Low')){
//             console.log('Invalid priority value. Please use High, Medium, or Low.') ;
//       }
//       return this ; 
// }


// PriorityTask = function(title, priority, dueDate){

//          Task.call(this , title, priority) ;
//          this.dueDate = dueDate ; 

          



// } 

// PriorityTask.prototype = Object.create(Task.prototype) ;
// PriorityTask.prototype.constructor = PriorityTask ; 
// //Overriding getInfo method


// PriorityTask.getInfo = function(){
//       console.log('This is a PriorityTask class that extends Task class.') ;

// } 


// Task.prototype.getAllTasksInfo = function(tasks){
//        return tasks.map(t => {t.getInfo()}) ;
       
        
// } 

// const tasks = [task1, task2] ;

// task1.getAllTasksInfo(tasks) ;  


// // part - 2 Event Loop 



function createTaskAsync(title , priority){
       

      return new Promise(function(resolve, reject){
            setTimeout(function(){
                  console.log('Creating task asynchronously...') ;
                  const task = new Task(title , priority) ;
                  resolve(task) ;
            }, 6000) ;
      }).then(function(task){
            console.log('Task created !') ;
            task.getInfo() ;
            return task ;

      }) ;
}  

createTaskAsync('read a book', "medium") ;    

// function demonstrateEventLoop(){
//       console.log('Start of demonstrateEventLoop function') ;  
     


      // Promise.resolve().then(function(){
      //        console.log(1) ;
      //         setTimeout(function(){
      //               console.log(4) ;
      //               resolve() ;
      //         }, 2000)  ; 
      // }).then(function(){
      //        setTimeout(function(){
      //               console.log(2) ;
      //               resolve() ;
      //         },6000) ; 
      // }).then(function(){
      //        setTimeout(function(){
      //               console.log(3) ;
      //               resolve() ;
      //         },4000) ; 
      // }) ;


      // simple way 
      // setTimeout(function(){
      //    console.log(2) ;
      // }, 6000)

      // setTimeout(function(){
      //    console.log(3) ;
      // }, 4000)

      // setTimeout(function(){
      //    console.log(4) ;
      // }, 2000) 

// }   





// demonstrateEventLoop() ;


createAndSaveTask = function(title, priority){
      
      createTaskAsync(title, priority)

     createTaskAsync(title, priority)
     .then(function(task){
          console.log("Task Created and saved successfully") ; 
          task.getInfo() ; 
          return task ;  
     }).catch(function(error){
          console.log("Error creating task: ", error) ;
     }
   ).finally(function(){
      console.log("createAndSaveTask operation completed.") ;}) ;


      
}  

createAndSaveTask('Go for a walk', 'Low') ;



