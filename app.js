$(function () {
    $('#datepicker').datepicker({
        orientation: 'bottom'
    });

    let people = [
        "Madeline Tenny",
        "Lawrence Harding",
        "Will Chavez",
        "Wade Warren",
        "Leslie Alexander",
        "Robert Fox",
        "Cameron Williamsom",
        "Jacob Jones"
    ];

    const peopleSelection = {
        assignedTo: ["Lawrence Harding"],
        followedTo: []
    }

    setAutocomplete("assignedTo");
    setAutocomplete("followedTo");

    function setAutocomplete(key) {
        rebuildOptions(key);
        $(`#${key}`).autocomplete(autocompleteParams(key)).focus(function () {$(this).data("uiAutocomplete").search($(this).val())});
        $(`#${key}Options`).click(event => { removeOption(event, key) });
    }

    function autocompleteParams(key) {
        return {
            source: people,
            minLength: 2,
            select: (event, ui) => {
                peopleSelection[key].push(ui.item.value);
                rebuildOptions(key);
                event.target.value = '';
                event.preventDefault();
            }
        }
    }

    function rebuildOptions(key) {
        $(`#${key}Options`).html(peopleSelection[key].map(value => `<span class='selected-option'><span class="btn-close"></span>${value}</span>`).join(''));
    }

    function removeOption(event, key) {
        let target = event.target.classList.contains("selected-option") ? event.target : event.target.parentNode;

        if (target.classList.contains("selected-option")) {
            peopleSelection[key] = peopleSelection[key].filter((selection) => selection !== target.innerText);
            rebuildOptions(key);
        }
    }
});