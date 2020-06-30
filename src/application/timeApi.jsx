    // 时间戳转换函数
    const  DateTrans = (date) => {
      let _date = new Date(parseInt(date));
      let y = _date.getFullYear();
      let m = _date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = _date.getDate();
     d = d < 10 ? ('0' + d) : d;
     let h = _date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let minute = _date.getMinutes();
      let second = _date.getSeconds();
       minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second;
     // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second)
      let dates = y + '-' + m + '-' + d;
      return dates;
  }

  export default DateTrans
