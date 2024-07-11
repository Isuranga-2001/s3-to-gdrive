import express, { Request, Response } from 'express';
import { getS3File } from './s3';
import { createFolder, uploadFileToDrive } from './googledrive';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/copy-files', async (req: Request, res: Response) => {
  const { bucketName, files, folderName } = req.body;

  try {
    const folderId = await createFolder(folderName);

    for (const file of files) {
      const fileContent = await getS3File(bucketName, file);
      await uploadFileToDrive(folderId, file, fileContent);
    }

    res.status(200).send('Files copied successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
