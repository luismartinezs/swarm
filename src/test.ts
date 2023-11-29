// otherFile.ts

import { createFile, readFile, updateFile, deleteFile } from './filesystem';

async function testFileOperations() {
  const filePath = './test.txt';

  try {
    // Create a new file
    await createFile(filePath, 'Hello, World!');

    // Read the file's content
    const content = await readFile(filePath);
    console.log('File content:', content);

    // Update the file by appending new content
    await updateFile(filePath, '\nHello again!');

    // Read the updated content
    const updatedContent = await readFile(filePath);
    console.log('Updated file content:', updatedContent);

    // Delete the file
    // await deleteFile(filePath);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error with file operations:', error);
  }
}

testFileOperations();
