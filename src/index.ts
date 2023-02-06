import app, { updateDB } from "./app";

const port = process.env.PORT || 4000;


const main = async () => {
  updateDB()


  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main()