function detect(url) {
  console.log('Executing...')
  // Notice there is no 'import' statement. 'cocoSsd' and 'tf' is
  // available on the index-page because of the script tag above.
  
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  img.width = 400;
  img.height = 400;

  console.log(url)

  //const img = document.getElementById('img');
  //img.crossOrigin = "anonymous"
  console.log(img.crossOrigin)
  //img.setAttribute('crossOrigin', 'anonymous')
  //img.elt.crossOrigin = "Anonymous";
  console.log('img is here')

  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width  = 1000;
  canvas.height = 1000;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "24px helvetica";
  ctx.font = font;
  ctx.textBaseline = "top";
  
  ctx.fillText("Predicting...", 50, 50)

  // Load the model.
  cocoSsd.load().then(model => {
    console.log('Predicting')

    ctx.drawImage(img,0, 0,400,400);
    // detect objects in the image.
    model.detect(img).then(predictions => {
      predictions.forEach(prediction => {
        
        
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = "#2fff00";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "#2fff00";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        // top left rectangle
        ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
        // bottom left rectangle
        ctx.fillRect(x, height - textHeight + 10, textWidth + 15, textHeight + 10);
    });

      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
        ctx.fillText(prediction.score.toFixed(2), x, height - 4);
      });
      
      console.log('Predictions: ', predictions);
    });
  });

  console.log('End of execution...')
}