/**
SEOTOOL 1.0
Basic search engines optimisation checker
(c) @vanyapr 27.04.16
 **/
let x = 0;

let seoResult = {
    errors: 0
};

// Checking the links title attribute
function titleCheck() {
    // Select all links in the document
    const allDocumentLinks = document.getElementsByTagName('a');
    let counter = 0;
    let empty = 0;

    for (let i = 0; i < allDocumentLinks.length; i++ ) {
        // Checking title
        if (allDocumentLinks[i].hasAttribute('title')) {
            // Empty value
            if (allDocumentLinks[i].title === ''){
                empty++;
                allDocumentLinks[i].style.background = 'yellow';
            }
        } else {
            // No title
            allDocumentLinks[i].style.background = 'red';
            counter++;
        }
    }

    // If there is an errors
    if (counter || empty) {
        seoResult.errors += counter + empty;
        seoResult.links_missing_title = counter;
        seoResult.links_empty_title = empty;
    }
}

// Checking images alt attribute
function altCheck() {
    const allDocumentImages = document.getElementsByTagName('img');
    let counter = 0;
    let empty = 0;

    for (let i = 0; i < allDocumentImages.length; i++ ) {
        if (allDocumentImages[i].hasAttribute('alt')) {
            // Alt attribute is empty
            if (allDocumentImages[i].alt === ''){
                empty++;
                allDocumentImages[i].style.border = '2px solid greenyellow';
            }
        } else {
            // No alt attribute
            allDocumentImages[i].style.border = '2px solid greenyellow';
            counter++;
        }
    }

    // If there is an errors
    if (counter || empty) {
        seoResult.errors += counter + empty;
        seoResult.links_missing_alt = counter;
        seoResult.links_empty_alt = empty;
    }
}


// Checking document header (h1)
function headerCheck() {
    const documentHeader = document.getElementsByTagName('h1');

    if (!documentHeader) {
        // If there is no header level 1
        seoResult.missing_h1 = true;
        seoResult.errors++;
    } else if (documentHeader.length === 0) {
        // If header level 1 has empty tag
        seoResult.empty_h1 = true;
        seoResult.errors++;
    }
}

// Checking document title meta tag
function pageTitleCheck() {
    const documentTitle = document.getElementsByTagName('title');

    // Empty title
    if (documentTitle.length === 0) {
        seoResult.title_missing = true;
        seoResult.errors++;
    }

    // No title
    if (documentTitle[0].childNodes.length < 1) {
        seoResult.title_empty = true;
        seoResult.errors++;
    }
}

// Checking document description meta tag
function descriptionCheck() {
    const documentDescription = document.getElementsByName('description');

    if (documentDescription.length === 0) {
        seoResult.desc_missing = true;
        seoResult.errors++;
    } else {
        const documentDescriptionContent = documentDescription[0].getAttribute('content');

        if (documentDescriptionContent.length < 40 || documentDescriptionContent.length === 0) {
            seoResult.desc_tooshort = true;
            seoResult.errors++;
        }
    }


}

// Rendering ui on page
function uiRender(disabled = false) {
    console.log(seoResult)
    const body = document.body;
    let renderContainer = document.createElement('div');
    renderContainer.style.position = 'fixed';
    renderContainer.style.width = '100%';
    renderContainer.style.bottom = '0';
    renderContainer.style.left = '0';
    renderContainer.style.right = '0';
    renderContainer.style.background = '#F3F2F1';
    renderContainer.id = 'seotool';
    renderContainer.fontFamily = 'inherit';

    if (seoResult.errors && !disabled) {
        renderContainer.innerHTML += seoResult.links_missing_title ? '<strong style="margin-left: 15px; background: red">No link title:</strong> ' + seoResult.links_missing_title : '';
        renderContainer.innerHTML += seoResult.links_empty_title ? '<strong style="margin-left: 15px; background: yellow">Empty link title:</strong> ' + seoResult.links_empty_title : '';
        renderContainer.innerHTML += seoResult.links_missing_alt ? '<strong style="margin-left: 15px; background: orange">No image alt:</strong> ' + seoResult.links_missing_alt : '';
        renderContainer.innerHTML += seoResult.links_empty_alt ? '<strong style="margin-left: 15px; background: greenyellow">Empty image alt:</strong> ' + seoResult.links_empty_alt : '';
        renderContainer.innerHTML += seoResult.missing_h1 ? '<strong style="margin-left: 15px">No h1!</strong> ' + seoResult.missing_h1 : '';
        renderContainer.innerHTML += seoResult.empty_h1 ? '<strong style="margin-left: 15px">Empty h1!</strong> ' + seoResult.empty_h1 : '';
        renderContainer.innerHTML += seoResult.title_missing ? '<strong style="margin-left: 15px">No Title on page!</strong> ' : '';
        renderContainer.innerHTML += seoResult.title_empty ? '<strong style="margin-left: 15px">Page title is empty!</strong> ' : '';
        renderContainer.innerHTML += seoResult.desc_missing ? '<strong style="margin-left: 15px">No description on page!</strong> ' : '';
        renderContainer.innerHTML += seoResult.desc_tooshort ? '<strong style="margin-left: 15px">Page description is too short!</strong> ' : '';
        body.appendChild(renderContainer);
    } else if (!seoResult.errors && !disabled) {
        renderContainer.innerHTML = 'No problems were found'
        body.appendChild(renderContainer);
    }
}

// SEOTOOL initialisation
function seotool() {
    titleCheck();
    altCheck();
    headerCheck();
    pageTitleCheck();
    descriptionCheck();
    uiRender();

    console.log('SEOTOOL enabled')
    return 'seotool enabled';
}

window.onload = seotool;
