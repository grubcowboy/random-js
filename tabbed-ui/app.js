document.addEventListener('DOMContentLoaded', () => {
    const tabContent = document.querySelectorAll('.tab-content');
    const tabContainer = document.querySelector('.tab-buttons');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // initialize tabs
    tabContent.forEach((tabContent, index) => {
        tabContent.classList.toggle('hidden', index !== 0);
    });
    tabButtons[0].classList.add('active');

    // Anonymous Function
    (function () {
        console.log('"what the fucks the (anonymous) function" - Drake - Grub Cowboy');
    })();


    tabContainer.addEventListener('click', e => {

        if (!e.target.dataset.tab) { return };

        const targetTabId = e.target.dataset.tab;

        const targetTab = document.getElementById(targetTabId);
        tabContent.forEach((tab) => {
            tab.classList.add('hidden');
        });
        targetTab.classList.remove("hidden");

        tabButtons.forEach(tab => {
            tab.classList.remove('active');
        });
        e.target.classList.add('active');

    });

});


