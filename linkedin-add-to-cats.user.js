// ==UserScript==
// @name         LinkedIn-Add-To-OpenCats
// @namespace    LinkedIn
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.linkedin.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mlespiau/opencats-tampermonkey-goodies/master/linkedin-add-to-cats.user.js
// @downloadURL  https://raw.githubusercontent.com/mlespiau/opencats-tampermonkey-goodies/master/linkedin-add-to-cats.user.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    function ready(doc, fn) {
        if (doc.readyState != 'loading'){
            fn();
        } else {
            doc.addEventListener('DOMContentLoaded', fn);
        }
    }
    ready(document, function() {
        var nameNode = document.querySelectorAll('.full-name');
        if (nameNode) {
            var fullName = nameNode[0].textContent;
            var company = '';
            var companyNode = document.querySelectorAll('#overview-summary-current td a');
            if (companyNode) {
                company = companyNode[0].textContent;
            }
            if (fullName) {
                var names = fullName.split(' ');
                if (names.length > 2) {
                    var lastName = names.pop();
                    var firstName = names.join(' ');
                } else {
                    var firstName = names[0];
                    var lastName = names[names.length - 1];
                }
            }
            var searchCandidate = 'http://ec2-174-129-137-61.compute-1.amazonaws.com/index.php?m=candidates&parameterscandidates%3AcandidatesListByViewDataGrid=a%3A6%3A%7Bs%3A10%3A%22rangeStart%22%3Bi%3A0%3Bs%3A10%3A%22maxResults%22%3Bi%3A15%3Bs%3A13%3A%22filterVisible%22%3Bb%3A1%3Bs%3A6%3A%22sortBy%22%3Bs%3A15%3A%22currentEmployer%22%3Bs%3A13%3A%22sortDirection%22%3Bs%3A4%3A%22DESC%22%3Bs%3A6%3A%22filter%22%3Bs%3A9%3A%22%3Cdynamic%3E%22%3B%7D&dynamicArgumentcandidates%3AcandidatesListByViewDataGrid=First%2520Name%3D%3D' + encodeURIComponent(firstName) + '%2CLast%2520Name%3D%3D' + encodeURIComponent(lastName) + '%2CCurrent%2520Employer%3D%3D' + encodeURIComponent(company) + '%2C;';
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            var img = document.createElement('img');
            img.setAttribute('src', 'http://ec2-174-129-137-61.compute-1.amazonaws.com/images/favicon.ico');
            img.setAttribute('style', 'display: inline; width:18px; margin-right: 2px; vertical-align: middle;');
            link.appendChild(img);
            nameNode[0].insertBefore(link, nameNode[0].firstChild);
            link.addEventListener('click', function() {
                var popup =  window.open(searchCandidate, '_blank', 'width=1200,height=600');
            });
        }
        waitForKeyElements ("#email-view", function() {
            var emailNode = document.querySelectorAll('#email-view');
            if (emailNode) {
                var emailAddress = emailNode[0].textContent;
                var searchCandidateByEmail = 'http://ec2-174-129-137-61.compute-1.amazonaws.com/index.php?m=candidates&parameterscandidates%3AcandidatesListByViewDataGrid=a%3A6%3A%7Bs%3A10%3A%22rangeStart%22%3Bi%3A0%3Bs%3A10%3A%22maxResults%22%3Bi%3A15%3Bs%3A13%3A%22filterVisible%22%3Bb%3A1%3Bs%3A6%3A%22sortBy%22%3Bs%3A15%3A%22currentEmployer%22%3Bs%3A13%3A%22sortDirection%22%3Bs%3A4%3A%22DESC%22%3Bs%3A6%3A%22filter%22%3Bs%3A9%3A%22%3Cdynamic%3E%22%3B%7D&dynamicArgumentcandidates%3AcandidatesListByViewDataGrid=%3B%2CE-Mail%3D%3D' + encodeURIComponent(emailAddress) + '%2C';
                var linkForEmail = document.createElement('a');
                linkForEmail.setAttribute('href', '#');
                var imgForEmail = document.createElement('img');
                imgForEmail.setAttribute('src', 'http://ec2-174-129-137-61.compute-1.amazonaws.com/images/favicon.ico');
                imgForEmail.setAttribute('style', 'display: inline; width:18px; margin-right: 2px; vertical-align: middle;');
                linkForEmail.appendChild(imgForEmail);
                emailNode[0].insertBefore(linkForEmail, emailNode[0].firstChild);
                linkForEmail.addEventListener('click', function() {
                    var popup =  window.open(searchCandidateByEmail, '_blank', 'width=1200,height=600');
                });
            }
        });
    });
})();
