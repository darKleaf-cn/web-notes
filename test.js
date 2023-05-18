var name = '123';

var obj = {
  name: '456',
  print: function () {
    console.log(this);
    function a() {
      console.log(this)
      console.log(this.name);
    }
    a();
  }
};

obj.print();
