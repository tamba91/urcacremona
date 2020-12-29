tinymce.init({
    selector: '#post-body',  // change this value according to your HTML
    plugins: 'autolink link',
});
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
        newPostForm.style.display = 'none'
    }
    deletePostForm.style.display = 'none'
})

document.querySelector('#delete-post-button').addEventListener('click', function () {
    document.querySelector('#delete-post-form').style.display = 'block'
    document.querySelector('#new-post-form').style.display = 'none'
    var container = document.querySelector('#checkbox-container')
    if (!container.hasChildNodes()) {
        fetch('/areariservata/postsinfo')
            .then(response => response.json())
            .then(posts => displayResultsInCheckbox(posts, container))

    }
})

function displayResultsInCheckbox(items, divContainerId) {

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