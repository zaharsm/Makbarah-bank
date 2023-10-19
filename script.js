
const account1 = {
    owner:'Jonas Schmedtmann',
    movements:[200, 450, -400, 3000, -650, -130, 70, 1300,1293,-434],
    interestRate : 1.2,
    pin:1111
}

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };

  const accounts = [account1, account2, account3, account4];


  const map = new Map();
  for(let i=0;i<accounts.length;i++) {
    let first  = accounts[i].owner.split(' ')[0][0].toLowerCase();
    let second = accounts[i].owner.split(' ')[1][0].toLowerCase();

    // console.log(accounts[i].owner)

    const username = first.concat(second);
    const pin= accounts[i].pin;

    // console.log(username,pin);
    map.set(username,pin);

  }

  function startCountdown(minutes) {
    let seconds = minutes * 60;

    function updateCountdown() {
      const minutesLeft = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;

      const formattedTime = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

      document.getElementById('countdown').innerText = `You will be logged out in ${formattedTime}`;

      if (seconds === 0) {
        clearInterval(countdownInterval);
        document.querySelector('.accounts').style.visibility = 'hidden';
        document.querySelector('.name').innerText = 'Makbarah Bank'
        console.log('Logout'); // You can perform logout actions here
      } else {
        seconds--;
      }
    }

    updateCountdown(); // Initial update
     // Update every second
     let countdownInterval = setInterval(updateCountdown, 1000);
  }


  // Start countdown for 5 minutes
  

//   let real;


  document.querySelector('.btn-nav').addEventListener('click',function(){
       
        let user =  document.querySelector('.login-user').value
        let pass =  document.querySelector('.login-pin').value

        // console.log(user,pass)

        let checkPass = map.get(user);
        // console.log(map);

        let entriesArray = Array.from(map.entries());
        
        // console.log(entriesArray,user)

        let index = entriesArray.findIndex(([key, value]) => key === user);

        // console.log(index)

        // let real = index+1;
        // console.log(index)


        if(checkPass === +(pass)){
            // console.log('its right')
            // clearInterval(countdownInterval);

            
            // clearInterval(countdownInterval);
            startCountdown(5);

            document.querySelector('.accounts').style.visibility = 'visible';


            const user_s = document.querySelector('.name');
            // let calcy = `account${real}`
            let cal = accounts[index];
            // console.log(cal)
            // console.log(calcy);
            // console.log(calcy.owner)
            user_s.innerText = cal.owner.split(' ')[0]

           document.querySelector('.login-user').value = ''
           document.querySelector('.login-pin').value = '';

            // console.log(user_s)
    //   console.log(accounts)
    // Total Balance
        function totalBalance(){
            let totalBalance = document.querySelector('.total-balance');
            let total = 0;
            // let calcy_1 = `account${real}`

            // console.log(calcy)
            
            cal.movements.forEach(acc=>{
                total += acc;
            })
            return total
        }

        let balance = totalBalance();
        document.querySelector('.total-balance').innerText = `${balance}€`


        // Current Date

        function getFormattedDate() {
            const today = new Date();
        
            // Get the day, month, and year
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = today.getFullYear();
        
            // Concatenate the date components with "/"
            const formattedDate = `${month}/${day}/${year}`;
            return formattedDate;
        }


    
    // Example usage
        const todayDate = getFormattedDate();

        const dateToday = document.querySelector('.date');
        dateToday.innerText = todayDate

        // Input creditedAmount
        

        function creditedAmount(){
            let creditCount=0;
            // let calcy = `account${real}`
            cal.movements.forEach(acc=>{
                if(acc>1){
                    creditCount += acc;
                }
            })

            return creditCount;

        }

    const creditAmount = creditedAmount();
    const dimensions_1 = document.querySelector('.dimensions-1');

    dimensions_1.innerText = `${creditAmount}€`;



    // Output DebitedAmount

    function debitedAmount(){
        let debitCount = 0;
        // let calcy = `account${real}`
        cal.movements.forEach(acc=>{
            if(acc<1){
                debitCount += acc;
            }
        })

        return debitCount;
    }
    const debitAmount = (debitedAmount()*-1);
    const dimensions_2 = document.querySelector('.dimensions-2');
    dimensions_2.innerText = `${debitAmount}€`;




    // Transfer Money
    document.querySelector('.btn-nav-transfer').addEventListener('click',function(){
        let transferUser = document.querySelector('.transfer-user').value;
        let transferAmount = document.querySelector('.transfer-amount').value;

        let checkPass_1 = map.get(transferUser);
        // console.log(checkPass.movements)

        let entriesArray_1 = Array.from(map.entries());
        
        // console.log(entriesArray,user)

        let index_transfer = entriesArray_1.findIndex(([key, value]) => key === transferUser);
        let theAccount = accounts[index_transfer];
        console.log(theAccount)

        // console.log(index_transfer);
        if(theAccount !== undefined){

            if (!isNaN(transferAmount) && transferAmount.trim() !== '') {
            theAccount.movements.push(+transferAmount);
            cal.movements.push(-1*+transferAmount);

            let newBalance =  totalBalance();
            document.querySelector('.total-balance').innerText = `${newBalance}€`


            document.querySelector('.transfer-user').value = '';
            document.querySelector('.transfer-amount').value = '';
            } else {
                alert('Please enter a valid numeric amount for the transfer.');
            }
        }else{
            alert('No relevant account found')
        }

        // console.log(transferUser,transferAmount)


    })



        // Request Loan
    document.querySelector('.btn-nav-request').addEventListener('click',function(){
        let requestVal =  document.querySelector('.request-input').value;
        // let calcy = `account${real}`

        cal.movements.push(+requestVal);
        console.log(cal.movements)
        
        
        mapMovementsToHTML(cal.movements);
        

        const creditAmount = creditedAmount();
        const dimensions_1 = document.querySelector('.dimensions-1');
    
        dimensions_1.innerText = `${+(creditAmount)}€`;

        let balance = totalBalance();
        console.log(balance)

        document.querySelector('.total-balance').innerText = `${balance}€`
        document.querySelector('.request-input').value = ' ';
    })






    // Interest Calculate
    function interest(){
        // let calcy = `account${real}`
        const interestPercent = ((cal.interestRate*creditAmount)/100)-account1.interestRate;
        return interestPercent
    }

    const interested = interest();

    const dimensions_3 = document.querySelector('.dimensions-3');
    const newInterest = interested.toFixed(2);
    dimensions_3.innerText = `${newInterest}€`;

    


    // Close Account

    document.querySelector('.btn-nav-close').addEventListener('click',function(){

        let closeUser = document.querySelector('.close-user').value;
        let closePass = document.querySelector('.close-pass').value;


        console.log(closeUser,closePass);


        let checkClosePass = map.get(closeUser);
        // console.log(map);

        let entriesArray = Array.from(map.entries());
        
        // console.log(entriesArray,user)

        let indexToDelete = entriesArray.findIndex(([key, value]) => key === closeUser);

        console.log(indexToDelete, checkClosePass)

        if(checkClosePass === +(closePass)){
            accounts.splice(indexToDelete, 1);

            document.querySelector('.close-user').value = '';
            document.querySelector('.close-pass').value = '';
        }else{
            alert('Your password is wrong sir')
        }

    })



    // MAP
    function mapMovementsToHTML(array) {
        const movementsContainer = document.querySelector('.deposits');
        movementsContainer.innerHTML = '';

        // let calcy = `account${real}`

        array.map((movement, index) => {
        const depositHTML = document.createElement('div');
        depositHTML.classList.add('inside-deposits');

        const depositButton = document.createElement('button');
        if(movement>0){
            depositButton.classList.add('btn-deposit-postive');
        }else{
            depositButton.classList.add('btn-deposit-negative');
        }
        
        depositButton.textContent = `Deposit ${index + 1}`;

        const depositAmount = document.createElement('p');
        depositAmount.textContent = `${movement}€`;

        depositHTML.appendChild(depositButton);
        depositHTML.appendChild(depositAmount);

        movementsContainer.appendChild(depositHTML);

        // Add a horizontal line after each deposit, except for the last one
        if (index < cal.movements.length - 1) {
            const hr = document.createElement('hr');
            movementsContainer.appendChild(hr);
        }
        });
    }



    // Call the function to map movements to HTML
    mapMovementsToHTML(cal.movements);


    document.querySelector('.sort').addEventListener('click',function(){
        function mergeSort(arr) {
            if (arr.length <= 1) {
                return arr;
            }

            const middle = Math.floor(arr.length / 2);
            const left = arr.slice(0, middle);
            const right = arr.slice(middle);

            return merge(mergeSort(left), mergeSort(right));
            }

            function merge(left, right) {
            let result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
                } else {
                result.push(right[rightIndex]);
                rightIndex++;
                }
            }

            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
            }

            const unsortedArray = cal.movements;
            const sortedArrayMerge = mergeSort(unsortedArray);
            console.log("Merge Sort Result:", sortedArrayMerge);

            mapMovementsToHTML(sortedArrayMerge);

    })


    }else{
        alert('Wrong Id or Password')
    }

})













