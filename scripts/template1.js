const handleOutputImageForTemplate1 = (uploadedFile, selectedTemplateSrc) => {
    // let's load the image data
    const image = new Image();
    image.onload = () => {
        const size = 455;

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

        ctxText1.font = "700 65px 'Caveat Bold', cursive";
        let text1 = document.getElementById('text1').value;
        let textWidth = ctxText1.measureText(text1).width;
        ctxText1.fillText(text1, (canvasText1.width / 2) - (textWidth / 2), 80);

        // define text2
        const ctxText2 = canvasText2.getContext('2d');
        canvasText2.width = 1080;
        canvasText2.heigh = 100;

        ctxText2.font = "700 76px 'Caveat Bold', cursive";
        let text2 = document.getElementById('text2').value;
        let text2Width = ctxText2.measureText(text2).width;
        ctxText2.fillText(text2, (canvasText2.width / 2) - (text2Width / 2), 100);

        // merge template and images together
        mergeImages(
            [
                { src: selectedTemplateSrc },
                { src: canvasText1.toDataURL(), y: 0, x: 0 },
                { src: canvasText2.toDataURL(), y: 75, x: 0 },
                { src: canvas.toDataURL(), x: 330, y: 485 }
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