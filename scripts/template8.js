const handleOutputImageForTemplate8 = (uploadedFile, selectedTemplateSrc) => {
    // adapted from: https://pqina.nl/blog/applying-a-circular-crop-mask-to-an-image/

    // let's load the image data
    const image = new Image();
    image.onload = () => {
        // use min size so we get a square
        // const size = Math.min(image.naturalWidth, image.naturalHeight);
        const size = 600;

        // let's update the canvas size
        canvas.width = size;
        canvas.height = size;

        // draw image to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, size, size);

        // only draw image where mask is
        ctx.globalCompositeOperation = 'destination-in';

        // draw our circle mask
        // ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(
            size * 0.5, // x
            size * 0.5, // y
            size * 0.5, // radius
            0, // start angle
            2 * Math.PI // end angle
        );
        ctx.fill();

        // restore to default composite operation (is draw over current image)
        ctx.globalCompositeOperation = 'source-over';

        // define text1
        const ctxText1 = canvasText1.getContext('2d');
        canvasText1.width = 1080;
        canvasText1.heigh = 100;

        ctxText1.font = "700 60px 'Happy Monkey', cursive";
        let text1 = document.getElementById('text1').value;
        let textWidth = ctxText1.measureText(text1).width;
        ctxText1.fillText(text1, (canvasText1.width / 2) - (textWidth / 2), 60);

        mergeImages(
            [
                { src: selectedTemplateSrc },
                { src: canvasText1.toDataURL(), y: 0, x: 0 },
                { src: canvas.toDataURL(), x: 250, y: 244 }
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