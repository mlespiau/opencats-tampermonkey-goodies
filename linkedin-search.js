var tableElements = document.querySelectorAll('.sortable tr');
var columns = tableElements[0];
for (var i = 0; i < columns.length; ++i) {
    console.log(columns[i]);
}
for (var j = 1; j < tableElements.length; ++j) {
    console.log(tableElements[j]);
}
