function format() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  console.log(time)
  return time;
}
format();
