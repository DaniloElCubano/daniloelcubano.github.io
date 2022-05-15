const handleOutputImageForTemplate4 = (uploadedFile, selectedTemplateSrc) => {
    // let's load the image data
    const image = new Image();
    image.onload = () => {
        const size = 395;

        // let's update the canvas size
        canvas.width = size;
        canvas.height = size;

        // draw image to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, size, size);


        // define text1
        const ctxText1 = canvasText1.getContext('2d');
        canvasText1.width = 1080;
        canvasText1.heigh = 100;

        ctxText1.font = "700 76px 'Caveat Bold', cursive";
        let text1 = document.getElementById('text1').value;
        let textWidth = ctxText1.measureText(text1).width;
        ctxText1.fillText(text1, (canvasText1.width / 2) - (textWidth / 2), 100);

        // merge template and images together
        mergeImages(
            [
                { src: selectedTemplateSrc },
                { src: canvasText1.toDataURL(), y: 120, x: 0 },
                { src: canvas.toDataURL(), x: 5, y: 293 }
            ],
            {
                width: 1080,
                heigh: 1080
            })
            .then(b64 => {
                img.style.display = 'block'
                img.src = b64;

                let imgDownload = document.getElementById('imgDownload');
                imgDownload.href = b64;
            });
    };

    image.src = URL.createObjectURL(uploadedFile);
}