// ==UserScript==
// @name         OpenCats LinkedIn
// @namespace    http://ec2-174-129-137-61.compute-1.amazonaws.com/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http*://ec2-174-129-137-61.compute-1.amazonaws.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mlespiau/opencats-tampermonkey-goodies/master/linkedin-search.user.js
// @downloadURL  https://raw.githubusercontent.com/mlespiau/opencats-tampermonkey-goodies/master/linkedin-search.user.js
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    ready(function() {
        console.log('hola');
        var tableElements = document.querySelectorAll('.sortable tr');
        var columns = tableElements[0].children;
        var firstNameColumn = -1;
        var lastNameColumn = -1;
        var companyColumn = -1;
        console.log(tableElements[0].children);
        console.log(tableElements[1].children);
        var k = 0;
        for (var i = 0; i < columns.length; ++i) {
            if (columns[i].children[0]) {
                var columnName = columns[i].children[0].textContent;
                if (columnName.indexOf('First Name') !== -1) {
                    firstNameColumn = k;
                } else if (columnName.indexOf('Last Name') !== -1) {
                    lastNameColumn = k;
                } else if (columnName.indexOf('Current Employer') !== -1) {
                    companyColumn = k;
                }
            }
            if (columns[i].className.indexOf('resizeableCell') === -1) {
                ++k;
            }
        }
        for (var j = 1; j < tableElements.length; ++j) {
            var firstName = tableElements[j].children[firstNameColumn] && tableElements[j].children[firstNameColumn].textContent ? tableElements[j].children[firstNameColumn].textContent : '';
            var lastName = tableElements[j].children[lastNameColumn] && tableElements[j].children[lastNameColumn].textContent ? tableElements[j].children[lastNameColumn].textContent : '';
            var company = tableElements[j].children[companyColumn] && tableElements[j].children[companyColumn].textContent ? tableElements[j].children[companyColumn].textContent : '';
            var searchQuery = 'https://www.linkedin.com/vsearch/f?keywords=' + encodeURIComponent(firstName + ' ' + lastName + ' ' + company);
            console.log(searchQuery);
            var link = document.createElement('a');
            link.setAttribute('href', searchQuery);
            link.setAttribute('target', '_blank');
            var img = document.createElement('img');
            img.setAttribute('src', 'http://www.tallergestiontecnica.com/wp-content/plugins/fixed-social-icons/img/linkedin.png');
            img.setAttribute('style', 'display: inline; width:18px; margin-right: 2px; vertical-align: middle;');
            link.appendChild(img);
            tableElements[j].children[firstNameColumn].insertBefore(link, tableElements[j].children[firstNameColumn].firstChild);
        }

    });
})();
