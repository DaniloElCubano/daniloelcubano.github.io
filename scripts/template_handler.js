// get a reference to the file input
const fileInput = document.getElementById('inputFile');
// get a reference to the output canvas
const canvas = document.getElementById('canvas-template');
const canvasText1 = document.getElementById('canvas-template-text1');
const canvasText2 = document.getElementById('canvas-template-text2');

// get a reference to the output img
const img = document.getElementById('outputImage');

let selectedTemplateSrc = null;
let uploadedFile = null;

const processOutputImage = (uploadedFile, selectedTemplateSrc) => {
    if (!uploadedFile || !selectedTemplateSrc) {
        return;
    }

    if (selectedTemplateSrc.includes("template1")) {
        handleOutputImageForTemplate1(uploadedFile, './templates/template1.png');
    }

    if (selectedTemplateSrc.includes("template2")) {
        handleOutputImageForTemplate2(uploadedFile, './templates/template2.png');
    }

    if (selectedTemplateSrc.includes("template3")) {
        handleOutputImageForTemplate3(uploadedFile, './templates/template3.png');
    }

    if (selectedTemplateSrc.includes("template4")) {
        handleOutputImageForTemplate4(uploadedFile, './templates/template4.png');
    }

    if (selectedTemplateSrc.includes("template5")) {
        handleOutputImageForTemplate5(uploadedFile, './templates/template5.png');
    }

    if (selectedTemplateSrc.includes("template5_transparent")) {
        handleOutputImageForTemplate5(uploadedFile, './templates/template5_transparent.png');
    }

    if (selectedTemplateSrc.includes("template7")) {
        handleOutputImageForTemplate7(uploadedFile, './templates/template7.png');
    }

    if (selectedTemplateSrc.includes("template8")) {
        handleOutputImageForTemplate8(uploadedFile, './templates/template8.png');
    }
}

// listen for the change event so we can capture the file
fileInput.addEventListener('change', (e) => {
    // get a reference to the file
    uploadedFile = e.target.files[0];

    processOutputImage(uploadedFile, selectedTemplateSrc);
});


const setSelectedTemplate = (imgSrc) => {

    selectedTemplateSrc = imgSrc.src;

    allTemplates = document.querySelectorAll('img');
    allTemplates.forEach(i => {
        if (i.src != selectedTemplateSrc) {
            i.classList.remove('imgSelected');
            i.classList.add('p12')

        }
        else {
            i.classList.add('imgSelected')
            i.classList.remove('p12')
        }

    });

    processOutputImage(uploadedFile, selectedTemplateSrc);
}       
