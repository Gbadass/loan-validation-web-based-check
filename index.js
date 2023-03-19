const form  = document.getElementById("form");

form.addEventListener("submit",(e)=>{
 e.preventDefault();
  clickMe();
})

function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(new Date(date2) - new Date(date1));
  return diffInMs / (1000 * 60 * 60 * 24);
}

function clickMe() {

  let points = 0;
  let success = [];
  let error = [];



  const inputAnnualIncome = document.getElementById('input-annualIncome').value
  const inputLoanAmount = document.getElementById('input-loanAmount').value                   
  const inputCurrentBalance = document.getElementById('input-currentBalance').value
  const inputBankingDuration = document.getElementById('input-bankingDuration').value
  const inputLastDepositDate = document.getElementById('input-lastDepositDate').value
  const inputPreviousLoanDate = document.getElementById('input-previousLoanDate').value
  const inputPreviousLoanPaymentDate = document.getElementById('input-previousLoanPaymentDate').value
  const inputAccountType = document.getElementById('input-accountType').value 

  const message = document.getElementById('message');


  //checking if loan amount is less than 45% of annual income
  let computed45Percent = inputAnnualIncome*0.45;
  if(computed45Percent>inputLoanAmount){
    success.push("Loan amount does not exceed 45% of annual income");
  }else{
    error.push("Loan amount exceeds 45% of annual income");
  }

  //checking if current balance is greater than loan amount
  if(inputCurrentBalance>inputLoanAmount){

    points+=10;
    success.push("Current Balance is greater than loan amount, 10 points awarded");
  }else{
    points-=10;
    error.push("Current Balance is less than loan amount, 10 points deducted.")
  }

  // console.log(inputCurrentBalance, inputLoanAmount)

  //check users banking duration.
  if(inputBankingDuration>=6){
    points+=10;
    success.push("User has banked for atleast 6 months, 10 points awarded");
  }else{
    // points-=10;
    error.push("User has banked for less than 6 months")
  }


  //check if the last deposit date was within the last 30 days.
  let today = new Date();
  let days = getDifferenceInDays(today, inputLastDepositDate);

  if(days<=30){
    points+=5;
    success.push("Users last deposit was within the last 30 days, 5 points awarded");
  }else{
    // points-=10;
    error.push("Users last deposit was not within the last 30 days")
  }


  
  //check if last loan date was within the last 6 months.
  if(inputPreviousLoanDate>=6){
    points+=10;
    success.push("Users last loan was greater than 6nmonths, 10 points awarded");
  }
  else{
    error.push("Users last loan  was less than 6 months")
  }

  
  //check if last loan payment date is above 6 months.
  if(inputPreviousLoanPaymentDate>=6){
    points+=10;
    success.push("Users last loan payment date was greater than 6 months, 10 points awarded");
  }else{
    error.push("Users last loan payment date was less than 6 months")
  }


  //check the account type.
  if(inputAccountType=="Current"){
    points+=10;
    success.push("Users account type is current, 10 points awarded");
  }else if(inputAccountType=="Savings"){
    points+=5;
    success.push("Users account type is savings, 5 points awarded");
  }

  let tempError = "";
  let tempSuccess = "";
  for (let x=0; x<success.length; x++){
    tempSuccess+="<div>"+success[x]+"</div>";
  }
  for (let x=0; x<error.length; x++){
    tempError+="<div>"+error[x]+"</div>";
  }

  message.innerHTML = "<h4>Points: "+points+"</h4>";
  message.innerHTML += "<h4>Success: </h4>"+tempSuccess;
  message.innerHTML += "<h4>Error: </h4>"+tempError;
 


}




