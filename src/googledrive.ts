import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account-key.json', // Adjust the path if necessary
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

const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export const uploadFileToDrive = async (folderId: string, fileName: string, fileContent: Buffer): Promise<void> => {
  const fileMetadata: drive_v3.Schema$File = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: bufferToStream(fileContent),
  };

  await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });
};

export const shareFolder = async (folderId: string, emailAddress: string): Promise<void> => {
	await drive.permissions.create({
		fileId: folderId,
		requestBody: {
			role: 'writer', // Adjust the role as necessary (writer, reader, commenter)
			type: 'user',
			emailAddress: emailAddress,
		},
	});
};
