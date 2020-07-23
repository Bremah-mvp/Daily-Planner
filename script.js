// use JavaScript Date to display current date in a div (#displayJsDate)
var NowDate = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var sDay = NowDate.getDate();
var sMonth = NowDate.getMonth() + 1;
var sYear = NowDate.getFullYear();
var eDisplayDate = document.getElementById('displayJsDate');
eDisplayDate.innerHTML = sYear+'-'+sMonth+'-'+sDay;