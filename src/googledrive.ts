import { google, drive_v3 } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/your/service-account-key.json',
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export const createFolder = async (folderName: string): Promise<string> => {
  const fileMetadata: drive_v3.Schema$File = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  const res = await drive.files.create({
    requestBody: fileMetadata,
    fields: 'id',
  });

  return res.data.id!;
};

export const uploadFileToDrive = async (folderId: string, fileName: string, fileContent: Buffer): Promise<void> => {
  const fileMetadata: drive_v3.Schema$File = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fileContent,
  };

  await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });
};
