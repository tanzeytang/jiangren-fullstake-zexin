//后面的callback箭头函数将传递一个形参进来
getCustomer(1, customer => {
  //由于getCustomer设置了执行等待时间，故4s后会首先
  //执行callback函数里的下面这句console.log语句
  console.log("Customer: ", customer);
  //根据传递进来的isgold是true，将会继续往里曾走，里层getTopMovies
  //传递里一个callback函数，等待时间也是4s，movies是一个list
  //将输出【movie1,movie2】
  if (customer.isGold) {
    getTopMovies(movies => {
      console.log("Top movies: ", movies);
      //sendEmail将前面获取的customer的email属性作为第一个参数，以及上面获取的
      //movies list作为第二个参数，后面第三个是一个匿名的无形参的callback函数
      //根据这段内嵌的代码应该输出如下内容：
      //Customer: {id:1,name:'zexin tang,...}
      //Top movies:['movie1','movie2']
      //Email sent...
      sendEmail(customer.email, movies, () => {
        console.log("Email sent...");
      });
    });
  }
});

function getCustomer(id, callback) {
  setTimeout(() => {
    //将后面的object作为callback参数传递给callback函数
    callback({
      id: 1,
      name: "zexin tang",
      isGold: true,
      email: "email"
    });
  }, 4000);
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(["movie1", "movie2"]);
  }, 4000);
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}
