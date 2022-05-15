const handleOutputImageForTemplate2 = (uploadedFile, selectedTemplateSrc) => {
    //adapted from: https://stackoverflow.com/a/19593950

    // let's load the image data
    const image = new Image();
    image.onload = () => {
        const size = 390;

        const x = 0;
        const y = 0;        
        const radius = 55;

        // let's update the canvas size
        canvas.width = size;
        canvas.height = size;

        // draw image to canvas
        const ctx = canvas.getContext('2d');
        // ctx.drawImage(image, 0, 0, size, size);

        // draw image with round corner
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + size - radius, y);
        ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
        ctx.lineTo(x + size, y + size - radius);
        ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
        ctx.lineTo(x + radius, y + size);
        ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(image, x, y, size, size);

        // show canvas
        // canvas.hidden = false;

        // define text1
        const ctxText1 = canvasText1.getContext('2d');
        canvasText1.width = 1080;
        canvasText1.heigh = 100;

        ctxText1.font = "700 75px 'Alike', serif";
        ctxText1.fillStyle = "#ffffff";
        let text1 = document.getElementById('text1').value;
        let textWidth = ctxText1.measureText(text1).width;
        ctxText1.fillText(text1, (canvasText1.width / 2) - (textWidth / 2), 80);

        // define text2
        const ctxText2 = canvasText2.getContext('2d');
        canvasText2.width = 1080;
        canvasText2.heigh = 100;

        ctxText2.font = "700 65px 'Alike', serif";
        ctxText2.fillStyle = "#ffffff";
        let text2 = document.getElementById('text2').value;
        let text2Width = ctxText2.measureText(text2).width;
        ctxText2.fillText(text2, (canvasText2.width / 2) - (text2Width / 2), 100);

        // merge template and images together
        mergeImages(
            [
                { src: selectedTemplateSrc },
                { src: canvasText1.toDataURL(), y: 0, x: 0 },
                { src: canvasText2.toDataURL(), y: 75, x: 0 },
                { src: canvas.toDataURL(), x: 350, y: 558 }
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