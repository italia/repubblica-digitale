$(function () {
    let parallax = document.querySelectorAll(".innovation-section-head, .hero-head"),
        speed = 0.5;

    window.onscroll = function () {
        // if ratio is smaller than 16:9 image scroll is not behaving correctly
        if (window.innerWidth/window.innerHeight >  1.77) {
            [].slice.call(parallax).forEach(function (element) {
                let windowYOffset = window.pageYOffset,
                    backgroundPositionY = windowYOffset * 0.5;
                element.style.backgroundPositionY = "-" + backgroundPositionY + "px";
            });
        }
    };

    //$('.card').fitVids();

    // Manifesto
    var $accordion = $(".js-accordion");
    var $allPanels = $(" .js-accordion-panel");
    var $allItems = $(".js-accordion-item");

    $accordion.on("click", ".js-accordion-toggle", function() {
        $allPanels.slideUp();
        $allItems.removeClass("is-open");
        if ($(this).next().is(":visible")) {
            $(".js-accordion-panel").slideUp();
        } else {
            $(this).next().slideDown().closest(".js-accordion-item").addClass("is-open");
        }
        return false;
    });

    function isEmail(email) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
    }

    function onFieldsChange() {
        // Enables submit button when at least one option is selected and the input field is filled with an actual email
        $(".js-newsletter-submit")
            .prop("disabled", !isEmail($(".js-newsletter-email").val()));
    }
    $(".js-newsletter-email")
        .on("input", onFieldsChange);

});




/**
 * Shufflejs per ricerca progetti
 **/


var Shuffle = window.Shuffle;
var SearchKey = [];
class Iniziative {
    constructor(element) {
        this.element = element;
        this.shuffle = new Shuffle(element, {
            itemSelector: '.card-iniziativa',
            filterMode: Shuffle.FilterMode.ALL
        });

        // Log events.
        this.addShuffleEventListeners();
        this._activeFilters = [];
        this.addFilterButtons();
        this.addSorting();
        this.addSearchFilter();
    }

    /**
     * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
     * for them like you normally would (with jQuery for example).
     */
    addShuffleEventListeners() {
        this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
            console.log('layout. data:', data);
        });
        this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
            console.log('removed. data:', data);
        });
    }

    addFilterButtons() {
        const options = document.querySelectorAll('.filter-options .btn');
        if (!options) {
            return;
        }
        const onClick = this._handleFilterClick.bind(this);
        options.forEach((button) => {
            button.addEventListener('click', onClick, false);
        });
    }

    removeLabels(){
        const options = document.querySelectorAll('.filter-options .btn');
        this._removeActiveClassFromChildren(options);
        document.querySelector('#selected-filter').innerHTML = "";
        this.shuffle.filter(Shuffle.ALL_ITEMS);
        SearchKey = [];

    }


    removeLabel(label){
        var pos = SearchKey.indexOf(label);
        SearchKey.splice(pos, 1);
        this.shuffle.filter(SearchKey);
        this.stampaFiltri();

        const options = document.querySelectorAll('.filter-options .btn');
        this._removeActiveClassFromChildren(options);
        this._addActiveClass(options);

    }

    stampaFiltri(){
        document.querySelector('#selected-filter').innerHTML = "";

        if(SearchKey.length > 0){
            document.querySelector('#selected-filter').insertAdjacentHTML(
                'afterbegin',
                'Stai visualizzando soltanto le iniziative che hanno i seguenti filtri: <br>\n'
            );


            SearchKey.forEach(function(item){
                document.querySelector('#selected-filter').insertAdjacentHTML(
                    'beforeend',
                    ' <div class="chip chip-lg chip-primary mt-3"  onclick="window.iniziative.removeLabel(\'' + item + '\')">\n' +
                    '      <span class="chip-label">' + item + '</span>\n' +
                    '      <button>\n' +
                    '        <svg class="icon"><use xlink:href="/assets/bootstrap-italia/dist/svg/sprite.svg#it-close"></use></svg>\n' +
                    '        <span class="sr-only">Elimina ' + item + '</span>\n' +
                    '      </button>\n' +
                    '    </div>  '
                )

            });
            document.querySelector('#selected-filter').insertAdjacentHTML(
                'beforeend',
                '<a class="read-more mt-3" href="#"  onclick="window.iniziative.removeLabels()">\n' +
                '   <span class="text">Rimuovi tutti i filtri</span>\n' +
                '   <svg class="icon">\n' +
                '       <use xlink:href="/assets/bootstrap-italia/dist/svg/sprite.svg#it-close-circle"></use>\n' +
                '   </svg>\n' +
                '</a>'
            );

        }
    }

    _handleFilterClick(evt) {
        const btn = evt.currentTarget;
        const isActive = btn.classList.contains('disabled');
        const btnGroup = btn.getAttribute('data-group');
        const options = document.querySelectorAll('.filter-options .btn');
        const origin = btn.getAttribute('data-origin');

        // this._removeActiveClassFromChildren(btn.parentNode);
     //   this._removeActiveClassFromChildren(options);
//        document.querySelector("#collapse-" + origin).collapse("hide");
         $("#collapse-" + origin).collapse("hide");

        let filterGroup;
        if (isActive) {
            btn.classList.remove('disabled');
            filterGroup = Shuffle.ALL_ITEMS;

            var pos = SearchKey.indexOf(btnGroup);
            SearchKey.splice(pos, 1);

        } else {
            var filtro = origin;
            if(origin == "activity") filtro = "attività";

            btn.classList.add('disabled');

            filterGroup = btnGroup;
            SearchKey.push(filterGroup);
        }

       // alert(SearchKey);
        this.shuffle.filter(SearchKey);



        this.stampaFiltri();

        //var elmnt = document.getElementById("grid");
        //elmnt.scrollIntoView({
        //    behavior: 'smooth'
        //});
    }

    _removeActiveClassFromChildren(parent) {
        // const { children } = parent;
        // for (let i = children.length - 1; i >= 0; i--) {
        //     children[i].classList.remove('active');
        // }
        for (let i = parent.length - 1; i >= 0; i--) {
            parent[i].classList.remove('disabled');
        }
    }


    _addActiveClass(parent) {
        // const { children } = parent;
        // for (let i = children.length - 1; i >= 0; i--) {
        //     children[i].classList.remove('active');
        // }
        for (let i = parent.length - 1; i >= 0; i--) {
            const btnGroup = parent[i].getAttribute('data-group')
            if(SearchKey.includes(btnGroup)){
                parent[i].classList.add('disabled');
            }
        }
    }

    addSorting() {
        const buttonGroup = document.querySelector('.sort-options');
        if (!buttonGroup) {
            return;
        }
        buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
    }

    _handleSortChange(evt) {
        // Add and remove `active` class from buttons.
        const buttons = Array.from(evt.currentTarget.children);
        buttons.forEach((button) => {
            if (button.querySelector('input').value === evt.target.value) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });

        // Create the sort options to give to Shuffle.
        const { value } = evt.target;
        let options = {};

        function sortByDate(element) {
            return element.getAttribute('data-created');
        }

        function sortByTitle(element) {
            return element.getAttribute('data-title').toLowerCase();
        }

        if (value === 'date-created') {
            options = {
                reverse: true,
                by: sortByDate,
            };
        } else if (value === 'title') {
            options = {
                by: sortByTitle,
            };
        }
        this.shuffle.sort(options);
    }

    // Advanced filtering
    addSearchFilter() {
        const searchInput = document.querySelector('.js-shuffle-search');
        if (!searchInput) {
            return;
        }
        searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
    }

    /**
     * Filter the shuffle instance by items with a title that matches the search input.
     * @param {Event} evt Event object.
     */
    _handleSearchKeyup(evt) {
        const searchText = evt.target.value.toLowerCase();
        this.shuffle.filter((element, shuffle) => {
            // If there is a current filter applied, ignore elements that don't match it.
            if (shuffle.group !== Shuffle.ALL_ITEMS) {
                // Get the item's groups.
                const groups = JSON.parse(element.getAttribute('data-groups'));
                const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
                // Only search elements in the current group
                if (!isElementInCurrentGroup) {
                    return false;
                }
            }
            const titleElement = element.querySelector('.picture-item__title');
            const titleText = titleElement.textContent.toLowerCase().trim();
            return titleText.indexOf(searchText) !== -1;
        });
    }
}
