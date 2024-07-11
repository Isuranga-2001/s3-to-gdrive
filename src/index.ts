import express, { Request, Response } from 'express';
import { getS3File, listS3Files } from './s3';
import { createFolder, uploadFileToDrive } from './googledrive';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/copy-files', async (req: Request, res: Response) => {
  const { files, folderName } = req.body;

  try {
    const folderId = await createFolder(folderName);

    for (const file of files) {
      const fileContent = await getS3File(file);
      await uploadFileToDrive(folderId, file, fileContent);
    }

    res.status(200).send('Files copied successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/list-files', async (_req: Request, res: Response) => {
  try {
    const files = await listS3Files();
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while listing files');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
