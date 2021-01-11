tinymce.init({
    selector: '#post-body',  // change this value according to your HTML
    plugins: 'autolink link',
});
//gestione eventi

var newEventForm = document.querySelector('#new-event-form')
var deleteEventForm = document.querySelector('#delete-event-form')
newEventForm.style.display = 'none'
deleteEventForm.style.display = 'none'
document.querySelector('#new-event-button').addEventListener('click', function () {
    if (newEventForm.style.display == 'none') {
        newEventForm.style.display = 'block'
    }
    else {
        deleteEventForm.style.display = 'none'
    }
    deleteEventForm.style.display = 'none'
})

document.querySelector('#delete-event-button').addEventListener('click', function () {
    deleteEventForm.style.display = 'block'
    newEventForm.style.display = 'none'
    var container = document.querySelector('#events-checkbox-container')
    if (!container.hasChildNodes()) {
        fetch('/areariservata/eventsinfo')
            .then(response => response.json())
            .then(events => displayEventsResultsInCheckbox(events, container))

    }
})

//gestione posts
var newPostForm = document.querySelector('#new-post-form')
var deletePostForm = document.querySelector('#delete-post-form')
// 2 form
newPostForm.style.display = 'none'
deletePostForm.style.display = 'none'

document.querySelector('#new-post-button').addEventListener('click', function () {
    if (newPostForm.style.display == 'none') {
        newPostForm.style.display = 'block'
    }
    else {
        deletePostForm.style.display = 'none'
    }
    deletePostForm.style.display = 'none'
})

document.querySelector('#delete-post-button').addEventListener('click', function () {
    deletePostForm.style.display = 'block'
    newPostForm.style.display = 'none'
    var container = document.querySelector('#checkbox-container')
    if (!container.hasChildNodes()) {
        fetch('/areariservata/postsinfo')
            .then(response => response.json())
            .then(posts => displayPostsResultsInCheckbox(posts, container))

    }
})

function displayPostsResultsInCheckbox(items, divContainerId) {
    for (i = 0; i < items.length; i++) {
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'postDelete'
        checkbox.value = items[i]._id
        var label = document.createElement('label')
        label.appendChild(checkbox)
        label.appendChild(document.createTextNode(`Titolo: ${items[i].Titolo} < - > Data creazione: ${items[i].Data}`))
        divContainerId.appendChild(label)
    }


}

function displayEventsResultsInCheckbox(items, divContainerId) {
    for (i = 0; i < items.length; i++) {
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'eventDelete'
        checkbox.value = items[i]._id
        var label = document.createElement('label')
        label.appendChild(checkbox)
        label.appendChild(document.createTextNode(`Data evento: ${items[i].Data_Evento} < - > Data caricamento: ${items[i].Data_Caricamento}`))
        divContainerId.appendChild(label)
    }


}