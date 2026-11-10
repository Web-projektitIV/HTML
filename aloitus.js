/* Javascript-aloitus */
console.log("Javascript-aloitus!");
const myDialog = document.getElementById("myDialog");
const output = document.getElementById("myOutput");

myDialog.addEventListener("close", () => {
  console.log(`Dialog closed with returnValue: ${myDialog.returnValue}`);  
  output.value = `${myDialog.returnValue}`;
});