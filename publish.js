/*
Since this site is made with Obsidian, we use this publish.js file to customize the site.
https://help.obsidian.md/Obsidian+Publish/Customize+your+site
*/

const site = "https://dataengineering.wiki";

// Each folder contains a note with the same name as the folder, add a redirect to the note when the folder is clicked.
// Expand arrow should not be affected.
var navContainer = document.querySelector('.site-body-left-column').querySelector('.nav-view-outer').querySelector('.tree-item').querySelector('.tree-item-children');
let folders = ["Community", "Concepts", "FAQ", "Guides", "Tools", "Tutorials"];
for (const item of folders) {

    var element = navContainer.querySelector(`[data-path="${item}"] div.tree-item-inner`);
    element.setAttribute('data-link', `${site}/${item}/${item}`);
    element.addEventListener('click', function (e) {
        window.location.href = e.target.getAttribute('data-link');
        return false;
    });
};

// Obsidian Publish's renderer stamps rel="noopener nofollow" on every external
// anchor at view time, so the rel can't be controlled from Index.md. The
// DataDriven placement is a paid sponsor link, which should carry rel="sponsored"
// rather than a blanket nofollow. This post-render pass re-applies the correct
// rel after the renderer runs; the MutationObserver keeps it applied across
// Publish's SPA navigation.
new MutationObserver(() => {
    document.querySelectorAll('a[href*="datadriven.io"]').forEach((a) => {
        if (a.getAttribute('rel') !== 'sponsored') {
            a.setAttribute('rel', 'sponsored');
        }
    });
}).observe(document.body, { childList: true, subtree: true });
