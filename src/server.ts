import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 3030;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get('/filteredimage', async(req, res) => {
    //validate the image_url query
    const imgUrl : string = req.query.image_url;

    if(!imgUrl){
      return res.status(400).send({ "Error" : "Image URL required to process !"});
    }

    try {
      console;
      //call filterImageFromURL(image_url) to filter the image
      const filteredImgPath : string = await filterImageFromURL(imgUrl);
      //send the resulting file in the response
      res.sendFile(filteredImgPath, () =>
      //delete any files on the server on finish of the response 
      deleteLocalFiles([filteredImgPath]));
    }catch(error){
      res.sendStatus(422).send({"Error": "Provided Image can not be processed!"});
    }
  });


  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();