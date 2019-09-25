//使用callback是解决async执行的一种方法，
//但是callback内嵌的函数体往往像套娃一样
//一层往一层里套，看起来很不直观，不利于理解
//使用async方法可以更近直观一些，coding看起来
//更好理解：
//async 标识这个函数是异步执行的
async function notifyCustomer() {
  //await标识里这里的getCustomer（1）将像sync一样等待4s
  //获取customer，而非直接像async那样跳过，立马去执行下面的
  //console.log，从而得到undefine的结果，
  //这样的写法就是在async模式下用await让它如同sync一样去
  //执行代码，也使得这个代码更好理解
  const customer = await getCustomer(1);
  console.log("Customer: ", customer);
  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log("Top movies: ", movies);
    await sendEmail(customer.email, movies);
    console.log("Email sent...");
  }
}
notifyCustomer();

function getCustomer(id) {
  //promise对象接受两个参数，一个是resolve，一个reject
  //分别用与指定在正常执行的情况下返回的值和出错时返回的错误
  //promise就和callback差不多，写法不太一样，
  //callback作为行参卸载函数的argument里，并在返回的值前用
  //callback标识，promise声明一个对象，把需要执行的函数体放到promise内部的
  //callback函数里，并指定resolve或reject
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "zexin tang",
        isGold: true,
        email: "email"
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
